<script>
	import { Tile, Button, Grid, Row, Column } from 'carbon-components-svelte';
</script>

<Tile>
	<Grid>
		<Row>
			<!-- <Column sm={1} md={{ span: 4, offset: 1 }}> -->
			<Column aspectRatio="2x1">
				<h2>Welcome to ROvACC Operations Portal</h2>
				<p>
					The fully integrated portal with the day to day VATSIM operations. Here you can find all
					information needed while operating in ROvACC
				</p>
				<h4>Booking</h4>
				<p>Book your slot for controlling online</p>
				<h4>Training</h4>
				<p>
					Sing up for training to get your next VATSIM rating endorsment in our division. Schedule
					sessions with your mentor and get all the documentation you need
				</p>
				<h4>Visiting</h4>
				<p>
					If you are currently part of another VATSIM division and want to control in ROvACC as a
					visiting member you can sign in and start your local training
				</p>
				<Button href="/login/redirect">Login with VATSIM</Button>
			</Column>
		</Row>
	</Grid>
</Tile>

<style>
	p {
		padding: 1rem 0;
	}
</style>
