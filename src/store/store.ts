import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import songsReducer from "./slices/songsSlice"
import playlistsReducer from "./slices/playlistsSlice"
import playbackReducer from "./slices/playbackSlice"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    playlists: playlistsReducer,
    playback: playbackReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
