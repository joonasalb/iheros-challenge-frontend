import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import "./styles.scss";
import { getAllHeroes } from "../../services/heroServices";
import api from "../../services/api";
import HeroCard from "../../components/HeroCard";
import ThreatModal from "../../components/ThreatModal";
import HeroModal from "../../components/ModalHero";
import { HeroContext } from "../../context/HerosContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const socket = openSocket(process.env.REACT_APP_BASE_URL_SOCKET);

export default function Dashboard() {
    const [heroList, setHeroList] = useState([]);
    const [filter, setFilter] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [filteredHeroList, setFilteredHeroList] = useState(heroList);

    useEffect(() => {
        const getHeros = async () => {
            const heros_list = await getAllHeroes();
            setHeroList(heros_list);
            setFilteredHeroList(heros_list);
        };
        getHeros();
    }, []);

    useEffect(() => {
        socket.open();
        socket.on("occurrence", async (threat) => {
            let newThreat = {
                danger_level: threat.dangerLevel, 
                monster_name: threat.monsterName,
                location: {
                            latitude: threat.location[0].lat,
                            longitude: threat.location[0].lng
                        },

            };
            try {            
                const response = await api.post("/assignment/", newThreat);
                const { closestHero } = response.data;
                setModalData({ threat, closestHero });
                setIsAlertOpen(true);
            } catch (error) {}
        });

        return () => {
            socket.close();
        };
    }, []);

    const filterHeroList = (e) => {
        setFilter(e.target.value);
        if (filter.length >= 1) {
            const filteredList = heroList.filter(
                (hero) => hero.name.toLowerCase().search(e.target.value) != -1
            );
            setFilteredHeroList(filteredList);
        } else {
            setFilteredHeroList(heroList);
        }
    };

    return (
        <HeroContext.Provider value={{ filteredHeroList, setFilteredHeroList }}>
            <div className='dashboard'>
                <ThreatModal
                    isAlertOpen={isAlertOpen}
                    setIsAlertOpen={setIsAlertOpen}
                    modalData={modalData}
                />
                
                <div className='dashboard-header'>
                    <FloatingLabel htmlFor="search" label="Procurar heróis">
                        <Form.Control
                            type='text'
                            id="search"
                            style={{ width: "300px" }}
                            placeholder='Procurar heróis'
                            value={filter}
                            onChange={(e) => filterHeroList(e)}
                        />
                    </FloatingLabel>      
                    <HeroModal />

                </div>

                <div className='dashboard-body'>
                    {filteredHeroList && filteredHeroList.length > 0 ? (
                        filteredHeroList.map((hero) => {
                            return <HeroCard hero={hero} key={hero.id} />;
                        })
                    ) : (
                        <span>Nenhum herói foi criado ainda para vencer a batalha...</span>
                    )}
                </div>
            </div>
        </HeroContext.Provider>
    );
}
