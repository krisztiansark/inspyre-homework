import React from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  H1,
  H3,
  Container,
  Img,
  H5,
  P,
  H4,
} from "../../utils/globalStyles";
import { COLORS } from "../../utils/styleConstants";
import { ContainerItem, Description, ColFancy } from "./ItemDetailsStyle";
import Row from "../blocks/Row";
import dateFormat from "dateformat";
import Col from "../blocks/Col";
import Loader from "../Loader/Loader";
import GetItemHook from "../../hooks/getItemHook";
import Error from "../Error/Error";
function ItemDetails(props) {
  let history = useHistory();
  const { id } = props.match.params;
  const [item, isLoading, isError] = GetItemHook(id);

  const { name, dueDate, description, assignedTo, createdAt, updatedAt } = item;
  function handleClick() {
    history.push("/");
  }

  return (
    <>
      <Error open={isError} background={COLORS.danger} />
      <Loader color={COLORS.background} open={isLoading} />
      <Container open={isLoading} className="container-fuild">
        <Row>
          <H1 main>Item Details</H1>
        </Row>

        <Row>
          <ContainerItem className="col-11 col-md-6 mx-auto">
            <Row
              styled={{
                borderBottom: `3px solid ${COLORS.border}`,
              }}
              mb={3}
              justify="around"
            >
              <Col text="left" col="12" md="6" mb="2">
                <H1>{name}</H1>
              </Col>
              <Col text="right" col="8" md="6" mb="2">
                <H4>Due: {dueDate}</H4>
              </Col>
            </Row>
            <Row justify="between">
              <Col mxOff col="6" md="4" text="left">
                <H5>Created at:</H5>
              </Col>

              <Col mxOff col="6" md="4" text="right">
                <H5>Updated at:</H5>
              </Col>
            </Row>
            <Row justify="between">
              <Col mxOff col="6" md="4" mb="2" text="left">
                <H5>{dateFormat(createdAt, "yyyy-mm-dd")}</H5>
              </Col>

              <Col mxOff col="6" md="4" mb="2" text="right">
                <h5>{dateFormat(updatedAt, "yyyy-mm-dd")}</h5>
              </Col>
            </Row>
            <Row>
              <ColFancy top className="col-6 col-md-4 text-center my-auto">
                <H4>Assignee:</H4>
              </ColFancy>
            </Row>
            <Row justify="center">
              <ColFancy bottom className="col-8 col-md-5 my-auto">
                <Row mb={2}>
                  <H3>{assignedTo.name}</H3>
                  <Img
                    sm
                    alt={assignedTo.name}
                    src={assignedTo.profilePictureUrl}
                  />
                </Row>
              </ColFancy>
            </Row>

            <Row
              mb={3}
              styled={{
                borderBottom: `3px solid ${COLORS.border}`,
              }}
            >
              <Description className="col-11 col-md-10">
                <P>{description}</P>
              </Description>
            </Row>

            <Row mb={2} mt={2}>
              <div className="col-4">
                <Button onClick={handleClick}>Back</Button>
              </div>

              <Col col="4" mxOff>
                <Link
                  to={{
                    pathname: `/edit-item/${id}`,
                    state: {
                      ...item,
                    },
                  }}
                >
                  <Button>Edit</Button>
                </Link>
              </Col>
            </Row>
          </ContainerItem>
        </Row>
      </Container>
    </>
  );
}

export default ItemDetails;
