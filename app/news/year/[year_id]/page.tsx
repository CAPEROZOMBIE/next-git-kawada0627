// news/year/[year_id]/page.tsx 年単位、月の一覧ページ(1~12)

import { Footer } from "@/app/components/Footer"
// import { getYamataNews } from "@/app/library/microcms"
import { getAllYamataNews } from "@/app/library/microcms"

type alltype = { params: Promise<{ year_id: string }> }
async function Page({ params }: alltype) {
   const { year_id } = await params;

   // const Yamata_news = await getYamataNews({ //getList
   //    filters: `publishedAt[begins_with]${date_id}`,
   //    fields: ["id", "title", "publishedAt"],
   //    limit: 50
   // });


   // // // // // // // // // / 前後の月へのリンクC案試してみる0312


   const all = await getAllYamataNews({   //getAllYamataNews
      fields: "publishedAt"
   })

   const archives: Record<string, number> = {}

   all.forEach((n) => { //all
      if (!n.publishedAt) return // undefined を弾く
      const d = new Date(n.publishedAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`

      archives[key] = (archives[key] || 0) + 1
   })

   const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))

   // // // // // // // // // // // // 追加・月一覧

   const yearArchiveList = archiveList.filter(([month]) => {
   const [y] = month.split("-")
   return y === year_id
})

   // // // // // // // // // // // // 追加・年アーカイブ


   

   return (
      <>
     
         {/* <h2>{date_id}</h2> */}
         <h1>{year_id}年 月リスト</h1>
{/* 
         <ul>
            {Yamata_news.contents.map((item) => (
               <li key={item.id}>
                  <a href={`/news/detail/${item.id}`}>
                     {item.title}</a>
               </li>
            ))}
         </ul> */}

         {/* 月別アーカイブ */}
            <br /><hr />
         <ul>
            {yearArchiveList.map(([month, count]) => {
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

         <Footer orochi="" />
      </>
   )
}

export default Page