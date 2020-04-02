import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/App.css";
import AppNavBar from "./components/AppNavBar";
import DashboardContent from "./components/DashboardContent";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Board from "./containers/Board";
import BreadCrumbs from "./components/BreadCrumbs";
import ClientList from "./containers/ClientList";
import Dashboard from "./containers/Dashboard";
import SocketConnection from "./components/SocketConnection";

function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
    },
  });

  /**
   * Toggle dark/light Material Theme
   */
  const toggleTheme = () => {
    return setDarkTheme(prevDarkTheme => !prevDarkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Router>
          <AppNavBar
            drawerOpen={drawerOpen}
            onChangeDrawerStatus={status => setDrawerOpen(status)}
            darkTheme={darkTheme}
            onChangeTheme={toggleTheme}
          />
          <DashboardContent drawerOpen={drawerOpen}>
            <BreadCrumbs />
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/clients">
                <ClientList />
              </Route>
              <Route path="/board">
                <Board />
              </Route>
              <Route exact>"404"</Route>
            </Switch>
          </DashboardContent>
        </Router>
      </div>
      <SocketConnection />
    </ThemeProvider>
  );
}

export default App;
