import fetch from 'cross-fetch';
import getPlayLists from '@/graphql/queries/playList/getPlayLists.js'
import getPlayList from '@/graphql/queries/playList/getPlayList.js'
import getPlayListsCount from '@/graphql/queries/playList/getPlayListsCount'
import FollowPlayList from '@/graphql/mutations/playList/FollowPlayList'
import {
    ApolloClient,
    InMemoryCache,
    HttpLink
} from "@apollo/client";
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache()
});
class PlayListService {
    async getPlayLists({ pagination }) {
        try {
            const { data } = await client.query({
                query: getPlayLists,
                variables: {
                    pagination
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getPlayList(id) {
        try {
            const { data } = await client.query({
                query: getPlayList,
                variables: {
                    id
                }
            });
            return data
        } catch (error) {
            return error
        }
    }
    async getPlayListsCount() {
        try {
            const { data } = await client.query({
                query: getPlayListsCount
            });
            return data
        } catch (error) {
            return error
        }
    }
    async FollowPlayList(id) {
        try {
            const { data } = await client.mutate({
                mutation: FollowPlayList,
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
export default new PlayListService();