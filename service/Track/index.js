import getTracks from '@/graphql/queries/track/getTracks'
import getTrack from '@/graphql/queries/track/getTrack'
import getTracksCount from '@/graphql/queries/track/getTracksCount'
import likeTrack from '@/graphql/mutations/track/likeTrack'
import viewTrack from '@/graphql/mutations/track/viewTrack'
import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});
class TrackService {
    async getTracks({ pagination, sort, filter }) {
        try {
            const { data } = await client.query({
                query: getTracks,
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
    async getTrack(id) {
        try {
            const { data } = await client.query({
                query: getTrack,
                variables: {
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getTracksCount() {
        try {
            const { data } = await client.query({
                query: getTracksCount
            });
            return data
        } catch (error) {
            return error
        }
    }
    async likeTrack(id) {
        try {
            const { data } = await client.mutate({
                mutation: likeTrack,
                variables: {
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async viewTrack(id) {
        try {
            const { data } = await client.mutate({
                mutation: viewTrack,
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
export default new TrackService();