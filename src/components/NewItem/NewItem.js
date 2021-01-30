import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { getUsers, postItem } from "../../utils/apiUtils";
function NewItem(props) {
  let history = useHistory();
  const [users, setUsers] = useState([]);

  const [info, setInfo] = useState({
    name: "",
    description: "",
    assignedTo: { id: "", name: "" },
    dueDate: "1021-20-20",
  });
  // const [startDate, setStartDate] = useState(new Date());

  const { name, description, assignedTo, dueDate } = info;

  const isInvalid =
    name === "" || description === "" || assignedTo.id === "" || dueDate === "";

  useEffect(() => {
    let fetch = async () => {
      let result = await getUsers();

      // console.log(result);
      return setUsers(result);
    };
    fetch();

    return () => {};
  }, []);

  // console.log(info);
  // console.log(Date(Date.now()));
  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  // function handleChangeDate(e) {
  //   setInfo({ ...info, dueDate: e });
  //   setStartDate(e);
  // }

  function handleSubmit(e) {
    e.preventDefault();

    let patch = async () => {
      let response = await postItem(info);

      console.log(response);
      history.push(`/`);
      // return setUsers(result);
    };
    patch();
  }

  function handlePerson(e) {
    let selectedUser = users.find((user) => user.id === e.target.value);
    setInfo({ ...info, assignedTo: { ...selectedUser } });
  }

  function handleClick() {
    history.push(`/`);
  }

  return (
    <div>
      <h1>New Item</h1>
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
        {/* <DatePicker selected={startDate} onChange={handleChangeDate} /> */}

        <select value={assignedTo.id} onChange={handlePerson}>
          {users.map((user, i) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <img alt={assignedTo.name} src={assignedTo.profilePictureUrl} />

        <button disabled={isInvalid} type="submit">
          Submit New Item
        </button>
      </form>

      <button onClick={handleClick}>Go to items</button>
    </div>
  );
}

export default NewItem;
