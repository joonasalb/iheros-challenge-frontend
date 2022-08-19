import React from "react";
import {
  GiHandOfGod,
  GiTigerHead,
  GiSpikedDragonHead,
  GiWolfHead,
} from "react-icons/gi";
import { format, parseISO } from "date-fns";
import "./styles.scss";

const iconsRanking = {
  God: <GiHandOfGod size={40} color={"white"} />,
  Dragon: <GiSpikedDragonHead size={40} color={"white"} />,
  Tiger: <GiTigerHead size={40} color={"white"} />,
  Wolf: <GiWolfHead size={40} color={"white"} />,
};

export default function Threat({ threat }) {
  const defeatedDate = format(
    parseISO(threat.created_at),
    "dd/MM/yyyy HH:mm:ss"
  );
  return (
    <div className={"threat-card class_" + threat.danger_level.toLowerCase()}>
      <div className="threat-footer">
        <h5>
          <strong>{threat.monster_name}</strong>
        </h5>
        <span>Classe {threat.danger_level}</span>
        {iconsRanking[threat.danger_level]}

        <div className="threat-footer-box">
          <span>
            <strong>Latitude</strong>{" "}
            {Number(threat.location.latitude).toFixed(6)}
          </span>
          <span>
            <strong>Longitude</strong>{" "}
            {Number(threat.location.longitude).toFixed(6)}
          </span>
        </div>
        <div className="threat-footer-box text-center">
          {threat.defeated_by !== null ? (
            <span>
              Derrotado por <strong>{threat.defeated_by.name}</strong> em{" "}
              <strong>{defeatedDate}</strong>.
            </span>
          ) : (
            <span>Ameaça em perigo! derrote-a o quanto antes!</span>
          )}
        </div>
      </div>
    </div>
  );
}
