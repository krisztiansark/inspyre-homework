import React, { useEffect, useState } from "react";
import { getItems } from "../../utils/apiUtils";
import Item from "./Item";
import { Link } from "react-router-dom";
import { Button, H1, Container } from "../../utils/globalStyles";
//////

//////
function Index() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let fetch = async () => {
      let result = await getItems();
      console.log(result);
      return setResults(result);
    };

    fetch();

    /// SORRY THE SERVER FAILED TO LOAD SO WE ARE USING DATA FROM YOUR LOCAL MACHINE

    return () => {};
  }, []);

  const items = results.map((item, idx) => {
    return <Item odd={idx} key={item.id} item={item} />;
  });

  return (
    <Container className="">
      <div className="row mx-auto justify-content-center w-100">
        <H1 main className="col-12 mx-auto mb-2 mt-2 text-center">
          Shopping List Flavour
        </H1>
      </div>
      <div className="row mx-auto w-100 justify-content-center">
        <div className="col-12 mx-auto text-center ">
          <Link style={{ textDecoration: "none" }} to={"/new-item"}>
            <Button special>New Item</Button>
          </Link>
        </div>
      </div>

      <Container className="container-fluid mt-5 justify-content-center">
        {items}
      </Container>
    </Container>
  );
}

export default Index;
