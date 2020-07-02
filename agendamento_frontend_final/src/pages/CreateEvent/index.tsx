import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import DomainIcon from "@material-ui/icons/Domain";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { toast } from "react-toastify";

import api from "../../services/api";
import "./styles.css";

interface Rooms {
  id_room: number;
  name: string;
  building: string;
}

const CreateEvent = () => {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [selectedItens, setSelectedItens] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date_time: "",
    responsible: "",
    rooms: [0],
  });

  const history = useHistory();

  useEffect(() => {
    api.get("rooms").then((response) => {
      setRooms(response.data.data);
    });
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectedRooms(id_room: number) {
    const alreadySelected = selectedItens.findIndex((item) => item === id_room);

    if (alreadySelected >= 0) {
      const filteredItens = selectedItens.filter((item) => item !== id_room);

      setSelectedItens(filteredItens);
    } else {
      setSelectedItens([...selectedItens, id_room]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (selectedItens.length > 0) {
      formData.rooms = selectedItens;
      const response = await api.post("/events", formData);
      if (response.data === "Event inserted with success!") {
        toast.success("Evento criado com sucesso!");
        history.push("/home");
      } else {
        toast.error(response.data);
      }
    } else {
      toast.info("Você deve selecionar pelo menos uma aula");
    }
  }

  return (
    <div id="page-create-event">
      <div id="listagem">
        <form onSubmit={handleSubmit}>
          <h1>Cadastro do Evento</h1>
          <br />

          <div className="field">
            <label htmlFor="name">Nome do Evento</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength={50}
              required
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="description">Descrição do Evento</label>
            <input
              type="text"
              name="description"
              id="description"
              required
              maxLength={200}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="date_time">Data/Hora do Evento</label>
            <TextField
              id="date_time"
              name="date_time"
              required
              onChange={handleInputChange}
              type="datetime-local"
              defaultValue={Date.now().toLocaleString()}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <label htmlFor="responsible">Organizador</label>
            <input
              type="text"
              name="responsible"
              id="responsible"
              maxLength={50}
              required
              onChange={handleInputChange}
            />
            <br />

            <fieldset>
              <legend>
                <h2>Salas</h2>
                <span>Selecione uma ou mais salas abaixo</span>
              </legend>

              <ul className="items-grid">
                {rooms.map((room) => (
                  <li
                    key={room.id_room}
                    onClick={() => handleSelectedRooms(room.id_room)}
                    className={
                      selectedItens.includes(room.id_room) ? "selected" : ""
                    }
                  >
                    <DomainIcon />
                    <span>{room.building}</span>
                    <MeetingRoomIcon />
                    <span>{room.name}</span>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
          <button type="submit">Cadastrar evento</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
