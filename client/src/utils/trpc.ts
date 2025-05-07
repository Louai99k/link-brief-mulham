import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { useAuth } from "@/stores/auth-store";
import { toast } from "sonner";

import type { AppRouter } from "@server/dist/src/routes";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError() {
      toast.error("An error occured", { closeButton: true });
    },
  }),
  mutationCache: new MutationCache({
    onError() {
      toast.error("An error occured", { closeButton: true });
    },
  }),
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL,
      headers() {
        const token = useAuth.getState().accessToken;
        return {
          token: token ?? undefined,
        };
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient: queryClient,
});
