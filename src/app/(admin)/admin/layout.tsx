// app/(admin)/admin/layout.tsx

import AdminShell from "@/components/layouts/AdminShell";
import { Inter } from "next/font/google";
import React from "react";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} ${inter.variable} antialiased h-screen overflow-hidden`}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
