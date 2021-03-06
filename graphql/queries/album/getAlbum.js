import {
    gql
} from "@apollo/client";
export default gql`
query getAlbum($id:ID!) {
  getAlbum(id:$id) {
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