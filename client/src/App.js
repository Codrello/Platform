import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Registration from "./pages/Registration";
import axios from "axios";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Burger from "./components/Burger/Burger";
import Footer from "./components/Footer";
import "./styles/app.css";

function App() {
  useEffect(() => {
    axios
      .post("https://express-admins.herokuapp.com/Log", {
        Login: "bak1roff",
        Parol: "12345678",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="App" id="outer-container">
      <Router>
        <Burger
          width={280}
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          style={{ backgroundColor: "#111" }}
        />
        <div id="page-wrap">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Registration} />
            <Route path="*" component={NotFound} />
            <Route path="/admin">
              {
                (window.location.href =
                  "https://express-admins.herokuapp.com/admin")
              }
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
