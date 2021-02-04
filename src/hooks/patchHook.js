import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function PatchHook() {
  let history = useHistory();

  const [isPatchLoading, setIsPatchLoading] = useState(false);
  const [isPatchError, setIsPatchError] = useState(false);

  const patchRequest = async (id, obj) => {
    const { name, description, dueDate, assignedTo } = obj;
    setIsPatchLoading(true);
    setIsPatchError(false);
    try {
      await axios.patch(
        `https://frontend-assessment-api.herokuapp.com/items/${id}/`,
        { name, description, dueDate, assignedTo }
      );

      setIsPatchLoading(false);
      history.push(`/item-details/${id}`);
    } catch (err) {
      setIsPatchError(true);
    }
  };

  return [isPatchLoading, isPatchError, patchRequest];
}

export default PatchHook;
