"use client";

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />

      {/* Animated blobs */}
      <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 animate-blob" style={{ animationDuration: '28s' }} />
      <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl bg-gradient-to-tr from-rose-500/15 to-amber-500/15 animate-blob" style={{ animationDuration: '32s', animationDelay: '2s' }} />
      <div className="absolute bottom-[-8rem] left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl bg-gradient-to-tl from-sky-500/15 to-violet-500/15 animate-blob" style={{ animationDuration: '36s', animationDelay: '4s' }} />
      <div className="absolute top-1/2 right-1/3 w-[22rem] h-[22rem] rounded-full blur-3xl bg-gradient-to-br from-emerald-500/15 to-sky-500/10 animate-blob" style={{ animationDuration: '40s', animationDelay: '6s' }} />
    </div>
  );
}


