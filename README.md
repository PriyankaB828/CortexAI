# CortexAI

A full-stack AI chatbot built with **React**, **FastAPI**, and **Google Gemini API**. CortexAI supports multi-turn conversations by maintaining chat history and generating intelligent responses using Gemini 1.5 Flash.

---

## Features

* Multi-turn conversational AI
* Google Gemini 1.5 Flash integration
* FastAPI REST backend
* React frontend with clean and responsive UI
* Conversation history support
* Clear chat functionality
* Request validation using Pydantic
* Health check endpoint
* CORS-enabled backend for frontend integration

---

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### AI Integration

* Google Gemini 1.5 Flash API

### Tools

* Git
* GitHub
* dotenv

---

## Architecture

```text
User
  ↓
React Frontend
  ↓
FastAPI Backend
  ↓
Google Gemini API
  ↓
AI Response
```

---

## Project Structure

```text
CortexAI/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

---

## Setup & Run

### 1. Get Gemini API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Create a new API key
3. Save the key securely

---

### 2. Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint    | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | /           | API Status                           |
| GET    | /health     | Health Check                         |
| POST   | /chat       | Send message and receive AI response |
| DELETE | /chat/clear | Clear conversation                   |

### Sample Request

```json
{
  "message": "What is prompt engineering?",
  "history": []
}
```

### Sample Response

```json
{
  "reply": "Prompt engineering is the practice of designing effective prompts for AI systems.",
  "history": [
    {
      "role": "user",
      "content": "What is prompt engineering?"
    },
    {
      "role": "assistant",
      "content": "Prompt engineering is the practice of designing effective prompts for AI systems."
    }
  ]
}
```

---

## Skills Demonstrated

* Python
* FastAPI
* REST API Development
* React.js
* JavaScript
* LLM Integration
* Prompt Engineering
* JSON Data Handling
* Pydantic Validation
* Frontend–Backend Communication
* Git & GitHub

---

## Future Enhancements

* Retrieval-Augmented Generation (RAG)
* PDF and document Q&A
* Streaming AI responses
* Multiple LLM provider support
* Cloud deployment on Render and Vercel
* User authentication and chat history storage

---

## Author

**Priyanka B**

Computer Science Engineering Student

GitHub: https://github.com/PriyankaB828

LinkedIn: https://www.linkedin.com/in/priyankab17/
