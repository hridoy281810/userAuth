import "./globals.css";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/provider/reduxProvider";

export const metadata = {
  title: "usrAuth",
  description: "userAuth",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
