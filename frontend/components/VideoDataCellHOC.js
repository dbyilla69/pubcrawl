const makeCellComponent = () => {
	let counter = 0;

	return ({ displayKey, value }) => {
		counter += 1;
		const isCellEven = counter % 2 === 0;

		return (
			<div
				className={isCellEven ? 'cell even' : 'cell odd'}
				key={`${displayKey}:${value}${Math.floor(Math.random() * 100)}`}
			>
				<span className="key">{displayKey}:</span>
				<span>{value ? value.toString() : '(null)'}</span>
			</div>
		);
	};
};

export default makeCellComponent;
