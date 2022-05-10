import {
    gql
} from "@apollo/client";
export default gql`
mutation likeTrackAlbum($id: String!) {
    likeTrackAlbum(id:$id) {
      like
      view
    }
}
`