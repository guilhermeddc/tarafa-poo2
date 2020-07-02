import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import "./styles.css";

const UpdateRoom = () => {
  const { id_room } = useParams();

  const [formData, setFormData] = useState({
    id_room: 0,
    name: "",
    building: "",
  });

  const history = useHistory();

  useEffect(() => {
    api.get(`rooms/${id_room}`).then((response) => {
      if (response.data === "Room not exists!") {
        toast.info("Não existem salas!");
        history.push("/home");
      } else {
        setFormData(response.data);
      }
    });
  }, [history, id_room]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await api.put(`/rooms/${id_room}`, formData);

    if (response.data === "Room already exists!") {
      toast.error(response.data);
    } else {
      toast.success("Sala atualizada com sucesso!");
      history.push("/home");
    }
  }

  return (
    <div id="page-update-room">
      <div id="listagem">
        <form onSubmit={handleSubmit}>
          <h1>Atualizar Sala</h1>
          <br />

          <div className="field">
            <label htmlFor="building">Prédio</label>
            <input
              type="text"
              name="building"
              id="building"
              required
              onChange={handleInputChange}
              value={formData.building}
            />
            <br />
            <label htmlFor="name">Sala</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
          <button type="submit">Atualizar sala</button>
          <button type="submit" onClick={() => history.push("/home")}>
            Retornar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;
