import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { profile, experience, projects, skills, education, certifications, languages, type Project } from "./data";
import { Reveal, Tilt, useTyped, Cursor } from "./components/ui";

const HeroObject = lazy(() => import("./components/Scene3D").then((m) => ({ default: m.HeroObject })));
const BgField = lazy(() => import("./components/Scene3D").then((m) => ({ default: m.BgField })));

const NAV = [["about", "About"], ["experience", "Internships"], ["projects", "Projects"], ["skills", "Skills"], ["learning", "Learning"], ["contact", "Contact"]];
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Nav() {
  const [hide, setHide] = useState(false), [active, setActive] = useState(""), [open, setOpen] = useState(false);
  useEffect(() => {
    let last = 0;
    const s = () => { const y = scrollY; setHide(y > last && y > 120); if (y < last) setHide(false); last = y; };
    addEventListener("scroll", s, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => { removeEventListener("scroll", s); io.disconnect(); };
  }, []);
  return (
    <header className={`nav ${hide && !open ? "hide" : ""}`}>
      <div className="wrap">
        <a className="logo" href="#top">Soumya<span>.</span></a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        <ul className={`links ${open ? "open" : ""}`}>
          {NAV.map(([id, l]) => <li key={id}><a href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>{l}</a></li>)}
        </ul>
      </div>
    </header>
  );
}

function Hero() {
  const { shown, done } = useTyped(profile.tagline);
  const words = profile.name.split(" ");
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <p className="hello">Hello, I'm</p>
          <h1 aria-label={profile.name}>
            {words.map((w, i) => <span key={i} className="w" style={{ ["--i" as string]: i }} aria-hidden="true">{i === 0 ? <span className="grad">{w}</span> : w}&nbsp;</span>)}
          </h1>
          <p className="role">{profile.title}</p>
          <p className="tag" aria-label={profile.tagline}>{shown}{!done && <span className="caret" />}</p>
          <div className="cta">
            <a className="btn primary" href="#projects">View my projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
          <div className="socials">
            <a className="ulink" href={profile.github} {...ext}>GitHub</a>
            <a className="ulink" href={profile.linkedin} {...ext}>LinkedIn</a>
            <a className="ulink" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait"><img src="/soumya.jpg" alt="Portrait of Venkata Soumya Sri Allamsetti" width={720} height={960} fetchPriority="high" /></div>
          <div className="scene-hero"><Suspense fallback={<div className="fallback3d" />}><HeroObject /></Suspense></div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about"><div className="wrap">
      <Reveal><p className="eyebrow">About</p><h2 className="title">A little about me</h2></Reveal>
      <div className="about">
        <div>{profile.about.map((p, i) => <Reveal key={i} d={i}><p>{p}</p></Reveal>)}</div>
        <Reveal d={2}><dl className="facts">
          <dt>Based in</dt><dd>{profile.location}</dd>
          <dt>Studying</dt><dd>B.Tech CSE, Andhra University College of Engineering (2023 – 2027)</dd>
          <dt>Languages</dt><dd>{languages.join(" · ")}</dd>
          <dt>Open to</dt><dd>Graduate Trainee / Software Engineer roles</dd>
        </dl></Reveal>
      </div>
    </div></section>
  );
}

function Experience() {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = r.current!;
    const f = () => { const b = el.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - b.top) / b.height)); el.style.setProperty("--p", String(p)); };
    f(); addEventListener("scroll", f, { passive: true }); addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);
  return (
    <section id="experience"><div className="wrap">
      <Reveal><p className="eyebrow">Experience</p><h2 className="title">Internships</h2></Reveal>
      <div className="tl" ref={r}>
        <div className="tl-line"><i /></div>
        {experience.map((x, i) => (
          <Reveal key={x.role} d={i}><div className="tl-item">
            <h3>{x.role}</h3><p className="org">{x.org}</p>
            <p className="dates">{x.dates}{x.place && ` · ${x.place}`}</p>
            <ul>{x.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div></Reveal>
        ))}
      </div>
    </div></section>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal d={i % 3}>
      <Tilt className="pcard">
        <div className="pnum" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
        {p.badge && <span className="badge">{p.badge}</span>}
        <h3>{p.title}</h3>
        <p className="d">{p.description}</p>
        {p.note && <p className="note">{p.note}</p>}
        {p.tech.length > 0 && <>
          {p.techLabel && <p className="tlabel">{p.techLabel}</p>}
          <div className="chips">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
        </>}
        <div className="actions">
          {p.live && <a className="btn primary sm" href={p.live} {...ext}>Live Demo ↗</a>}
          {p.github && <a className="btn ghost sm" href={p.github} {...ext}>{p.live ? "GitHub" : "GitHub Source Code"} ↗</a>}
          {p.repos?.map((r) => <a key={r.label} className="btn ghost sm" href={r.url} {...ext}>GitHub · {r.label} ↗</a>)}
        </div>
      </Tilt>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects"><div className="wrap">
      <Reveal><p className="eyebrow">Selected work</p><h2 className="title">Projects I've <span className="grad">built</span></h2></Reveal>
      <div className="pgrid">{projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}</div>
    </div></section>
  );
}

function Skills() {
  return (
    <section id="skills"><div className="wrap">
      <Reveal><p className="eyebrow">Toolkit</p><h2 className="title">Skills</h2></Reveal>
      <div className="sgrid">{skills.map((s, i) => (
        <Reveal key={s.group} d={i % 3}><div className="scard"><h3>{s.group}</h3><div className="chips" style={{ marginBottom: 0 }}>{s.items.map((t) => <span className="chip" key={t}>{t}</span>)}</div></div></Reveal>
      ))}</div>
    </div></section>
  );
}

function Learning() {
  return (
    <section id="learning"><div className="wrap two">
      <div>
        <Reveal><p className="eyebrow">Education</p><h2 className="title">Where I studied</h2></Reveal>
        {education.map((e, i) => <Reveal key={e.school} d={i}><div className="edu"><span className="y">{e.years}</span><b>{e.school}</b><span>{e.degree} · {e.detail}</span></div></Reveal>)}
      </div>
      <div>
        <Reveal><p className="eyebrow">Certifications & courses</p><h2 className="title">Always learning</h2></Reveal>
        <Reveal><ul className="cert">{certifications.map((c) => <li key={c}>{c}</li>)}</ul></Reveal>
      </div>
    </div></section>
  );
}

function Contact() {
  return (
    <section id="contact"><div className="wrap">
      <Reveal><div className="contact">
        <h2>Let's build something good together</h2>
        <p>I'm looking for Graduate Trainee and Software Engineer opportunities. Say hello — I'd love to hear from you.</p>
        <div className="cta">
          <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn ghost" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>
          <a className="btn ghost" href={profile.linkedin} {...ext}>LinkedIn ↗</a>
          <a className="btn ghost" href={profile.github} {...ext}>GitHub ↗</a>
        </div>
      </div></Reveal>
    </div></section>
  );
}

export default function App() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.1 });
    let id = requestAnimationFrame(function raf(t) { l.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, []);
  return (
    <>
      <Suspense fallback={null}><BgField /></Suspense>
      <Cursor />
      <Nav />
      <main>
        <Hero /><About /><Experience /><Projects /><Skills /><Learning /><Contact />
      </main>
      <footer>© 2026 {profile.name}. Built with care in {profile.location.split(",")[0]}.</footer>
    </>
  );
}
