# Araray Client

This is a Spotify-like web application that allows users to play and manage their music library.

## Features

* Play and pause songs
* Create and manage playlists
* View statistics about your music library
* Responsive design for mobile and desktop

## Technologies Used

* **Frontend:** React, Redux, Redux Saga, Emotion, Vite
* **Language:** TypeScript

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and pnpm installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/araray_client.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Start the development server
   ```sh
   pnpm dev
   ```

## Available Scripts

In the project directory, you can run:

* `pnpm dev`: Runs the app in the development mode.
* `pnpm build`: Builds the app for production to the `dist` folder.
* `pnpm preview`: Serves the production build locally.

## Project Structure

```
/home/neo/Documents/projects/araray_client/
├───.gitignore
├───index.html
├───package.json
├───pnpm-lock.yaml
├───tsconfig.json
├───vite.config.ts
├───.git/...
├───dist/...
├───node_modules/...
├───public/
│   └───logo.png
└───src/
    ├───App.tsx
    ├───main.tsx
    ├───components/
    │   ├───layout/
    │   │   ├───PlayerBar.tsx
    │   │   ├───SidebarDrawer.tsx
    │   │   └───TopBar.tsx
    │   ├───playlists/
    │   │   ├───PlaylistDetail.tsx
    │   │   └───PlaylistList.tsx
    │   ├───songs/
    │   │   ├───DeleteModal.tsx
    │   │   ├───SongForm.tsx
    │   │   ├───SongList.tsx
    │   │   └───SongRow.tsx
    │   └───stats/
    │       ├───ArtistChart.tsx
    │       ├───GenreChart.tsx
    │       └───StatCard.tsx
    ├───hooks/
    │   └───useAudioPlayer.ts
    ├───pages/
    │   ├───Home.tsx
    │   ├───Playlists.tsx
    │   └───Stats.tsx
    ├───store/
    │   ├───store.ts
    │   ├───sagas/
    │   │   ├───index.ts
    │   │   ├───playbackSaga.ts
    │   │   ├───playlistsSaga.ts
    │   │   ├───songsSaga.ts
    │   │   └───statsSaga.ts
    │   └───slices/
    │       ├───playbackSlice.ts
    │       ├───playlistsSlice.ts
    │       ├───songsSlice.ts
    │       └───statsSlice.ts
    ├───styles/
    │   └───globals.css
    └───types/
        ├───env.d.ts
        └───index.ts
```
