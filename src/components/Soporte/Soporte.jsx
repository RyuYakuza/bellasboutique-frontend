import { useState } from "react";
import { SoporteProvider } from "./SoporteContext";
import Menu from "../Estructura/Menu";
import FAQ from "./FAQ";
import Encuestas from "./Encuestas";
import Chat from "./Chat";
import "./Soporte.css";

function Soporte() {
  const [tab, setTab] = useState("faq");

  return (
    <SoporteProvider>
      <Menu />
      <div className="soporte-container">
        <h1>Soporte al Cliente</h1>
        <div className="soporte-tabs">
          <button className={tab === "faq" ? "activo" : ""} onClick={() => setTab("faq")}>FAQ</button>
          <button className={tab === "encuestas" ? "activo" : ""} onClick={() => setTab("encuestas")}>Encuestas</button>
          <button className={tab === "chat" ? "activo" : ""} onClick={() => setTab("chat")}>Chat</button>
        </div>
        {tab === "faq" && <FAQ />}
        {tab === "encuestas" && <Encuestas />}
        {tab === "chat" && <Chat />}
      </div>
    </SoporteProvider>
  );
}
export default Soporte;