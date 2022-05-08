import getArtists from '@/graphql/queries/artist/getArtists'
import getArtist from '@/graphql/queries/artist/getArtist'
import getArtistsCount from '@/graphql/queries/artist/getArtistsCount'
import FollowArtist from '@/graphql/mutations/artist/FollowArtist'
import api from '../api'
class ArtistService {
    async getArtists({ pagination, sort }) {
        try {
            const { data } = await api.query({
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
            const { data } = await api.query({
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
            const { data } = await api.query({
                query: getArtistsCount
            });
            return data
        } catch (error) {
            return error
        }
    }
    async FollowArtist(id) {
        try {
            const { data } = await api.mutate({
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