import { useContext } from "react";
import { FormField, NumberInput } from "@canva/app-ui-kit";
import { PersonaListContext } from "src/context/PersonaListContext";
import type { NumberControlProps } from "src/@types/types";

const NumberControl = ({ variationCount, uuid }: NumberControlProps) => {
  const { list, setList } = useContext(PersonaListContext);

  const handleChange = (e) => {
    const personaIndex = list.findIndex((_persona) => _persona.uuid === uuid);
    const listCopy = [...list];
    listCopy[personaIndex].variationCount = e;
    setList(listCopy);
  };

  return (
    <NumberInput
      hasSpinButtons
      step={1}
      min={1}
      max={4}
      incrementAriaLabel="Increment"
      decrementAriaLabel="Decrement"
      defaultValue={variationCount}
      onChange={handleChange}
    />
  );
};

export const VariationControl = ({
  variationCount,
  uuid,
}: NumberControlProps) => {
  return (
    <FormField
      control={() => (
        <NumberControl variationCount={variationCount} uuid={uuid} />
      )}
      label="# of variations"
    />
  );
};
