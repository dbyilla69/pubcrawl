import styled from 'styled-components'
import Link from 'next/link'

export default () => (
	<header  style={{ textAlign: 'center' }}>
		<BackToSearch><Link href="/"><a>Search Publishers</a></Link></BackToSearch>
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

const BackToSearch = styled.div`
	text-align: left;
	margin: 20px;
`

const LogoSpan = styled.span`
	font-family: 'Arvo', serif;
	font-size: 8rem;
	font-weight: 700;
	letter-spacing: -5px;
	color: #bebebe;
	text-shadow: 0.5px 0.5px #007bff;
	-webkit-text-fill-color: #78b4f4;
	-webkit-text-stroke-width: 0.1px;
	-webkit-text-stroke-color: black;
`
const Sign = styled.img`
	max-width: 7rem;
	margin: 0 15px;
`
