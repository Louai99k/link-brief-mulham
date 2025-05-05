import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { copyLink, linkGenerator } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { CopyIcon } from "lucide-react";

const Links = () => {
  const links = useQuery(trpc.link.getLinks.queryOptions());

  return (
    <div>
      <h3 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
        Your Links
      </h3>
      <Table>
        <TableCaption>A list of your short links.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead>Short Link</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.data?.map((linkEntry) => (
            <TableRow key={linkEntry.id}>
              <TableCell className="font-medium">{linkEntry.link}</TableCell>
              <TableCell>{linkGenerator(linkEntry.short_link)}</TableCell>
              <TableCell>{linkEntry.clicks}</TableCell>
              <TableCell>
                <CopyIcon
                  onClick={() => {
                    copyLink(linkGenerator(linkEntry.short_link));
                  }}
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Links;
