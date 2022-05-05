import fetch from 'cross-fetch';
import getArtists from '@/graphql/queries/artist/getArtists'
import getArtist from '@/graphql/queries/artist/getArtist'
import getArtistsCount from '@/graphql/queries/artist/getArtistsCount'
import FollowArtist from '@/graphql/mutations/artist/FollowArtist'
import {
    ApolloClient,
    InMemoryCache,
    HttpLink
} from "@apollo/client";
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache()
});
class ArtistService {
    async getArtists({ pagination, sort }) {
        try {
            const { data } = await client.query({
                query: getArtists,
                variables: {
                    pagination,
                    sort
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getArtist(id) {
        try {
            const { data } = await client.query({
                query: getArtist,
                variables: {
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getArtistsCount() {
        try {
            const { data } = await client.query({
                query: getArtistsCount
            });
            return data
        } catch (error) {
            return error
        }
    }
    async FollowArtist(id) {
        try {
            const { data } = await client.mutate({
                mutation: FollowArtist,
                variables:{
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
}
export default new ArtistService();