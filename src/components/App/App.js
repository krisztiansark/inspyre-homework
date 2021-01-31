import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "../Index/Index";
import ItemDetails from "../ItemDetails/ItemDetails";
import EditItem from "../EditItem/EditItem";
import NewItem from "../NewItem/NewItem";
import GlobalStyles from "../../utils/globalStyles";
function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Index} />

        <Route path="/item-details/:id" component={ItemDetails} />

        <Route path="/new-item" component={NewItem} />

        <Route path="/edit-item/:id" component={EditItem} />
      </Switch>
    </Router>
  );
}

export default App;
