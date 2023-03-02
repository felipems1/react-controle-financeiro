import { useState, useEffect } from "react";
import { auth, db } from "../../services/firebaseConnection";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Tabela from "../../components/TabelaArea";
import InputArea from "../../components/InputArea";
import "./style.css";

const Finance = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const userDetail = localStorage.getItem("@detailUser");

    if (userDetail) {
      const data = JSON.parse(userDetail);

      const financeRef = collection(db, "financeiro");
      const q = query(financeRef, where("userUid", "==", data?.uid));
      const onsub = onSnapshot(q, (snapshot) => {
        let income = 0;
        let expense = 0;

        snapshot.forEach((doc) => {
          if (doc.data().category === "Entrada") {
            expense += doc.data().value;
          } else {
            income += doc.data().value;
          }
        });
        setExpense(expense);
        setIncome(income);
      });
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="container-finance">
      <header>
        <h2>Controle Financeiro</h2>
      </header>
      <main>
        <div className="section">
          <h3>Entradas</h3>
          <p>R$ {expense.toFixed(2)}</p>
        </div>
        <div className="section">
          <h3>Saidas</h3>
          <p>R$ {income.toFixed(2)}</p>
        </div>
        <div
          className="section-total"
          style={{
            backgroundColor: expense > income ? "#00a000" : "#f00",
          }}
        >
          <h3>Total</h3>
          <p>R$ {(expense - income).toFixed(2)}</p>
        </div>
      </main>
      <InputArea />
      <Tabela />
      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};

export default Finance;
