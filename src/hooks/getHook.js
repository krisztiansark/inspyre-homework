import { useState, useEffect } from "react";
import axios from "axios";

function GetHook() {
  const [results, setResults] = useState([]);
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
          "https://frontend-assessment-api.herokuapp.com/items"
        );
        data = request.data.data;

        if (!unmount) {
          setResults(data);
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
  }, []);

  return [results, isLoading, isError];
}

export default GetHook;
