import { useState, useEffect } from "react";
import axios from "axios";

const useFetchOfferingById = (id) => {
  const [offering, setOffering] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffering = async () => {
      try {
        const response = await axios.get(`/api/offerings/${id}`);
        setOffering(response.data);
        console.log("Offering fetched successfully by id", response.data);
      } catch (error) {
        console.error("Error fetching offering by id", error);
        setError(error);
      }
    };

    fetchOffering();
  }, []);

  return { user, error };
};

export default useFetchOfferingById;