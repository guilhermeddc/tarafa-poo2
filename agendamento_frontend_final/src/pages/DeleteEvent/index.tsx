import React, { useEffect, useState, FormEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import api from "../../services/api";
import "./styles.css";

interface Data {
  id_event: number;
  name: string;
  description: string;
  date_time: Date;
  responsible: string;
}

const DeleteEvent = () => {
  const { id_event } = useParams();

  const classes = useStyles();

  const [data, setData] = useState<Data>(Object);

  const history = useHistory();

  useEffect(() => {
    api.get(`events/${id_event}`).then((response) => {
      if (response.data.length > 0) {
        toast.info("Não existem eventos!");
        history.push("/home");
      } else {
        setData(response.data);
      }
    });
  }, [history, id_event]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await api.delete(`/events/${id_event}`);
    toast.info(response.data);
    history.push("/home");
  }

  return (
    <div id="page-delete-event">
      <div id="listagem">
        <form onSubmit={handleSubmit}>
          <h1>Tem certeza que deseja remover este evento?</h1>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                Nome do Evento
              </Typography>
              <Typography variant="h5" component="h2">
                {data.name}
              </Typography>

              <Typography className={classes.pos} color="textSecondary">
                Descrição do Evento
              </Typography>

              <Typography variant="h5" component="h2">
                {data.description}
              </Typography>

              <Typography className={classes.pos} color="textSecondary">
                Data/Hora do Evento
              </Typography>

              <Typography variant="h5" component="h2">
                {data.date_time}
              </Typography>

              <Typography className={classes.pos} color="textSecondary">
                Organizador do Evento
              </Typography>

              <Typography variant="h5" component="h2">
                {data.responsible}
              </Typography>
            </CardContent>
          </Card>
          <button type="submit">Deletar evento</button>
          <button type="submit" onClick={() => history.push("/home")}>
            Retornar
          </button>
        </form>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#F8F8FF",
    border: "3px inset #4682B4",
    marginBottom: 25,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
    fontWeight: "bold",
  },
});

export default DeleteEvent;
