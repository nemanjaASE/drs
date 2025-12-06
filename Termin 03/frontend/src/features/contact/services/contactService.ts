import api from "../../../config/axios";
import { ENDPOINTS } from "../../../config/endpoints";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(data: ContactMessage) {
  try {
    console.log("POSTing to", ENDPOINTS.contacts, "payload:", data);
    const response = await api.post(ENDPOINTS.contacts, data);
    console.log("sendContactMessage response:", response);
    return response.data;
  } catch (err: any) {
    console.error("Failed to send message:", err);
    throw err;
  }
}
