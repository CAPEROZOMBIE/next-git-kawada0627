// app/news/[page_id]/page.tsx ニュース一覧ページ・トップ

import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { getYamataNews } from "@/app/library/microcms";
import { getAllYamataNews } from "@/app/library/microcms"; //全記事
import style from "./page_id.module.css"
import Image from "next/image";

import { Taniguchi_Date } from "@/app/library/date"; //谷口デイト

//試し

import { SearchBox } from "@/app/components/SearchBox";
import { getYamataCategoryList } from "@/app/library/microcms";//カテゴリーネーム一覧

// 3月23日追加
export const revalidate = 60

type alltype = { params: Promise<{ page_id: string }> }
async function Page({ params }: alltype) {
   const { page_id: pageParams } = await params;
   const page = Number(pageParams)

   const pageSize = 10
   const Yamata_news = await getYamataNews({
      fields: ["id", "title", "publishedAt", "thumbnail", "content", "category"],
      limit: pageSize,
      offset: (page - 1) * pageSize
   });

   //ページネーション付↓

   // 追加
   const lastPage = Math.ceil(Yamata_news.totalCount / pageSize)

   // 追加改訂
   const maxPages = 5

   let start = 1
   let end = Math.min(lastPage, maxPages)

   if (page > maxPages / 2) {
      start = page - Math.floor(maxPages / 2)
      end = start + maxPages - 1

      if (end > lastPage) {
         end = lastPage
         start = Math.max(1, end - maxPages + 1)
      }
   }

   // // // 月別アーカイブリスト

   const allNews = await getAllYamataNews({
      fields: ["publishedAt"]
   })
   const archives: Record<string, number> = {}

   allNews.forEach((n) => {
      if (!n.publishedAt) return // undefined を弾く
      const d = new Date(n.publishedAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`

      archives[key] = (archives[key] || 0) + 1
   })

   const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))


   // // //　年別アーカイブ 追加0313

   const yearSet = new Set<string>()

   archiveList.forEach(([month]) => {
      const [y] = month.split("-")
      yearSet.add(y)
   })

   const yearList = Array.from(yearSet).sort((a, b) => b.localeCompare(a))


   // カテゴリーリスト
   const category_list = await getYamataCategoryList();


   return (
      <>
         <Header boxOn={true} orochi="" />
            <h1>ニュース一覧</h1>
            <SearchBox />

         {/* 検索 */}
         
         <div className={style.test5}>
            {Yamata_news.contents.map((create) => (
               <div key={create.id}>
                  <div className={style.test}>

                     <figure className={style.thumbnail}>{create.thumbnail &&
                        <Image
                           src={create.thumbnail?.url}
                           alt=""
                           width={120}
                           height={70}
                           style={{ width: "120px", height: "auto", maxWidth: `${150}px` }}
                           priority
                           sizes="100vw"
                        />}
                     </figure>

                     <div className={style.test2}>

                        <div className={style.test3}>
                           <h3 className={style.h4}><a href={`/news/detail/${create.id}`}>{create.title}</a>
                              {/* 　{create.publishedAt} */}

                           </h3>
                           <time className={style.time}>{create.publishedAt && Taniguchi_Date(create.publishedAt)}</time>
                        </div>

                        <div>{create.content}</div>
                        <div><a href={`/news/category/${create.category.id}/1`}>【{create.category.name}】</a></div>
                     </div>
                  </div>
                  <hr />
               </div>
            ))}

         </div>

         {/* GPTのページネーション */}
         <div className={style.pagination}>
            {page === 1 ? (
               <span className={style.disabled}>【前のページ】</span>
            ) : (
               <a href={`/news/${page - 1}`} className={style.link}>【前のページ】</a>
            )}

            {/* 真ん中ページネーション */}
            {[...Array(end - start + 1)].map((_, i) => {
               const pageNum = start + i
               return (
                  <a
                     key={pageNum}
                     href={`/news/${pageNum}`}
                     className={page === pageNum ? style.active : style.pageNumber}
                  >
                     {pageNum}
                  </a>
               )
            })}

            {page === lastPage ? (
               <span className={style.disabled}>【次のページ】</span>
            ) : (
               <a href={`/news/${page + 1}`} className={style.link}>【次のページ】</a>
            )}
         </div>

         {/*　最初・最後のページ  */}
         <div>
            <br />
            <hr />
            <br />

            {/* 最初の */}
            {page === 1 ? (
               <span className={style.disabled}>一番最初のページ</span>
            ) : (
               <a href="/news/1" className={style.link}>一番最初のページ</a>
            )}

            ｜

            {/* // 最後 */}

            {page === lastPage ? (
               <span className={style.disabled}>一番最後のページ</span>
            ) : (
               <a href={`/news/${lastPage}`} className={style.link}>一番最後のページ</a>
            )}
         </div>


         {/* 月別アーカイブ */}
         <br /><hr />
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
         </ul>

         {/* 年別アーカイブ */}

         <br /><hr />

         <ul>
            {yearList.map((item) => (
               <li key={item}>
                  <a href={`/news/year/${item}`}>
                     {item}年アーカイブ
                  </a>
               </li>
            ))}
         </ul>


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



