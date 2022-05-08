import getAlbums from '@/graphql/queries/album/getAlbums'
import getAlbum from '@/graphql/queries/album/getAlbum'
import api from '../api'
class AlbumService {
    async getAlbums({ pagination }) {
        try {
            const { data } = await api.query({
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
            const { data } = await api.query({
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