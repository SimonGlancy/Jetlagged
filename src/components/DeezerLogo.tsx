export const DeezerIcon = ({ size = 24, className = "", ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Column 1 */}
      <rect x="2" y="16" width="3" height="2.5" rx="0.5" />

      {/* Column 2 */}
      <rect x="6" y="12.5" width="3" height="2.5" rx="0.5" />
      <rect x="6" y="16" width="3" height="2.5" rx="0.5" />

      {/* Column 3 */}
      <rect x="10" y="9" width="3" height="2.5" rx="0.5" />
      <rect x="10" y="12.5" width="3" height="2.5" rx="0.5" />
      <rect x="10" y="16" width="3" height="2.5" rx="0.5" />

      {/* Column 4 */}
      <rect x="14" y="12.5" width="3" height="2.5" rx="0.5" />
      <rect x="14" y="16" width="3" height="2.5" rx="0.5" />

      {/* Column 5 */}
      <rect x="18" y="5.5" width="3" height="2.5" rx="0.5" />
      <rect x="18" y="9" width="3" height="2.5" rx="0.5" />
      <rect x="18" y="12.5" width="3" height="2.5" rx="0.5" />
      <rect x="18" y="16" width="3" height="2.5" rx="0.5" />
    </svg>
  );
};
