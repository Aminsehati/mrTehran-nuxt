import {
    gql
} from "@apollo/client";
export default gql`
query getArtists($pagination:Pagination , $sort:sortArtists) {
  getArtists(pagination:$pagination , sort:$sort) {
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