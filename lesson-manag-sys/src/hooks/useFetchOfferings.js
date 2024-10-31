import { useState, useEffect } from "react";
import axios from "axios";

const useFetchOfferings = () => {
  const [offerings, setOfferings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const response = await axios.get("/api/offerings");
        setOfferings(response.data);
        console.log("Offerings fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching offerings:", error);
        setError(error);
      }
    };

    fetchOfferings();
  }, []);

  return { offerings, error };
};

export default useFetchOfferings;