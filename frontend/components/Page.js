import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';

const theme = {
	blue: '#00b3e6',
	lightblue: '#96c6f9',
	darkblue: '#007bff',
	yellow: '#ffcc74',
	black: '#393939',
	grey: '#3A3A3A',
	lightgrey: '#E9E9E9',
	offWhite: '#EDEDED',
	maxWidth: '2000px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.main`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-size: 10px;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		padding: 0;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
	}
	a {
		text-decoration: none;
		color: ${theme.black};
	}
`;

export default (props) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<StyledPage>
			<Header />
			<Inner>{props.children}</Inner>
		</StyledPage>
	</ThemeProvider>
);
