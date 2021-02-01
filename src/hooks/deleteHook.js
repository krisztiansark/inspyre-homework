import React, { useState } from "react";
import axios from "axios";

function DeleteHook(id) {
  const [isLoadingDelete, setIsLoading] = useState(false);
  const [isErrorDelete, setIsError] = useState(false);

  const deleteApi = async (id) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await axios.delete(
        `https://frontend-assessment-api.herokuapp.com/items/${id}/`
      );

      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  return [isLoadingDelete, isErrorDelete, deleteApi];
}

export default DeleteHook;
