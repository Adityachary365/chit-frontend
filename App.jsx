import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get("https://chit-1.onrender.com/members");
    setMembers(res.data);
  };

  const addMember = async () => {
    let username = window.prompt("Name?");
    let amount1 = window.prompt("Amount?");
    let sign1 = window.prompt("Signed?");

    const newMember = {
      id: Date.now(),
      name: username,
      amount: amount1,
      sign: sign1
    };

    await axios.post("https://chit-1.onrender.com/add", newMember);
    fetchMembers();
  };

  const deleteMember = async (id) => {
    await axios.delete(`https://chit-1.onrender.com/delete/${id}`);
    fetchMembers();
  };

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={addMember}>Add</button>

      <table border="5px">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Sign</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.amount}</td>
              <td>{member.sign}</td>
              <td>
                <button onClick={() => deleteMember(member.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;