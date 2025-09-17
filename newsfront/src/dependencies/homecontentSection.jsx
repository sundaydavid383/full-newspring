import axios from "axios";
const base_Url = 'https://full-newspring.onrender.com/'
//''
const API_URL = `${base_Url}api/home-content`;

export const getSection = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // No need for .json()
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      throw error;
    }
  };