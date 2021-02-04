import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import dateFormat from "dateformat";
import {
  Button,
  H1,
  H3,
  Container,
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
import PatchHook from "../../hooks/patchHook";
import GetUsersHook from "../../hooks/getUsersHook";
import Error from "../Error/Error";
import GetItemHook from "../../hooks/getItemHook";
import InputArea from "../InputArea/InputArea";
function EditItem(props) {
  let history = useHistory();

  const { id } = props.match.params;

  const [item, isLoading, isError] = GetItemHook(id);

  const [users, isUsersLoading, isUsersError] = GetUsersHook(id);

  const [isPatchLoading, isPatchError, patchRequest] = PatchHook(id);

  const [info, setInfo] = useState(item);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (item.dueDate !== "") {
      setStartDate(new Date(item.dueDate));
      setInfo(item);
    }
    return () => {};
  }, [item]);

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

    patchRequest(id, info);
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
      <Error
        open={isUsersError || isPatchError || isError}
        background={COLORS.danger}
      />
      <Loader
        color={COLORS.background}
        open={isLoading || isUsersLoading || isPatchLoading}
      />

      <Container
        data-testid="container"
        open={isUsersLoading || isPatchLoading || isLoading}
      >
        <Row>
          <Col col="12" md="6">
            <H1 main>Edit Item</H1>
            <Row mb="5" mt="4">
              <Button special onClick={handleHome}>
                Go to shopping list
              </Button>
            </Row>
            <Form onSubmit={handleSubmit}>
              <Row w="100" mt="2" mb="3">
                <Col col="12">
                  <Label mt="3" htmlFor="select">
                    Choose the assignee:
                  </Label>
                  <Col mt="1" col="12" md="6">
                    <Select
                      name="select"
                      value={info.assignedTo.id}
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
                      alt={info.assignedTo.name}
                      src={info.assignedTo.profilePictureUrl}
                    />
                  </Col>
                </Col>
              </Row>

              <InputArea
                name={info.name}
                onChange={handleChange}
                description={info.description}
                labelName="Edit item name:"
                labelDesc="Edit item description:"
              />
              <Label htmlFor="date">Edit due date:</Label>
              <DatePickerStyled
                name="date"
                selected={startDate}
                onChange={handleChangeDate}
                dateFormat="yyyy-MM-dd"
              />
              <Col mt="4" col="10">
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

EditItem.propTypes = { match: PropTypes.object };

export default EditItem;
