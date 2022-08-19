import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { createHero, updateHero } from "../../services/heroServices";
import { HeroContext } from "../../context/HerosContext";
import { verifyIfAllFieldsAreValid } from "./form.validation";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./styles.scss";

export default function HeroModal({ isEditting, hero = {} }) {
  let latitude = "";
  let longitude = "";

  if (hero.longitude) longitude = hero.longitude;
  if (hero.latitude) latitude = hero.latitude;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: hero.name ?? "",
    rank: hero.rank ?? "S",
    latitude: hero.latitude ?? "",
    longitude: hero.longitude ?? "",
  });

  const { filteredHeroList, setFilteredHeroList } = useContext(HeroContext);
  const headerText = isEditting ? "Editar Héroi" : "Novo Héroi";

  function openModal() {
    setIsOpenModal(true);
  }

  function clearFormFields() {
    setFormData({ name: null, rank: "", latitude: "", longitude: "" });
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  const setFieldValue = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    const { allFieldsAreValid, message_error } =
      verifyIfAllFieldsAreValid(formData);
    let newHero = {
      name: formData.name,
      rank: formData.rank,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };
    if (allFieldsAreValid) {
      if (isEditting) {
        updateHero(hero.id, newHero, filteredHeroList, setFilteredHeroList);
        closeModal();
      } else {
        createHero(newHero, filteredHeroList, setFilteredHeroList);
        clearFormFields();
        closeModal();
      }
    } else {
      toast.error(
        `Preencha os campos corretamente! ${message_error}`
      );
    }
  };

  return (
    <div>
      <div className="add-box" onClick={openModal}>
        {isEditting ? (
          <button>
            <AiOutlineEdit size={20} color={"#000"} />
          </button>
        ) : (
          <>
          <span style={{cursor: "pointer", fontSize:"16px"}}>Adicionar Herói</span>
          </>
        )}
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        className="modal-hero"
        contentLabel="Example Modal"
      >
        <div className="modal-hero-header">
          <h4>{headerText}</h4>
        </div>
        <div className="modal-hero-body">
          <form>
            <div className="row col-md-12">
              <div className="form-group col-md-7">
                <FloatingLabel htmlFor="name" label="Nome do Héroi">
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Nome"
                    data-lpignore="true"
                    value={formData.name}
                    data-test="name-input"
                    onChange={(e) => setFieldValue(e, "name")}
                  />
                </FloatingLabel>
              </div>

              <div className="form-group col-md-5">
                <FloatingLabel htmlFor="rank" label="Rank">
                  <Form.Select
                    aria-label="Selelecione um Rank para seu Herói"
                    type="text"
                    id="rank"
                    placeholder="Rank"
                    value={formData.rank}
                    onChange={(e) => setFieldValue(e, "rank")}
                  >
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
            </div>

            <div className="row col-md-12">
              <div className="form-group col-md-6">
                <FloatingLabel htmlFor="lat" label="Latitude">
                  <Form.Control
                    type="number"
                    id="lat"
                    placeholder="Latitude"
                    data-lpignore="true"
                    value={formData.latitude}
                    onChange={(e) => setFieldValue(e, "latitude")}
                  />
                </FloatingLabel>
              </div>

              <div className="form-group col-md-6 px-0">
                <FloatingLabel htmlFor="lon" label="Longitude">
                    <Form.Control
                    type="number"
                    placeholder="Longitude"
                    id="lon"
                    data-lpignore="true"
                    value={formData.longitude}
                    onChange={(e) => setFieldValue(e, "longitude")}
                    />
                </FloatingLabel>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer text-center">
          <Button variant="primary" data-test="btn-submit" onClick={closeModal}>
            Fechar
          </Button>

          <Button
            variant="success"
            type="submit"
            data-test="btn-submit"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
