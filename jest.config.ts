import type { InitialOptionsTsJest } from "ts-jest/dist/types";
import { defaults as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
  transform: {
    ...tsjPreset.transform,
  },
  verbose: true,
};
export default config;
