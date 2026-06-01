from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from typing import List, Any, Optional
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 일단 모든 출처 허용 (배포 안정화 후 본인 도메인으로 좁히세요)
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# 프론트가 보내는 형식 그대로 받기
class ReportRequest(BaseModel):
    model: Optional[str] = "claude-sonnet-4-20250514"
    max_tokens: Optional[int] = 4000
    messages: List[Any]

@app.get("/")
def home():
    return {
        "message": "server running",
        "has_api_key": bool(os.getenv("ANTHROPIC_API_KEY")),
    }

@app.post("/api/generate")
def generate(req: ReportRequest):
    if not os.getenv("ANTHROPIC_API_KEY"):
        raise HTTPException(
            status_code=500,
            detail="ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다. Render → Environment에서 추가하세요.",
        )
    try:
        response = client.messages.create(
            model=req.model or "claude-sonnet-4-20250514",
            max_tokens=req.max_tokens or 4000,
            messages=req.messages,
        )
        # 프론트가 기대하는 형식 그대로 반환: {content: [{type, text}, ...]}
        return {
            "content": [
                {"type": block.type, "text": getattr(block, "text", "")}
                for block in response.content
                if block.type == "text"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Claude API 오류: {str(e)}")