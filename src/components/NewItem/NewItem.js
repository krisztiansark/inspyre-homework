import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { getUsers, postItem } from "../../utils/apiUtils";
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
  DatePickerDiv,
} from "../../utils/globalStyles";
import {
  ButtonDiv,
  ProfileCard,
  ProfileDiv,
  ButtonRow,
  Spacer,
} from "./NewItemStyle";
import Col from "../blocks/Col";
import Row from "../blocks/Row";
import Label from "../blocks/Label";
import { COLORS } from "../../utils/styleConstants";
import Loader from "../Loader/Loader";
////

/////

function NewItem() {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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

  useEffect(() => {
    let fetch = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        let result = await getUsers();
        setUsers(result);
      } catch (err) {
        setIsError(true);
      }
      // console.log(result);
      setIsLoading(false);
    };
    fetch();

    return () => {};
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  function handleChangeDate(e) {
    setInfo({ ...info, dueDate: dateFormat(e, "yyyy-mm-dd") });
    setStartDate(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let post = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        let response = await postItem(info);
        // console.log(response);
      } catch (err) {
        setIsError(true);
      }

      setIsLoading(false);
      history.push(`/`);
    };
    post();
  }

  function handlePerson(e) {
    e.preventDefault();
    // let selectedUser = users.find((user) => user.id === e.target.id);
    // setInfo({ ...info, assignedTo: { ...selectedUser } });

    let selectedUsers = [...selected];
    users.forEach((user, idx) => {
      if (user.id === e.target.id) {
        setInfo({ ...info, assignedTo: { ...user } });
        selectedUsers[idx] = true;
        setSelected(selectedUsers);
        // console.log(selected);
      } else {
        selectedUsers[idx] = false;
        setSelected(selectedUsers);
      }
    });

    // console.log(info.assignedTo);
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

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <Row mt="5">
              <Label htmlFor="name">Name of the new product:</Label>
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
            </Row>
          </>
        );
      case 1:
        return (
          <DatePickerDiv className="row mx-auto justify-content-center w-100">
            <Label htmlFor="date">Due date of the product:</Label>
            <DatePickerStyled
              name="date"
              selected={startDate}
              onChange={handleChangeDate}
            />
          </DatePickerDiv>
        );
      case 2:
        return (
          <ProfileDiv className="row  mx-auto justify-content-center w-100">
            <H2>Choose Assignee:</H2>

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
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [alert, setAlert] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    const isInvalid = [
      name === "" && description === "",
      dueDate === "",
      assignedTo.id === "",
    ];

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
      {" "}
      <Loader color={COLORS.background} open={isLoading} />
      <Container open={isLoading} className="justify-content-center">
        <Row>
          <H1 main>New Item</H1>
        </Row>
        <Row>
          <Form className="col-11 col-md-6 mx-auto" onSubmit={handleSubmit}>
            <>
              {alert ? <h1>Please fill the empty fields</h1> : null}
              <Col mt="3">
                <H3 className="text-center mt-3">
                  {`You are at step ${activeStep + 1} out of ${steps.length}`}
                </H3>
              </Col>
              <>
                {getStepContent(activeStep)}
                <Spacer />
                <ButtonRow className="row mx-auto w-100 justify-content-center">
                  <ButtonDiv className="col-3 mx-auto text-center">
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                  </ButtonDiv>
                  {activeStep === steps.length - 1 ? (
                    <>
                      <ButtonDiv className="col-3 text-center mx-auto">
                        <Button
                          danger
                          className="mx-3 text-center"
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </ButtonDiv>{" "}
                      <ButtonDiv className="col-3 text-center mx-auto">
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
                    <ButtonDiv className="col-3 mx-auto text-center">
                      <Button onClick={handleNext}>Next</Button>
                    </ButtonDiv>
                  )}
                </ButtonRow>
              </>
              {/* )} */}
            </>
          </Form>
        </Row>
        <Row mt="4">
          <Button special onClick={handleClick}>
            Go to shopping list
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default NewItem;
