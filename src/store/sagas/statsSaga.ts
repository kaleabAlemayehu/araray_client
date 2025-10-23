import { call, put, takeEvery } from "redux-saga/effects"
import { setStats, setStatsError } from "../slices/statsSlice"

function* handleFetchStats() {
  try {
    const response: Response = yield call(fetch, `${import.meta.env.VITE_API_URL}/songs/stats`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const stats = yield response.json()
    yield put(setStats(stats))
  } catch (error: any) {
    yield put(setStatsError(error.message))
  }
}

export default function* statsSaga() {
  yield takeEvery("stats/fetchStats", handleFetchStats)
}
