import { put, takeEvery } from "redux-saga/effects"
import { setCurrentSong, setQueue, setCurrentIndex } from "../slices/playbackSlice"

function* handlePlaySong(action: any) {
  try {
    yield put(setCurrentSong(action.payload.song))
    yield put(setQueue(action.payload.queue || [action.payload.song]))
    yield put(setCurrentIndex(0))
  } catch (error) {
    console.error("Error playing song:", error)
  }
}

function* handlePlayPlaylist(action: any) {
  try {
    const songs = action.payload.songs
    if (songs.length > 0) {
      yield put(setCurrentSong(songs[0]))
      yield put(setQueue(songs))
      yield put(setCurrentIndex(0))
    }
  } catch (error) {
    console.error("Error playing playlist:", error)
  }
}

export default function* playbackSaga() {
  yield takeEvery("playback/playSong", handlePlaySong)
  yield takeEvery("playback/playPlaylist", handlePlayPlaylist)
}
