"use client";

import Link from "next/link";

const projects = [
  {
    title: "Kerala Dev Directory",
    description: "Our Kerala Coders Cafe developer profile showcase — explore member profiles, discover skills, and connect with talented developers in our community.",
    color: "hsla(0, 81%, 45%, 0.58)",
    background: "grass-top-down",
    icon: "people",
    category: "Community",
    rating: 4.8,
    completion: 0.85
  },
  {
    title: "Tech Events Calendar",
    description: "Never miss a meetup, workshop, or conference in Kerala. Built for the community.",
    color: "hsla(158, 43%, 25%, 0.34)",
    background: "grass-left",
    icon: "link",
    category: "Events",
    rating: 4.5,
    completion: 0.62
  },
  {
    title: "Job Board",
    description: "Kerala-focused tech opportunities. Connecting local talent with global companies.",
    color: "hsla(32, 62%, 35%, 0.45)",
    background: "curves",
    icon: "link",
    category: "Careers",
    rating: 5,
    completion: 0.4
  },
  {
    title: "Learning Hub",
    description: "Curated resources and tutorials for the next generation of Kerala developers.",
    color: "hsla(320, 60%, 40%, 0.40)",
    background: "circles-top",
    icon: "ribbon",
    category: "Education",
    rating: 4.6,
    completion: 0.15
  },
  {
    title: "Open Source",
    description: "Track and celebrate community contributions to global open source projects.",
    color: "hsla(225, 58%, 35%, 0.43)",
    background: "circles-corner",
    icon: "coil",
    category: "Open Source",
    rating: 4.2,
    completion: 0.32
  },
  {
    title: "Developers Blog",
    description: "Articles, tutorials, and insights written by Kerala developers. Share your knowledge.",
    color: "hsla(262, 44%, 35%, 0.43)",
    background: "grass-bottom",
    icon: "ribbon",
    category: "Insights",
    rating: 4.9,
    completion: 0.75
  },
];

function SVGSprites() {
  return (
    <svg width="0" height="0" className="hidden" aria-hidden="true">
      <symbol id="circles-corner" viewBox="0 0 316 316">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5">
          <path d="M 323.074 256.963 C 312.956 263.991 295.834 280.024 295.479 292.107 C 294.971 309.41 311.806 311.371 322.384 317.098" />
          <path d="M 322.384 225.723 C 303.276 230.431 291.393 236.843 273.403 256.963 C 252.542 280.29 261.674 308.503 261.674 315.536" />
          <path d="M 320.316 193.268 C 285.716 194.491 258.866 221.733 245.117 244.813 C 225.414 277.888 238.218 316.923 236.839 320.568" />
          <path d="M 321.006 147.971 C 301.136 149.81 258.571 170.234 231.318 197.955 C 189.23 240.768 190.427 315.532 187.856 321.35" />
          <path d="M 323.764 101.113 C 285.498 101.275 236.306 121.433 195.446 163.591 C 144.032 216.636 154.999 289.235 145.772 320.568" />
          <path d="M 320.316 48 C 307.75 49.984 222.602 48.394 158.881 119.856 C 96.203 190.147 104.486 309.571 103 321.35" />
        </g>
      </symbol>
      <symbol id="circles-top" viewBox="0 0 648 648">
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path strokeWidth="10" d="M 453.754 -21.507 C 426.967 6.445 420.959 57.037 331.465 60.601 C 234.771 64.452 225.579 0.318 214.418 -28.495" />
          <path strokeWidth="10" d="M 156.767 -33.735 C 167.249 11.104 188.994 80.565 217.912 111.263 C 239.879 134.581 286.462 149.302 307.007 147.95" />
          <path strokeWidth="10" d="M 307.007 128.398 C 331.812 142.719 401.333 127.174 443.273 102.193 C 482.243 78.981 545.369 8.9 555.079 -28.829" />
          <path strokeWidth="10" d="M 68.545 -23.06 C 69.207 -20.985 69.087 78.639 108.725 135.914 C 148.883 193.94 180.333 225.897 241.496 225.01" />
          <path strokeWidth="13" d="M 289.538 242.287 C 349.575 238.65 410.797 237.601 509.657 175.902 C 594.584 122.899 644.472 14.236 663.391 -28.494" />
          <path strokeWidth="10" d="M -2.208 -47.265 C 0.121 58.718 67.059 227.084 132.309 281.167 C 179.791 320.523 209.414 320.27 289.537 300.383" />
          <path strokeWidth="15" d="M 279.055 313.722 C 311.054 325.465 444.581 310.019 502.669 285.771 C 635.523 230.313 649.997 179.204 658.147 173.963" />
          <path strokeWidth="10" d="M -40.642 217.539 C -33.11 240.221 37.621 309.223 86.887 336.334 C 137.474 364.172 230.737 391.311 284.496 376.743" />
          <path strokeWidth="13" d="M 255.671 376.584 C 304.19 396.955 402.82 394.656 501.796 360.633 C 566.99 338.222 659.371 264.987 690.471 247.08" />
        </g>
      </symbol>
      <symbol id="curves" viewBox="0 0 648 648">
        <g fill="none" stroke="currentColor" strokeWidth="20">
          <path d="M 371.646 -16.266 C 328.554 21.003 255.465 49.043 214.417 88.552 C 204.914 97.698 201.122 117.816 203.936 130.48 C 204.954 135.063 223.705 151.184 228.393 151.444 C 247.225 152.49 268.217 141.879 286.044 135.721 C 300.864 130.601 356.726 98.89 368.152 88.552 C 384.788 73.5 419.727 21.192 443.272 20.42 C 466.201 19.668 488.552 28.981 486.946 51.866 C 484.611 85.14 405.888 122.024 397.85 125.239 C 379.675 132.509 315.118 176.349 300.019 181.142 C 278.43 187.996 171.305 238.027 191.707 270.238 C 199.694 282.848 245.401 287.141 251.104 285.961 C 272.473 281.54 312.575 264.398 329.718 256.263 C 349.247 246.995 369.945 239.359 387.368 226.564 C 407.616 211.695 436.166 193.291 460.741 170.661 C 481.974 151.109 503.703 120.367 507.91 114.757 C 521.283 96.926 532.568 77.618 544.597 58.854 C 548.202 53.231 566.334 18.673 595.259 15.179 C 614.89 12.808 637.386 23.453 635.44 43.131 C 620.486 194.344 475.403 251.2 355.923 287.708 C 322.634 297.88 289.732 309.309 256.345 319.154 C 244.287 322.709 231.584 323.914 219.658 327.889 C 180.191 341.045 142.564 353.262 162.008 415.238 C 167.355 432.282 247.011 426.256 258.092 422.226 C 279.039 414.609 326.614 401.1 347.188 392.527 C 354.656 389.415 361.4 384.754 368.152 380.298 C 390.53 365.529 413.129 351.02 434.537 334.877 C 453.303 320.726 468.437 302.193 486.946 287.708 C 517.369 263.898 550.649 243.076 581.283 219.576 C 606.25 200.423 655.973 142.746 680.862 123.492 C 686.867 118.846 759.061 175.106 719.294 203.853 C 670.087 239.425 565.388 323.141 514.898 352.346 C 492.125 365.519 417.408 399.066 394.356 411.744 C 370.813 424.693 337.524 440.083 312.248 457.165 C 286.069 474.857 285.912 495.194 296.525 499.093 C 325.501 509.737 358.468 501.038 389.115 497.346" />
        </g>
      </symbol>
      <symbol id="grass-bottom" viewBox="0 0 316 316">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="13">
          <path d="M -6.788 282.052 C -4.546 287.782 -3.008 293.841 -0.062 299.243 C 2.784 304.461 7.448 315.401 11.897 320.919" />
          <path d="M 13.392 285.042 C 18.647 299.491 19.377 303.987 26.846 316.434" />
          <path d="M 10.403 255.892 C 18.126 268.1 26.574 279.879 33.573 292.516 C 35.596 296.17 35.483 300.719 37.31 304.475 C 40.002 310.008 43.788 314.939 47.027 320.171" />
          <path d="M 47.774 287.284 C 52.002 297.502 56.227 307.722 60.481 317.929" />
          <path d="M 44.785 246.175 C 49.675 260.848 53.297 270.703 58.986 284.294 C 62.728 293.233 71.281 316.622 72.44 322.414" />
          <path d="M 22.362 188.622 C 27.594 199.086 38.539 219.041 43.29 229.732 C 50.345 245.606 53.425 264.204 61.228 279.81 C 69.402 296.159 76.224 306.065 84.399 322.414" />
          <path d="M 57.491 238.701 C 65.657 255.035 73.049 271.488 79.167 288.779 C 81.587 295.619 92.457 316.107 95.611 322.414" />
        </g>
      </symbol>
      <symbol id="grass-left" viewBox="0 0 316 316">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="13">
          <path d="M 38.058 7.993 C 28.089 11.316 0.838 21.446 -9.778 21.446" />
          <path d="M 54.502 25.931 C 36.784 32.374 9.564 33.659 -9.031 34.9" />
          <path d="M 40.3 44.617 C 32.596 47.185 20.108 49.102 12.645 49.102 C 11.724 49.102 -11.273 49.849 -11.273 49.849" />
        </g>
      </symbol>
      <symbol id="grass-top-down" viewBox="0 0 316 316">
        <g fill="none" stroke="currentColor" strokeWidth="5">
          <path d="M 254.465 58.472 C 253.758 57.413 249.41 50.048 249.41 50.048" />
          <path d="M 219.08 33.198 C 218.119 31.756 213.59 25.615 213.183 25.615" />
        </g>
      </symbol>
      {/* icons */}
      <symbol id="check-circle" viewBox="0 0 16 16">
        <path fill="currentColor" d="M8 0a8 8 0 100 16A8 8 0 008 0zm2.72 5.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.97-3.97z" />
      </symbol>
      <symbol id="coil" viewBox="0 0 16 16">
        <circle fill="currentColor" cx="10.5" cy="2.5" r="2.5" />
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <ellipse cx="8" cy="8.25" rx="6.5" ry="2.25" transform="rotate(5, 8, 8.25)" />
          <ellipse cx="8" cy="12.75" rx="6.5" ry="2.25" transform="rotate(5, 8, 12.75)" />
        </g>
      </symbol>
      <symbol id="link" viewBox="0 0 32 32">
        <path fill="none" opacity="0.8" stroke="currentColor" strokeWidth="3" d="M 4.5 4.5 C 4.5 4.5 30 0.048 30 8 C 30 16 2 16 2 24 C 2 32.035 27.5 27.5 27.5 27.5" />
        <g fill="currentColor">
          <circle cx="4.5" cy="4.5" r="4.5" />
          <circle cx="27.5" cy="27.5" r="4.5" />
        </g>
      </symbol>
      <symbol id="people" viewBox="0 0 20 20">
        <circle fill="currentColor" opacity="0.8" cx="10" cy="3.5" r="2.5" />
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
          <ellipse cx="6.5" cy="13" rx="7" ry="4" transform="rotate(50, 6.5, 13)" />
          <ellipse cx="13.5" cy="13" rx="7" ry="4" transform="rotate(-50, 13.5, 13)" />
        </g>
      </symbol>
      <symbol id="ribbon" viewBox="0 0 40 40">
        <path fill="currentColor" d="M 27.552 2.225 C 29.228 2.225 31.379 5.486 C 36.391 5.886 C 36.791 10.898 40.052 14.725 C 40.052 16.401 36.791 18.552 C 36.391 23.564 31.379 23.964 27.552 27.225 C 23.725 23.964 18.713 23.564 18.313 18.552 C 15.052 16.401 15.052 14.725 18.313 10.898 C 18.713 5.886 23.725 5.486 27.552 2.225 Z" />
      </symbol>
      <symbol id="star" viewBox="0 0 64 64">
        <path fill="currentColor" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642l12.392,12.707l-2.935,17.977l15.126-8.365l15.126,8.365c1.908,0.492 2.269-0.72 1.619-3.854l-2.935-17.977l12.393-12.707z" />
      </symbol>
      <symbol id="star-8" viewBox="0 0 100 100">
        <path fill="currentColor" d="M 49.988 0 C 56.69 0 59.1 10.477 65.292 13.042 C 71.484 15.607 80.596 9.902 85.335 14.641 C 90.074 19.38 84.369 28.492 86.934 34.684 C 89.499 40.876 99.976 43.286 99.976 49.988 C 99.976 56.69 89.499 59.1 86.934 65.292 C 84.369 71.484 90.074 80.596 85.335 85.335 C 80.596 90.074 71.484 84.369 65.292 86.934 C 59.1 89.499 56.69 99.976 49.988 99.976 C 43.286 99.976 40.876 89.499 34.684 86.934 C 28.492 84.369 19.38 90.074 14.641 85.335 C 9.902 80.596 15.607 71.484 13.042 65.292 C 10.477 59.1 0 56.69 0 49.988 C 0 43.286 10.477 40.876 13.042 34.684 C 15.607 28.492 9.902 19.38 14.641 14.641 C 19.38 9.902 28.492 15.607 34.684 13.042 C 40.876 10.477 43.286 0 49.988 0 Z" />
      </symbol>
    </svg>
  );
}

function Icon({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg className={`inline-block ${className}`} width={size} height={size} aria-hidden="true" fill="currentColor">
      <use href={`#${name}`} />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 bg-kcc-bg overflow-hidden">
      <SVGSprites />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2
            className="text-6xl md:text-8xl italic text-kcc-accent"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            Featured Projects
          </h2>
          <p className="text-kcc-text-dim mt-6 text-lg tracking-wide uppercase">Community-driven open source initiatives</p>
        </div>

        <div className="card-grid">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="card"
              style={{ backgroundColor: project.color }}
            >
              <svg className="card__bg" width="100%" height="100%" aria-hidden="true" fill="white" opacity="0.1">
                <use href={`#${project.background}`} />
              </svg>

              <div className="card__header">
                <div className="card__label">{project.category}</div>
                <div className="card__category">
                  <Icon name="star-8" size={56} className="text-white/20" />
                  <span className="card__category-icon" style={{ color: project.color }}>
                    <Icon name={project.icon} size={24} />
                  </span>
                </div>
              </div>

              <div className="card__content">
                <h3 className="card__title">{project.title}</h3>
                <p className="card__description">{project.description}</p>
                <div className="card__stats">
                  <div className="card__rating">
                    <Icon name="star" size={16} />
                    {project.rating}
                  </div>
                  <div className="card__completion">
                    <Icon name="check-circle" size={16} />
                    {Math.round(project.completion * 100)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
