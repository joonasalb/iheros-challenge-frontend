import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { isBefore, parseISO } from "date-fns";
import HeroModal from "../ModalHero";
import { deleteHero } from "../../services/heroServices";
import { HeroContext } from "../../context/HerosContext";
import HeroS from "../../assets/hero_class_s.jpg";
import HeroA from "../../assets/hero_class_a.jpg";
import HeroB from "../../assets/hero_class_b.jpg";
import HeroC from "../../assets/hero_class_c.jpg";
import "./styles.scss";

const heroImage = {
    S: HeroS,
    A: HeroA,
    B: HeroB,
    C: HeroC,
};

export default function Card({ hero }) {
    const parsedDate = parseISO(hero.release_time);
    const showRecoveringLabel = isBefore(new Date(), parsedDate);
    const { filteredHeroList, setFilteredHeroList } = useContext(HeroContext);

    const handleDelete = (heroId) => {
        deleteHero(heroId, filteredHeroList, setFilteredHeroList);
    };
    return (
        <div className='hero-card'>
            <div className='hero-img'>
                {showRecoveringLabel && (
                    <div className='tag'>Em recuperação</div>
                )}
                <img src={heroImage[hero.rank]} alt='' />
            </div>
            <div className='hero-footer'>
                <h4>{hero.name}</h4>
                Rank {hero.rank}
                <div className='hero-footer-box'>
                    <p>
                        <span>Latitude</span>{" "}
                        {Number(hero.latitude).toFixed(6)}
                    </p>
                    <p>
                        {" "}
                        <span>Longitude</span>{" "}
                        {Number(hero.longitude).toFixed(6)}
                    </p>
                </div>
                <div className='hero-footer-box'>
                    <HeroModal isEditting={true} hero={hero} />

                    <button>
                        <AiOutlineDelete
                            size={18}
                            color={"black"}
                            onClick={() => handleDelete(hero.id)}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
