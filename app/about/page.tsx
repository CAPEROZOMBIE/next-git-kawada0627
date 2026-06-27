// about/page.tsx

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

export default function Home() {
   return (
      <>
         <Header orochi="あああ" boxOn={false} />
         <h1 className="midashi">アバウトページ</h1>
         <Hero src={"/miya.jpg"} max_width_prop={700} copy="sss" text="sss" HeroImageOn  />
         <Footer orochi="フッターですぜ"/>
      </>
   );
}
