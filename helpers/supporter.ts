import type { CommonOptionItem } from "./types";

export const filterSelectOption = (input: string, option: CommonOptionItem) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
