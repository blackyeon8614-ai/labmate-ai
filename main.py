from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],
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
def generate():
    return {
        "purpose": "...",
        "theory": "...",
    }
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],
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
다음 실험 내용을 바탕으로 실험보고서를 작성하라.

형식:
[01. 실험 목적]
[02. 이론]
[03. 결과 분석]
[04. 오차 원인]
[05. 고찰]
[06. 결론]

실험 내용:
{req.text}
"""

    response = client.messages.create(
        model="claude-3-5-sonnet-latest",
        max_tokens=1500,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "report": response.content[0].text
    }