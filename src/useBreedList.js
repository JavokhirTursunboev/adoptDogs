// import { useQuery } from "@tanstack/react-query";

import { useGetBreedsQuery } from "./petApiService";

// import fetchBreedlist from "./fetchBreedlist";
export default function useBreedList(animal) {
  // const outQuery = useQuery({
  //   queryKey: ["breeds", animal],
  //   queryFn: fetchBreedlist,
  // });

  const { data: breeds, isLoading } = useGetBreedsQuery(animal, { skip: !animal });
  if (!animal) {
    return [[], "loaded"];
  }
  return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
