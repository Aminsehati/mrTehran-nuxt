import {
    gql
} from "@apollo/client";
export default gql`
query getTrackAlbum($id:ID!) {
  getTrackAlbum(id:$id) {
    _id
    albumID
    trackName
    audioUrl
    view
    like
    createdAt
    updatedAt
  }
}
`