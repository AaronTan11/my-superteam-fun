"use client";

import { AnimatePresence } from "motion/react";
import { MobileProvider, useMobile } from "./mobile-context";
import { StatusBar } from "./status-bar";
import { HomeIndicator } from "./home-indicator";
import { LockScreen } from "./lock-screen";
import { HomeScreen } from "./home-screen";
import { AppView } from "./app-view";
import type { AppType } from "@/components/desktop/types";

function MobileScreenRouter() {
  const { state } = useMobile();

  return (
    <AnimatePresence mode="wait">
      {state.screen === "lock" && <LockScreen key="lock" />}
      {state.screen === "home" && <HomeScreen key="home" />}
      {state.screen === "app" && state.activeApp && (
        <AppView
          key={`app-${state.activeApp}`}
          app={state.activeApp}
          origin={state.appOrigin}
        />
      )}
    </AnimatePresence>
  );
}

interface MobileShellProps {
  initialApp?: AppType;
}

export function MobileShell({ initialApp }: MobileShellProps) {
  return (
    <MobileProvider initialApp={initialApp}>
      <div className="h-[100dvh] w-screen overflow-hidden bg-background relative">
        <StatusBar />
        <MobileScreenRouter />
        <HomeIndicator />
      </div>
    </MobileProvider>
  );
}
