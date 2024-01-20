import { useQuery } from "@tanstack/react-query";
import fetchBreedlist from "./fetchBreedlist";
export default function useBreedList(animal) {
  const outQuery = useQuery({
    queryKey: ["breeds", animal],
    queryFn: fetchBreedlist,
  });
  return [outQuery?.data?.breeds ?? [], outQuery.status];
}
