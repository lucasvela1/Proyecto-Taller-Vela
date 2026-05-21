export type Marca = {
  id: string;
  nombre: string;
  logo: string;
  colors: [string, string];
};

export const marcas: Marca[] = [
  {
    id: "coca-cola",
    nombre: "Coca-Cola",
    logo: "https://placehold.co/220x220/ffffff/b91c1c.png?text=Coca-Cola",
    colors: ["#ef4444", "#b91c1c"],
  },
  {
    id: "pepsi",
    nombre: "Pepsi",
    logo: "https://placehold.co/220x220/ffffff/1d4ed8.png?text=Pepsi",
    colors: ["#1d4ed8", "#0f172a"],
  },
  {
    id: "nestle",
    nombre: "Nestlé",
    logo: "https://placehold.co/220x220/ffffff/334155.png?text=Nestle",
    colors: ["#475569", "#1e293b"],
  },
  {
    id: "lactalis",
    nombre: "Lactalis",
    logo: "https://placehold.co/220x220/ffffff/0ea5e9.png?text=Lactalis",
    colors: ["#0ea5e9", "#1d4ed8"],
  },
  {
    id: "danone",
    nombre: "Danone",
    logo: "https://placehold.co/220x220/ffffff/1e40af.png?text=Danone",
    colors: ["#2563eb", "#1e40af"],
  },
];
