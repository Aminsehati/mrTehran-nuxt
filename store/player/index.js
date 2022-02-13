export const state = () => ({
  audio: "",
  ActivePlayer: {
    player: "",
    idPlayer: "",
    audioDuration: 0,
    audioCurrentTime: 0,
    imageUrl: "",
    audioUrl:"",
    playing: false,
  }
})
export const mutations = {
  setActivePlayer(state, item) {
    state.audio = item;
  },
  setAudio(state, item) {
    console.log(item);
    state.audio = item
    // state.audio.src = "https://mr-tehran-express.vercel.app/uploads/audio/Hichkas_Ye-Mosht-Sarbaz.mp3";
  },
  setChangeStatusPlaying(state, falg) {
    state.ActivePlayer.playing = falg;
  },
  setAudioDuration(state, item) {
    state.ActivePlayer.audioDuration = item;
  },
  setAudioCurrentTime(state, item) {
    state.ActivePlayer.audioCurrentTime = item;
  },
  setImageUrl(state,item){
      state.ActivePlayer.imageUrl = item.imgUrl
  },
}
export const getters = {
  getAudio(state) {
    return state.audio
  },
  getActivePlayer(state) {
    return state.ActivePlayer
  }
}
