import {
    gql
} from "@apollo/client";
export default gql`
mutation FollowPlayList($id:ID!) {
  FollowPlayList(id:$id) {
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