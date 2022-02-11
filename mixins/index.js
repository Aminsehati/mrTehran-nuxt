const mixins = {
    data(){
        return {
            baseImageUrl:"https://mr-tehran-express.vercel.app/uploads/images"
        }
    },
    methods:{
        getImageUrl(src){
            return `${this.baseImageUrl}/${src}`
        }
    }
}
export default mixins