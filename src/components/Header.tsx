import { ArrowLeft, Redo, Undo } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import type { LinkProps } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  title: string;
  backTo?: LinkProps["to"];
};

export function Header({ title, backTo }: Props) {
  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center">
        {backTo && (
          <Link to={backTo} aria-label="Back" title="Back">
            <ArrowLeft />
          </Link>
        )}
        <h1 className="text-2xl">{title}</h1>
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Undo" title="Undo">
            <Undo />
          </Button>
          <Button variant="outline" size="icon" aria-label="Redo" title="Redo">
            <Redo />
          </Button>
        </ButtonGroup>
      </div>
      <button>
        <Avatar>
          <AvatarImage src="https://github.com/CallumHoward.png" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
      </button>
    </header>
  );
}
