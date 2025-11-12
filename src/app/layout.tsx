import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OzemPro - Seu Acompanhamento Diário",
  description: "Acompanhe sua jornada com Wegovy, Mounjaro, Saxenda ou Victoza de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
