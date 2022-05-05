import fetch from 'cross-fetch';
import getAlbums from '@/graphql/queries/album/getAlbums'
import getAlbum from '@/graphql/queries/album/getAlbum'
import {
    ApolloClient,
    InMemoryCache,
    HttpLink
} from "@apollo/client";
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache()
});
class AlbumService {
    async getAlbums({ pagination }) {
        try {
            const { data } = await client.query({
                query: getAlbums,
                variables: {
                    pagination
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getAlbum(id) {
        try {
            const { data } = await client.query({
                query: getAlbum,
                variables: {
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
}
export default new AlbumService();