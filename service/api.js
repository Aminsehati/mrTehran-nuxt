import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
const api = () => {
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache()
    });
    return client
}
export default api