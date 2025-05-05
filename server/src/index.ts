import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/index.js";

const server = createHTTPServer({
  router: appRouter,
});

// #ENV
server.listen(3000);
