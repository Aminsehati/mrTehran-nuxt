import {
    gql
} from "@apollo/client";
export default gql`
query getTracksAlbum($pagination:Pagination ,$sort:SortTrackAlbum , $filter:FilterTrackAlbum) {
  getTracksAlbum(pagination:$pagination , sort:$sort , filter:$filter) {
    _id
    albumID
    trackName
    audioUrl
    view
    like
    createdAt
    updatedAt
  }
}
`