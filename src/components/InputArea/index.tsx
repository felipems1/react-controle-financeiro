import { useState, useEffect } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import UserType from "../../types/User";
import "./style.css";

const InputArea = () => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userDetail = localStorage.getItem("@detailUser");
    if (userDetail) {
      setUser(JSON.parse(userDetail));
    }
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (description !== "" && category !== "" && value !== "") {
      await addDoc(collection(db, "financeiro"), {
        description: description,
        value: parseFloat(value),
        category: category,
        created: new Date(),
        userUid: user?.uid,
      })
        .then(() => {
          setDescription("");
          setValue("");
          setCategory("");
        })
        .catch(() => {
          console.log("ERRO AO REGISTAR");
        });
    } else {
      alert("PREENCHA TODOS OS CAMPO!");
    }
  };

  return (
    <div className="container-form">
      <form className="form-register" onSubmit={handleRegister}>
        <div className="area-input">
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="area-input">
          <label>Valor</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="area-input">
          <label>Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option></option>
            <option>Entrada</option>
            <option>Saida</option>
          </select>
        </div>
        <button onClick={handleRegister} className="btn-add" type="submit">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default InputArea;
