from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "server running"}

@app.post("/api/generate")
def generate():
    return {
        "purpose": "재료의 기계적 특성을 분석한다.",
        "theory": "응력과 변형률 관계를 분석한다.",
        "result": "실험 결과가 정상적으로 측정되었다.",
        "conclusion": "재료 특성을 확인할 수 있었다."
    }