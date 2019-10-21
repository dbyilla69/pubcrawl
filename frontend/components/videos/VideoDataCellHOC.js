import styled from 'styled-components';


const LinkStyles = styled.a`
	color: ${(props) => props.theme.darkblue};
`;

const isUrl = (string) => {
	try {
		// eslint-disable-next-line no-new
		new URL(string);
		return true;
	} catch (error) {
		return false;
	}
};

const makeCellComponent = () => {
	let counter = 0;

	return ({ displayKey, value }) => {
		counter += 1;
		const isCellEven = counter % 2 === 0;

		const valueSwitch = () => {
			switch (true) {
			case isUrl(value): {
				const stringVal = value.toString();

				return <LinkStyles href={stringVal} target="_blank" rel="noopener noreferrer">{stringVal}</LinkStyles>;
			}
			case !!value: {
				return value.toString();
			}
			default: {
				return '(null)';
			}
			}
		};

		return (
			<div
				className={isCellEven ? 'cell even' : 'cell odd'}
				key={`${displayKey}:${value}${Math.floor(Math.random() * 100)}`}
			>
				<span className="key">{displayKey}:</span>
				<span>{valueSwitch()}</span>
			</div>
		);
	};
};

export default makeCellComponent;
