import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function PostHook() {
  let history = useHistory();
  const [response, setResponse] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostError, setIsPostError] = useState(false);

  const postRequest = async (obj) => {
    const { name, description, dueDate, assignedTo } = obj;
    let request, data;
    setIsPostLoading(true);
    setIsPostError(false);
    try {
      request = await axios.post(
        `https://frontend-assessment-api.herokuapp.com/items/`,
        { name, description, dueDate, assignedTo }
      );
      data = request.data.data;
      setResponse(data);
      setIsPostLoading(false);
      history.push(`/`);
    } catch (err) {
      setIsPostError(true);
    }
  };

  return [response, isPostLoading, isPostError, postRequest];
}

export default PostHook;
