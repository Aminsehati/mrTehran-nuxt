import {
    gql
} from "@apollo/client";
export default gql`
mutation likeTrack($id:ID!) {
  likeTrack(id:$id) {
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
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`