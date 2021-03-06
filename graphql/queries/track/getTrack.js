import {
    gql
} from "@apollo/client";
export default gql`
query getTrack($id:ID!) {
  getTrack(id:$id) {
    _id
    imgUrl
    audioUrl
    trackName
    view
    like
    artists {
      _id
      name
      imgUrl
      coverImgUrl
      Followers
    }
    playlists {
      _id
      name
      imgUrl
      coverImgUrl
      Followers
    }
    createdAt
    updatedAt
  }
}
`