# 🤖 GenAI Chatbot

A full-stack conversational AI chatbot built with **Google Gemini API**, **FastAPI** (Python), and **React**.  
Developed as a GenAI Developer Intern project demonstration.

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| LLM       | Google Gemini 1.5 Flash API          |
| Backend   | Python, FastAPI, Pydantic, Uvicorn   |
| Frontend  | React, Vite, CSS                     |
| API       | REST API, JSON, HTTP                 |
| Tools     | Git, GitHub, dotenv                  |

---

## ✨ Features

- 💬 Multi-turn conversation with full context memory
- ⚡ FastAPI backend with REST endpoints
- 🎨 Clean dark-mode React UI
- 📜 Conversation history passed on every request
- 🔄 Clear chat functionality
- 🌐 CORS-enabled for local development
- 📝 Pydantic request/response validation
- 🏥 Health check endpoint

---

## 📁 Project Structure

```
genai-chatbot/
├── backend/
│   ├── main.py              # FastAPI app — all routes and Gemini logic
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variable template
│   └── .env                 # Your actual API key (do NOT commit this)
│
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main React component — chat UI & API calls
    │   ├── main.jsx          # React entry point
    │   └── index.css         # Styling
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Setup & Run

### Step 1 — Get Gemini API Key (Free)
1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the key

### Step 2 — Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Open .env and paste your Gemini API key

# Run the server
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`  
API docs (Swagger): `http://localhost:8000/docs`

### Step 3 — Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| GET    | `/`           | Root — API status                  |
| GET    | `/health`     | Health check + model info          |
| POST   | `/chat`       | Send message, get AI reply         |
| DELETE | `/chat/clear` | Clear conversation (info endpoint) |

### POST `/chat` — Request Body

```json
{
  "message": "What is prompt engineering?",
  "history": []
}
```

### POST `/chat` — Response

```json
{
  "reply": "Prompt engineering is the practice of...",
  "history": [
    { "role": "user", "content": "What is prompt engineering?" },
    { "role": "assistant", "content": "Prompt engineering is the practice of..." }
  ]
}
```

---

## 🎯 JD Skills Demonstrated

- ✅ Python (backend logic, Gemini integration)
- ✅ FastAPI (REST API development)
- ✅ LLM API Integration (Google Gemini 1.5 Flash)
- ✅ Prompt Engineering (multi-turn context management)
- ✅ React (frontend UI)
- ✅ REST APIs & JSON (request/response handling)
- ✅ Pydantic (data validation & schemas)
- ✅ Git / GitHub (version control)

---

## 🔮 Future Improvements

- [ ] Add RAG (Retrieval-Augmented Generation) with vector DB
- [ ] Deploy backend on Render / Railway
- [ ] Deploy frontend on Vercel / Netlify
- [ ] Add streaming responses
- [ ] Add file/PDF upload for document Q&A
- [ ] Support multiple LLM providers (OpenAI, Claude)

---

## 👩‍💻 Author

**Priyanka B** — Computer Science Engineering Student  
[GitHub](https://github.com/PriyankaB828) | [LinkedIn](https://linkedin.com/in/priyankab17/)
