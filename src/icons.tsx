const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "100%",
  height: "100%",
};

/** Reclamación / documento */
export const IconDocument: React.FC = () => (
  <svg {...base}>
    <path d="M13 5h15l8 8v30a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    <path d="M28 5v8h8" />
    <path d="M17 26h14M17 33h14M17 19h7" />
  </svg>
);

/** Ley / balanza de la justicia */
export const IconScales: React.FC = () => (
  <svg {...base}>
    <path d="M24 7v34M14 41h20" />
    <path d="M11 14h26" />
    <path d="M11 14 4 28h14L11 14z" />
    <path d="M37 14l-7 14h14l-7-14z" />
  </svg>
);

/** Nulidad / anulado */
export const IconVoid: React.FC = () => (
  <svg {...base}>
    <circle cx="24" cy="24" r="17" />
    <path d="M12 12l24 24" />
  </svg>
);

/** Dinero / indemnización */
export const IconMoney: React.FC = () => (
  <svg {...base}>
    <rect x="5" y="12" width="38" height="24" rx="3" />
    <circle cx="24" cy="24" r="6" />
    <path d="M12 19v10M36 19v10" />
  </svg>
);

/** Reincorporación / volver a la empresa */
export const IconReturn: React.FC = () => (
  <svg {...base}>
    <path d="M9 24a15 15 0 1 1 5 11" />
    <path d="M9 14v10h10" />
  </svg>
);

/** Salarios perdidos / monedas */
export const IconCoins: React.FC = () => (
  <svg {...base}>
    <ellipse cx="24" cy="13" rx="14" ry="6" />
    <path d="M10 13v10c0 3.3 6.3 6 14 6s14-2.7 14-6V13" />
    <path d="M10 23v10c0 3.3 6.3 6 14 6s14-2.7 14-6V23" />
  </svg>
);

/** Embarazo / maternidad protegida */
export const IconProtection: React.FC = () => (
  <svg {...base}>
    <path d="M24 5l16 6v13c0 10.5-6.8 17.5-16 21-9.2-3.5-16-10.5-16-21V11l16-6z" />
    <path d="M24 33c-5-3.4-8-6.2-8-9.4a4 4 0 0 1 8-1.6 4 4 0 0 1 8 1.6c0 3.2-3 6-8 9.4z" />
  </svg>
);

/** Demostrarlo / pruebas */
export const IconSearch: React.FC = () => (
  <svg {...base}>
    <circle cx="21" cy="21" r="13" />
    <path d="M30.5 30.5L42 42" />
  </svg>
);

/** Escríbenos / mensaje */
export const IconChat: React.FC = () => (
  <svg {...base}>
    <path d="M42 28a4 4 0 0 1-4 4H16l-8 8V12a4 4 0 0 1 4-4h26a4 4 0 0 1 4 4v16z" />
    <path d="M17 17h14M17 24h9" />
  </svg>
);
