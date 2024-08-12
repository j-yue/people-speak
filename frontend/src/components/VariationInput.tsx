import { NumberInput } from "@canva/app-ui-kit";
import type { VariationInputProps } from "src/@types/types";

export const VariationInput = ({
  variationCount,
  handleChange,
}: VariationInputProps) => {
  return (
    <NumberInput
      hasSpinButtons
      step={1}
      min={1}
      max={5}
      incrementAriaLabel="Increment"
      decrementAriaLabel="Decrement"
      defaultValue={variationCount}
      onChange={handleChange}
    />
  );
};
