import time
import logging
import re
from typing import List, Optional
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from app.core.config import settings
from app.models.schemas import SearchResult, QueryResponse
from app.services.vector_service import vector_service

logger = logging.getLogger(__name__)

class AIService:
    """Service for AI-powered query processing and response generation."""
    
    def __init__(self):
        self.model = ChatOpenAI(
            model=settings.openai_model,
            openai_api_key=settings.openai_api_key
        )
        self.prompt_template = ChatPromptTemplate.from_template(
            """You are an AI soccer referee assistant with comprehensive knowledge of the FIFA Laws of the Game. You provide authoritative guidance based on researched information from the official rulebook context provided below.

**Context from FIFA Laws of the Game:**
{context}

---

**Question:** {question}

**Instructions:**
- Provide a clear, authoritative response based on the official rulebook context above
- Cite specific rules and their practical applications when relevant
- Maintain a professional, educational tone suitable for referee training
- If the context doesn't contain sufficient information, acknowledge this and suggest consulting additional sections of the official FIFA Laws of the Game
- Focus on practical application and real-world officiating scenarios
- Remember you are an AI assistant drawing from researched information, not a person with personal experience

Please provide your expert analysis and guidance."""
        )
    
    async def process_query(self, query_text: str) -> QueryResponse:
        """
        Process a user query and generate a response using RAG.
        
        Args:
            query_text: The user's query
            
        Returns:
            QueryResponse with the generated answer and metadata
        """
        start_time = time.time()
        
        try:
            # Search for relevant documents
            search_results = vector_service.search_similar_documents(query_text)
            
            if not search_results:
                # No relevant documents found, use fallback
                logger.info(f"No relevant documents found for query: {query_text[:50]}...")
                return await self._generate_fallback_response(query_text, start_time)
            
            # Generate response using RAG
            return await self._generate_rag_response(query_text, search_results, start_time)
            
        except Exception as e:
            logger.error(f"Error processing query: {e}")
            return await self._generate_fallback_response(query_text, start_time)
    
    async def _generate_rag_response(
        self, 
        query: str, 
        search_results: List[SearchResult], 
        start_time: float
    ) -> QueryResponse:
        """Generate response using RAG with retrieved documents."""
        try:
            # Prepare context from search results
            context_text = "\n\n---\n\n".join([
                result.content for result in search_results
            ])
            
            # Create prompt
            prompt = self.prompt_template.format(
                context=context_text,
                question=query
            )
            
            # Generate response
            response = self.model.invoke(prompt)
            
            # Calculate processing time
            processing_time = time.time() - start_time
            
            # Extract sources
            sources = [
                result.source for result in search_results 
                if result.source is not None
            ]
            
            # Extract page numbers from sources
            page_references = self._extract_page_numbers(sources)
            
            # Calculate confidence score (average of similarity scores)
            confidence_score = sum(result.score for result in search_results) / len(search_results)
            
            return QueryResponse(
                fallback=False,
                response=response.content,
                sources=sources,
                confidence_score=confidence_score,
                processing_time=processing_time,
                data_source="rulebook",
                page_references=page_references,
                model_used=settings.openai_model
            )
            
        except Exception as e:
            logger.error(f"Error generating RAG response: {e}")
            return await self._generate_fallback_response(query, start_time)
    
    async def _generate_fallback_response(self, query: str, start_time: float) -> QueryResponse:
        """Generate fallback response using general knowledge."""
        try:
            fallback_prompt = f"""You are an AI soccer referee assistant with comprehensive knowledge of soccer rules, officiating practices, and the FIFA Laws of the Game. You have been trained on extensive research and documentation covering:

1. **Complete FIFA Laws of the Game**: All 17 laws and their official interpretations
2. **Professional Refereeing Standards**: Best practices and procedures used at all levels of the game
3. **Practical Officiating Knowledge**: How rules are applied in real match situations
4. **Current Rule Updates**: Latest changes, VAR implementations, and referee development guidelines
5. **Educational Resources**: Training materials and guidance for referees at all levels

Your responses should reflect this comprehensive knowledge by:
- Providing authoritative, confident answers based on researched information
- Citing specific rules and their practical applications when relevant
- Explaining how rules are typically applied in real match situations
- Offering practical advice for referees at all levels
- Maintaining a professional, educational tone
- Remembering you are an AI assistant drawing from researched information, not a person with personal experience

Question: {query}

Please provide a comprehensive, expert-level response drawing from your extensive knowledge of soccer rules and officiating practices."""
            
            response = self.model.invoke(fallback_prompt)
            processing_time = time.time() - start_time
            
            return QueryResponse(
                fallback=True,
                response=response.content,
                processing_time=processing_time,
                data_source="general_knowledge",
                page_references=None,
                model_used=settings.openai_model
            )
            
        except Exception as e:
            logger.error(f"Error generating fallback response: {e}")
            processing_time = time.time() - start_time
            
            return QueryResponse(
                fallback=True,
                response="I apologize, but I'm unable to process your request at the moment. Please try again later.",
                processing_time=processing_time,
                data_source="general_knowledge",
                page_references=None,
                model_used=settings.openai_model
            )

    def _extract_page_numbers(self, sources: List[str]) -> List[str]:
        """Extract page numbers from source file paths."""
        page_numbers = []
        for source in sources:
            if source:
                # Extract page number from filename like "page_99.md"
                match = re.search(r'page_(\d+)\.md', source)
                if match:
                    page_numbers.append(match.group(1))
        return sorted(list(set(page_numbers)))  # Remove duplicates and sort

# Global AI service instance
ai_service = AIService()
