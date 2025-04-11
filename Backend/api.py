from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from query_data import process_query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],                      # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],                      # Allow all headers
)

class QueryRequest(BaseModel):
    query_text: str

@app.get("/")
def root():
    return {"message": "FastAPI backend is running!"}

@app.post("/query")
async def query_database(request: QueryRequest):
    result = process_query(request.query_text)
    if "error" in result:
        # ✅ Return 200 OK and include fallback indicator instead of raising 404
        return { "fallback": True, "response": result["error"] }
    return { "fallback": False, "response": result }