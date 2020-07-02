import React, { useEffect, useState, ChangeEvent } from "react";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DomainIcon from "@material-ui/icons/Domain";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DescriptionIcon from "@material-ui/icons/Description";
import { toast } from "react-toastify";
import Pagination from "@material-ui/lab/Pagination";

import api from "../../services/api";
import "./styles.css";

interface Data {
  id_event: number;
  name_event: string;
  location: {
    building: string;
    room: string;
  }[];
  description: string;
  date_time: Date;
  responsible: string;
}

interface IPagination {
  total: number;
  lastPage: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

const Home = () => {
  const [data, setData] = useState<Data[]>([]);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const [page, setPage] = useState<number>(1);
  const [day, setDay] = useState(moment(new Date().toUTCString()).format());

  useEffect(() => {
    api.get(`events_day/?day=${day}&page=${page}`).then((response) => {
      if (response.data.data.length === 0) {
        toast.info("Não existem eventos neste dia!");
      } else {
        setData(response.data.data);
        setPagination(response.data.pagination);
      }
    });
  }, [day, page]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const dayPicked = event.target.value;

    setDay(dayPicked);
  }

  function handleChange(event, value) {
    setPage(value);
  }

  return (
    <div id="page-list-events-day">
      <div id="listagem">
        <h1>Listagem dos eventos por dia</h1>
        <br />
        <label htmlFor="dayPicked">Pesquise eventos pelo dia</label>
        <input
          type="date"
          name="dayPicked"
          id="dayPicked"
          defaultValue={day}
          onChange={handleInputChange}
        />
        <fieldset>
          {data.map((item) => (
            <div id="data">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name_event} />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.date_time} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SupervisedUserCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.responsible} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.description} />
                </ListItem>
              </List>
              <Divider />
              <span id="localizacao">Localização</span>
              {item.location.map((loc) => (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <DomainIcon />
                    </ListItemIcon>
                    <ListItemText primary={loc.building} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary={loc.room} />
                  </ListItem>
                </>
              ))}
            </div>
          ))}
        </fieldset>
        <Pagination
          count={pagination.lastPage}
          color="primary"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Home;
