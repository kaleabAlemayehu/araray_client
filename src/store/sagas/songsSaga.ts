import { call, put, takeEvery } from "redux-saga/effects"
import { setSongs, setSongsError, setSongsLoading } from "../slices/songsSlice"
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

export default function* songsSaga() {
  yield takeEvery("songs/fetchSongs", handleFetchSongs)
}