import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

import Carousels from "./assets/Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useState } from "react";
import MyVerticallyCenteredModal from "./Modal";

function Details() {
  const [modalShow, setModalShow] = useState(false);
  // ! useParams is hook and it return object of key/pair of dynamic params of current URL
  const { id } = useParams();
  // ! useQuery is used to fetch data from api. It returns an object that cotain status {loading error data (success) }

  const results = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });

  if (results.isLoading) {
    return (
      <div>
        <h2 className="">🌀</h2>
      </div>
    );
  }
  if (results.isError) {
    return <h1> OOOPSS error</h1>;
  }

  if (!results.data || !results.data.pets || results.data.pets.length === 0) {
    // Handle the case when there is no data or no pets in the response
    return <div>No pet found</div>;
  }

  const pet = results.data.pets[0];

  return (
    <div className="flex flex-col  items-center  gap-5 mx-10 px-10 py-8 rounded-[20px] bg-blue-200">
      <Carousels images={pet.images} />

      <h1 className="text-[3rem] font-bold">{pet.name}</h1>
      <h2 className=" flex flex-col items-center font-bold gap-6">
        {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        <button className="bg-red-800 text-white px-6 py-2 rounded-3xl" onClick={() => setModalShow(true)}>
          Adopt {pet.name}
        </button>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} petName={pet.name} />
        <p>{pet.description}</p>
      </h2>
    </div>
  );
}

function DetailsErrorBoundery(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundery;
