import React from "react";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";

import Initial from "./pages/Initial";
import Home from "./pages/Home";
import ListEvents from "./pages/ListEvents";
import ListRooms from "./pages/ListRooms";
import CreateRoom from "./pages/CreateRoom";
import CreateEvent from "./pages/CreateEvent";
import UpdateRoom from "./pages/UpdateRoom";
import DeleteEvent from "./pages/DeleteEvent";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F0F0F5",
  },
}));

const Routes = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Switch>
          <Route component={Initial} exact path="/" />
          <Route component={Home} path="/home" />
          <Route component={ListEvents} path="/listEvents" />
          <Route component={ListRooms} path="/listRooms" />
          <Route component={CreateRoom} path="/createRoom" />
          <Route component={CreateEvent} path="/createEvent" />
          <Route component={UpdateRoom} path="/updateRoom/:id_room" />
          <Route component={DeleteEvent} path="/deleteEvent/:id_event" />
        </Switch>
      </div>
      <AppBar position="fixed" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Início" component={Link} to="/" />
          <Tab label="Home" component={Link} to="/home" />
          <Tab label="Criar Sala" component={Link} to="/createRoom" />
          <Tab label="Criar Evento" component={Link} to="/createEvent" />
          <Tab label="Listar Sala" component={Link} to="/listRooms" />
          <Tab label="Listar Evento" component={Link} to="/listEvents" />
        </Tabs>
      </AppBar>
    </BrowserRouter>
  );
};

export default Routes;
