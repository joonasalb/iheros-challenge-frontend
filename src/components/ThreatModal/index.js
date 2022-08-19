import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { format, parseISO } from "date-fns";
import Button from "react-bootstrap/Button";
import "./styles.scss";

export default function ThreatModal({
  isAlertOpen,
  setIsAlertOpen,
  modalData,
}) {
  const [threat, setThreat] = useState({});
  const [closestHero, setClosestHero] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    const { threat, closestHero } = modalData;
    setThreat(threat);
    let release_date = "";
    if (closestHero) {
      releaseDate = format(
        parseISO(closestHero.release_time),
        "dd/MM/yyyy HH:mm"
      );
      setReleaseDate(release_date);
      setClosestHero(closestHero);
    }
  }, [modalData]);

  function openModal() {
    setIsAlertOpen(true);
  }

  function closeModal() {
    setIsAlertOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={isAlertOpen}
        onRequestClose={closeModal}
        className="modal-body p-2 mt-5"
        contentLabel=""
      >
        {threat && (
          <>
            <h3>AMEAÇA ENCONTRADA, DERROTE-A!</h3>
            {closestHero ? (
              <div>
                Ameaça <span>{threat.monster_name}</span> de nível{" "}
                <span>{threat.danger_level}</span> apareceu mas já foi derrotada
                pelo héroi <span>{closestHero.name}</span> de rank{" "}
                <span>{closestHero.rank}</span> que agora está em recuperação
                até <span>{releaseDate}</span>.
              </div>
            ) : (
              <div className="p-4">
                Nenhum herói encontrado para derrotar a ameaça, eles podem estar em recuperação, é
                necessário ter mais!
              </div>
            )}
          </>
        )}
        <div className="text-center">
          <Button variant="primary" data-test="btn-submit" onClick={closeModal}>
            Fechar
          </Button>
        </div>
    
      </Modal>
    </div>
  );
}
