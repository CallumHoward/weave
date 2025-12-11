import { Link } from "@tanstack/react-router";

export function NavigationOverlay() {
  return (
    <nav className="fixed top-0 left-0 w-full min-h-dvh uppercase text-center [&>a]:p-2 [view-transition-name:nav-overlay]">
      <Link
        to="/"
        preload="intent"
        viewTransition={{ types: ["slide-top"] }}
        className="absolute top-0 left-0 w-full"
        activeProps={{ className: "opacity-0" }}
      >
        Home
      </Link>
      <Link
        to="/about"
        preload="intent"
        viewTransition={{ types: ["slide-left"] }}
        className="absolute left-0 h-full"
        activeProps={{ className: "opacity-0" }}
        style={{ writingMode: "vertical-lr" }}
      >
        About
      </Link>
      <Link
        to="/gallery"
        preload="intent"
        viewTransition={{ types: ["slide-right"] }}
        className="absolute right-0 h-full"
        activeProps={{ className: "opacity-0" }}
        style={{ writingMode: "vertical-lr" }}
      >
        Gallery
      </Link>
      <Link
        to="/radio"
        preload="intent"
        viewTransition={{ types: ["slide-bottom"] }}
        activeProps={{ className: "opacity-0" }}
        className="absolute bottom-0 left-0 w-full"
      >
        Radio
      </Link>
    </nav>
  );
}
