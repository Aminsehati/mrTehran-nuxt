import {
    gql
} from "@apollo/client";
export default gql`
mutation FollowArtist($id:ID!) {
  FollowArtist(id:$id) {
    _id
    name
    imgUrl
    coverImgUrl
    Followers
    createdAt
    updatedAt
  }
}
`