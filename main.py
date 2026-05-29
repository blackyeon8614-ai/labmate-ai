from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://labmate-ai-alpha.vercel.app/"],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=["*"],
)

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

class ReportRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "server running"}

@app.post("/api/generate")
def generate(req: ReportRequest):

    response = client.messages.create(
        model="claude-3-5-sonnet-latest",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": req.text
            }
        ]
    )

    return {
        "content": [
            {
                "type": "text",
                "text": response.content[0].text
            }
        ]
    }
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://labmate-ai-alpha.vercel.app/"],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=["*"],
)

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

class ReportRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "server running"}

@app.post("/api/generate")
def generate(req: ReportRequest):

    response = client.messages.create(
        model="claude-3-5-sonnet-latest",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": req.text
            }
        ]
    )

    return {
        "content": [
            {
                "type": "text",
                "text": response.content[0].text
            }
        ]
    }