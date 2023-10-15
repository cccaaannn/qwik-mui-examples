import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { PaletteMode } from "@mui/material";

export const PaletteModeContext = createContextId<Signal<PaletteMode>>('palette-mode-context');
export const PrimaryColorContext = createContextId<Signal<string | undefined>>('primary-color-context');
