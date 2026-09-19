const paths: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5M9.5 21v-6h5v6",
  building:
    "M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M12 21V10h7a1 1 0 0 1 1 1v10M3 21h18M7 8h2M7 12h2M7 16h2M15.5 14h1M15.5 17.5h1",
  factory: "M3 21V11l5 3V11l5 3V8l6 4v9M3 21h18M7 17h2M12 17h2M17 17h1M18 8V4h2v4",
  landscape:
    "M12 4c2 1.4 3 3 3 4.8a3 3 0 0 1-6 0C9 7 10 5.4 12 4ZM5.5 9.5c1.3 1 2 2 2 3.2a2 2 0 0 1-4 0c0-1.2.7-2.2 2-3.2ZM18.5 9.5c1.3 1 2 2 2 3.2a2 2 0 0 1-4 0c0-1.2.7-2.2 2-3.2ZM3 18.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0",
  institutional: "M3 21h18M4.5 21V9.5M19.5 21V9.5M12 3.2 3.5 8.5h17L12 3.2ZM8.5 21v-7M12 21v-7M15.5 21v-7",
  renovation:
    "M20.5 8.5A8 8 0 0 0 6.2 6.2M20.5 4.2v4.3h-4.3M3.5 15.5a8 8 0 0 0 14.3 2.3M3.5 19.8v-4.3h4.3",
};

export default function ServiceIcon({
  name,
  className = "mb-5 size-13.5 rounded-2xl",
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  return (
    <span className={`icon-badge ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[name] ?? paths.building} />
      </svg>
    </span>
  );
}
