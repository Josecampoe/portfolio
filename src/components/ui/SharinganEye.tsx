type SharinganEyeProps = {
  id?: string;
  className?: string;
  // Adds the hidden Mangekyō pattern (.eye-mangekyo), revealed by CSS.
  withMangekyo?: boolean;
};

const TOMOE_ANGLES = [0, 120, 240];
const INK = "var(--accent)";

// Soft pink eye with three red tomoe orbiting the pupil. The tomoe group
// spins with CSS (.eye-tomoe); 120° turns are seamless thanks to the 3-fold symmetry.
export function SharinganEye({ className = "", withMangekyo = false }: SharinganEyeProps) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={className}>
      <circle r="96" fill="var(--accent-soft)" />
      <circle r="96" fill="none" stroke={INK} strokeWidth="5" />
      <circle className="eye-ring" r="58" fill="none" stroke={INK} strokeWidth="2.2" opacity="0.8" />

      <g className="eye-tomoe">
        {TOMOE_ANGLES.map((angle) => (
          <g key={angle} transform={`rotate(${angle}) translate(0 -58)`} fill={INK}>
            <circle r="12" />
            <path d="M0 -12 C 16 -13, 29 -3, 31 13 C 24 5, 16 3, 7 9.5 Z" />
          </g>
        ))}
      </g>

      <circle className="eye-pupil" r="18" fill={INK} />

      {withMangekyo ? (
        <g className="eye-mangekyo" fill={INK}>
          <circle r="60" fill="none" stroke={INK} strokeWidth="3" />
          {TOMOE_ANGLES.map((angle) => (
            <path
              key={angle}
              transform={`rotate(${angle})`}
              d="M -14 -14 C -30 -44, -16 -78, 20 -90 C 2 -70, 2 -42, 16 -16 C 8 -10, -6 -10, -14 -14 Z"
            />
          ))}
          <circle r="22" />
        </g>
      ) : null}
    </svg>
  );
}
