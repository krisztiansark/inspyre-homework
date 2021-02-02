import React from "react";
import Item from "./Item";
import { Link } from "react-router-dom";
import { Button, H1, H2, Container } from "../../utils/globalStyles";
import Row from "../blocks/Row";
import Col from "../blocks/Col";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { COLORS } from "../../utils/styleConstants";
import GetHook from "../../hooks/getHook";
//////

//////
function Index() {
  const [results, isLoading, isError] = GetHook();

  function fetchedResults() {
    return results.length > 0 ? (
      results.map((item, idx) => {
        return <Item odd={idx} key={item.id} item={item} />;
      })
    ) : (
      <>
        <Row>
          <H1> No items. Please add one to the list!</H1>
        </Row>
        <Row>
          <H1>🍇🍈🍉🛒</H1>
        </Row>
      </>
    );
  }

  return (
    <>
      <Error open={isError} background={COLORS.danger} />
      <Loader color={COLORS.background} open={isLoading} />
      <Container open={isLoading} className="">
        <Row>
          <Col mt="2" mb="2">
            <H1 main>Shopping List Flavour</H1>
          </Col>
        </Row>
        <Row>
          <Col mt="2" mb="2">
            <H2>Today's date is {new Date().toDateString()}</H2>
          </Col>
        </Row>

        <Row>
          <Col col="12">
            <Link style={{ textDecoration: "none" }} to={"/new-item"}>
              <Button special>Add New Item</Button>
            </Link>
          </Col>
        </Row>
        <Container className="row mt-5 justify-content-center">
          {fetchedResults()}
        </Container>
      </Container>
    </>
  );
}

export default Index;
