import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getItem } from "../../utils/apiUtils";
function ItemDetails(props) {
  let history = useHistory();
  const { id } = props.match.params;

  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState({
    name: "",
    dueDate: "",
    description: "",
    assignedTo: "",
    createdAt: "",
    updatedAt: "",
  });

  const {
    name,
    dueDate,
    description,
    assignedTo,
    createdAt,
    updatedAt,
  } = result;

  function handleClick() {
    history.push("/");
  }

  useEffect(() => {
    let fetch = async () => {
      let result = await getItem(id);
      console.log(result);
      return setResult(result);
    };
    fetch();
    setLoading(false);
    return () => {};
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <button onClick={handleClick}>Back</button>
          <Link
            to={{
              pathname: `/edit-item/${id}`,
              state: {
                ...result,
              },
            }}
          >
            <button>Edit Item</button>
          </Link>
          <h1>
            Name: {name} and id:{id}
          </h1>
          <h2>Due Date: {dueDate}</h2>
          <h2>Created at: {createdAt}</h2>
          <h2>Updated At: {updatedAt}</h2>
          <h2>Description: {description}</h2>
          <h2>Assigned To: {assignedTo.name}</h2>
          <h2>ID: {assignedTo.id}</h2>
          <img alt={assignedTo.name} src={assignedTo.profilePictureUrl}></img>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
