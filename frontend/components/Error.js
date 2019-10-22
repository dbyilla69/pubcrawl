export default (props) => (
	<div style={{ maxWidth: '900px', margin: '0 auto' }}>
		<h2>Oh no! There was a problem</h2>
		<p>{props.error.message}</p>
	</div>
);
