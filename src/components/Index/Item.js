import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteItem, getItem } from "../../utils/apiUtils";
function Item(props) {
  const { name, id } = props.item;
  const [item, setItem] = useState("");
  const [deleted, setDeleted] = useState(false);
  // CLICK OPENS PRODUCT PAGE ROUTE

  // DELETE ITEM WITH MODAL

  // OVERDUE ITEM NOTIFICATION

  const today = new Date().toISOString().slice(0, 10);

  function handleDelete() {
    deleteItem(id);
    setDeleted(true);
  }

  useEffect(() => {
    let fetch = async () => {
      let result = await getItem(id);

      return setItem(result);
    };
    fetch();

    return () => {};
  }, []);

  return (
    <div style={{ display: deleted ? "none" : "block" }}>
      <Link to={`/item-details/${id}`}>
        <h1>Name: {name} </h1>
        <h2>Id : {id}</h2>
        <h3>Is ticket due: {item.dueDate > today ? "NOT DUE" : "DUE"}</h3>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Item;
