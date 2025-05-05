import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import ROUTES from "@/constants/urls";

interface ToolbarProps {
  showSignButton?: boolean;
}

const Toolbar = ({ showSignButton = true }: ToolbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-2 py-4 flex items-center justify-between fixed w-screen top-0 bg-white md:px-8">
      <span
        onClick={() => {
          navigate(ROUTES.MAIN);
        }}
        className="font-bold cursor-pointer"
      >
        LinkBrief
      </span>
      <Button
        className={showSignButton ? undefined : "invisible"}
        onClick={() => {
          navigate(ROUTES.LOGIN);
        }}
      >
        Sign In
      </Button>
    </div>
  );
};

export default Toolbar;
