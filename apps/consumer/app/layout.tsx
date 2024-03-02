import { Noto_Sans } from "next/font/google";

import { Toaster } from "app/components/ui/sonner";
import { cn } from "app/lib/utils";
import "app/styles/base.css";

const roboto = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(roboto.className, "min-h-full")}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
