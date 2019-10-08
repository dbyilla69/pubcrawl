import styled from 'styled-components'

export default () => (
	<header style={{ textAlign: 'center' }}>
		<LogoSpan>
			<span>Pub</span>
			<Sign
				src="http://cdn.taboola.com/static/impl/png/pubcrawl-transparent.png"
				alt="pub crawler logo"
			/>
			<span>Crawler</span>
		</LogoSpan>
	</header>
)

const LogoSpan = styled.span`
	font-family: serif;
	font-size: 8rem;
	font-weight: 700;
	letter-spacing: -5px;
	color: #bebebe;
	text-shadow: 1.5px 1.5px #007bff, -1.5px 1.5px #007bff, 1.5px -1.5px #007bff,
		-1.5px -1.5px #007bff;
	-webkit-text-fill-color: #78b4f4;
	-webkit-text-stroke-width: 0.1px;
	-webkit-text-stroke-color: black;
`
const Sign = styled.img`
	max-width: 7rem;
	margin: 0 15px;
`
