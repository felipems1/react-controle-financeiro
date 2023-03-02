import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../../assets/Logo.png";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email !== "" && senha !== "") {
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          setEmail("");
          setSenha("");
          navigate("/finance", { replace: true });
        })
        .catch(() => {
          console.log("ERRO AO CADASTRAR");
        });
    } else {
      toast.info("PREENCHA TODOS OS CAMPO!");
    }
  };

  return (
    <div className="container-sign">
      <img src={logo} alt="logo" />
      <form className="form" onSubmit={handleRegister}>
        <input
          type="email"
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
        <button type="submit">Cadastrar</button>
      </form>
      <Link className="button-link" to="/">
        Acessar conta
      </Link>
    </div>
  );
};

export default SignUp;
