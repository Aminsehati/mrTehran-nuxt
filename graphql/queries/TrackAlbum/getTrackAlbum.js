import {
    gql
} from "@apollo/client";
export default gql`
query getTrackAlbum($id:ID!) {
  getTrackAlbum(id:$id) {
    _id
    album {
      _id
      name
      imgUrl
      artists {
        _id
        name
        imgUrl
        coverImgUrl
        Followers
        createdAt
        updatedAt
      }
    }
    trackName
    audioUrl
    view
    like
    createdAt
    updatedAt
  }
}
`