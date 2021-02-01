import React, { useState, useEffect } from "react";
import axios from "axios";

function GetUsersHook() {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isUsersError, setIsUsersError] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      let request, data;
      setIsUsersLoading(true);
      setIsUsersError(false);
      try {
        request = await axios.get(
          "https://frontend-assessment-api.herokuapp.com/users"
        );
        data = request.data.data;
        setUsers(data);
        setIsUsersLoading(false);
      } catch (err) {
        setIsUsersError(true);
      }
    };
    fetch();

    return () => {};
  }, []);

  return [users, isUsersLoading, isUsersError];
}

export default GetUsersHook;
