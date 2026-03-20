type KccCupMarkProps = {
  className?: string;
};

export default function KccCupMark({ className }: KccCupMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="32" fill="#111111" />

      <path
        d="M24 18C22.5 16 22.5 13.8 24.4 11.8C25.4 10.8 25.6 9.8 24.8 8.5"
        stroke="#F6F1E7"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 18C30.5 16 30.5 13.8 32.4 11.8C33.4 10.8 33.6 9.8 32.8 8.5"
        stroke="#F6F1E7"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 18C38.5 16 38.5 13.8 40.4 11.8C41.4 10.8 41.6 9.8 40.8 8.5"
        stroke="#F6F1E7"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18 24H43C44.7 24 46 25.3 46 27V36C46 40.4 42.4 44 38 44H26C21.6 44 18 40.4 18 36V24Z"
        fill="#F6F1E7"
      />
      <path
        d="M46 27H48C51.3 27 54 29.7 54 33C54 36.3 51.3 39 48 39H46"
        stroke="#F6F1E7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 48.5H49"
        stroke="#F6F1E7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 52H43"
        stroke="#F6F1E7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <text
        x="32"
        y="35.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.4"
        fill="#111111"
      >
        KCC
      </text>
    </svg>
  );
}
