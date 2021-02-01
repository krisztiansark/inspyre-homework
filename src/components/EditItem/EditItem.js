import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { getUsers, patchItems } from "../../utils/apiUtils";
import dateFormat from "dateformat";
import {
  Button,
  H1,
  H3,
  Container,
  Textarea,
  Input,
  Form,
  DatePickerStyled,
  Img,
  Select,
} from "../../utils/globalStyles";
import Row from "../blocks/Row";
import Col from "../blocks/Col";
import Label from "../blocks/Label";
import { COLORS } from "../../utils/styleConstants";
import Loader from "../Loader/Loader";

function EditItem(props) {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState(props.location.state);
  const [startDate, setStartDate] = useState(new Date(info.dueDate));
  const [users, setUsers] = useState([]);

  const { id } = props.match.params;
  const { name, description, assignedTo } = info;

  useEffect(() => {
    let fetch = async () => {
      setIsLoading(true);
      let result = await getUsers();

      setUsers(result);
      setIsLoading(false);
    };

    fetch();

    return () => {};
  }, [id]);

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  function handleChangeDate(e) {
    setInfo({ ...info, dueDate: dateFormat(e, "yyyy-mm-dd") });
    setStartDate(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let patch = async () => {
      let response = await patchItems(id, info);

      setInfo({ ...info, ...response });

      history.push(`/item-details/${id}`);
    };
    patch();
  }

  function handlePerson(e) {
    e.preventDefault();
    let selectedUser = users.find((user) => user.id === e.target.value);
    setInfo({ ...info, assignedTo: { ...selectedUser } });
  }

  function handleBack(e) {
    e.preventDefault();
    history.push(`/item-details/${id}`);
  }

  function handleHome(e) {
    e.preventDefault();
    history.push(`/`);
  }

  return (
    <>
      <Loader color={COLORS.background} open={isLoading} />
      <Container open={isLoading}>
        <Row>
          <Col col="12" md="6">
            <H1 main>Edit Item</H1>

            <Form onSubmit={handleSubmit}>
              <Row mt="2" mb="3">
                <Label mt="3" htmlFor="select">
                  Choose the assignee:
                </Label>
                <Col col="6">
                  <Select
                    name="select"
                    value={assignedTo.id}
                    onChange={handlePerson}
                  >
                    {users.map((user, i) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Select>
                </Col>
                <Col col="6">
                  <Img
                    alt={assignedTo.name}
                    src={assignedTo.profilePictureUrl}
                  />
                </Col>
              </Row>
              <Label htmlFor="name">Edit item name:</Label>
              <Row>
                <Col mb="4">
                  <Input
                    type="text"
                    name="name"
                    // placeholder={name}
                    value={name}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Label htmlFor="description">Edit item description:</Label>
              <Row>
                <Col col="11" md="10" mb="3" mt="2">
                  <Textarea
                    type="text"
                    name="description"
                    // placeholder={description}
                    onChange={handleChange}
                    value={description}
                  />
                </Col>
              </Row>

              <Label htmlFor="date">Edit due date:</Label>
              <DatePickerStyled
                name="date"
                selected={startDate}
                onChange={handleChangeDate}
                dateFormat="yyyy-MM-dd"
              />
              <Col mt="4" col={10}>
                <H3>
                  Modifications won't be saved until you press the submit
                  button.
                </H3>
              </Col>
              <Row mb="2" mt="4">
                <Col col="4" md="4">
                  <Button onClick={handleBack}>Back</Button>
                </Col>
                <Col col="4" md="4">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>

            <Row mt="4">
              <Button special onClick={handleHome}>
                Go to shopping list
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditItem;
