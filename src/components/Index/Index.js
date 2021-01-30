import React, { useEffect, useState } from "react";
// import Item from "./Item";
import { getItems } from "../../utils/apiUtils";
import Item from "./Item";
import { Link } from "react-router-dom";

function Index() {
  const [results, setResults] = useState([]);

  // LIST EACH SHOPPING ITEM - OK

  // NEW ITEM BUTTON - ROUTE NEW SHIT

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
    return (
      //   <Link key={item.id} to={`/item-details/${item.id}`}>

      <Item key={item.id} item={item} />
      //   </Link>
    );
  });

  return (
    <div>
      <h1>Shopping List Flavour</h1>
      <Link to={"/new-item"}>
        <button>New Item</button>
      </Link>

      {items}
    </div>
  );
}

export default Index;
