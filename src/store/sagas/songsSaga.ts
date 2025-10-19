import { put, takeEvery } from "redux-saga/effects"
import { addSong, updateSong, deleteSong } from "../slices/songsSlice"

function* handleAddSong(action: any) {
  try {
    // Placeholder for API call
    yield put(addSong(action.payload))
  } catch (error) {
    console.error("Error adding song:", error)
  }
}

function* handleUpdateSong(action: any) {
  try {
    // Placeholder for API call
    yield put(updateSong(action.payload))
  } catch (error) {
    console.error("Error updating song:", error)
  }
}

function* handleDeleteSong(action: any) {
  try {
    // Placeholder for API call
    yield put(deleteSong(action.payload))
  } catch (error) {
    console.error("Error deleting song:", error)
  }
}

export default function* songsSaga() {
  yield takeEvery("songs/addSong", handleAddSong)
  yield takeEvery("songs/updateSong", handleUpdateSong)
  yield takeEvery("songs/deleteSong", handleDeleteSong)
}
