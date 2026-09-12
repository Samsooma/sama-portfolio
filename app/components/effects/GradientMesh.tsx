"use client";

export function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-violet-400/[0.12] dark:bg-violet-500/[0.12] blur-[80px]" />
      <div className="absolute top-[25%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-indigo-400/[0.10] dark:bg-sky-500/[0.10] blur-[70px]" />
      <div className="absolute bottom-[5%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-rose-300/[0.08] dark:bg-amber-500/[0.08] blur-[60px]" />
    </div>
  );
}
