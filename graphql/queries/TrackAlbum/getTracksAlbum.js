import {
  gql
} from "@apollo/client";
export default gql`
query getTracksAlbum($pagination:Pagination ,$sort:SortTrackAlbum , $filter:FilterTrackAlbum) {
  getTracksAlbum(pagination:$pagination , sort:$sort , filter:$filter) {
    _id
    album {
      _id
      name
      imgUrl
      artists {
        _id
        name
        imgUrl
        coverImgUrl
        Followers
        createdAt
        updatedAt
      }
    }
    trackName
    audioUrl
    view
    like
    createdAt
    updatedAt
  }
}
`