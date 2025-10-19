import { call, put, takeEvery } from "redux-saga/effects"
import { addSong, setSongs, setSongsError, setSongsLoading } from "../slices/songsSlice"
import type { Song } from "../../types"

function* handleFetchSongs() {
  try {
    yield put(setSongsLoading(true))
    const response: Response = yield call(fetch, "http://localhost:3000/api/v1/songs")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const songs: Song[] = yield response.json()
    yield put(setSongs(songs))
  } catch (error: any) {
    yield put(setSongsError(error.message))
  }
}

function* handleCreateSong(action: any) {
  try {
    const newSong: Song = action.payload
    const response: Response = yield call(fetch, "http://localhost:3000/api/v1/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const createdSong: Song = yield response.json()
    yield put(addSong(createdSong))
  } catch (error: any) {
    yield put(setSongsError(error.message))
  }
}

export default function* songsSaga() {
  yield takeEvery("songs/fetchSongs", handleFetchSongs)
  yield takeEvery("songs/createSong", handleCreateSong)
}