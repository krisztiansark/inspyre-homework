import React, { useState, useEffect } from "react";
import axios from "axios";

function GetHook() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      let request, data;
      setIsLoading(true);
      setIsError(false);
      try {
        request = await axios.get(
          "https://frontend-assessment-api.herokuapp.com/items"
        );
        data = request.data.data;
        setResults(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    fetch();

    return () => {};
  }, []);

  return [results, isLoading, isError];
}

export default GetHook;
