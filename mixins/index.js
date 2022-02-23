import moment from "jalali-moment"
const mixins = {
  data() {
    return {
      baseImageUrl: "http://localhost:3001/uploads/images",
      baseAudioUrl: "http://localhost:3001/uploads/audio"
    }
  },
  methods: {
    getImageUrl(src) {
      return `${this.baseImageUrl}/${src}`
    },
    getAudioUrl(src) {
      return `${this.baseAudioUrl}/${src}`
    },
    convertDate(date){
        return moment(date,'YYYY-MM-DD').format('YYYY-MM-DD')
    }
  },
}
export default mixins
