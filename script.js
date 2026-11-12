/* ============================================================
   INFOGRAFÍA ITIL – script.js
   Funcionalidades: zoom, modo oscuro, tarjetas expandibles,
   resalte de cuadrante, tooltip, impresión PDF.
   ============================================================ */

// ─────────────────────────────────────────────
// 1. ZOOM
// ─────────────────────────────────────────────
let zoomLevel = 1;
const mainContent = document.getElementById("main-content");

function zoomIn() {
  zoomLevel = Math.min(zoomLevel + 0.1, 2);
  applyZoom();
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 0.1, 0.4);
  applyZoom();
}

function resetZoom() {
  zoomLevel = 1;
  applyZoom();
}

function applyZoom() {
  mainContent.style.transform = `scale(${zoomLevel})`;
  mainContent.style.transformOrigin = "top center";
  // Ajusta la altura del contenedor para evitar que se superponga con lo de abajo
  const originalH = mainContent.scrollHeight;
  mainContent.parentElement && (mainContent.style.marginBottom =
    zoomLevel < 1 ? `-${(originalH * (1 - zoomLevel))}px` : "0");
}

// ─────────────────────────────────────────────
// 2. MODO OSCURO
// ─────────────────────────────────────────────
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("themeBtn");
  if (document.body.classList.contains("dark-mode")) {
    btn.textContent = "☀️ Modo Claro";
  } else {
    btn.textContent = "🌙 Modo Oscuro";
  }
}

// ─────────────────────────────────────────────
// 3. IMPRIMIR / PDF
// ─────────────────────────────────────────────
function printPDF() {
  // Expande todas las tarjetas antes de imprimir
  const bodies = document.querySelectorAll(".card-body");
  bodies.forEach(b => b.classList.add("expanded"));
  setTimeout(() => window.print(), 200);
}

// ─────────────────────────────────────────────
// 4. TARJETAS EXPANDIBLES
// ─────────────────────────────────────────────
function toggleCard(id) {
  const body  = document.getElementById("body-" + id);
  const arrow = document.getElementById("arrow-" + id);
  const card  = document.getElementById("card-" + id);

  if (!body) return;

  const isOpen = body.classList.contains("expanded");

  if (isOpen) {
    body.classList.remove("expanded");
    arrow.classList.remove("open");
    card.classList.remove("highlighted");
  } else {
    body.classList.add("expanded");
    arrow.classList.add("open");
    // Resaltar la tarjeta activa brevemente
    card.classList.add("highlighted");
  }
}

// ─────────────────────────────────────────────
// 5. EXPANDIR / COLAPSAR TODO
// ─────────────────────────────────────────────
let allExpanded = false;

function toggleAll() {
  allExpanded = !allExpanded;

  document.querySelectorAll(".card-body").forEach(b => b.classList.toggle("expanded", allExpanded));
  document.querySelectorAll(".toggle-arrow").forEach(a => a.classList.toggle("open", allExpanded));
  document.querySelectorAll(".service-card").forEach(c => c.classList.toggle("highlighted", allExpanded));

  // Busca el botón por su texto para no depender del selector de atributo
  document.querySelectorAll(".toolbar button").forEach(btn => {
    if (btn.textContent.includes("Expandir") || btn.textContent.includes("Colapsar")) {
      btn.textContent = allExpanded ? "📁 Colapsar Todo" : "📂 Expandir Todo";
    }
  });
}

// ─────────────────────────────────────────────
// 6. RESALTAR TARJETA AL HACER CLIC EN CUADRANTE
// ─────────────────────────────────────────────
function highlightCard(id) {
  // Abre la tarjeta si está cerrada
  const body  = document.getElementById("body-" + id);
  const arrow = document.getElementById("arrow-" + id);
  const card  = document.getElementById("card-" + id);

  if (!body) return;

  if (!body.classList.contains("expanded")) {
    body.classList.add("expanded");
    arrow.classList.add("open");
    card.classList.add("highlighted");
  }

  // Scroll suave a la tarjeta
  card.scrollIntoView({ behavior: "smooth", block: "center" });

  // Flash de borde luminoso
  card.style.boxShadow = "0 0 0 4px var(--turquesa), 0 12px 40px rgba(0,122,122,0.6)";
  setTimeout(() => { card.style.boxShadow = ""; }, 1200);

  // Resaltar cuadrante en el círculo
  document.querySelectorAll(".quadrant").forEach(q => q.classList.remove("active-q"));
  const q = document.querySelector(".q-" + id);
  if (q) q.classList.add("active-q");
}

// ─────────────────────────────────────────────
// 7. MODAL BENEFICIOS
// ─────────────────────────────────────────────
const BENEFICIOS = [
  {
    icono: "🤝",
    titulo: "Mayor alineación con el negocio",
    texto: "ITIL garantiza que los servicios de TI estén directamente orientados a cumplir los objetivos estratégicos de la organización.",
    puntos: [
      "Los procesos de TI se diseñan en función de las necesidades reales del negocio.",
      "Se establece un lenguaje común entre áreas de TI y áreas de negocio.",
      "La gestión del portafolio asegura que solo se invierte en servicios que generan valor.",
      "Facilita la toma de decisiones basadas en datos e indicadores compartidos.",
    ]
  },
  {
    icono: "📊",
    titulo: "Servicios de mayor calidad",
    texto: "La aplicación de buenas prácticas ITIL eleva consistentemente el nivel de calidad en la entrega de servicios.",
    puntos: [
      "Los procesos estandarizados reducen la variabilidad y los errores humanos.",
      "La gestión de niveles de servicio (SLA) define y mide compromisos claros de calidad.",
      "Las revisiones continuas permiten detectar y corregir deficiencias oportunamente.",
      "Se establecen criterios de aceptación antes de poner un servicio en producción.",
    ]
  },
  {
    icono: "👥",
    titulo: "Satisfacción de los usuarios",
    texto: "Una gestión ordenada de incidentes, solicitudes y problemas se traduce directamente en usuarios más satisfechos.",
    puntos: [
      "Los tiempos de respuesta y resolución se reducen gracias a procesos definidos.",
      "El centro de servicio (Service Desk) actúa como punto único de contacto eficiente.",
      "La gestión de problemas evita que los mismos errores se repitan una y otra vez.",
      "Los usuarios reciben comunicación clara sobre el estado de sus solicitudes.",
    ]
  },
  {
    icono: "🛡️",
    titulo: "Reducción de riesgos",
    texto: "ITIL incorpora prácticas de gestión de riesgos en cada etapa del ciclo de vida del servicio.",
    puntos: [
      "La gestión de cambios evalúa el impacto antes de cualquier modificación al entorno.",
      "Los planes de continuidad del servicio minimizan el impacto de interrupciones graves.",
      "La gestión de la seguridad protege la información y los activos de TI.",
      "Las pruebas y validaciones antes del despliegue reducen fallos en producción.",
    ]
  },
  {
    icono: "💰",
    titulo: "Optimización de costos",
    texto: "ITIL ayuda a las organizaciones a invertir mejor en TI, eliminando desperdicios y maximizando el retorno.",
    puntos: [
      "La gestión financiera brinda visibilidad sobre el costo real de cada servicio.",
      "Se evitan duplicidades al tener un catálogo centralizado de servicios.",
      "La gestión de la capacidad previene sobreaprovisionamiento de infraestructura.",
      "La mejora continua identifica procesos ineficientes que consumen recursos innecesariamente.",
    ]
  },
  {
    icono: "🏆",
    titulo: "Organizaciones más competitivas",
    texto: "Las organizaciones que adoptan ITIL desarrollan una capacidad de respuesta y adaptación superior al mercado.",
    puntos: [
      "Los servicios confiables fortalecen la reputación y la confianza de clientes y socios.",
      "La mejora continua impulsa la innovación y la adopción de nuevas tecnologías.",
      "La agilidad operativa permite responder más rápido a los cambios del entorno.",
      "El alineamiento estratégico de TI convierte la tecnología en una ventaja competitiva real.",
    ]
  },
];

let benIdx = 0;

function openBeneficio(idx) {
  benIdx = idx;
  renderBeneficio();
  document.getElementById("modal-beneficio").classList.add("active");
}

function renderBeneficio() {
  const b = BENEFICIOS[benIdx];
  document.getElementById("modal-ben-icon").textContent    = b.icono;
  document.getElementById("modal-ben-titulo").textContent  = b.titulo;
  document.getElementById("modal-ben-texto").textContent   = b.texto;
  document.getElementById("modal-ben-counter").textContent = `${benIdx + 1} / ${BENEFICIOS.length}`;

  const lista = document.getElementById("modal-ben-lista");
  lista.innerHTML = "";
  b.puntos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = "✔ " + p;
    lista.appendChild(li);
  });
}

function navBeneficio(dir) {
  benIdx = (benIdx + dir + BENEFICIOS.length) % BENEFICIOS.length;
  renderBeneficio();
}

function closeBeneficio(e) {
  if (!e || e.target === document.getElementById("modal-beneficio")) {
    document.getElementById("modal-beneficio").classList.remove("active");
  }
}

document.addEventListener("keydown", e => {
  const mb = document.getElementById("modal-beneficio");
  if (mb && mb.classList.contains("active")) {
    if (e.key === "Escape")      closeBeneficio();
    if (e.key === "ArrowRight")  navBeneficio(1);
    if (e.key === "ArrowLeft")   navBeneficio(-1);
  }
});

// ─────────────────────────────────────────────
// 8. TOOLTIP FLOTANTE
// ─────────────────────────────────────────────
const tooltip = document.getElementById("tooltip");

const quadrantTips = {
  "q-estrategia": "Haz clic para ver la tarjeta de Estrategia del Servicio",
  "q-diseno":     "Haz clic para ver la tarjeta de Diseño del Servicio",
  "q-operacion":  "Haz clic para ver la tarjeta de Operación del Servicio",
  "q-transicion": "Haz clic para ver la tarjeta de Transición del Servicio",
};

document.querySelectorAll(".quadrant").forEach(q => {
  q.addEventListener("mouseenter", e => {
    const cls = [...q.classList].find(c => quadrantTips[c]);
    if (!cls) return;
    tooltip.textContent = quadrantTips[cls];
    tooltip.classList.add("visible");
  });

  q.addEventListener("mousemove", e => {
    tooltip.style.left = (e.clientX + 14) + "px";
    tooltip.style.top  = (e.clientY - 30) + "px";
  });

  q.addEventListener("mouseleave", () => {
    tooltip.classList.remove("visible");
  });
});

// ─────────────────────────────────────────────
// 9. INICIALIZACIÓN
// ─────────────────────────────────────────────
// Las tarjetas arrancan colapsadas; allExpanded ya es false por defecto.
// No se hace nada al cargar — el usuario abre lo que quiere.
