import express, { json, Express } from "express";
import cors from 'cors';
import { connectDb, disconnectDB } from "./config";
import router from "./routers";

const app = express()
app
  .use(cors())
  .use(json())
  .use(router)
  .get('/health', (req, res) => {
    return res.status(200).send('OK')
  } )


export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}
;
export default app;