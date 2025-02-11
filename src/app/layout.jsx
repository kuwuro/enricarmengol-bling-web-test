import "./globals.css";

export const metadata = {
  title: "PokédexKuwuro",
  description: "Pokédex for the BLING Technical Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/poke.png' type='image/png' sizes='<generated>' />
      <body>{children}</body>
    </html>
  );
}
