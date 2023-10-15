import { Slot, component$, useSignal } from '@builder.io/qwik'
import type { PaletteMode } from '@mui/material';
import { PaletteModeContext, PrimaryColorContext } from './theme-context';
import { useContextProvider } from '@builder.io/qwik';

export const ThemeProvider = component$(() => {
	const paletteMode = useSignal<PaletteMode>("light");
	const primaryColor = useSignal<string | undefined>(undefined);
	useContextProvider(PaletteModeContext, paletteMode);
	useContextProvider(PrimaryColorContext, primaryColor);
	return <Slot />
})
