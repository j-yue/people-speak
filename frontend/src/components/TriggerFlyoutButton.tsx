import { Button, PlusIcon, XIcon } from "@canva/app-ui-kit";

export const TriggerFlyoutButton = ({
  open,
  ...props
}: {
  open: boolean;
  [x: string]: any;
}) => {
  return (
    <Button
      variant="secondary"
      icon={() => (!open ? <PlusIcon /> : <XIcon />)}
      iconPosition="end"
      tooltipLabel="Add a persona to your list of personas."
      stretch
      {...props}
    >
      {open ? "Cancel" : "Add a persona"}
    </Button>
  );
};
