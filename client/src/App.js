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
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Burger from "./components/Burger/Burger";
import Footer from "./components/Footer";
import "./styles/app.css";
import RedirectRoute from "./components/Redirect";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Admin from "./pages/Admin";
import avatar from "./pages/images/avatar.jpg";

function App() {
  useEffect(() => {
    axios
      .post("https://express-admins.herokuapp.com/Reg", {
        name: "name",
        Surname: "surname",
        Fathname: "secondname",
        dateBirth: "1.02.2001",
        Login: "value",
        Parol: "password",
        jshshir: 12345678,
        Hudud: "organizationLocation",
        Tuman: "organizationLocationCity",
        Sex: "gender",
        email: "email",
        wkphone: "value",
        mlphone: "mobilephone",
        Muassasa: "hokimyat",
        Muassasa2: "hokimyat",
        Bol: "bolinma",
        Lavoz: "position",
        // file: avatar,
        Course: "value.courses",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/admin" component={Admin} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
