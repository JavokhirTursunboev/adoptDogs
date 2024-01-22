import { Link } from "react-router-dom";

const Pets = ({ name, animal, images, breed, location, id }) => {
  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`}>
      <div
        key={id}
        className="border  flex flex-col 
           gap-5 justify-start items-center px-10 py-3 my-3"
      >
        <img src={hero} alt="pet" className="w-[100px] h-auto rounded-[50%]" />
        <h1 className="text-green-500"> Name: {name}</h1>
        <h2 className="text-blue-400"> Type: {animal}</h2>
        <h3 className="text-red-500">Breed: {breed}</h3>
        <div>Location: {location}</div>
        <br />
      </div>
    </Link>
  );
};

export default Pets;
