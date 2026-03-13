import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

// ── Shared styles ──────────────────────────────────────────────

const BG = "#0d0f1a";
const GREEN = "#14F195";
const FONT_DISPLAY = "Syne, sans-serif";
const FONT_BODY = "DM Sans, sans-serif";
const FONT_MONO = "JetBrains Mono, monospace";

// ── Scene: Intro ───────────────────────────────────────────────

function IntroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = interpolate(frame, [0, 0.8 * fps], [0.6, 1], {
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(
    frame,
    [0.6 * fps, 1.2 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const titleY = interpolate(frame, [0.6 * fps, 1.2 * fps], [30, 0], {
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(
    frame,
    [1.0 * fps, 1.6 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const tagOpacity = interpolate(
    frame,
    [1.4 * fps, 2.0 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #1a2040 0%, ${BG} 70%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 32,
        }}
      >
        <Img
          src={staticFile("screenshots/desktop-home.png")}
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            objectFit: "cover",
            objectPosition: "center 8%",
            border: `2px solid ${GREEN}40`,
          }}
        />
      </div>

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 88,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          stmy<span style={{ color: GREEN }}>OS</span>
        </h1>
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 32,
          color: "rgba(255,255,255,0.7)",
          margin: "16px 0 0",
          opacity: subtitleOpacity,
          textAlign: "center",
        }}
      >
        Superteam Malaysia — Digital Hub
      </p>

      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: 16,
          color: GREEN,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          margin: "40px 0 0",
          opacity: tagOpacity,
        }}
      >
        Not a website. An operating system.
      </p>
    </AbsoluteFill>
  );
}

// ── Scene: Desktop OS ──────────────────────────────────────────

function DesktopScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 0.8 * fps], [1.05, 1], {
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(
    frame,
    [0.4 * fps, 1.0 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const captionOpacity = interpolate(
    frame,
    [0.8 * fps, 1.4 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 80,
          opacity: labelOpacity,
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 14,
            color: GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Desktop Experience
        </p>
      </div>

      {/* Screenshot */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "80px 60px 60px",
        }}
      >
        <Img
          src={staticFile("screenshots/desktop-home.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 16,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          right: 80,
          opacity: captionOpacity,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 36,
              color: "white",
              margin: 0,
              fontWeight: 700,
            }}
          >
            macOS Desktop
          </h2>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: "rgba(255,255,255,0.5)",
              margin: "4px 0 0",
            }}
          >
            Draggable windows · Dock with fish-eye magnification · Menu bar ·
            Keyboard shortcuts
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene: Screenshot showcase (reusable) ──────────────────────

function ScreenshotScene({
  src,
  label,
  title,
  description,
  labelColor = GREEN,
}: {
  src: string;
  label: string;
  title: string;
  description: string;
  labelColor?: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 0.8 * fps], [1.03, 1], {
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(
    frame,
    [0.3 * fps, 0.9 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 80,
          opacity: textOpacity,
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 14,
            color: labelColor,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {label}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "80px 60px 100px",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: 16,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          opacity: textOpacity,
        }}
      >
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 36,
            color: "white",
            margin: 0,
            fontWeight: 700,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            margin: "4px 0 0",
          }}
        >
          {description}
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene: Mobile dual view ────────────────────────────────────

function MobileScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(
    frame,
    [0, 0.6 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const phone1Opacity = interpolate(
    frame,
    [0.2 * fps, 0.8 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const phone1X = interpolate(
    frame,
    [0.2 * fps, 0.8 * fps],
    [-40, 0],
    { extrapolateRight: "clamp" }
  );
  const phone2Opacity = interpolate(
    frame,
    [0.5 * fps, 1.1 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const phone2X = interpolate(
    frame,
    [0.5 * fps, 1.1 * fps],
    [40, 0],
    { extrapolateRight: "clamp" }
  );

  const phoneStyle = {
    borderRadius: 40,
    border: "4px solid rgba(255,255,255,0.15)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    height: 720,
    objectFit: "cover" as const,
  };

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 80,
          opacity: labelOpacity,
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 14,
            color: GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Mobile Experience
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 60,
          padding: "80px 60px 100px",
        }}
      >
        <div
          style={{
            opacity: phone1Opacity,
            transform: `translateX(${phone1X}px)`,
          }}
        >
          <Img
            src={staticFile("screenshots/mobile-lock.png")}
            style={phoneStyle}
          />
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Lock Screen
          </p>
        </div>
        <div
          style={{
            opacity: phone2Opacity,
            transform: `translateX(${phone2X}px)`,
          }}
        >
          <Img
            src={staticFile("screenshots/mobile-members.png")}
            style={phoneStyle}
          />
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Members App
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          opacity: labelOpacity,
        }}
      >
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 36,
            color: "white",
            margin: 0,
            fontWeight: 700,
          }}
        >
          iOS Mobile
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            margin: "4px 0 0",
          }}
        >
          Lock screen · Home screen with app icons · Full-screen app views ·
          Swipe gestures
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene: CMS Admin ───────────────────────────────────────────

function AdminScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity1 = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const opacity2 = interpolate(
    frame,
    [0.6 * fps, 1.1 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const scale1 = interpolate(frame, [0, 0.6 * fps], [1.02, 1], {
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(
    frame,
    [0.3 * fps, 0.9 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 80,
          opacity: textOpacity,
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 14,
            color: GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          CMS Admin Dashboard
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 30,
          padding: "80px 60px 100px",
        }}
      >
        <Img
          src={staticFile("screenshots/admin-dashboard.png")}
          style={{
            width: "48%",
            borderRadius: 12,
            opacity: opacity1,
            transform: `scale(${scale1})`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          }}
        />
        <Img
          src={staticFile("screenshots/admin-members.png")}
          style={{
            width: "48%",
            borderRadius: 12,
            opacity: opacity2,
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          opacity: textOpacity,
        }}
      >
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 36,
            color: "white",
            margin: 0,
            fontWeight: 700,
          }}
        >
          Full CRUD Admin
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            margin: "4px 0 0",
          }}
        >
          Role-based access · Members, Events, Partners, FAQ, Stats · tRPC +
          Drizzle ORM + Supabase
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene: Tech Stack ──────────────────────────────────────────

function TechStackScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stack = [
    ["Next.js 16", "App Router · React 19"],
    ["Tailwind CSS v4", "Dark theme · CSS variables"],
    ["Framer Motion", "Drag · Resize · Transitions"],
    ["React Three Fiber", "3D KL Skyline"],
    ["tRPC v11", "End-to-end type safety"],
    ["Drizzle ORM", "PostgreSQL via Supabase"],
    ["Better Auth", "Email + RBAC · Session cookies"],
    ["Turborepo", "Monorepo with Bun workspaces"],
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 80,
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 14,
            color: GREEN,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Tech Stack
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: "80px 120px",
        }}
      >
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 48,
            color: "white",
            margin: "0 0 48px",
            fontWeight: 800,
          }}
        >
          Built with modern tools
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {stack.map(([name, desc], i) => {
            const delay = 0.3 + i * 0.12;
            const opacity = interpolate(
              frame,
              [delay * fps, (delay + 0.4) * fps],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const y = interpolate(
              frame,
              [delay * fps, (delay + 0.4) * fps],
              [20, 0],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={name}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "20px 28px",
                  width: "calc(25% - 15px)",
                }}
              >
                <p
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 20,
                    color: "white",
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    margin: "6px 0 0",
                  }}
                >
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene: Outro ───────────────────────────────────────────────

function OutroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [0, 0.8 * fps], [0.9, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(
    frame,
    [0.5 * fps, 1.2 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const linksOpacity = interpolate(
    frame,
    [1.0 * fps, 1.6 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a2040 0%, ${BG} 70%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 96,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          stmy<span style={{ color: GREEN }}>OS</span>
        </h1>
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 28,
          color: "rgba(255,255,255,0.6)",
          margin: "20px 0 0",
          opacity: subtitleOpacity,
          textAlign: "center",
        }}
      >
        The digital hub for Solana builders in Malaysia
      </p>

      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 60,
          opacity: linksOpacity,
        }}
      >
        {["superteam.my", "x.com/SuperteamMY", "t.me/superteammy"].map(
          (link) => (
            <p
              key={link}
              style={{
                fontFamily: FONT_MONO,
                fontSize: 16,
                color: GREEN,
                margin: 0,
              }}
            >
              {link}
            </p>
          )
        )}
      </div>
    </AbsoluteFill>
  );
}

// ── Main Composition ───────────────────────────────────────────

export const StmyOSDemo = () => {
  const TRANS = 15;

  return (
    <TransitionSeries>
      {/* Intro — 3.5s */}
      <TransitionSeries.Sequence durationInFrames={105}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Desktop Home — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <DesktopScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Desktop Members — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <ScreenshotScene
          src="screenshots/desktop-members.png"
          label="Members Directory"
          title="Community Members"
          description="Search · Filter by skill · 15 Malaysian Solana builders with avatars and badges"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Desktop Events — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <ScreenshotScene
          src="screenshots/desktop-events.png"
          label="Events Calendar"
          title="Live Luma Integration"
          description="Embedded Luma widget · Real upcoming events · RSVP directly from the OS"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Mobile — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <MobileScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Admin CMS — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <AdminScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Tech Stack — 3.5s */}
      <TransitionSeries.Sequence durationInFrames={105}>
        <TechStackScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANS })}
      />

      {/* Outro — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
