export type Categoria = {
  id: string;
  nombre: string;
  emoji: string;
  colors: [string, string];
};

export const categorias: Categoria[] = [
  {
    id: "bebidas",
    nombre: "Bebidas",
    emoji: "🥤",
    colors: ["#0ea5e9", "#2563eb"],
  },
  {
    id: "snacks",
    nombre: "Snacks",
    emoji: "🍿",
    colors: ["#f59e0b", "#ef4444"],
  },
  {
    id: "lacteos",
    nombre: "Lácteos",
    emoji: "🧀",
    colors: ["#facc15", "#f97316"],
  },
  {
    id: "carnes",
    nombre: "Carnes",
    emoji: "🥩",
    colors: ["#ef4444", "#b91c1c"],
  },
  {
    id: "vegetales",
    nombre: "Vegetales",
    emoji: "🥬",
    colors: ["#22c55e", "#16a34a"],
  },
  {
    id: "frutas",
    nombre: "Frutas",
    emoji: "🍎",
    colors: ["#f43f5e", "#fb7185"],
  },
  {
    id: "cereales",
    nombre: "Cereales",
    emoji: "🌾",
    colors: ["#a16207", "#ca8a04"],
  },
];
