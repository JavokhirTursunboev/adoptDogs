export default async function fetchSearch({ queryKey }) {
  const { animal, breed, location } = queryKey[1];
  const res = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok) {
    throw Error(`Something wrong with ${animal} ${breed} ${location}`);
  }
  return res.json();
}
