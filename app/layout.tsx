import type {Metadata} from "next";
import "./globals.css";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Race Stint Calculator",
  description: "discord race stint calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="flex w-full flex-col gap-2">
          <Footer />
        </div>
      </body>
    </html>
  );
}
