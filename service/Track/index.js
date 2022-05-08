import fetch from 'cross-fetch';
import getTracks from '@/graphql/queries/track/getTracks'
import getTrack from '@/graphql/queries/track/getTrack'
import getTracksCount from '@/graphql/queries/track/getTracksCount'
import likeTrack from '@/graphql/mutations/track/likeTrack'
import viewTrack from '@/graphql/mutations/track/viewTrack'
import api from '@/service/api'
class TrackService {
    async getTracks({ pagination, sort, filter }) {
        try {
            const { data } = await api.query({
                query: getTracks,
                variables: {
                    pagination,
                    sort,
                    filter
                }
            });
            return data
        } catch (error) {
            console.log(error, 'error')
            return error
        }
    }
    async getTrack(id) {
        try {
            const { data } = await api.query({
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
            const { data } = await api.query({
                query: getTracksCount
            });
            return data
        } catch (error) {
            return error
        }
    }
    async likeTrack(id) {
        try {
            const { data } = await api.mutate({
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
            const { data } = await api.mutate({
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