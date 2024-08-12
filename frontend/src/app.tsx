import { useState, useEffect } from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import styles from "styles/components.css";
import { GenerateButton } from "./components/GenerateButton";
import { PersonaList } from "./components/PersonaList";
import { AddPersonaButton } from "./components/AddPersonaButton";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { PersonaListContext } from "./context/PersonaListContext";
import type { PersonaList as PersonaListType } from "./@types/types";

export const App = () => {
  const [list, setList] = useState<PersonaListType>([]);

  useLocalStorage(setList);

  useEffect(() => {
    localStorage.setItem("personaList", JSON.stringify(list));
  }, [list]);

  return (
    <PersonaListContext.Provider value={{ list, setList }}>
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          <Text size="medium">
            Use the power of AI to quickly rewrite copy so that it speaks to
            your audiences.
          </Text>
          <AddPersonaButton />
          <PersonaList />
          <Text>
            {list.filter((persona) => persona.isEnabled).length} personas
            enabled
          </Text>
          <GenerateButton />
        </Rows>
      </div>
    </PersonaListContext.Provider>
  );
};
