import { useEffect, useState, useContext } from "react";
import { Text, Button, OpenInNewIcon, ProgressBar } from "@canva/app-ui-kit";
import { requestOpenExternalUrl } from "@canva/platform";
import { useSelection } from "utils/use_selection_hook";
import { PersonaListContext } from "src/context/PersonaListContext";

const ErrorMessage = () => {
  return <Text tone="critical">Unable to fetch responses.</Text>;
};

export const GenerateButton = () => {
  const currentSelection = useSelection("plaintext");
  const [currentText, setCurrentText] = useState("");

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("");

  const [progressValue, setProgressValue] = useState(0);

  const { list } = useContext(PersonaListContext);

  const isButtonDisabled =
    currentSelection.count !== 1 ||
    isLoading ||
    list.filter((persona) => persona.isEnabled).length < 1;

  useEffect(() => {
    const getSelectionText = async () => {
      const draft = await currentSelection.read();
      try {
        setCurrentText(draft.contents[0].text);
      } catch (error) {
        console.log(error);
      }
    };
    getSelectionText();
  }, [currentSelection]);

  const handleClick = async () => {
    setShowError(false);
    setIsLoading(true);

    // filter list for enabled personas
    const enabledPersonas = list.filter((persona) => persona.isEnabled);

    // prune list
    const prunedEnabledPersonas = enabledPersonas.map(
      ({ name, description, variationCount }) => {
        return { name, description, variationCount };
      }
    );

    try {
      setProgressValue(0);

      // build llm query
      const endpoint = `${BACKEND_HOST}/ai`;
      const url = `${endpoint}/?passage=${currentText}&personas=${JSON.stringify(
        prunedEnabledPersonas
      )}`;

      // make llm request
      setApiStatus("Generating AI response...");
      setProgressValue(25);
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);

      setApiStatus("Receiving AI response...");
      const json = await response.json();

      // convert llm response to excel file
      setApiStatus("Converting AI response to Excel...");
      setProgressValue(100);
      await requestOpenExternalUrl({
        url: `${BACKEND_HOST}/excel/?data=${json.response}`,
      });

      setIsLoading(false);
    } catch (error) {
      setShowError(true);
    }

    // reset
    setProgressValue(0);
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && (
        <Button
          variant="primary"
          icon={() => <OpenInNewIcon />}
          iconPosition="end"
          disabled={isButtonDisabled}
          onClick={handleClick}
          loading={isLoading}
        >
          Export to Data Autofill
        </Button>
      )}

      {showError && <ErrorMessage />}
      {isLoading && <Text>{apiStatus}</Text>}
      {isLoading && (
        <ProgressBar
          value={progressValue}
          size="medium"
          ariaLabel="Waiting for the model to generate a response."
        />
      )}
    </>
  );
};
