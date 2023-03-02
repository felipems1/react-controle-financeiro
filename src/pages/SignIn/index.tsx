import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/Logo.png";
import "./style.css";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email !== "" && senha !== "") {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          toast.success("Cadastrado feito com sucesso!");
          navigate("/finance", { replace: true });
        })
        .catch(() => {
          console.log("ERRO AO FAZER O LOGIN");
        });
    } else {
      toast.info("PREENCHA TODOS OS CAMPO!");
    }
  };

  return (
    <div className="container-sign">
      <img src={logo} alt="logo" />
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Acessar</button>
      </form>
      <Link className="button-link" to="/register">
        Criar conta gratuita
      </Link>
    </div>
  );
};

export default SignIn;
