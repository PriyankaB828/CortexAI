from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="GenAI Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []

class ChatResponse(BaseModel):
    reply: str
    history: List[Message]

@app.get("/")
def root():
    return {"status": "GenAI Chatbot API is running"}

@app.get("/health")
def health():
    return {"status": "ok", "model": "google/gemini-2.0-flash-001"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        messages = []
        for msg in request.history:
            messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": request.message})

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "GenAI Chatbot"
                },
                json={
                    "model": "google/gemini-2.0-flash-001",
                    "messages": messages
                },
                timeout=30.0
            )
            data = response.json()

        # Log full response to terminal for debugging
        print("OpenRouter response:", data)

        if "choices" not in data:
            raise HTTPException(status_code=500, detail=f"OpenRouter error: {data}")

        reply_text = data["choices"][0]["message"]["content"]

        updated_history = request.history + [
            Message(role="user", content=request.message),
            Message(role="assistant", content=reply_text)
        ]

        return ChatResponse(reply=reply_text, history=updated_history)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
