import getTracksAlbum from '@/graphql/queries/TrackAlbum/getTracksAlbum'
import getTrackAlbum from '@/graphql/queries/TrackAlbum/getTrackAlbum'
import viewTrackAlbum from '@/graphql/mutations/TrackAlbum/viewTrackAlbum'
import likeTrackAlbum from '@/graphql/mutations/TrackAlbum/likeTrackAlbum'
import api from '@/service/api'
class TrackAlbumService {
    async getTracksAlbum({ pagination, sort, filter }) {
        try {
            const { data } = await api.query({
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
            const { data } = await api.query({
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
    async viewTrackAlbum(id){
        try {
            const { data } = await api.mutate({
                mutation: viewTrackAlbum,
                variables: {
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async likeTrackAlbum(id){
        try {
            const { data } = await api.mutate({
                mutation: likeTrackAlbum,
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