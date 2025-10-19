import { call, put, takeEvery, select } from "redux-saga/effects"
import { addSong, setSongs, setSongsError, setSongsLoading, deleteSongSuccess } from "../slices/songsSlice"
import type { Song } from "../../types"

function* handleFetchSongs() {
  try {
    yield put(setSongsLoading(true))
    const response: Response = yield call(fetch, "http://localhost:3000/api/v1/songs")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const songs: Song[] = yield response.json()
    const songsWithId = songs.map((song) => ({ ...song, id: song._id }))
    yield put(setSongs(songsWithId))
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
    const songWithId = { ...createdSong, id: createdSong._id }
    yield put(addSong(songWithId))
  } catch (error: any) {
    yield put(setSongsError(error.message))
  }
}

function* handleUpdateSong(action: any) {
  try {
    const updatedSong: Song = action.payload
    const response: Response = yield call(fetch, `http://localhost:3000/api/v1/songs/${updatedSong._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSong),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error: any) {
    yield put(setSongsError(error.message))
  }
}

function* handleDeleteSong(action: any) {
  try {
    const songId: string = action.payload
    const songs: Song[] = yield select((state) => state.songs.items)
    const songToDelete = songs.find((s) => s.id === songId)

    if (!songToDelete) {
      throw new Error("Song not found")
    }

    const response: Response = yield call(fetch, `http://localhost:3000/api/v1/songs/${songToDelete._id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    yield put(deleteSongSuccess(songId))
  } catch (error: any) {
    yield put(setSongsError(error.message))
  }
}

export default function* songsSaga() {
  yield takeEvery("songs/fetchSongs", handleFetchSongs)
  yield takeEvery("songs/createSong", handleCreateSong)
  yield takeEvery("songs/updateSong", handleUpdateSong)
  yield takeEvery("songs/deleteSong", handleDeleteSong)
}