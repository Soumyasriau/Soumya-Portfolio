import { useEffect, useRef, useState } from "react";

const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ico() {
  const t = (1 + Math.sqrt(5)) / 2;
  const v: number[][] = [[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]];
  const n = v.map(([x, y, z]) => { const l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; });
  const e: [number, number][] = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++)
    if (Math.hypot(n[i][0]-n[j][0], n[i][1]-n[j][1], n[i][2]-n[j][2]) < 1.1) e.push([i, j]);
  return { v: n, e };
}

function rot(p: number[], ax: number, ay: number) {
  const [x, y, z] = p;
  const y1 = y * Math.cos(ax) - z * Math.sin(ax), z1 = y * Math.sin(ax) + z * Math.cos(ax);
  return [x * Math.cos(ay) + z1 * Math.sin(ay), y1, -x * Math.sin(ay) + z1 * Math.cos(ay)];
}

function setup(c: HTMLCanvasElement) {
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const fit = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();
  window.addEventListener("resize", fit);
  return { ctx, off: () => window.removeEventListener("resize", fit) };
}

/** Wireframe lattice + orbiting nodes that react to the pointer and scroll. */
export function HeroObject() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const c = ref.current!; const s = setup(c);
    if (!s) { setOk(false); return; }
    const { ctx } = s; const g = ico();
    const small = window.innerWidth < 760, still = reduced();
    const nodes = Array.from({ length: small ? 8 : 16 }, (_, i) => ({ a: (i / (small ? 8 : 16)) * Math.PI * 2, r: 1.5 + (i % 3) * 0.18, tilt: (i % 4) * 0.5 }));
    let mx = 0, my = 0, raf = 0, t = 0;
    const move = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    window.addEventListener("pointermove", move);
    const draw = () => {
      const w = c.clientWidth, h = c.clientHeight, R = Math.min(w, h) * 0.5, f = 4;
      ctx.clearRect(0, 0, w, h);
      const sc = window.scrollY, ay = t * 0.25 + mx * 1.1 + sc * 0.0018, ax = 0.4 + my * 0.8 + sc * 0.001;
      const P = (p: number[], k: number) => { const q = rot(p, ax, ay), s2 = f / (f + q[2]); return [w / 2 + q[0] * k * s2, h / 2 + q[1] * k * s2, q[2]]; };
      ctx.lineWidth = 1.4; ctx.strokeStyle = css("--color-primary");
      for (const [i, j] of g.e) {
        const a = P(g.v[i], R * 1.0), b = P(g.v[j], R * 1.0);
        ctx.globalAlpha = 0.28 + 0.4 * ((2 - (a[2] + b[2]) / 2) / 2);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }
      ctx.fillStyle = css("--color-primary"); ctx.globalAlpha = 0.9;
      for (const v of g.v) { const p = P(v, R * 1.0); ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, 7); ctx.fill(); }
      ctx.strokeStyle = css("--color-secondary"); ctx.fillStyle = css("--color-secondary");
      ctx.globalAlpha = 0.22; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k <= 64; k++) { const p = P([Math.cos(k / 64 * 6.283) * 1.5, 0, Math.sin(k / 64 * 6.283) * 1.5], R * 1.0); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
      ctx.stroke();
      for (const n of nodes) {
        const a = n.a + t * 0.5, p = P([Math.cos(a) * 1.5, Math.sin(a) * 0.15, Math.sin(a) * 1.5], R * 1.0);
        ctx.globalAlpha = 0.5 + 0.4 * ((1.6 - p[2]) / 3.2); ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, 7); ctx.fill();
      }
      ctx.fillStyle = css("--color-accent"); ctx.globalAlpha = 0.95;
      const p = P([Math.cos(t) * 1.5, 0, Math.sin(t) * 1.5], R * 1.0); ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, 7); ctx.fill();
      t += still ? 0 : 0.012;
      if (!still) raf = requestAnimationFrame(draw);
    };
    draw();
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !still) raf = requestAnimationFrame(draw); };
    document.addEventListener("visibilitychange", vis);
    return () => { cancelAnimationFrame(raf); s.off(); window.removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return ok ? <canvas ref={ref} aria-hidden="true" /> : <div className="fallback3d" />;
}

/** Low-opacity 3D particle field that drifts with scroll. */
export function BgField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const s = setup(c); if (!s) return;
    const { ctx } = s; const still = reduced();
    const N = window.innerWidth < 760 ? 45 : 110;
    const pts = Array.from({ length: N }, () => [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1]);
    let raf = 0, t = 0;
    const draw = () => {
      const w = c.clientWidth, h = c.clientHeight; ctx.clearRect(0, 0, w, h);
      const ay = t + scrollY * 0.0006, ax = scrollY * 0.0003;
      const cols = [css("--color-primary"), css("--color-secondary"), css("--color-accent")];
      pts.forEach((p, i) => {
        const q = rot(p, ax, ay), s2 = 2.4 / (2.4 + q[2]);
        ctx.globalAlpha = 0.25 + 0.35 * s2 / 1.6; ctx.fillStyle = cols[i % 3];
        ctx.beginPath(); ctx.arc(w / 2 + q[0] * w * 0.6 * s2, h / 2 + q[1] * h * 0.6 * s2, 1.2 + 2 * s2, 0, 7); ctx.fill();
      });
      t += still ? 0 : 0.0009;
      if (!still) raf = requestAnimationFrame(draw);
    };
    draw();
    const onScroll = () => { if (still) draw(); };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); s.off(); removeEventListener("scroll", onScroll); };
  }, []);
  return <div className="bg-field"><canvas ref={ref} aria-hidden="true" /></div>;
}
