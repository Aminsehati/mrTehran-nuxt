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
    let actorName = "";
    item.actors.forEach((actor, index) => {
      actorName += actor.name;
      if (item.actors.length > index + 1) {
        actorName += " & "
      }
    })
    state.ActivePlayer.ActorName = actorName
  },
  setIdPlayer(state, item) {
    state.ActivePlayer.idPlayer = item._id;
  },
  setActivePlayer(state, item) {
    state.ActivePlayer = {
      ...state.ActivePlayer,
      artists: item?.artists || [],
      trackName: item?.trackName || "",
      imgUrl: item?.imgUrl || "",
      idPlayer: item?._id || ""
    }
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
