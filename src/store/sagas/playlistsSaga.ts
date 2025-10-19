import { put, takeEvery } from "redux-saga/effects"
import { createPlaylist, updatePlaylist, deletePlaylist } from "../slices/playlistsSlice"

function* handleCreatePlaylist(action: any) {
  try {
    yield put(createPlaylist(action.payload))
  } catch (error) {
    console.error("Error creating playlist:", error)
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
    yield put(deletePlaylist(action.payload))
  } catch (error) {
    console.error("Error deleting playlist:", error)
  }
}

export default function* playlistsSaga() {
  yield takeEvery("playlists/createPlaylist", handleCreatePlaylist)
  yield takeEvery("playlists/updatePlaylist", handleUpdatePlaylist)
  yield takeEvery("playlists/deletePlaylist", handleDeletePlaylist)
  yield takeEvery("playlists/addSongToPlaylist", handleCreatePlaylist)
  yield takeEvery("playlists/removeSongFromPlaylist", handleDeletePlaylist)
}
