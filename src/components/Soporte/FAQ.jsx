import { useState } from "react";

const preguntas = [
  { pregunta: "¿Cómo hago un pedido?", respuesta: "Desde el catálogo, agregás al carrito y confirmás en Facturación." },
  { pregunta: "¿Qué métodos de pago aceptan?", respuesta: "Tarjeta, SINPE y transferencia." },
  { pregunta: "¿Puedo cambiar mi dirección después de comprar?", respuesta: "Sí, desde tu perfil, antes de que se despache el pedido." },
];

function FAQ() {
  const [abierta, setAbierta] = useState(null);
  return (
    <div>
      <h2>Preguntas frecuentes</h2>
      {preguntas.map((p, i) => (
        <div key={i} className="faq-item">
          <button onClick={() => setAbierta(abierta === i ? null : i)}>{p.pregunta}</button>
          {abierta === i && <p>{p.respuesta}</p>}
        </div>
      ))}
    </div>
  );
}
export default FAQ;