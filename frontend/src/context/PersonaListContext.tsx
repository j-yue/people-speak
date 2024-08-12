import { createContext } from "react";
import type { PersonaListContextType } from "src/@types/types";

export const PersonaListContext = createContext<PersonaListContextType>({
  list: [],
  setList: () => {},
});
