import {
    gql
} from "@apollo/client";
export default gql`
mutation viewTrack($id:ID!) {
  viewTrack(id:$id) {
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
      name
      coverImgUrl
      Followers
    }
    createdAt
    updatedAt
  }
}
`