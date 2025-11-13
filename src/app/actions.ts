'use server';

import { answerMobilePlanQuestion } from '@/ai/flows/answer-mobile-plan-question';
import { predictSignalStrength, PredictSignalStrengthOutput } from '@/ai/flows/predict-signal-strength';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

// Mock in-memory storage (replace with actual database in production)
const mockChatStorage: Record<string, Message[]> = {};

/**
 * Gets an AI-generated response for a user's question about mobile plans and saves the conversation.
 * @param question The user's question.
 * @param userId The ID of the current user.
 * @returns A promise that resolves to the AI's answer as a string.
 */
export async function getAIResponse(question: string, userId: string): Promise<string> {
  if (!question) {
    return "Please provide a question.";
  }
  if (!userId) {
    // This should not happen if the user is logged in
    return "User not authenticated.";
  }

  try {
    // Initialize user's chat storage if not exists
    if (!mockChatStorage[userId]) {
      mockChatStorage[userId] = [];
    }
    
    // Save user message
    const userMessage: Message = { 
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      role: 'user', 
      content: question, 
      createdAt: new Date().toISOString()
    };
    mockChatStorage[userId].push(userMessage);
    
    // Get AI response
    const response = await answerMobilePlanQuestion({ question });
    
    // Save AI response
    const assistantMessage: Message = { 
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      role: 'assistant', 
      content: response.answer, 
      createdAt: new Date().toISOString()
    };
    mockChatStorage[userId].push(assistantMessage);

    return response.answer;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, but I encountered an error. Please try again.";
  }
}

/**
 * Gets AI-powered signal strength predictions for a given location.
 * @param latitude The latitude of the location.
 * @param longitude The longitude of the location.
 * @returns A promise that resolves to the signal strength predictions.
 */
export async function getSignalPredictions(latitude: number, longitude: number): Promise<PredictSignalStrengthOutput> {
    try {
        const response = await predictSignalStrength({ latitude, longitude });
        return response;
    } catch (error) {
        console.error("Signal Prediction Error:", error);
        throw new Error("I'm sorry, but I encountered an error while predicting the signal strength. Please try again.");
    }
}

/**
 * Retrieves the chat history for a given user.
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of chat messages.
 */
export async function getChatHistory(userId: string): Promise<Message[]> {
  if (!userId) {
    return [];
  }
  try {
    // Return user's chat history from mock storage
    return mockChatStorage[userId] || [];
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}
