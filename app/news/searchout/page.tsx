// app/news/searchout/page.tsx 検索結果ページ

import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { getYamataNews } from "@/app/library/microcms";
// import { getAllYamataNews } from "@/app/library/microcms"; //全記事 （月別・年別用）

import { SearchBox } from "@/app/components/SearchBox"; //検索ボックス
import { getYamataCategoryList } from "@/app/library/microcms";//カテゴリーネーム一覧
import style from "@/app/news/searchout/searchout.module.css"


type alltype = { searchParams: Promise<{ q?: string }> } //検索
async function Page({ searchParams }: alltype) {

   const { q } = await searchParams
   const Yamata_news = await getYamataNews({
      fields: ["id","title"],
      // fields: ["id", "title", "publishedAt"],
      limit: 50,
      q
   });


   //////////////// 月別アーカイブリスト

   // const allNews = await getAllYamataNews({})
   // const archives: Record<string, number> = {}

   // allNews.forEach((n) => {
   //    if (!n.publishedAt) return // undefined を弾く
   //    const d = new Date(n.publishedAt)
   //    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`

   //    archives[key] = (archives[key] || 0) + 1
   // })

   // const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))



   //////////////// 年別アーカイブ 追加0313

   // const yearSet = new Set<string>()

   // archiveList.forEach(([month]) => {
   //    const [y] = month.split("-")
   //    yearSet.add(y)
   // })

   // const yearList = Array.from(yearSet).sort((a, b) => b.localeCompare(a))

   //////////////// カテゴリーリスト

   const category_list = await getYamataCategoryList();

   return (
      <>
         <Header boxOn={true} orochi="" />
         <SearchBox />
         <h4>検索結果</h4>

         <ul>
            {Yamata_news.contents.length === 0 ? (
               <div className={style.gaitou}>該当はありません</div>
            ) : (
               Yamata_news.contents.map((create) => (
                  <li key={create.id}>
                     <a href={`/news/detail/${create.id}`}>
                        {create.title}
                     </a>
                  </li>
               ))
            )}
         </ul>

         {/* 月別アーカイブ */}

         {/* <br /><hr />
         <ul>
            {archiveList.map(([month, count]) => {
               const [y, m] = month.split("-")
               return (
                  <li key={month}>
                     <a href={`/news/date/${month}`}>
                        {y}年{m}月 ({count})
                     </a>
                  </li>
               )
            })}
         </ul> */}

         {/* 年別アーカイブ */}
         {/* 
         <br /><hr />

         <ul>
            {yearList.map((item) => (
               <li key={item}>
                  <a href={`/news/year/${item}`}>
                     {item}年アーカイブ
                  </a>
               </li>
            ))}
         </ul> */}


         {/* カテゴリーネーム */}

         <br /><hr />
         <ul>
            {category_list.map((item) => (
               <li key={item.id}>
                  <a href={`/news/category/${item.id}/1`}>
                     {item.name}
                  </a>
               </li>
            ))}
         </ul>

         <Footer orochi="" />
      </>
   )

}

export default Page

