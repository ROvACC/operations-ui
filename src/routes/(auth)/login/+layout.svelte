<script>
	import 'carbon-components-svelte/css/g10.css';
	import { Header, Content, Grid, Row, Column } from 'carbon-components-svelte';
</script>

<Header company="ROvACC" platformName="Operations" />

<Content>
	<Grid>
		<Row>
			<Column>
				<slot />
			</Column>
		</Row>
	</Grid>
</Content>
