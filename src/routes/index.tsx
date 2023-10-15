import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import {
	Box,
	Container,
	Typography,
	TooltipTypography,
	TooltipChip,
	Button,
	IconButton,
	Alert,
	CircularProgress,
	TextField,
	ComboBox,
	LocaleComboBox,
} from '@/integrations/react/mui'

import useTheme from '@/hooks/use-theme/useTheme';

const themes: Record<number, string> = {
	0: "#C2185B",
	1: "#1cb807",
	2: "#098dca"
}

export default component$(() => {

	type Multiselect = { label: string, value: string };

	const { theme, paletteMode, primaryColor } = useTheme();

	const selectedTheme = useSignal<number>(0);
	const multiselect = useSignal<Multiselect[]>([{ label: "chip1", value: "chip1" }]);

	useVisibleTask$(({ track }) => {
		track(() => selectedTheme.value);
		primaryColor.value = themes[selectedTheme.value]
	});

	return (
		<>
			<Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, my: 5 }}>

				<Box display="flex" alignItems="center" gap={2}>
					<Typography theme={theme.value} color="text.primary" typography="h4">
						Selected chips {multiselect.value.map(v => v.value).join(" ")}
					</Typography>

					<TooltipTypography theme={theme.value} color="text.primary" TooltipProps={{ title: "Tooltip" }} typography="h5">
						Typography with tooltip
					</TooltipTypography>

					<TooltipChip theme={theme.value} color="primary" TooltipProps={{ title: "Tooltip" }}>
						Chip
					</TooltipChip>
				</Box>

				<Box display="flex" alignItems="center" gap={2}>
					<Button
						theme={theme.value}
						variant='contained'
						onClick$={() => { selectedTheme.value = (selectedTheme.value + 1) % Object.keys(themes).length }}
					>
						Change theme color
					</Button>

					<Alert theme={theme.value} severity="info">
						Theme is: {paletteMode.value}
					</Alert>

					<IconButton
						theme={theme.value}
						onClick$={() => {
							paletteMode.value === "light" ? paletteMode.value = "dark" : paletteMode.value = "light"
						}}
					>
						{
							paletteMode.value === "light"
								?
								<span class="material-symbols-outlined">light_mode</span>
								:
								<span class="material-symbols-outlined">dark_mode</span>
						}
					</IconButton>
				</Box>

				<Box display="flex" alignItems="center" gap={2}>
					<TextField
						theme={theme.value}
						label="TextField"
					/>

					<CircularProgress theme={theme.value} color="primary" />
				</Box>

				<Box minWidth={250} display="flex" flexDirection="column" gap={2}>
					<LocaleComboBox theme={theme.value} />

					<ComboBox
						theme={theme.value}
						options={["test1", "test2"]}
						TextFieldProps={{ label: "test 123" }}
					/>

					<ComboBox
						theme={theme.value}
						multiple
						options={[
							{
								label: "chip1",
								value: "chip1"
							},
							{
								label: "chip2",
								value: "chip2"
							},
							{
								label: "chip3",
								value: "chip3"
							},
						]}
						TextFieldProps={{ label: "Multiple" }}
						value={multiselect.value}
						onChange$={(_, val) => { multiselect.value = val as Multiselect[] }}
					/>
				</Box>

			</Container>
		</>
	);
});
