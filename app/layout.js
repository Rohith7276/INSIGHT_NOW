import "./globals.css";
import localFont from 'next/font/local'
import SessionWrapper from "@/components/sessionWrapper";
export const metadata = {
  title: "Insight Now",
  description: "News web app",
};
const myFont = localFont({
  src: '../public/fonts/Gotham.otf',
  display: 'swap',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body className="bg-[#f4e7e7] scrolling dark:darkScroll text-sm lg:text-[16px] overflow-scroll dark:bg-black">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
