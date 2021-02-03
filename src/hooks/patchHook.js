import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function PatchHook(id, obj) {
  let history = useHistory();
  const [info, setInfo] = useState(obj);
  const [isPatchLoading, setIsPatchLoading] = useState(false);
  const [isPatchError, setIsPatchError] = useState(false);

  const patchRequest = async (id, obj) => {
    let request, data;
    const { name, description, dueDate, assignedTo } = obj;
    setIsPatchLoading(true);
    setIsPatchError(false);
    try {
      request = await axios.patch(
        `https://frontend-assessment-api.herokuapp.com/items/${id}/`,
        { name, description, dueDate, assignedTo }
      );
      data = request.data.data;
      setInfo({ ...info, ...data });
      setIsPatchLoading(false);
      history.push(`/item-details/${id}`);
    } catch (err) {
      setIsPatchError(true);
    }
  };

  return [info, setInfo, isPatchLoading, isPatchError, patchRequest];
}

export default PatchHook;
