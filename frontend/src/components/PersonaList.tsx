import { useContext } from "react";
import { Scrollable, Rows, Box } from "@canva/app-ui-kit";
import { Persona } from "./Persona";
import { PersonaListContext } from "src/context/PersonaListContext";

export const PersonaList = () => {
  const { list } = useContext(PersonaListContext);

  return (
    <div style={{ height: "70vh" }}>
      <Box height="full">
        <Scrollable>
          <Rows spacing="2u">
            {list.map(({ uuid, ...props }) => (
              <Persona {...props} uuid={uuid} key={uuid} />
            ))}
          </Rows>
        </Scrollable>
      </Box>
    </div>
  );
};
