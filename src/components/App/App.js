import React from "react";
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  HashRouter,
} from "react-router-dom";
import Index from "../Index/Index";
import ItemDetails from "../ItemDetails/ItemDetails";
import EditItem from "../EditItem/EditItem";
import NewItem from "../NewItem/NewItem";
import GlobalStyles from "../../utils/globalStyles";
function App() {
  return (
    <HashRouter>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Index} />

        <Route exact path="/item-details/:id" component={ItemDetails} />

        <Route exact path="/new-item" component={NewItem} />

        <Route exact path="/edit-item/:id" component={EditItem} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </HashRouter>
  );
}

export default App;
