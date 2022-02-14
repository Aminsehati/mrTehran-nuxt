export const state = () => ({
  audio: "",
  ActivePlayer: {
    player: "",
    idPlayer: "",
    audioDuration: 0,
    audioCurrentTime: 0,
    imageUrl: "",
    playing: false,
    trackName: "",
    ActorName: "",
  }
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
  setImageUrl(state, item) {
    state.ActivePlayer.imageUrl = item.imgUrl
  },
  setTrackName(state, item) {
    state.ActivePlayer.trackName = item.trackName
  },
  setActorName(state, item) {
    state.ActivePlayer.ActorName = item.actorName
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
