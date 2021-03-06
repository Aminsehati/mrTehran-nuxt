import {
    gql
} from "@apollo/client";
export default gql`
query getTracks($pagination:Pagination , $sort:sortTrack , $filter:filterTrack) {
  getTracks(pagination:$pagination , sort:$sort , filter:$filter) {
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
      coverImgUrl
      Followers
    }
    playlists {
      _id
      name
      imgUrl
      coverImgUrl
      Followers
    }
    createdAt
    updatedAt
  }
}
`