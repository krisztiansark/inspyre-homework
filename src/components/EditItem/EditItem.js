import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  P,
} from "../../utils/globalStyles";
import Row from "../blocks/Row";
import Col from "../blocks/Col";
import Label from "../blocks/Label";
import { COLORS } from "../../utils/styleConstants";
import Loader from "../Loader/Loader";
import PatchHook from "../../hooks/patchHook";
import GetUsersHook from "../../hooks/getUsersHook";
import Error from "../Error/Error";
function EditItem(props) {
  let history = useHistory();

  const { id } = props.match.params;

  const [users, isUsersLoading, isUsersError] = GetUsersHook(id);

  const [info, setInfo, isPatchLoading, isPatchError, patchHook] = PatchHook(
    id,
    props.location.state
  );

  const { name, description, assignedTo } = info;
  const [startDate, setStartDate] = useState(new Date(info.dueDate));

  function handleChange(e) {
    if (e.target.value.length <= 150)
      setInfo({ ...info, [e.target.name]: e.target.value });
  }
  function handleChangeDate(e) {
    setInfo({ ...info, dueDate: dateFormat(e, "yyyy-mm-dd") });
    setStartDate(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    patchHook(id, info);
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
      <Error open={isUsersError || isPatchError} background={COLORS.danger} />
      <Loader
        color={COLORS.background}
        open={isUsersLoading || isPatchLoading}
      />
      <Container
        data-testid="container"
        open={isUsersLoading || isPatchLoading}
      >
        <Row>
          <Col col="12" md="6">
            <H1 main>Edit Item</H1>

            <Form onSubmit={handleSubmit}>
              <Row w="100" mt="2" mb="3">
                <Col col="12">
                  <Label mt="3" htmlFor="select">
                    Choose the assignee:
                  </Label>
                  <Col mt="1" col="12" md="6">
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
                  <Col mt="2" col="6">
                    <Img
                      sm
                      alt={assignedTo.name}
                      src={assignedTo.profilePictureUrl}
                    />
                  </Col>
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
              <Row mb="3" mt="2">
                <Col col="11" md="10">
                  <Textarea
                    type="text"
                    name="description"
                    // placeholder={description}
                    onChange={handleChange}
                    value={description}
                  />
                </Col>
                <P>Used {description.length} characters out of 150.</P>
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

              <Row
                w="75"
                styled={{
                  borderTop: `3px solid ${COLORS.border}`,
                }}
                mb="2"
                mt="4"
              >
                <Row mt="3" mb="2">
                  <Col col="6" md="4">
                    <Button onClick={handleBack}>Back</Button>
                  </Col>
                  <Col col="6" md="4">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Row>
            </Form>

            <Row mb="3" mt="4">
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
