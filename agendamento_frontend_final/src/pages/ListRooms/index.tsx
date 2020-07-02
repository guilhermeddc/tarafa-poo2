import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DomainIcon from "@material-ui/icons/Domain";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "@material-ui/lab/Pagination";

import api from "../../services/api";
import "./styles.css";

interface Data {
  id_room: number;
  name: string;
  building: string;
}

interface IPagination {
  total: number;
  lastPage: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

const ListRooms = () => {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);

  const history = useHistory();

  useEffect(() => {
    api.get(`rooms?page=${page}`).then((response) => {
      if (response.data.data.length === 0) {
        toast.info("Não existem salas!");
      } else {
        setData(response.data.data);
        setPagination(response.data.pagination);
      }
    });
  }, [page]);

  function handleToUpdateRoom(id: number) {
    history.push(`UpdateRoom/${id}`, { id_room: id });
  }

  function handleChange(event, value) {
    setPage(value);
  }

  return (
    <div id="page-list-rooms">
      <div id="listagem">
        <h1>Listagem das salas</h1>

        <fieldset>
          {data.map((item) => (
            <div id="data">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <DomainIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.building} />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <MeetingRoomIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <button
                    className="btn"
                    onClick={() => handleToUpdateRoom(item.id_room)}
                  >
                    Atualizar
                  </button>
                </ListItem>
              </List>
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

export default ListRooms;
