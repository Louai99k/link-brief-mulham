import Shorten from "@/components/forms/Shorten";
import { linkGenerator } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChartBar, Link } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const cards = [
  {
    key: "total_links",
    label: "Total Links",
    icon: Link,
    color: "bg-violet-200 text-violet-700",
  },
  {
    key: "total_clicks",
    label: "Total Clicks",
    icon: ChartBar,
    color: "bg-green-200 text-green-700",
  },
] as const;

const Dashboard = () => {
  const links = useQuery(trpc.link.getLinks.queryOptions());

  const stats = useMemo(() => {
    if (links.data) {
      return {
        total_links: links.data.length,
        total_clicks: links.data.reduce(
          (acc, link) => acc + (link.clicks || 0),
          0,
        ),
      };
    }

    return {
      total_links: 0,
      total_clicks: 0,
    };
  }, [links]);

  const [shortLink, setShortLink] = useState("");
  const shortenLink = useMutation(
    trpc.link.create.mutationOptions({
      onSuccess(data) {
        toast("Link shortened successfully");
        setShortLink(linkGenerator(data.shortLink));
      },
    }),
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <div
            className="px-4 py-8 flex gap-4 bg-white rounded-lg shadow-md"
            key={card.key}
          >
            <span
              className={`px-4 flex justify-center items-center rounded-lg ${card.color}`}
            >
              <card.icon />
            </span>
            <div className="flex flex-col gap-4">
              <span className="text-sm text-muted-foreground">
                {card.label}
              </span>
              <span>{stats[card.key]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Shorten
          onShorten={(link) => {
            shortenLink.mutate({ link });
          }}
          shortLink={shortLink}
        />
      </div>
    </div>
  );
};

export default Dashboard;
