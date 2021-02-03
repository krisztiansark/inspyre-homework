import { useState, useEffect } from "react";
import axios from "axios";

function GetUsersHook() {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isUsersError, setIsUsersError] = useState(false);

  useEffect(() => {
    let unmount = false;
    let fetch = async () => {
      let request, data;
      setIsUsersLoading(true);
      setIsUsersError(false);
      try {
        request = await axios.get(
          "https://frontend-assessment-api.herokuapp.com/users"
        );
        data = request.data.data;
        if (!unmount) {
          setUsers(data);
          setIsUsersLoading(false);
        }
      } catch (err) {
        if (!unmount) {
          setIsUsersError(true);
        }
      }
    };
    fetch();

    return () => {
      unmount = true;
    };
  }, []);

  return [users, isUsersLoading, isUsersError];
}

export default GetUsersHook;
