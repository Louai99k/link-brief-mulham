import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Main = () => {
  return (
    <div className="relative">
      <div className="px-2 py-4 flex items-center justify-between fixed w-screen top-0 bg-white">
        <span className="font-bold cursor-pointer">LinkBrief</span>
        <Button>Sign In</Button>
      </div>
      <div className="px-2 py-4 bg-slate-100 w-screen h-screen flex justify-center items-center flex-col text-center gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Transform Long URLs into Powerful Short Links
        </h1>

        <p className="text-xl text-muted-foreground">
          Create, share, and track short links with our powerful URL shortening
          platform
        </p>
        <div className="bg-white mt-8 w-full rounded-lg py-4 px-2 shadow-xl flex flex-col gap-2 items-center">
          <Input placeholder="Paste your long URL here" />
          <Button className="w-1/2">Shorten URL</Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
