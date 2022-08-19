import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LoginRequest } from "../../store/modules/auth/actions";
import { storeUser } from "../../services/userServices";

export default function Register() {
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      const resp = await storeUser(data);
      if (resp.id) {
        const { username, password } = data;
        toast.success(
          "Conta criada com sucesso, você será redirecionado em breve..."
        );
        setTimeout(() => {
          dispatch(LoginRequest(username, password));
        }, 3500);
      } else {
        toast.error("Erro ao criar conta");
      }
    } catch (err) {
      toast.error("Erro ao criar conta, por favor tente novamente.");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h2>!Heros challenge</h2>
        <span>Crie uma conta para se unir ao time.</span>
      </div>
      <Form onSubmit={handleSubmit}>
        <Input name="first_name" type="text" placeholder="Nome" />
        <Input name="username" type="username" placeholder="Usuário" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit" className="login-btn">
          Criar conta
        </button>
        <Link to="/">Já tenha uma conta</Link>
      </Form>
    </div>
  );
}
