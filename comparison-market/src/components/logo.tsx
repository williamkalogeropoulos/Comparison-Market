"use client";

import { useState } from "react";

export function Logo({ size = 32 }: { size?: number }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        style={{ width: size, height: size }}
        className="grid place-items-center rounded-md bg-slate-900 text-white text-[0.65rem] font-bold"
      >
        CM
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="overflow-hidden rounded-md ring-1 ring-slate-200 bg-white"
    >
      {/* Crop the provided image to show only the icon (hide the letters). */}
      {/* Place your image at /public/brand/comparethat.png (or .jpg). */}
      <img
        src="/brand/comparethat.png"
        alt="CompareThat icon"
        className="w-full h-full object-cover"
        style={{ objectPosition: "center 20%" }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}


