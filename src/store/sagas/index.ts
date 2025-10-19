import { fork } from "redux-saga/effects"
import songsSaga from "./songsSaga"
import playlistsSaga from "./playlistsSaga"
import playbackSaga from "./playbackSaga"
import statsSaga from "./statsSaga"

export default function* rootSaga() {
  yield fork(songsSaga)
  yield fork(playlistsSaga)
  yield fork(playbackSaga)
  yield fork(statsSaga)
}
