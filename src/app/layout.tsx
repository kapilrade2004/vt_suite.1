import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/contexts/auth-context";
import { CRMProvider } from "@/contexts/crm-context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "VasifyTech Suite — CRM, HR, Projects & Finance in one place",
  description: "All-in-one business management platform connecting CRM, HR & Payroll, Project Management, Finance & Invoicing, and Team Workspace.",
  keywords: ["CRM", "HR Software", "Payroll", "Project Management", "Invoicing", "VasifyTech Suite", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-[var(--text)] bg-[var(--bg)] min-h-screen">
        <AuthProvider>
          <CRMProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </CRMProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
