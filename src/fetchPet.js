export default async function fetchPet({ queryKey }) {
  const id = queryKey[1];
  const apiRes = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`detail ${id} fetch not ok`);
  }

  const data = await apiRes.json();

  return data;
}
