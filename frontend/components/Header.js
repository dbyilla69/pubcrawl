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
	font-size: 8rem;
	font-weight: 200;
	letter-spacing: 5px;
	color: ${props => props.theme.darkblue};
`
const Sign = styled.img`
	max-width: 7rem;
	margin: 0 15px;
`
