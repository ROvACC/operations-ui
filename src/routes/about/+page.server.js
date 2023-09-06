export async function load() {
	const response = await fetch('https://metar.vatsim.net/metar.php?id=LROP');
	const metar = response.ok ? response.text() : '';
	return {
		today: new Date().toISOString(),
		metar
	};
}
