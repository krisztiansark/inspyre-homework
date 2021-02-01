import React, { useEffect, useState } from "react";
import { getItems } from "../../utils/apiUtils";
import Item from "./Item";
import { Link } from "react-router-dom";
import { Button, H1, H2, Container } from "../../utils/globalStyles";
import Row from "../blocks/Row";
import Col from "../blocks/Col";
import Loader from "../Loader/Loader";
import { COLORS } from "../../utils/styleConstants";
//////

//////
function Index() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    let fetch = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        let result = await getItems();

        console.log(result);
        setResults(result);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetch();

    /// SORRY THE SERVER FAILED TO LOAD SO WE ARE USING DATA FROM YOUR LOCAL MACHINE
    return () => {};
  }, []);

  const items = results.map((item, idx) => {
    return <Item odd={idx} key={item.id} item={item} />;
  });

  return (
    // <Loader open={isLoading} />
    <>
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
        {/* {isLoading ? (
        <Loader color={COLORS.background} open={isLoading} />
      ) : (
        <> */}
        <Row>
          <Col col="12">
            <Link style={{ textDecoration: "none" }} to={"/new-item"}>
              <Button special>New Item</Button>
            </Link>
          </Col>
        </Row>
        <Container className="container-fluid mt-4 justify-content-center">
          {items}
        </Container>
        {/* </> */}
        {/* )} */}
      </Container>
    </>
  );
}

export default Index;
