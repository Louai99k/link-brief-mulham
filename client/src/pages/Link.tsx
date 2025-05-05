import ROUTES from "@/constants/urls";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { toast } from "sonner";

const Link = () => {
  const { shortLink } = useParams<Record<string, string>>();

  const {
    data: linkEntry,
    isLoading,
    isError,
  } = useQuery(trpc.link.getLink.queryOptions(shortLink!));

  useEffect(() => {
    if (linkEntry) {
      window.location.href = linkEntry.link;
    }
  }, [linkEntry?.id]);

  useEffect(() => {
    if (isError) {
      toast.error("This link is invalid");
    }
  }, [isError]);

  if (isError) {
    return <Navigate to={ROUTES.MAIN} />;
  }

  if (isLoading) {
    <div className="w-screen h-screen flex justify-center items-center">
      Redirecting...
    </div>;
  }

  return null;
};

export default Link;
