import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withData from '../lib/withData';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		// This block crawls the page to see if there are any mutations or queries that need to be run before render
		// It fires them before rendering and then returns that data into pageProps
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		// this exposes the query to the user
		pageProps.query = ctx.query;
		return { pageProps };
	}

	render() {
		const { Component, apollo, pageProps } = this.props;

		return (
			<>
				<Head>
					<link
						rel="shortcut icon"
						type="image/x-icon"
						href="/favicon.ico"
					/>
					<title>Pub Crawler</title>
				</Head>
				<ApolloProvider client={apollo}>
					<Page>
						<Component {...pageProps} />
					</Page>
				</ApolloProvider>
			</>
		);
	}
}

export default withData(MyApp);
