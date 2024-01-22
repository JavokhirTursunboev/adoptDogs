import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adopterPetSlice";
import searchParams from "./searchParamsSlice";
import { petApi } from "./petApiService";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petApi.middleware),
});
export default store;
