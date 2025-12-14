type Props = {
  x: number;
  y: number;
  color?: string;
};

export function Cursor({ x, y, color = "black" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-in zoom-in-50 duration-100"
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
        color: `var(${color})`,
      }}
    >
      <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
    </svg>
  );
}
