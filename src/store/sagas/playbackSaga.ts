import { put, takeEvery, select } from "redux-saga/effects"
import { setCurrentSong, setQueue, setCurrentIndex, nextTrack, previousTrack } from "../slices/playbackSlice"
import type { RootState } from "../store"
import type { Song } from "../../types"

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

function* handleNextTrack() {
  const { currentIndex, queue, shuffle, repeat }: { currentIndex: number; queue: Song[]; shuffle: boolean; repeat: "off" | "one" | "all" } = yield select((state: RootState) => state.playback)

  if (repeat === "one") {
    yield put(setCurrentSong(queue[currentIndex]))
    return
  }

  let nextIndex
  if (shuffle) {
    nextIndex = Math.floor(Math.random() * queue.length)
  } else {
    nextIndex = currentIndex + 1
  }

  if (nextIndex >= queue.length) {
    if (repeat === "all") {
      nextIndex = 0
    } else {
      return // End of queue
    }
  }

  yield put(setCurrentIndex(nextIndex))
  yield put(setCurrentSong(queue[nextIndex]))
}

function* handlePreviousTrack() {
  const { currentIndex, queue, shuffle }: { currentIndex: number; queue: Song[]; shuffle: boolean } = yield select((state: RootState) => state.playback)

  let prevIndex
  if (shuffle) {
    prevIndex = Math.floor(Math.random() * queue.length)
  } else {
    prevIndex = currentIndex - 1
  }

  if (prevIndex < 0) {
    prevIndex = queue.length - 1
  }

  yield put(setCurrentIndex(prevIndex))
  yield put(setCurrentSong(queue[prevIndex]))
}

export default function* playbackSaga() {
  yield takeEvery("playback/playSong", handlePlaySong)
  yield takeEvery("playback/playPlaylist", handlePlayPlaylist)
  yield takeEvery(nextTrack.type, handleNextTrack)
  yield takeEvery(previousTrack.type, handlePreviousTrack)
}
