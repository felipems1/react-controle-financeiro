import { useState, useEffect } from "react";
import "./style.css";

import { db } from "../../services/firebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  AiFillDelete,
  AiOutlineDownCircle,
  AiOutlineUpCircle,
} from "react-icons/ai";
import UserType from "../../types/User";

const Tabela = () => {
  const [finances, setFinances] = useState<UserType[]>([]);

  useEffect(() => {
    loadFinances();
  }, []);

  const loadFinances = async () => {
    const userDetail = localStorage.getItem("@detailUser");

    if (userDetail) {
      const data = JSON.parse(userDetail);

      const financeRef = collection(db, "financeiro");
      const q = query(
        financeRef,
        orderBy("created", "desc"),
        where("userUid", "==", data?.uid)
      );
      const onsub = onSnapshot(q, (snapshot) => {
        let getInfo: UserType[] = [];

        snapshot.forEach((doc) => {
          getInfo.push({
            id: doc.id,
            category: doc.data().category,
            description: doc.data().description,
            value: doc.data().value,
            userUid: doc.data().userUid,
          });
        });
        setFinances(getInfo);
      });
    }
  };

  const handleDel = async (id: string) => {
    const docRef = doc(db, "financeiro", id);
    await deleteDoc(docRef);
  };

  return (
    <>
      {finances.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          {finances.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.description}</td>
                <td>{item.value.toFixed(2)}</td>
                <td>
                  {item.category === "Entrada" ? (
                    <AiOutlineUpCircle className="up" />
                  ) : (
                    <AiOutlineDownCircle className="down" />
                  )}
                </td>
                <td>
                  <AiFillDelete
                    className="del"
                    onClick={() => handleDel(item.id)}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  );
};

export default Tabela;
