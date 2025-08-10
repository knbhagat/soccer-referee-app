from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

class QueryRequest(BaseModel):
    """Request model for rule queries."""
    query_text: str = Field(..., min_length=1, max_length=1000, description="The query text for rule clarification")

class QueryResponse(BaseModel):
    """Response model for rule queries."""
    model_config = ConfigDict(protected_namespaces=())
    
    fallback: bool = Field(..., description="Whether the response used fallback knowledge")
    response: str = Field(..., description="The generated response")
    sources: Optional[List[str]] = Field(None, description="Source documents used for the response")
    confidence_score: Optional[float] = Field(None, ge=0.0, le=1.0, description="Confidence score of the response")
    processing_time: Optional[float] = Field(None, description="Time taken to process the query in seconds")
    data_source: str = Field(..., description="Source of the information: 'rulebook' or 'general_knowledge'")
    page_references: Optional[List[str]] = Field(None, description="Specific page numbers from the rulebook")
    model_used: str = Field(..., description="The AI model used for generating the response")

class HealthResponse(BaseModel):
    """Health check response model."""
    status: str = Field(..., description="Service status")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Current timestamp")
    version: str = Field(..., description="API version")
    uptime: Optional[float] = Field(None, description="Service uptime in seconds")

class ErrorResponse(BaseModel):
    """Error response model."""
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Error timestamp")
    request_id: Optional[str] = Field(None, description="Request ID for tracking")

class SearchResult(BaseModel):
    """Search result model for vector database queries."""
    content: str = Field(..., description="Document content")
    score: float = Field(..., ge=0.0, le=1.0, description="Similarity score")
    source: Optional[str] = Field(None, description="Document source")
    metadata: Optional[dict] = Field(None, description="Additional metadata")
