import type { Dispatch, SetStateAction } from "react";

export type Persona = {
  name: string;
  description: string;
  img?: string;
  variationCount: number;
  uuid: string;
  isEnabled: boolean;
};

export type PersonaList = Persona[];

export interface PersonaListContextType {
  list: PersonaList;
  setList: Dispatch<SetStateAction<PersonaList>>;
}

export type NumberControlProps = {
  variationCount: number;
  uuid: string;
};

export type VariationInputProps = {
  variationCount: number;
  handleChange: () => {};
};
