import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUserByPhone = (phoneNumber) => {
  const [user, setUser] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/phone/${phoneNumber}`);
        setUser(response.data);
        console.log("User fetched successfully by phone number", response.data);
      } catch (error) {
        console.error("Error fetching user by phone number", error);
        setError(error);
      }
    };

    fetchUser();
  }, []);

  return { user, error };
};

export default useFetchUserByPhone;