export default ({ metaData, Cell }) => {
	if (!metaData || metaData.length === 0) return null;

	const metaDataCells = metaData.map(
		(metaDatum) => {
			const { name, value } = metaDatum;
			return <Cell displayKey={name} value={value} key={`${name}-${value}`} />;
		},
	);

	return (
		<div key={Math.floor(Math.random() * 100000)}>
			<h3>MetaData</h3>
			{metaDataCells}
		</div>
	);
};
