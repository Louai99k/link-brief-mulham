import { initTRPC } from "@trpc/server";

import type { ContextType } from "./context.js";

export const t = initTRPC.context<ContextType>().create();

export const router = t.router;
export const procedure = t.procedure;
