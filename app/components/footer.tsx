import { Reveal } from "./animations/reveal";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/8 bg-black/90 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6">
        <Reveal amount={0.4}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-100/90">
            Valet<span className="text-red-400">Go</span>
          </p>
        </Reveal>
        <Reveal delay={0.08} amount={0.4}>
          <p className="mt-3 text-xs tracking-[0.04em] text-zinc-300/62">
            Serving Columbus, Ohio & surrounding areas
          </p>
        </Reveal>
        <Reveal delay={0.14} amount={0.4}>
          <p className="mt-3 text-[10px] tracking-[0.04em] text-zinc-500/80">
            © {new Date().getFullYear()} ValetGo
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
