type KccCupMarkProps = {
  className?: string;
};

export default function KccCupMark({ className }: KccCupMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="22" fill="#000000" />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="44"
        letterSpacing="-0.03em"
        fill="#ffffff"
      >
        KCC
      </text>
    </svg>
  );
}
