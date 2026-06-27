// news/category/[cat_id]/[page]/page.tsx カテゴリー一覧

import { Header } from "@/app/components/Header";
import { getYamataNews } from "@/app/library/microcms"; //getlist
import style from "@/app/news/category/[cat_id]/[page]/cat_id.module.css"
import { Footer } from "@/app/components/Footer";

import { getYamataCategory } from "@/app/library/microcms";

// カテゴリー一覧
import { getYamataCategoryList } from "@/app/library/microcms";


type alltype = { params: Promise<{ cat_id: string; page:string }> }
async function Page({ params }: alltype) {
   const { cat_id,page: pageParams } = await params;
   const page = Number(pageParams)

   const pageSize = 5
   const Yamata_news = await getYamataNews({
      filters:`category[equals]${cat_id}`,
      fields: ["id", "title", "publishedAt"],
      limit: pageSize,
      offset: (page - 1) * pageSize
   });

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

   // カテゴリーネーム
   const category_name = await getYamataCategory(cat_id);

   
   // カテゴリーリスト　0315
   const category_list = await getYamataCategoryList();

   return(
      <>
      <Header orochi="" boxOn={false} />

      <h2>{category_name.name}</h2>

         <ul>
            {Yamata_news.contents.map((create) => (
               <li key={create.id}>
                  <a href={`/news/detail/${create.id}`}>{create.title}</a>
               </li>
            ))}
         </ul>

         {/* GPTのページネーション */}
         <div className={style.pagination}>
            {page === 1 ? (
               <span className={style.disabled}>【前のページ】</span>
            ) : (
               <a href={`/news/category/${cat_id}/${page - 1}`} className={style.link}>【前のページ】</a>
            )}

            {/* 真ん中ページネーション */}
            {[...Array(end - start + 1)].map((_, i) => {
               const pageNum = start + i
               return (
                  <a
                     key={pageNum}
                     href={`/news/category/${cat_id}/${pageNum}`}
                     className={page === pageNum ? style.active : style.pageNumber}
                  >
                     {pageNum}
                  </a>
               )
            })}

            {page === lastPage ? (
               <span className={style.disabled}>【次のページ】</span>
            ) : (
               <a href={`/news/category/${cat_id}/${page + 1}`} className={style.link}>【次のページ】</a>
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
                  <a href={`/news/category/${cat_id}/1`} className={style.link}>一番最初のページ</a>
               )}

               ｜

               {/* // 最後 */}

               {page === lastPage ? (
                  <span className={style.disabled}>一番最後のページ</span>
               ) : (
                  <a href={`/news/category/${cat_id}/${lastPage}`} className={style.link}>一番最後のページ</a>
               )}
            </div>

             {/* カテゴリーリスト */}
            <div>
               <br />
               <hr />
               <br />
               <ul>
               {category_list.map((item)=>(
                  <li key={item.id}>
                     <a href={`/news/category/${item.id}/1`}>{item.name}</a>
                  </li>
               ))}
               </ul>
            </div>


         <Footer orochi=""/>
      </>
   )

}

export default Page