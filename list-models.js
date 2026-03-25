import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API_KEY not found in .env");
  process.exit(1);
}

async function listModels() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  try {
    // There isn't a direct listModels in the JS SDK's main class usually, 
    // it's often done via the base API.
    // However, we can try to access it if the SDK version allows.
    // In @google/generative-ai, listModels is not a top-level function.
    // We might need to use fetch.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
