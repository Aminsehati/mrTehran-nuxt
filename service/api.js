import fetch from 'cross-fetch';
import {
    ApolloClient,
    InMemoryCache,
    HttpLink
} from "@apollo/client";
 const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache()
});
export default client