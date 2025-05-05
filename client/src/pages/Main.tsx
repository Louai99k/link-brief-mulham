import ROUTES from "@/constants/urls";
import Toolbar from "@/components/Toolbar";
import { useNavigate } from "react-router";
import Shorten from "@/components/forms/Shorten";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Toolbar />
      <div className="px-2 md:px-8 pt-32 bg-slate-100 w-screen h-screen flex items-center flex-col text-center gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl md:w-3/4">
          Transform Long URLs into Powerful Short Links
        </h1>

        <p className="text-xl text-muted-foreground">
          Create, share, and track short links with our powerful URL shortening
          platform
        </p>
        <Shorten
          className="md:w-1/2"
          onShorten={() => {
            navigate(ROUTES.LOGIN);
          }}
        />
      </div>
    </div>
  );
};

export default Main;
