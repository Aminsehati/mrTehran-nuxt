import {
    gql
} from "@apollo/client";
export default gql`
query getAlbums($pagination:Pagination) {
  getAlbums(pagination:$pagination) {
    _id
    name
    imgUrl
    artists {
      _id
      name
      imgUrl
      coverImgUrl
      Followers
    }
  }
}
`