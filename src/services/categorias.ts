export async function getCategoriasV3(query: string = "") {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/v2/categories.json?search=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
