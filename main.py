from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Optional
import google.generativeai as genai
import os
import traceback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 시작 시 한 번만 설정
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# 사용할 Gemini 모델 (무료 할당량 풍부)
DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


# 프론트가 보내는 형식 그대로 받기 (Claude 호환)
class ReportRequest(BaseModel):
    model: Optional[str] = None       # 무시됨 (Gemini 고정)
    max_tokens: Optional[int] = 4000
    messages: List[Any]


@app.get("/")
def home():
    return {
        "message": "server running",
        "ai_provider": "Google Gemini",
        "model": DEFAULT_MODEL,
        "has_api_key": bool(GEMINI_API_KEY),
    }


def extract_text_from_messages(messages: List[Any]) -> str:
    """
    Claude 형식의 messages 배열을 단일 텍스트 프롬프트로 변환.
    프론트의 요청 형식:
      [{"role":"user", "content":"...텍스트..."}]
    또는
      [{"role":"user", "content":[{"type":"text","text":"..."}, {"type":"image",...}]}]
    """
    parts = []
    for msg in messages:
        content = msg.get("content", "") if isinstance(msg, dict) else ""

        # content가 문자열인 경우
        if isinstance(content, str):
            parts.append(content)
        # content가 리스트(블록 배열)인 경우 - 텍스트만 추출
        elif isinstance(content, list):
            for block in content:
                if isinstance(block, dict) and block.get("type") == "text":
                    parts.append(block.get("text", ""))
                # 이미지 블록은 무시(현재 프론트는 텍스트만 보냄)

    return "\n\n".join(p for p in parts if p)


@app.post("/api/generate")
def generate(req: ReportRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Render → Environment에서 추가하세요.",
        )

    try:
        prompt = extract_text_from_messages(req.messages)
        if not prompt:
            raise HTTPException(status_code=400, detail="요청에 텍스트 내용이 없습니다.")

        print(f"[INFO] Gemini 요청: 모델={DEFAULT_MODEL}, 프롬프트 길이={len(prompt)}")

        model = genai.GenerativeModel(
            DEFAULT_MODEL,
            generation_config={
                "max_output_tokens": req.max_tokens or 4000,
                "temperature": 0.7,
                "response_mime_type": "application/json",  # JSON 형식 강제
            },
        )

        response = model.generate_content(prompt)
        text = (response.text or "").strip()

        if not text:
            raise HTTPException(status_code=502, detail="Gemini 응답이 비어 있습니다.")

        print(f"[INFO] Gemini 응답 길이: {len(text)}")

        # 프론트가 기대하는 Claude 호환 형식으로 반환
        # {content: [{type:"text", text:"<JSON>"}]}
        return {
            "content": [{"type": "text", "text": text}]
        }

    except HTTPException:
        raise

    except Exception as e:
        error_type = type(e).__name__
        error_msg = str(e)

        print(f"[ERROR] {error_type}: {error_msg}")
        print(traceback.format_exc())

        # Gemini 특정 에러 안내
        em = error_msg.lower()
        if "api_key" in em or "api key" in em or "permission" in em or "401" in em or "403" in em:
            detail = f"API 키가 유효하지 않습니다. GEMINI_API_KEY를 확인하세요. (원본: {error_msg})"
        elif "quota" in em or "rate" in em or "429" in em:
            detail = f"요청 한도 초과. 잠시 후 다시 시도하세요. (원본: {error_msg})"
        elif "not found" in em or "404" in em:
            detail = f"모델을 찾을 수 없습니다: {DEFAULT_MODEL}. (원본: {error_msg})"
        elif "timeout" in em or "deadline" in em:
            detail = f"Gemini 응답 시간 초과. (원본: {error_msg})"
        else:
            detail = f"[{error_type}] {error_msg}"

        raise HTTPException(status_code=500, detail=detail)
