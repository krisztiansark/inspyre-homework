import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      let request, data;
      setIsLoading(true);
      setIsError(false);
      try {
        request = await axios.get(
          `https://frontend-assessment-api.herokuapp.com/items/${id}`
        );
        data = request.data.data;
        setItem(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    fetch();

    return () => {};
  }, [id]);

  return [item, isLoading, isError];
}

export default GetItemHook;
