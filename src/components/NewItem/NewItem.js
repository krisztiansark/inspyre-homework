import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import dateFormat from "dateformat";
import {
  Button,
  H1,
  H3,
  Container,
  Form,
  DatePickerStyled,
  H2,
  DatePickerDiv,
} from "../../utils/globalStyles";
import Col from "../blocks/Col";
import Row from "../blocks/Row";
import Label from "../blocks/Label";
import { COLORS } from "../../utils/styleConstants";
import Loader from "../Loader/Loader";
import GetUsersHook from "../../hooks/getUsersHook";
import PostHook from "../../hooks/postHook";
import Error from "../Error/Error";
import InputArea from "../InputArea/InputArea";
import UserProfile from "./UserProfile";
import Buttons from "./Buttons";

function NewItem() {
  let history = useHistory();
  const [users, isUsersLoading, isUsersError] = GetUsersHook();
  const [isPostLoading, isPostError, postRequest] = PostHook();
  const [activeStep, setActiveStep] = useState(0);
  const [info, setInfo] = useState({
    name: "",
    description: "",
    assignedTo: { id: "", name: "" },
    dueDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  const [startDate, setStartDate] = useState(new Date());
  const [selected, setSelected] = useState([]);
  const { name, description, assignedTo, dueDate } = info;

  const isInvalid =
    name === "" || description === "" || assignedTo.id === "" || dueDate === "";

  const isInvalidEach = [
    name === "" || description === "",
    dueDate === "",
    assignedTo.id === "",
  ];
  const steps = 3;

  function handleChange(e) {
    e.preventDefault();

    if (e.target.value.length <= 150)
      setInfo({ ...info, [e.target.name]: e.target.value });
  }

  function handleChangeDate(e) {
    setInfo({ ...info, dueDate: dateFormat(e, "yyyy-mm-dd") });
    setStartDate(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    postRequest(info);
  }

  function handlePerson(e) {
    e.preventDefault();

    let selectedUsers = [...selected];
    users.forEach((user, idx) => {
      if (user.id === e.target.id) {
        setInfo({ ...info, assignedTo: { ...user } });
        selectedUsers[idx] = true;
        setSelected(selectedUsers);
      } else {
        selectedUsers[idx] = false;
        setSelected(selectedUsers);
      }
    });
  }

  function handleClick(e) {
    e.preventDefault();
    history.push(`/`);
  }

  const handleNext = (e) => {
    e.preventDefault();

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setActiveStep(0);
    setSelected([]);
    setInfo({
      name: "",
      description: "",
      assignedTo: { id: "", name: "" },
      dueDate: dateFormat(new Date(), "yyyy-mm-dd"),
    });
    setStartDate(new Date(), "yyyy-mm-dd");
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <H2>Basic details:</H2>
            <InputArea
              name={name}
              description={description}
              onChange={handleChange}
              placeholderName="..."
              placeholderDesc="..."
              labelName="Name of item:"
              labelDesc="Details about the item:"
              mt="4"
            />
          </>
        );
      case 1:
        return (
          <>
            <H2>Pick a date:</H2>
            <DatePickerDiv className="row mx-auto justify-content-center w-100">
              <Label htmlFor="date">Due date of the product:</Label>
              <DatePickerStyled
                name="date"
                data-testid="date-input"
                selected={startDate}
                onChange={handleChangeDate}
              />
            </DatePickerDiv>
          </>
        );
      case 2:
        return (
          <>
            <H2>Choose Assignee:</H2>
            <UserProfile
              users={users}
              selected={selected}
              handlePerson={handlePerson}
            />
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <>
      <Error
        data-testid="error"
        open={isUsersError || isPostError}
        background={COLORS.danger}
      />
      <Loader
        color={COLORS.background}
        open={isUsersLoading || isPostLoading}
      />
      <Container
        open={isUsersLoading || isPostLoading}
        className="justify-content-center"
      >
        <Row>
          <H1 main>New Item</H1>
        </Row>
        <Row mt="4" mb="3">
          <Button special data-testid="shopping-button" onClick={handleClick}>
            Go to shopping list
          </Button>
        </Row>
        <Row>
          <Form
            change={activeStep}
            className="col-11 col-md-6 mx-auto"
            onSubmit={handleSubmit}
          >
            <>
              <Col mt="3">
                <H3
                  style={{ borderBottom: `3px solid ${COLORS.border}` }}
                  className="text-center mt-3"
                >
                  {`You are at step ${activeStep + 1} out of ${steps}`}
                </H3>
              </Col>
              <>
                {getStepContent(activeStep)}

                <Buttons
                  activeStep={activeStep}
                  handleBack={handleBack}
                  handleReset={handleReset}
                  isInvalid={isInvalid}
                  isInvalidEach={isInvalidEach}
                  handleNext={handleNext}
                  steps={steps}
                />
              </>
            </>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default NewItem;
