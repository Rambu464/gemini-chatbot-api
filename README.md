# Skill Advisor Chatbot

This project is intended as a final assignment for the **AI Productivity and AI API Integration for Developers** by **Hacktiv8**.

This repository contains a simple Chatbot API implementation using **Express.js** and the **Gemini 2.5 Flash Lite** model from Google. This API enables fast and lightweight AI conversation integration into your applications.

## 🚀 Features
* **Model:** Gemini 2.5 Flash Lite (Fast & Efficient).
* **Runtime:** Node.js with Express.
* **Security:** Environment variable support via `dotenv`.
* **Flexibility:** CORS enabled for cross-origin access.
* * **User Interface:** Simple website.

## 🛠️ Prerequisites
Before starting, ensure you have installed:
* [Node.js](https://nodejs.org/) (v24 above required).
* **Google Gemini API Key**. You can obtain one for free at [Google AI Studio](https://aistudio.google.com/).

## 📦 Setup

1.  **Clone or create a new project folder:**
    ```bash
    mkdir gemini-chatbot-api
    cd gemini-chatbot-api
    ```

2.  **Initialize the project and install dependencies:**
    ```bash
    npm init -y
    npm install express dotenv cors @google/generative-ai
    ```

3.  **Create a `.env` file in the root directory:**
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```


## 🏃 Running the API

Start the server using the following command:
```bash
node index.js
```

Your API is now active at `http://localhost:3000`.
