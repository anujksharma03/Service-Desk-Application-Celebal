import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("General");
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  const submitTicket = async () => {
    await addDoc(collection(db, "tickets"), {
      id: uuidv4(),
      description,
      priority,
      category,
      userId: user.uid,
      status: "Open",
      createdAt: new Date()
    });
    loadTickets();
  };
  const { darkMode, toggleTheme } = useTheme();

  const loadTickets = async () => {
    const q = query(collection(db, "tickets"), where("userId", "==", user.uid));
    const data = await getDocs(q);
    setTickets(data.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    if (user) loadTickets();
  }, [user]);

  return (
    <div className="dashboard">
      <button onClick={toggleTheme} style={{ float: "right", marginBottom: "10px" }}>
  {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
</button>
      <h1>Welcome, {user?.email}</h1>
      <h2>Your Tickets</h2>
      <h2>Raise a Ticket</h2>
      <textarea placeholder="Describe your issue..." onChange={(e) => setDescription(e.target.value)} />
      <select onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>General</option><option>Technical</option><option>Billing</option>
      </select>
      <button onClick={submitTicket}>Submit</button>

      <h3>Your Tickets</h3>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket">
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
        </div>
      ))}
    </div>
  );
}
