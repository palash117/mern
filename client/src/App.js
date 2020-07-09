import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

// redux
import { Provider } from "react-redux";
import store from "./Store";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/route/PrivateRoute";

function App() {
	store.dispatch(loadUser());
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route path="/" component={Landing} exact />
					{/* <Landing /> */}
					<section className="container">
						<Alert />
						<Switch>
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/login" component={Login} />
							<PrivateRoute
								exact
								path="/dashboard"
								component={Dashboard}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
