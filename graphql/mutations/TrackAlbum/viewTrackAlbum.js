import {
    gql
} from "@apollo/client";
export default gql`
mutation viewTrackAlbum($id:String!) {
    viewTrackAlbum(id:$id) {
     view
      like
    }
}
`