import { fork } from "redux-saga/effects"
import songsSaga from "./songsSaga"
import playlistsSaga from "./playlistsSaga"
import playbackSaga from "./playbackSaga"

export default function* rootSaga() {
  yield fork(songsSaga)
  yield fork(playlistsSaga)
  yield fork(playbackSaga)
}
