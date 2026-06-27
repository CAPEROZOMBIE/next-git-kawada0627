// app/page.tsx トップページ

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Taniguchi_Date } from "./library/date";

// トップに新着ニュース3件
import { getYamataNews } from "./library/microcms";

async function Home() {
   const kanata = "おろちとかなに"
   const Topnews = await getYamataNews({
      limit: 3
   });

   return (
      <>

         <Header orochi={kanata} boxOn={true} />
         <h1>トップページ</h1>
         <main>
            <Hero src={"/kagawa.jpg"} max_width_prop={700} copy="" text=""
               HeroImageOn={true}
            />

            {/* トップに新着ニュース3件 */}
            <ul>
               {Topnews.contents.map((item) => (
                  <li key={item.id}>
                     {item.publishedAt && Taniguchi_Date(item.publishedAt)}
                      ｜ <a href={`/news/detail/${item.id}`}>{item.title}</a>
                     ｜ {item.category.name}
                  </li>
               ))}
            </ul>
            <div><a href="/news/1">ニュース一覧へ</a></div>

         </main>

         <Footer orochi={kanata} />
      </>
   );
}

export default Home




