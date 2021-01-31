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
  Label,
} from "../../utils/globalStyles";
import { ButtonDiv, ProfileCard, ProfileDiv } from "./NewItemStyle";
////

/////

function NewItem() {
  let history = useHistory();
  const [users, setUsers] = useState([]);

  const [info, setInfo] = useState({
    // name: "Name of your item",
    name: "",
    // description: "Add some details to your item",
    description: "",
    assignedTo: { id: "", name: "" },
    dueDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  const [startDate, setStartDate] = useState(new Date());

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
      let response = await postItem(info);

      console.log(response);
      history.push(`/`);
      // return setUsers(result);
    };
    post();
  }

  function handlePerson(e) {
    e.preventDefault();
    console.log(e.target);
    let selectedUser = users.find((user) => user.id === e.target.id);
    setInfo({ ...info, assignedTo: { ...selectedUser } });
    console.log(selectedUser.id);
  }

  function handleClick(e) {
    e.preventDefault();
    history.push(`/`);
  }

  ///////

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
            <Label
              htmlFor="name"
              className="row mx-auto justify-content-center w-100"
            >
              Name of the new product:
            </Label>
            <div className="row mx-auto justify-content-center w-100">
              <Input
                type="text"
                name="name"
                aria-label={name}
                aria-required="true"
                required
                // placeholder={name}
                onChange={handleChange}
                value={name}
              />
            </div>
            <Label
              htmlFor="description"
              className="row mx-auto justify-content-center w-100"
            >
              Details about the item:
            </Label>
            <div className="row mx-auto justify-content-center w-100">
              <Textarea
                required
                type="text"
                name="description"
                aria-label={description}
                aria-required="true"
                // placeholder={description}
                onChange={handleChange}
                value={description}
              />
            </div>
          </>
        );
      case 1:
        return (
          <div className="row mx-auto justify-content-center w-100">
            <DatePickerStyled
              selected={startDate}
              onChange={handleChangeDate}
            />
          </div>
        );
      case 2:
        return (
          <ProfileDiv className="row mx-auto justify-content-center w-100">
            <H1>Assign to someone the item:</H1>

            {users.map((user, i) => (
              <ProfileCard
                className="row mx-auto justify-content-center w-100"
                key={user.id}
                id={user.id}
                onClick={handlePerson}
              >
                <H2 className="col-6 my-auto mx-auto" id={user.id}>
                  {user.name}
                </H2>
                <Img
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
  // const [alert, setAlert] = useState(false);
  const handleNext = (e) => {
    e.preventDefault();
    // const isInvalid = [
    //   name === "" && description === "",
    //   dueDate === "",
    //   assignedTo.id === "",
    // ];

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setActiveStep(0);
  };
  //////

  return (
    <Container className="">
      <div className="row mx-auto justify-content-center w-100">
        <H1 main>New Item</H1>
      </div>
      <div className="row mx-auto w-100 justify-content-center">
        <Form className="col-8 col-md-6  mx-auto" onSubmit={handleSubmit}>
          <>
            {/* {alert ? <h1>NOOOO</h1> : null} */}
            {activeStep === steps.length ? (
              <div>
                <H3>All steps completed</H3>
              </div>
            ) : (
              <div className="col-12">
                {getStepContent(activeStep)}

                <div className="row mx-auto w-100 justify-content-center">
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
                          Submit Item
                        </Button>
                      </ButtonDiv>
                    </>
                  ) : (
                    <ButtonDiv className="col-3 mx-auto text-center">
                      <Button onClick={handleNext}>Next</Button>
                    </ButtonDiv>
                  )}
                </div>
              </div>
            )}
          </>
        </Form>
      </div>
      <div className="row mx-auto w-100 justify-content-center">
        <Button special onClick={handleClick}>
          Go to shopping list
        </Button>
      </div>
    </Container>
  );
}

export default NewItem;
