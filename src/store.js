import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adopterPetSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
  },
});
export default store;
