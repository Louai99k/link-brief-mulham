import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { cn, copyLink } from "@/lib/utils";

interface ShortenProps {
  onShorten: (link: string) => void;
  shortLink?: string;
  className?: string;
}

const Shorten = ({ onShorten, shortLink, className }: ShortenProps) => {
  const [link, setLink] = useState("");

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Shorten a Link</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 md:flex md:gap-4">
          <Input
            onChange={(e) => {
              setLink(e.target.value);
            }}
            value={link}
            placeholder="Paste your long URL here"
          />
          <Button onClick={() => onShorten(link)} className="w-1/2 md:w-fit">
            Shorten
          </Button>
        </div>
      </CardContent>
      {shortLink ? (
        <CardFooter className="flex gap-4">
          <span>Short Link: {shortLink}</span>
          <span
            className="cursor-pointer"
            onClick={() => {
              copyLink(shortLink);
            }}
          >
            <CopyIcon />
          </span>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default Shorten;
