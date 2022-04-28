import { uniqBy } from 'lodash'
export const state = () => ({
  audio: "",
  ActivePlayer: {
    idPlayer: "",
    audioDuration: 0,
    audioCurrentTime: 0,
    imgUrl: "",
    playing: false,
    trackName: "",
    artists: [],
    hasAlbum: false,
    albumID: ""
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
      idPlayer: item?._id || "",
      hasAlbum: item?.hasAlbum || false,
      albumID: item?.hasAlbum ? item.albumID : ""
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
  addToPlayerLists(state, item) {
    const hasListPlay = state.lists.some(list => list._id === item._id);
    if (!hasListPlay) {
      state.lists.push(item)
    }
  },
  nextActivePlayer(state) {
    const indexItem = state.lists.findIndex(list => list._id === state.ActivePlayer.idPlayer);
    if (indexItem > -1 && indexItem !== 0) {
      const item = state.lists[indexItem - 1];
      state.ActivePlayer = {
        ...state.ActivePlayer,
        artists: item?.artists || [],
        trackName: item?.trackName || "",
        imgUrl: item?.imgUrl || "",
        idPlayer: item?._id || ""
      }
      state.ActivePlayer.playing = true;
      state.audio.play();
    }
  },
  setListsPlayer(state, items) {
    const data = [...state.lists, ...items];
    const item = uniqBy(data, function (e) {
      return e._id;
    });
    state.lists = item ;
  }
}
export const getters = {
  getAudio(state) {
    return state.audio
  },
  getActivePlayer(state) {
    return state.ActivePlayer
  },
  getLists(state) {
    return state.lists
  }
}
