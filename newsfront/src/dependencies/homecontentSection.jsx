import axios from "axios";
const API_URL = "http://localhost:5001/api/home-content";

export const getSection = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // No need for .json()
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      throw error;
    }
  };