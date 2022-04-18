export const state = () => ({
  audio: "",
  ActivePlayer: {
    idPlayer: "",
    audioDuration: 0,
    audioCurrentTime: 0,
    imgUrl: "",
    playing: false,
    trackName: "",
    artists: []
  },
  lists: []
})
export const mutations = {
  setActivePlayer(state, item) {
    state.audio = item;
  },
  setAudio(state, item) {
    state.audio = item
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
  setActivePlayer(state, item) {
    state.ActivePlayer = {
      ...state.ActivePlayer,
      artists: item?.artists || [],
      trackName: item?.trackName || "",
      imgUrl: item?.imgUrl || "",
      idPlayer: item?._id || ""
    }
  },
  resetActivePlayer(state) {
    state.ActivePlayer = {
      ...state.ActivePlayer,
      artists: [],
      trackName: "",
      imgUrl: "",
      idPlayer: "",
      audioDuration: 0,
      audioCurrentTime: 0
    }
  },
  addToPlayerLists(state) {
    console.log(state);
  }
}
export const getters = {
  getAudio(state) {
    return state.audio
  },
  getActivePlayer(state) {
    return state.ActivePlayer
  }
}
