// app/about/layout.tsx アバウトのレイアウトtsx

import "./about.css";

type alltype = { children:React.ReactNode };
const RootLayout = ({ children }: alltype) => {
   return (
      <>
         {children}
      </>
   )
}

export default RootLayout
