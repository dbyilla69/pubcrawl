import styled from 'styled-components'

export default () => (
	<header style={{textAlign: 'center'}}>
        <LogoSpan>
            <span>Pub</span>
            <SpinningSign
                src="http://cdn.taboola.com/static/impl/png/pubcrawl-transparent.png"
                alt="pubcrawl-logo"
            />
            <span>Crawler</span>
        </LogoSpan>
	</header>
)


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
const SpinningSign = styled.img`
    max-width: 7rem;
    margin: 0 15px;
    animation: animatePerson infinite 100s linear;

    @keyframes animatePerson {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`