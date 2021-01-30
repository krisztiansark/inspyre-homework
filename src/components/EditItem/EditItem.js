import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { getUsers, patchItems } from "../../utils/apiUtils";
function EditItem(props) {
  let history = useHistory();
  const [info, setInfo] = useState(props.location.state);
  const [startDate, setStartDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const { id } = props.match.params;
  const { name, description, assignedTo, dueDate } = info;

  useEffect(() => {
    let fetch = async () => {
      let result = await getUsers();

      return setUsers(result);
    };
    fetch();

    return () => {};
  }, [id]);

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  function handleChangeDate(e) {
    setInfo({ ...info, dueDate: `${e}` });
    setStartDate(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let patch = async () => {
      let response = await patchItems(id, info);

      console.log(response);
      setInfo({ ...info, ...response });
      console.log(info);
      history.push(`/item-details/${id}`);
    };
    patch();
  }

  function handlePerson(e) {
    let selectedUser = users.find((user) => user.id === e.target.value);
    setInfo({ ...info, assignedTo: { ...selectedUser } });
  }

  function handleClick() {
    history.push(`/item-details/${id}`);
  }

  return (
    <div>
      <h1>Edit Item : {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={name}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder={description}
          onChange={handleChange}
        />
        <DatePicker
          selected={startDate}
          onChange={handleChangeDate}
          dateFormat="yyyy/MM/dd"
        />

        <select value={assignedTo.id} onChange={handlePerson}>
          {users.map((user, i) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <img alt={assignedTo.name} src={assignedTo.profilePictureUrl} />
        <p>{id}</p>

        <button type="submit">Submit Changes</button>
      </form>

      <button onClick={handleClick}>Go to item details</button>
    </div>
  );
}

export default EditItem;
