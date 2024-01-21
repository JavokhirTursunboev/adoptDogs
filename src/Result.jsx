import PropTypes from "prop-types";
import Pets from "./Pets"; // Assuming Pets component is in the same directory

export default function Result({ pets }) {
  return (
    <div className="md:mt-[100px] mt-[28rem]">
      {!pets.length ? <h1>No Pets Found</h1> : pets.map((pet) => <Pets {...pet} key={pet.id} />)}
    </div>
  );
}

Result.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
