import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function AdminPanel() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const querySnapshot = await getDocs(collection(db, "tickets"));
    setTickets(querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
  };

  const updateStatus = async (id, newStatus) => {
    const ticketRef = doc(db, "tickets", id);
    await updateDoc(ticketRef, { status: newStatus });
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="admin">
      <h2>All Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket">
          <p><b>{ticket.category}</b> - {ticket.priority}</p>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <button onClick={() => updateStatus(ticket.docId, "In Progress")}>In Progress</button>
          <button onClick={() => updateStatus(ticket.docId, "Resolved")}>Resolved</button>
        </div>
      ))}
    </div>
  );
}
