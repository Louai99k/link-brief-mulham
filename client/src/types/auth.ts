import type { trpc } from "@/utils/trpc";
import type { inferInput } from "@trpc/tanstack-react-query";

export type SignInInputs = inferInput<typeof trpc.auth.signIn>;
export type SignUpInputs = inferInput<typeof trpc.auth.signUp>;
