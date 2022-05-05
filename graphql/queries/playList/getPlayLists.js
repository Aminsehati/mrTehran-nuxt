import {
    gql
} from "@apollo/client";
export default gql`
 query getPlayLists($pagination:Pagination){
  getPlayLists(pagination:$pagination) {
    _id
    name
    imgUrl
    coverImgUrl
    Followers
  }
}
`