import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import { render } from 'react-dom';
import Root from './components/Root';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '#root/api/apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	html, body {
		margin: 0;
		padding: 0;
	}

	html, body, #app {
		height: 100%;
		width: 100%;
	}
`;

render(
	<ApolloProvider client={apolloClient}>
		<RecoilRoot>
			<BrowserRouter>
				<GlobalStyles />
				<Root />
			</BrowserRouter>
		</RecoilRoot>
	</ApolloProvider>,
	document.getElementById('app')
);
