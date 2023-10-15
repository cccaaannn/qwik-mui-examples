import { PaletteModeContext, PrimaryColorContext } from "@/hooks/use-theme/theme-context";
import { useSignal, useVisibleTask$, noSerialize } from "@builder.io/qwik";
import type { PaletteMode, Theme } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { useContext } from '@builder.io/qwik';

const getTheme = (mode?: PaletteMode | undefined, primary?: string | undefined): Theme => {
	let theme = createTheme({
		palette: {
			mode: mode ?? "light",
			primary: {
				main: primary ?? "#C2185B"
			},
			secondary: {
				main: "#00c414"
			},
			text: {
				primary: mode === "dark" ? "#fff" : "#212121"
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none"
					}
				}
			}
		}
	});
	theme = responsiveFontSizes(theme);

	return theme;
}

const useTheme = () => {

	const paletteMode = useContext(PaletteModeContext);
	const primaryColor = useContext(PrimaryColorContext);

	const theme = useSignal<Theme | undefined>(noSerialize(getTheme(paletteMode.value, primaryColor.value)));

	useVisibleTask$(({ track }) => {
		track(() => paletteMode.value);
		track(() => primaryColor.value);

		theme.value = noSerialize(getTheme(paletteMode.value, primaryColor.value));

		if (!theme.value) {
			return;
		}

		// Update background manually, since we can't use global styles
		document.documentElement.style.background = theme.value.palette.background.default;
	});

	return {
		paletteMode,
		primaryColor,
		theme,
	}
}

export default useTheme;
