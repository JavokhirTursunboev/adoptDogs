export default async function fetchBreedlist({ queryKey }) {
  const animal = queryKey[1];
  const res = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`);
  if (!res.ok) {
    throw Error("Something went wrong with "`${animal}`);
  }
  return res.json();
}
