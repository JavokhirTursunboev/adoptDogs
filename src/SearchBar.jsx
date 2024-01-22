import { useDeferredValue, useMemo, useState, useTransition } from "react";
import useBreedList from "./useBreedList";
import Result from "./Result";

import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { all } from "./searchParamsSlice";
import { useSearchQuery } from "./petApiService";

const ANIMALS = ["cat", "bird", "dog", "rabbit"];

export default function SearchBar() {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();

  // form submit
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const { data: pets = [] } = useSearchQuery(searchParams);

  const defferedPets = useDeferredValue(pets);
  const renderedPets = useMemo(() => <Result pets={defferedPets} />, [defferedPets]);

  const dispatch = useDispatch();

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
            dispatch(all(obj));
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
          <div> Location</div>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="location"
            className="border-2 border-black  p-2 w-[10.75rem] min-w-[10.75rem]"
          />
        </label>
        <label htmlFor="animal" className="">
          <div> animal</div>
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
          <div> breed</div>

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
