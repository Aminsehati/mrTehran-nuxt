import {
    gql
} from "@apollo/client";
export default gql`
query getArtist($id:ID!) {
  getArtist(id:$id) {
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