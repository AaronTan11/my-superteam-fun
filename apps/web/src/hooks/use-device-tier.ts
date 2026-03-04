"use client";

import { useState, useEffect } from "react";

export type DeviceTier = "low" | "mid" | "high";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
      setTier("low");
      return;
    }

    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency ?? 2;

    if (isMobile || cores <= 2) {
      setTier("low");
    } else if (cores >= 8) {
      setTier("high");
    } else {
      setTier("mid");
    }
  }, []);

  return tier;
}
