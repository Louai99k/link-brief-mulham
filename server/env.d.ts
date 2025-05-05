declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_FILE_NAME: string;
      JWT_SECRET: string;
      JWT_EXPIRE_TIME: `${number}d`;
    }
  }
}

export {};
