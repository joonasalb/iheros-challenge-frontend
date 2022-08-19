import { toast } from "react-toastify";
import api from "./api";
const getAllHeroes = async () => {
    try {
        const response = await api.get("/hero/");
        return response.data;
    } catch (err) {
        return err;
    }
};

const updateHero = async (
    heroId,
    formData,
    filteredHeroList,
    setFilteredHeroList
) => {
    try {
        const response = await api.put(`/hero/${heroId}/`, formData);
        const updatedHero = response.data;
        const newFilteredHeroList = filteredHeroList.map((hero) =>
            hero.id == updatedHero.id ? updatedHero : hero
        );
        setFilteredHeroList(newFilteredHeroList);
        toast.success(`Héroi editado com sucesso!`);
    } catch (err) {
        toast.error(`Não foi possível editar, favor verificar informações.`);
    }
};

const createHero = async (formData, filteredHeroList, setFilteredHeroList) => {
    try {
        const response = await api.post("/hero/", formData);
        const newHero = response.data;
        const newFilteredHeroList = [...filteredHeroList, newHero];
        setFilteredHeroList(newFilteredHeroList);
        toast.success(
            `O Héroi ${response.data.name} foi criado com sucesso!`
        );
    } catch (err) {
        toast.error(
            `Não foi possível criar o Héroi, favor verificar informações. `+err
        );
    }
};

const deleteHero = async (heroId, newFilteredHeroList, setFilteredHeroList) => {
    try {
        const response = await api.delete(`/hero/${heroId}/`);
        const filteredList = newFilteredHeroList.filter(
            (hero) => hero.id !== response.data.id
        );
        setFilteredHeroList(filteredList);
        toast.success(`Héroi deletado com sucesso!`);
    } catch (error) {
        toast.error(
            `Não foi possível deletar esse héroi, talvez ele seja muito forte para isso.`
        );
    }
};

export { getAllHeroes, createHero, updateHero, deleteHero };
