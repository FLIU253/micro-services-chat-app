import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	uri: `${process.env.API_GATE_WAY_URI}/graphql`,
	cache: new InMemoryCache(),
	credentials: 'include',
});

export default apolloClient;
