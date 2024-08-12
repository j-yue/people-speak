import { useContext, useState } from "react";
import {
  Rows,
  Box,
  Button,
  Flyout,
  FormField,
  TextInput,
  MultilineInput,
  FileInput,
  FileInputItem,
} from "@canva/app-ui-kit";
import { VariationInput } from "./VariationInput";
import { TriggerFlyoutButton } from "./TriggerFlyoutButton";
import { PersonaListContext } from "src/context/PersonaListContext";

export const AddPersonaButton = () => {
  const { list, setList } = useContext(PersonaListContext);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variationCount, setVariationCount] = useState(2);

  let newUUID = crypto.randomUUID();

  // ensure that the uuid for new persona is unique to the existing persona list
  while (list.some((persona) => persona.uuid === newUUID)) {
    newUUID = crypto.randomUUID();
  }

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  const handleAddPersona = async () => {
    // create img url if image uploaded
    const imgUrl = img.length > 0 ? URL.createObjectURL(img[0]) : "";

    const persona = {
      name,
      description,
      variationCount,
      uuid: newUUID,
      isEnabled: true,
      img: imgUrl,
    };

    // update persona list
    setList([persona, ...list]);
    setOpen(false);

    // reset fields
    setName("");
    setDescription("");
    setVariationCount(2);
  };

  return (
    <Flyout
      title="Add a persona"
      description="Add a persona to your list of personas."
      width="trigger"
      open={open}
      trigger={<TriggerFlyoutButton open={open} onClick={handleTriggerClick} />}
    >
      <Box padding="2u">
        <Rows spacing="2u">
          <FormField
            control={() => {
              return (
                <>
                  <FileInput
                    multiple={false}
                    accept={["image/*"]}
                    onDropAcceptedFiles={(e) => setImg(e)}
                  />
                  {img.length > 0 && (
                    <FileInputItem
                      label={img[0]?.name || ""}
                      onDeleteClick={() => setImg([])}
                    />
                  )}
                </>
              );
            }}
            label="Image"
            description="An optional image for your persona."
          />
          <FormField
            control={() => (
              <TextInput
                placeholder="Sarah"
                type="text"
                value={name}
                onChange={(e) => setName(e)}
              />
            )}
            description="A label or name for your persona."
            label="Name"
          />
          <FormField
            control={() => (
              <MultilineInput
                placeholder="New college grad, just joined the workforce."
                value={description}
                onChange={(e) => setDescription(e)}
              />
            )}
            description="Description of your persona."
            label="Description"
          />

          <FormField
            label="# of variations"
            control={() => (
              <VariationInput
                variationCount={variationCount}
                handleChange={(value) => setVariationCount(value)}
              />
            )}
          />

          <Button
            variant="primary"
            type="submit"
            onClick={handleAddPersona}
            disabled={!name || !description || !variationCount}
          >
            Add persona to list
          </Button>
        </Rows>
      </Box>
    </Flyout>
  );
};
