import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "@/routes/index.js";
import cors from "cors";
import { createContext } from "./context.js";

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({
    origin: "*",
  }),
  createContext,
});

server.listen(3000);
