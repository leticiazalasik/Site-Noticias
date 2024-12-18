"use client"; 

import Header from "./Header";
import { SessionProvider } from "next-auth/react";

export default function HeaderWithSession() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}
