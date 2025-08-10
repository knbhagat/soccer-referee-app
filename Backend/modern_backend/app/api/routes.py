import logging
import time
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from app.models.schemas import (
    QueryRequest, 
    QueryResponse, 
    HealthResponse, 
    ErrorResponse
)
from app.services.ai_service import ai_service
from app.services.vector_service import vector_service
from app.core.config import settings

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    try:
        # Check vector database health
        vector_healthy = vector_service.is_healthy()
        
        status = "healthy" if vector_healthy else "degraded"
        
        return HealthResponse(
            status=status,
            version=settings.api_version,
            uptime=time.time()  # Simple uptime for now
        )
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

@router.post("/query", response_model=QueryResponse)
async def query_rules(request: QueryRequest):
    """
    Query the soccer referee knowledge base.
    
    This endpoint processes natural language queries about soccer rules and returns
    AI-generated responses based on the official FIFA Laws of the Game.
    
    Args:
        request: QueryRequest containing the user's question
        
    Returns:
        QueryResponse with the generated answer and metadata
        
    Raises:
        HTTPException: If the query processing fails
    """
    try:
        logger.info(f"Processing query: {request.query_text[:50]}...")
        
        # Process the query using AI service
        response = await ai_service.process_query(request.query_text)
        
        logger.info(f"Query processed successfully. Fallback: {response.fallback}")
        return response
        
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Internal server error while processing query"
        )

@router.get("/stats")
async def get_stats():
    """Get system statistics."""
    try:
        document_count = vector_service.get_document_count()
        vector_healthy = vector_service.is_healthy()
        
        return {
            "document_count": document_count,
            "vector_database_healthy": vector_healthy,
            "api_version": settings.api_version
        }
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving statistics")

# Note: Exception handlers should be added to the main FastAPI app, not the router
# This is handled in main.py
