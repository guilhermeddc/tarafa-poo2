import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./styles.css";

const CreateRoom = () => {
  const [formData, setFormData] = useState({
    name: "",
    building: "",
  });

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await api.post("/rooms", formData);
    if (response.data === "Room already exists!") {
      toast.error(response.data);
    } else {
      toast.success("Sala criada com sucesso!");
      history.push("/home");
    }
  }

  return (
    <div id="page-create-room">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro da Sala</h1>
        <br />

        <div className="field">
          <label htmlFor="building">Prédio</label>
          <input
            type="text"
            name="building"
            id="building"
            maxLength={50}
            required
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="name">Sala</label>
          <input
            type="text"
            name="name"
            id="name"
            maxLength={50}
            required
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar sala</button>
      </form>
    </div>
  );
};

export default CreateRoom;
