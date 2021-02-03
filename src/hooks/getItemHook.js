import { useState, useEffect } from "react";
import axios from "axios";

function GetItemHook(id) {
  const [item, setItem] = useState({
    name: "",
    dueDate: "",
    description: "",
    assignedTo: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let unmount = false;
    let fetch = async () => {
      let request, data;
      setIsLoading(true);
      setIsError(false);
      try {
        request = await axios.get(
          `https://frontend-assessment-api.herokuapp.com/items/${id}`
        );
        data = request.data.data;
        if (!unmount) {
          setItem(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!unmount) {
          setIsError(true);
        }
      }
    };
    fetch();

    return () => {
      unmount = true;
    };
  }, [id]);

  return [item, isLoading, isError];
}

export default GetItemHook;
