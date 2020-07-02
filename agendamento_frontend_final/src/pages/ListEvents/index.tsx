import React, { useEffect, useState } from "react";
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

const ListEvents = () => {
  const [data, setData] = useState<Data[]>([]);

  function handleGetEvents() {
    api.get("events").then((response) => {
      if (response.data.length === 0) {
        toast.error("Não existem eventos!");
      } else {
        setData(response.data);
      }
    });
  }

  function handleDeleteEvent(id: number) {
    api
      .delete(`events/${id}`)
      .then(() => {
        toast.success("Evento deletado");
        handleGetEvents();
      })
      .catch((err) => {
        toast.error(err);
      });
  }
  useEffect(() => {
    handleGetEvents();
  }, []);

  return (
    <div id="page-list-events">
      <div id="listagem">
        <h1>Listagem dos eventos</h1>

        <br />

        <fieldset>
          {data.map((item) => (
            <div id="data">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name_event} />
                  {/* Botao de deletar */}
                  <button
                    className="btn"
                    onClick={() => handleDeleteEvent(item.id_event)}
                  >
                    Deletar
                  </button>
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
      </div>
    </div>
  );
};

export default ListEvents;
