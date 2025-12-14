import { useOthers } from "@liveblocks/react";

export function Room() {
  const others = useOthers();
  const userCount = others.length;

  return <div>There are {userCount} other user(s) online</div>;
}
