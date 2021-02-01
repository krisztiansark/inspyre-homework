import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

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
  H2,
  P,
  DatePickerDiv,
} from "../../utils/globalStyles";
import { ButtonDiv, ProfileCard, ProfileDiv, ButtonRow } from "./NewItemStyle";
import Col from "../blocks/Col";
import Row from "../blocks/Row";
import Label from "../blocks/Label";
import { COLORS } from "../../utils/styleConstants";
import Loader from "../Loader/Loader";
import GetUsersHook from "../../hooks/getUsersHook";
import PostHook from "../../hooks/postHook";
import Error from "../Error/Error";
////

/////

function NewItem() {
  let history = useHistory();
  const [users, isUsersLoading, isUsersError] = GetUsersHook();
  const [response, isPostLoading, isPostError, postRequest] = PostHook();
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
    name.length <= 0 && description.length <= 0,
    dueDate === "",
    assignedTo.id === "",
  ];

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

  function getSteps() {
    return [
      "name and description of the item",
      "due date of the item",
      "Select user",
    ];
  }
  const steps = getSteps();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <H2>Basic details:</H2>
            <Row mt="4">
              <Label htmlFor="name">Name of item:</Label>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="name"
                    aria-label={name}
                    aria-required="true"
                    required
                    placeholder="..."
                    onChange={handleChange}
                    value={name}
                  />
                </Col>
              </Row>
            </Row>
            <Row mt="4">
              <Label htmlFor="description">Details about the item:</Label>
              <Row>
                <Col col="12" md="8">
                  <Textarea
                    required
                    type="text"
                    name="description"
                    aria-label={description}
                    aria-required="true"
                    placeholder="..."
                    onChange={handleChange}
                    value={description}
                  />
                </Col>
              </Row>
              <P>Used {description.length} characters out of 150.</P>
            </Row>
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
            <ProfileDiv className="row  mx-auto justify-content-center w-100">
              {users.map((user, i) => (
                <ProfileCard
                  className="row mx-auto justify-content-center w-75"
                  key={user.id}
                  id={user.id}
                  onClick={handlePerson}
                  selected={selected[i]}
                >
                  <H3 className="col-6 my-auto mx-auto" id={user.id}>
                    {user.name}
                  </H3>
                  <Img
                    selected={selected[i]}
                    className="my-auto mx-auto image"
                    id={user.id}
                    alt={user.name}
                    src={user.profilePictureUrl}
                  />
                </ProfileCard>
              ))}
            </ProfileDiv>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  // const [alert, setAlert] = useState(false);

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
  };
  //////

  return (
    <>
      <Error open={isUsersError || isPostError} background={COLORS.danger} />
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
        <Row>
          <Form
            change={activeStep}
            className="col-11 col-md-6 mx-auto"
            onSubmit={handleSubmit}
          >
            <>
              {alert ? <h1>Please fill the empty fields</h1> : null}
              <Col mt="3">
                <H3
                  style={{ borderBottom: `3px solid ${COLORS.border}` }}
                  className="text-center mt-3"
                >
                  {`You are at step ${activeStep + 1} out of ${steps.length}`}
                </H3>
              </Col>
              <>
                {getStepContent(activeStep)}

                <Row
                  mt="5"
                  mb="1"
                  styled={{
                    borderTop: `3px solid ${COLORS.border}`,
                  }}
                >
                  <ButtonRow className="row mx-auto w-100 ">
                    {activeStep === steps.length - 1 ? (
                      <>
                        <ButtonDiv className="col-6 col-md-3 mx-auto text-center">
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        </ButtonDiv>
                        <ButtonDiv className="col-6 col-md-3 text-center mx-auto">
                          <Button
                            danger
                            className="mx-3 text-center"
                            onClick={handleReset}
                          >
                            Reset
                          </Button>
                        </ButtonDiv>{" "}
                        <ButtonDiv className="col-6 col-md-3 text-center mx-auto">
                          <Button
                            type="submit"
                            className="mx-3 "
                            disabled={isInvalid}
                          >
                            Submit
                          </Button>
                        </ButtonDiv>
                      </>
                    ) : (
                      <>
                        <ButtonDiv className="col-6 col-md-3 mx-auto text-center">
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        </ButtonDiv>
                        <ButtonDiv className="col-6 col-md-3 mx-auto text-center">
                          <Button
                            disabled={isInvalidEach[activeStep]}
                            onClick={handleNext}
                          >
                            Next
                          </Button>
                        </ButtonDiv>
                      </>
                    )}
                  </ButtonRow>
                </Row>
              </>
            </>
          </Form>
        </Row>
        <Row mt="4" mb="3">
          <Button special onClick={handleClick}>
            Go to shopping list
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default NewItem;
