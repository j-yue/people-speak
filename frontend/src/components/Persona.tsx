import { useState, useContext } from "react";
import { ImageCard, Text, Rows, Box, Switch } from "@canva/app-ui-kit";
import { VariationControl } from "./VariationControl";
import { PersonaListContext } from "src/context/PersonaListContext";
import type { Persona as PersonaType } from "src/@types/types";

export const Persona = ({
  name,
  description,
  variationCount,
  uuid,
  isEnabled,
  img,
}: PersonaType) => {
  const { list, setList } = useContext(PersonaListContext);
  const [enableVariations, setEnableVariations] = useState(isEnabled);

  const handleEnableChange = (value: boolean) => {
    setEnableVariations(value);
    const currentPersonaIndex = list.findIndex(
      (persona) => persona.uuid === uuid
    );
    const currentList = [...list];
    currentList[currentPersonaIndex].isEnabled = value;
    setList(currentList);
  };

  return (
    <Box border="standard" borderRadius="large" padding="2u">
      <Rows spacing="2u">
        {img && <ImageCard thumbnailUrl={img} />}
        <Text variant="bold" size="large">
          {name}
        </Text>
        <Text>{description}</Text>

        <Switch
          label={enableVariations ? "Enabled" : "Not Enabled"}
          onChange={(value) => handleEnableChange(value)}
          defaultValue={enableVariations}
        />

        {enableVariations && (
          <VariationControl variationCount={variationCount} uuid={uuid} />
        )}
      </Rows>
    </Box>
  );
};
