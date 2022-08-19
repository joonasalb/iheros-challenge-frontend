import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import { useDispatch } from "react-redux";
import { LoginRequest } from "../../store/modules/auth/actions";
import "./styles.scss";

export default function Login() {
    const dispatch = useDispatch();

    function handleSubmit({ username, password }) {
        dispatch(LoginRequest(username, password));
    }

    return (
        <div className="container">
            <div className="header">
                <h2>!Heros challenge</h2>
                <span>Conheça o iHeros e batalhe contra ameaças mundiais agora mesmo!.</span>
            </div>
            <Form onSubmit={handleSubmit}>
                <Input name="username" type="username" placeholder="Usuário" />
                <Input name="password" type="password" placeholder="Senha" />

                <button type="submit" className="login-btn">
                    Login
                </button>
                <Link to="/register">Não tem uma conta? Crie agora!</Link>
            </Form>
        </div>
    );
}
