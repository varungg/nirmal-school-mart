import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainComponent from "./components/MainComponent";
import { PrivateRoute } from "./utils/PrivateRoute";
import HomeComponent from "./pages/HomeComponent";
import SchoolComponent from "./pages/SchoolComponent";
import LogoutComponent from "./pages/LogoutComponent";
import { PrivateRouteNew } from "./utils/PrivateRouteNew";
import Config from "./utils/Config";
import SchoolDetailsComponent from "./pages/SchoolDetailsComponent";
import ProductAddComponent from "./pages/ProductAddComponent";
import ProductManageComponent from "./pages/ProductManageComponent";
import StaffComponent from "./pages/StaffComponent";
import StaffDetailsComponent from "./pages/StaffDetailsComponent";
import BillGenerateComponent from "./pages/BillGenerateComponent";
import CustomerRequestComponent from "./pages/CustomerRequestComponent";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route
                exact
                path={Config.logoutPageUrl}
                component={LogoutComponent}
            ></Route>
            <PrivateRouteNew
                exact
                path="/home"
                activepage="0"
                page={HomeComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/school"
                activepage="1"
                page={SchoolComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/schooldetails/:id"
                activepage="1"
                page={SchoolDetailsComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/addProduct"
                activepage="2"
                page={ProductAddComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/manageProduct"
                activepage="3"
                page={ProductManageComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/staffManage"
                activepage="4"
                page={StaffComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/staffdetails/:id"
                activepage="4"
                page={StaffDetailsComponent}
            ></PrivateRouteNew>
            <PrivateRouteNew
                exact
                path="/generateBill"
                activepage="5"
                page={BillGenerateComponent}
            ></PrivateRouteNew>
            {/* <PrivateRouteNew
                exact
                path="/customerRequest"
                activepage="7"
                page={CustomerRequestComponent}
            ></PrivateRouteNew> */}
        </Switch>
    </Router>,
    document.getElementById("root")
);
