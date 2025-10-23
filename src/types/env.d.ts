interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // add more env variables here if you have any
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
