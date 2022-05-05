import {
    gql
} from "@apollo/client";
export default gql`
query getPlayList($id:ID!){
  getPlayList(id:$id) {
    _id
    name
    imgUrl
    coverImgUrl
    Followers
  }
}
`