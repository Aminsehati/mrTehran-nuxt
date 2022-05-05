import fetch from 'cross-fetch';
import getTracksAlbum from '@/graphql/queries/TrackAlbum/getTracksAlbum'
import getTrackAlbum from '@/graphql/queries/TrackAlbum/getTrackAlbum'
import {
    ApolloClient,
    InMemoryCache,
    HttpLink
} from "@apollo/client";
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache()
});
class TrackAlbumService {
    async getTracksAlbum({ pagination, sort, filter }) {
        try {
            const { data } = await client.query({
                query: getTracksAlbum,
                variables: {
                    pagination,
                    sort,
                    filter
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getTrackAlbum(id) {
        try {
            const { data } = await client.query({
                query: getTrackAlbum,
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
export default new TrackAlbumService();