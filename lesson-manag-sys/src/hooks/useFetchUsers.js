import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        console.log("Users fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  return { users, error };
};

export default useFetchUsers;