import "./globals.css";


export const metadata = {
  title: "DnDStickyNotes98",
  description: "DndStickyNotes98 é uma aplicação de notas adesivas com drag and drop, trazendo a estética clássica do Windows 98. Organize suas ideias diretamente na tela de forma simples e intuitiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
