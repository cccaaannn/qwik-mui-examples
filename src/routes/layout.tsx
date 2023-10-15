import { Slot, component$ } from '@builder.io/qwik'
import { ThemeProvider } from '@/hooks/use-theme/theme-provider';
import { CssBaseline } from '@/integrations/react/mui';

export default component$(() => {
	return (
		<ThemeProvider>
			<CssBaseline />
			<Slot />
		</ThemeProvider>
	);
});
