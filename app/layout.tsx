import "../styles/globals.css";
import Header from "./Header";

/**This is where we will render all the components, like the app file in folders page did. */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Tiago's Next 13 practing</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
