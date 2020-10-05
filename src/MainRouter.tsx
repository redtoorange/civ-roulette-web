import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SpinHome from "./components/Spin/SpinHome";
import ChallengeHome from "./components/Challenge/ChallengeHome";

class MainRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/spins" component={SpinHome}/>
                    <Route path="/challenges" component={ChallengeHome}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default MainRouter;
