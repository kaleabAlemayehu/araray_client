import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { setPlaylists, createPlaylist, updatePlaylist, deletePlaylistSuccess, setPlaylistsError } from "../slices/playlistsSlice"
import { Playlist } from "../../types"


function* handleFetchPlaylists() {
  try {
    const response: Response = yield call(fetch, `${import.meta.env.VITE_API_URL}/playlists`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const playlists: Playlist[] = yield response.json()
    const playlistWithId = playlists.map((playlist) => ({ ...playlist, id: playlist._id }))
    yield put(setPlaylists(playlistWithId))
  } catch (error: any) {
    yield put(setPlaylistsError(error.message))
  }
}

function* handleCreatePlaylist(action: any) {
  try {
    const newPlaylist: Playlist = action.payload
    const response: Response = yield call(fetch, `${import.meta.env.VITE_API_URL}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlaylist),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const createdPlaylist: Playlist = yield response.json()
    const playlistWithId = { ...createdPlaylist, id: createdPlaylist._id }
    yield put(createPlaylist(playlistWithId))
  } catch (error: any) {
    yield put(setPlaylistsError(error.message))
  }
}

function* handleUpdatePlaylist(action: any) {
  try {
    yield put(updatePlaylist(action.payload))
  } catch (error) {
    console.error("Error updating playlist:", error)
  }
}

function* handleDeletePlaylist(action: any) {
  try {
    const response: Response = yield call(fetch, `${import.meta.env.VITE_API_URL}/playlists/${action.payload}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    yield put(deletePlaylistSuccess(action.payload))
  } catch (error: any) {
    yield put(setPlaylistsError(error.message))
  }
}

export default function* playlistsSaga() {
  yield takeEvery("playlists/fetchPlaylists", handleFetchPlaylists)
  yield takeLatest("playlists/createPlaylist", handleCreatePlaylist)
  yield takeEvery("playlists/updatePlaylist", handleUpdatePlaylist)
  yield takeEvery("playlists/deletePlaylist", handleDeletePlaylist)
  yield takeEvery("playlists/addSongToPlaylist", handleCreatePlaylist)
  yield takeEvery("playlists/removeSongFromPlaylist", handleDeletePlaylist)
}
