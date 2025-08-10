from typing import List, Optional, Tuple
import logging
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from app.core.config import settings
from app.models.schemas import SearchResult

logger = logging.getLogger(__name__)

class VectorService:
    """Service for managing vector database operations."""
    
    def __init__(self):
        self.embedding_function = OpenAIEmbeddings(openai_api_key=settings.openai_api_key)
        self.db: Optional[Chroma] = None
        self._initialize_database()
    
    def _initialize_database(self) -> None:
        """Initialize the Chroma vector database."""
        try:
            self.db = Chroma(
                persist_directory=settings.chroma_persist_directory,
                embedding_function=self.embedding_function
            )
            logger.info("Vector database initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize vector database: {e}")
            raise
    
    def search_similar_documents(
        self, 
        query: str, 
        k: Optional[int] = None,
        threshold: Optional[float] = None
    ) -> List[SearchResult]:
        """
        Search for similar documents in the vector database.
        
        Args:
            query: The search query
            k: Number of results to return
            threshold: Minimum similarity score threshold
            
        Returns:
            List of search results with similarity scores
        """
        if not self.db:
            raise RuntimeError("Vector database not initialized")
        
        try:
            k = k or settings.chroma_search_k
            threshold = threshold or settings.chroma_similarity_threshold
            
            # Perform similarity search
            results = self.db.similarity_search_with_relevance_scores(query, k=k)
            
            # Filter results by threshold and convert to SearchResult objects
            search_results = []
            for doc, score in results:
                if score >= threshold:
                    search_result = SearchResult(
                        content=doc.page_content,
                        score=score,
                        source=doc.metadata.get("source"),
                        metadata=doc.metadata
                    )
                    search_results.append(search_result)
            
            logger.info(f"Found {len(search_results)} relevant documents for query: {query[:50]}...")
            return search_results
            
        except Exception as e:
            logger.error(f"Error searching vector database: {e}")
            raise
    
    def get_document_count(self) -> int:
        """Get the total number of documents in the database."""
        if not self.db:
            return 0
        
        try:
            return self.db._collection.count()
        except Exception as e:
            logger.error(f"Error getting document count: {e}")
            return 0
    
    def is_healthy(self) -> bool:
        """Check if the vector database is healthy."""
        try:
            if not self.db:
                return False
            
            # Try a simple operation to test connectivity
            self.db._collection.count()
            return True
        except Exception as e:
            logger.error(f"Vector database health check failed: {e}")
            return False

# Global vector service instance
vector_service = VectorService()
