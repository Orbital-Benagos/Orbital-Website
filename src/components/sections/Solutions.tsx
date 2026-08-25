import React, { useRef, useEffect, useState, useCallback } from "react";
import CustomButton from "../custom-components/CustomButton";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { motion } from "framer-motion";
import RequestAccessForm from "../custom-components/RequestAccessForm";
import DemoAccessForm from "../custom-components/DemoAccessForm";

/* ─── build an orthogonal elbow path: H → arc → V → arc → H ──── */
const CORNER_R = 8;
const LINE_GAP = 40; // space between card edge and line start/end

function buildElbowPath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  elbowX: number,
): string {
  // If same y, just a straight horizontal line
  if (Math.abs(sy - ey) < 1) return `M ${sx} ${sy} H ${ex}`;

  const dx = ex - sx;
  const dy = ey - sy;
  const dirX = dx > 0 ? 1 : -1;
  const dirY = dy > 0 ? 1 : -1;
  const r = Math.min(
    CORNER_R,
    Math.abs(dy) / 2,
    Math.abs(elbowX - sx) / 2,
    Math.abs(ex - elbowX) / 2,
  );

  // Corner 1: Moving Horizontal -> turning Vertical
  const sw1 = dirX === dirY ? 1 : 0;
  // Corner 2: Moving Vertical -> turning Horizontal
  const sw2 = dirX === dirY ? 0 : 1;

  return [
    `M ${sx} ${sy}`,
    `H ${elbowX - r * dirX}`,
    `A ${r} ${r} 0 0 ${sw1} ${elbowX} ${sy + r * dirY}`,
    `V ${ey - r * dirY}`,
    `A ${r} ${r} 0 0 ${sw2} ${elbowX + r * dirX} ${ey}`,
    `H ${ex}`,
  ].join(" ");
}

/* ─── build an orthogonal elbow path: V → arc → H → arc → V (for mobile) ─ */
function buildVerticalElbowPath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  elbowY: number,
): string {
  // If same x, just a straight vertical line
  if (Math.abs(sx - ex) < 1) return `M ${sx} ${sy} V ${ey}`;

  const dx = ex - sx;
  const dy = ey - sy;
  const dirX = dx > 0 ? 1 : -1;
  const dirY = dy > 0 ? 1 : -1;
  const r = Math.min(
    CORNER_R,
    Math.abs(dx) / 2,
    Math.abs(elbowY - sy) / 2,
    Math.abs(ey - elbowY) / 2,
  );

  // Corner 1: Moving Vertical -> turning Horizontal
  const sw1 = dirX === dirY ? 0 : 1;
  // Corner 2: Moving Horizontal -> turning Vertical
  const sw2 = dirX === dirY ? 1 : 0;

  return [
    `M ${sx} ${sy}`,
    `V ${elbowY - r * dirY}`,
    `A ${r} ${r} 0 0 ${sw1} ${sx + r * dirX} ${elbowY}`,
    `H ${ex - r * dirX}`,
    `A ${r} ${r} 0 0 ${sw2} ${ex} ${elbowY + r * dirY}`,
    `V ${ey}`,
  ].join(" ");
}

/* ─── animated flow path ──────────────────────────────────────── */
interface FlowPathProps {
  d: string;
  delay?: number;
}

const DASH = 18; // blue dash length (px)
const GAP = 260; // gap after dash — large so only one dot is visible
const PERIOD = DASH + GAP;

const FlowPath: React.FC<FlowPathProps> = ({ d, delay = 0 }) => (
  <g>
    {/* static dashed base */}
    <path
      d={d}
      fill="none"
      stroke="rgba(255,255,255,0.13)"
      strokeWidth="1.2"
      strokeDasharray="5 6"
    />
    {/* travelling blue dot — uses reliable strokeDashoffset */}
    <motion.path
      d={d}
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray={`${DASH} ${GAP}`}
      initial={{ strokeDashoffset: 0 }}
      animate={{ strokeDashoffset: -PERIOD }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      style={{ filter: "drop-shadow(0 0 5px #3b82f6)" }}
    />
  </g>
);

/* ─── pulsing diamond tip ─────────────────────────────────────── */
const DiamondTip: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => (
  <motion.polygon
    points={`${cx},${cy - 5} ${cx + 5},${cy} ${cx},${cy + 5} ${cx - 5},${cy}`}
    fill="#3b82f6"
    style={{ filter: "drop-shadow(0 0 6px #60a5fa)" }}
    animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─── main component ──────────────────────────────────────────── */
const Solutions = () => {
  const infra = [
    {
      icon: "/assets/shield.svg",
      name: (
        <p>
          Core
          <br className="sm:hidden" /> Banking
        </p>
      ),
    },
    { icon: "/assets/card.svg", name: <p>Payments</p> },
    {
      icon: "/assets/verify.svg",
      name: (
        <p>
          KYC
          <br className="sm:hidden" /> verification
        </p>
      ),
    },
    {
      icon: "/assets/boxes.svg",
      name: (
        <p>
          Custom <br className="sm:hidden" />
          APIs
        </p>
      ),
    },
  ];

  const digital = [
    { icon: "/assets/apple.svg", name: "iOS app" },
    { icon: "/assets/android.svg", name: "Android app" },
    { icon: "/assets/case.svg", name: "Business app" },
  ];

  const sols = [
    "Build journeys and screens with a visual builder",
    "Connect your core, KYC, payment and more",
    "Configure rules, roles and compliance controls",
    "Preview and deploy to iOS and Android",
  ];

  const [showForm, setShowForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);

  /* refs for measuring positions */
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const infraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const digitalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const digitalSectionRef = useRef<HTMLDivElement>(null); // wrapper for diamond y measurement

  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState<
    { d: string; delay: number; key: string }[]
  >([]);
  const [stubs, setStubs] = useState<{ d: string; key: string }[]>([]); // mobile-only static stubs
  const [diamonds, setDiamonds] = useState<
    { cx: number; cy: number; key: string }[]
  >([]);

  const calcPaths = useCallback(() => {
    const container = containerRef.current;
    const ball = ballRef.current;
    if (!container || !ball) return;

    const cRect = container.getBoundingClientRect();
    // lg breakpoint = 1024px — matches Tailwind's lg:
    const isVertical = window.innerWidth < 1024;

    const rel = (r: DOMRect) => ({
      x: r.left - cRect.left,
      y: r.top - cRect.top,
      w: r.width,
      h: r.height,
    });

    const b = rel(ball.getBoundingClientRect());
    const bCx = b.x + b.w / 2;
    const bCy = b.y + b.h / 2;
    const bLeft = b.x;
    const bRight = b.x + b.w;
    const bTop = b.y;
    const bBottom = b.y + b.h;

    const STUB_H = 50; // px — infra elbow depth (longer = more visible stub)

    const newPaths: typeof paths = [];
    const newStubs: typeof stubs = [];
    const newDiamonds: typeof diamonds = [];

    if (!isVertical) {
      /* ─ HORIZONTAL (lg+): cards on sides, ball in center ──────────────── */

      /* infra → ball: exit card right edge, elbow at 60%, land on ball left */
      infraRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = rel(el.getBoundingClientRect());
        const sx = r.x + r.w + LINE_GAP;
        const sy = r.y + r.h / 2;
        const ex = bLeft - LINE_GAP;
        const ey = bCy;
        const elbowX = sx + (ex - sx) * 0.6;
        const d = buildElbowPath(sx, sy, ex, ey, elbowX);
        newPaths.push({ d, delay: i * 0.28, key: `infra-${i}` });
      });

      /* ball → digital: exit ball right, elbow at 40%, land on card left */
      digitalRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = rel(el.getBoundingClientRect());
        const sx = bRight + LINE_GAP;
        const sy = bCy;
        const ex = r.x - LINE_GAP;
        const ey = r.y + r.h / 2;
        const elbowX = sx + (ex - sx) * 0.4;
        const d = buildElbowPath(sx, sy, ex, ey, elbowX);
        newPaths.push({ d, delay: i * 0.28 + 0.14, key: `dig-${i}` });
        newDiamonds.push({ cx: ex, cy: ey, key: `dmd-${i}` });
      });
    } else {
      /* ─ VERTICAL (md and below) ────────────────────────────────────────────
         Each infra card gets ONE complete V→H→V path to the ball so the
         animated dot travels the full route (card → down → elbow → ball) in
         a single continuous animation — no separate stubs or connectors.
         Same pattern mirrored for ball → digital cards.                       */

      /* INFRA → BALL ─────────────────────────────────────────────────────── */
      const infraPositions: { cx: number; cardBottom: number }[] = [];
      infraRefs.current.forEach((el) => {
        if (!el) return;
        const r = rel(el.getBoundingClientRect());
        infraPositions.push({ cx: r.x + r.w / 2, cardBottom: r.y + r.h });
      });

      if (infraPositions.length > 0) {
        // horizontal elbow sits STUB_H below the card bottoms
        const elbowY = infraPositions[0].cardBottom + STUB_H;
        infraPositions.forEach(({ cx, cardBottom }, i) => {
          // complete path: card bottom → down → horizontal to bCx → down → ball top
          const d = buildVerticalElbowPath(
            cx,
            cardBottom,
            bCx,
            bTop - LINE_GAP,
            elbowY,
          );
          newPaths.push({ d, delay: i * 0.35, key: `infra-${i}` });
        });
      }

      /* BALL → DIGITAL ───────────────────────────────────────────────────── */
      // Gather only the cx of each card (y comes from the section wrapper)
      const digitalCxList: number[] = [];
      digitalRefs.current.forEach((el) => {
        if (!el) return;
        const r = rel(el.getBoundingClientRect());
        digitalCxList.push(r.x + r.w / 2);
      });

      if (digitalCxList.length > 0 && digitalSectionRef.current) {
        const secRect = rel(digitalSectionRef.current.getBoundingClientRect());
        // diamond sits LINE_GAP above the digital section wrapper top
        const diamondY = secRect.y - LINE_GAP;
        // elbow halfway between ball bottom and diamondY
        const elbowY = bBottom + (diamondY - bBottom) / 2;

        digitalCxList.forEach((cx, i) => {
          const d = buildVerticalElbowPath(
            bCx,
            bBottom + LINE_GAP,
            cx,
            diamondY,
            elbowY,
          );
          newPaths.push({ d, delay: i * 0.35, key: `dig-${i}` });
          // diamond floats above the section at the path endpoint
          newDiamonds.push({ cx, cy: diamondY, key: `dmd-${i}` });
        });
      }
    }

    setSvgSize({ w: cRect.width, h: cRect.height });
    setPaths(newPaths);
    setStubs(newStubs);
    setDiamonds(newDiamonds);
  }, []);

  useEffect(() => {
    const t = setTimeout(calcPaths, 150);
    window.addEventListener("resize", calcPaths);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calcPaths);
    };
  }, [calcPaths]);

  return (
    <div
      className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0"
      id="Solution"
    >
      <RequestAccessForm showForm={showForm} setShowForm={setShowForm} />
      <DemoAccessForm
        setShowDemoForm={setShowDemoForm}
        showDemoForm={showDemoForm}
        setShowRequestForm={setShowForm}
      />
      {/* top copy */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-5 bg-blue h-0.5" />
            <p className="text-blue uppercase text-xs tracking-widest">
              The solution
            </p>
          </div>
          <div>
            <p className="text-4xl font-semibold mt-6">
              Build visually. <br className="flex lg:hidden" />
              Connect your core.
              <br className="hidden lg:flex" />
              Launch.
            </p>
            <p className="text-[15px] text-[#A8A8A8] mt-4">
              Orbital lets your team design and configure banking experiences
              visually then
              <br className="hidden lg:flex" /> connect them to your existing
              core and third party services. Orbital sits on top of your
              <br className="hidden lg:flex" /> existing systems so you can
              innovate faster without rip and replace.
            </p>
          </div>
          <CustomButton
            name="Explore the live demo"
            iconRight={ArrowUpRight01Icon}
            className="w-full mt-8 flex lg:hidden"
            iconClassName=""
            onClick={() => setShowDemoForm(true)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          {sols.map((s: string, index: number) => (
            <div className="flex items-center gap-4" key={index}>
              <Image src="/assets/check.svg" alt="" width={16} height={16} />
              <p className="text-base text-[#A8A8A8]">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <CustomButton
        name="Explore the live demo"
        iconRight={ArrowUpRight01Icon}
        className="w-full sm:w-fit mt-8 hidden lg:flex"
        iconClassName=""
        onClick={() => setShowDemoForm(true)}
      />

      {/* diagram */}
      <div ref={containerRef} className="relative mt-20">
        {/* SVG overlay */}
        {svgSize.w > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width={svgSize.w}
            height={svgSize.h}
            style={{ zIndex: 10 }}
          >
            {/* static dashed stubs below each infra card (mobile only) */}
            {stubs.map((s) => (
              <path
                key={s.key}
                d={s.d}
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
                strokeDasharray="5 6"
              />
            ))}
            {paths.map((p) => (
              <FlowPath key={p.key} d={p.d} delay={p.delay} />
            ))}
            {diamonds.map((dm) => (
              <DiamondTip key={dm.key} cx={dm.cx} cy={dm.cy} />
            ))}
          </svg>
        )}

        {/* — HORIZONTAL on lg+, VERTICAL on md and below — */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-32 lg:gap-0">
          {/* infrastructure */}
          <div className="flex flex-col items-center w-full lg:w-fit">
            <p className="uppercase text-[13px] text-[#6E6D7A] tracking-wider">
              Your existing infrastructure
            </p>
            {/* 4-col grid on mobile (all 4 cards in one row), single col on lg+ */}
            <div className="w-full sm:w-fit flex flex-row sm:flex-none sm:grid sm:grid-cols-4 gap-3 mt-7 lg:flex lg:flex-col lg:gap-6">
              {infra.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    infraRefs.current[i] = el;
                  }}
                  className="bg-dark flex flex-col justify-center items-center gap-2 rounded-sm w-full sm:w-35 h-25"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <div className="text-sm font-normal text-[#A8A8A8] text-center sm:text-start">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* glowing ball — centered on mobile */}
          <div
            ref={ballRef}
            className="relative w-65 h-65 shrink-0 mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 rounded-full bg-blue/80 blur-xl animate-pulse" />
            <div className="absolute h-full inset-x-0 z-10 flex flex-col justify-center items-center">
              <div>
                <Image
                  src="/assets/logo blue.svg"
                  alt=""
                  width={140}
                  height={30}
                  className="mx-auto"
                />
                <p className="text-[13px] text-center text-[#A8A8A8] w-fit mx-auto mt-2">
                  Build · Connect · Control · Deploy
                </p>
              </div>
            </div>
            <div className="relative w-full h-full rounded-full bg-[radial-gradient(circle,_#171717_65%,_#171717_40%,_#0066ff_90%,_transparent_100%)]" />
          </div>

          {/* digital */}
          <div
            ref={digitalSectionRef}
            className="flex flex-col items-center w-full lg:w-fit mt-10 lg:mt-0"
          >
            <p className="uppercase text-[13px] text-white tracking-wider">
              Digital experiences you own
            </p>
            {/* 3-col grid on mobile (matches 3 items), single col on lg+ */}
            <div className="grid grid-cols-3 gap-4 mt-7 lg:flex lg:flex-col lg:gap-6">
              {digital.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    digitalRefs.current[i] = el;
                  }}
                  className="bg-dark flex flex-col justify-center items-center gap-2 rounded-sm w-25 lg:w-35 h-25"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                  <p className="text-[11px] lg:text-sm font-normal text-[#A8A8A8] text-center">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
