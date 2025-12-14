import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <header className="flex items-center justify-between gap-2">
      <h1 className="text-2xl">{title}</h1>
      <button>
        <Avatar>
          <AvatarImage src="https://github.com/CallumHoward.png" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
      </button>
    </header>
  );
}
