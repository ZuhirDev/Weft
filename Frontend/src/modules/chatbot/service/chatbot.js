import { apiConfig } from "@/config/config";

export const chatBotService = async (message) => {
  try {
    console.log("AAA", apiConfig.CHATBOT_API_URL)
    const response = await fetch(`${apiConfig.CHATBOT_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
};

export const embeddingService = async (files) => {
  try {
    const formData = new FormData();

    files.forEach((f) => formData.append("files", f.file));

    const response = await fetch(`${apiConfig.CHATBOT_API_URL}/chat/upload`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.log("Error", error);
  }
};