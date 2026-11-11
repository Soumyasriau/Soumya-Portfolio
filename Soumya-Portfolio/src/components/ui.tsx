import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function Reveal({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = r.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={r} className={`rv ${className}`} style={{ "--d": d } as CSSProperties}>{children}</div>;
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLElement>(null);
  const fine = typeof matchMedia !== "undefined" && matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const move = (e: React.PointerEvent) => {
    if (!fine) return;
    const b = r.current!.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    r.current!.style.setProperty("--ry", `${x * 7}deg`);
    r.current!.style.setProperty("--rx", `${-y * 7}deg`);
  };
  const leave = () => { r.current?.style.setProperty("--ry", "0deg"); r.current?.style.setProperty("--rx", "0deg"); };
  return <article ref={r} className={className} onPointerMove={move} onPointerLeave={leave}>{children}</article>;
}

export function useTyped(text: string) {
  const still = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [n, setN] = useState(still ? text.length : 0);
  useEffect(() => {
    if (still) return;
    let i = 0; let iv: number;
    const start = setTimeout(() => { iv = window.setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv); }, 38); }, 1100);
    return () => { clearTimeout(start); clearInterval(iv); };
  }, [text, still]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

export function Cursor() {
  const g = useRef<HTMLDivElement>(null), d = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, y = 0, gx = 0, gy = 0, raf = 0;
    const m = (e: PointerEvent) => { x = e.clientX; y = e.clientY; d.current!.style.transform = `translate(${x}px,${y}px)`; };
    const loop = () => { gx += (x - gx) * 0.12; gy += (y - gy) * 0.12; g.current!.style.transform = `translate(${gx}px,${gy}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("pointermove", m); loop();
    return () => { removeEventListener("pointermove", m); cancelAnimationFrame(raf); };
  }, []);
  return <><div className="cursor" ref={g} aria-hidden="true" /><div className="dot" ref={d} aria-hidden="true" /></>;
}
