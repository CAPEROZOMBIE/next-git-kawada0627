// news/page.tsx

import style from './news.module.css';
import { getYamataNews } from '../library/microcms';
import { Header } from '../components/Header';

async function Page() {
   const newslist = await getYamataNews({
      limit:5
   })

   return (
      <>
         <Header orochi="あああ" boxOn={false}  />
         <h1>一覧ページ</h1>
         <div>
            {newslist.contents.map((create) => (
               <div key={create.id} className={style.list}>
                  <a href={`/news/detail/${create.id}`}>{create.title}</a>
                   ｜
                   
                   {/* カテゴリーページへのリンク */}
                   <a href={`/news/category/${create.category.id}`}>{create.category.name}</a>
                   
                    ｜ {create.publishedAt}
                  <br/><br/>
            </div>
               
            ))}
           
         </div>
      </>
   );
}

export default Page