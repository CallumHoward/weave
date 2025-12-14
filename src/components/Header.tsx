import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
        <h1 className="text-2xl p-0.5 border border-transparent hover:border-accent-foreground">
          {title}
        </h1>
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
