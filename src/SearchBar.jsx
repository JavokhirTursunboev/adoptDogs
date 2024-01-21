import { useDeferredValue, useMemo, useState, useTransition } from "react";
import useBreedList from "./useBreedList";
import Result from "./Result";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ANIMALS = ["cat", "bird", "dog", "rabbit"];

export default function SearchBar() {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();

  // form submit
  const [requestParam, setRequestParam] = useState({
    animal: "",
    location: "",
    breed: "",
  });

  const results = useQuery({ queryKey: ["search", requestParam], queryFn: fetchSearch });
  const pets = results?.data?.pets ?? [];
  const defferedPets = useDeferredValue(pets);
  const renderedPets = useMemo(() => <Result pets={defferedPets} />, [defferedPets]);

  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  return (
    <div className=" w-full flex flex-col  ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          startTransition(() => {
            setRequestParam(obj);
          });
        }}
        className="w-full  fixed  flex  flex-col gap-2 md:gap-5 md:flex-row  
        items-center md:items-end justify-center
        backdrop-blur-sm
        "
      >
        {adoptedPet ? (
          <div className="w-[100px] mt-4 ">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} className="w-full rounded-[50%]" />
          </div>
        ) : null}
        <label htmlFor="location" className="flex-row">
          <p> Location</p>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="location"
            className="border-2 border-black  p-2 w-[10.75rem] min-w-[10.75rem]"
          />
        </label>
        <label htmlFor="animal" className="">
          <p> animal</p>
          <select
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            id="animal"
            className=" border-2 border-black p-2 min-w-[10.75rem]"
          >
            <option className=" " />
            {ANIMALS.map((anim) => (
              <option className="border-black" key={anim}>
                {anim}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          <p> breed</p>

          <select
            type="text"
            name="breed"
            id="breed"
            placeholder="breed"
            className="border-2
            border-black  p-2 min-w-[10.75rem] "
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div>
            <h2>🐕‍🦺</h2>
          </div>
        ) : (
          <Button type="submit" className=" border-[.0625rem]  border-blue-600  w-[10.5rem]  p-2">
            Search
          </Button>
        )}
      </form>
      {renderedPets}
    </div>
  );
}
