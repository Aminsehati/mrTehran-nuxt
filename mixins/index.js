const mixins = {
    data(){
        return {
            baseImageUrl:"https://mr-tehran-express.vercel.app/uploads/images",
            baseAudioUrl:"https://mr-tehran-express.vercel.app/uploads/audio"
        }
    },
    methods:{
        getImageUrl(src){
            return `${this.baseImageUrl}/${src}`
        },
        getAudioUrl(src){
            return `${this.baseAudioUrl}/${src}`
        }
    }
}
export default mixins