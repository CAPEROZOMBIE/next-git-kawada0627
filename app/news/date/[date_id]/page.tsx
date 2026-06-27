// news/date/[date_id]/page.tsx 月別一覧ページ

import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header";
import { getYamataNews } from "@/app/library/microcms"
import { getAllYamataNews } from "@/app/library/microcms"

// 3月23日追加
export const revalidate = 60

type alltype = { params: Promise<{ date_id: string }> }
async function Page({ params }: alltype) {
   const { date_id } = await params;

   const Yamata_news = await getYamataNews({ //getList
      filters: `publishedAt[begins_with]${date_id}`,
      fields: ["id", "title", "publishedAt"],
      limit: 50
   });


   // // // // // // // // // / 前後の月へのリンクC案試してみる0312


   const all = await getAllYamataNews({   //getAllYamataNews
      fields: "publishedAt"
   })

   const monthSet = new Set<string>()

   all.forEach((item) => { //all
      if (!item.publishedAt) return 
      const d = new Date(item.publishedAt)
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      monthSet.add(ym)
   })

   const monthList = Array.from(monthSet).sort((a, b) =>
      b.localeCompare(a)
   )

   const currentIndex = monthList.indexOf(date_id)

   const prevMonth = monthList[currentIndex + 1]
   const nextMonth = monthList[currentIndex - 1]


   // // // // // // // // // // // // 試し月別アーカイブ

   const archives: Record<string, number> = {}

   all.forEach((n) => { //all
      if (!n.publishedAt) return // undefined を弾く
      const d = new Date(n.publishedAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`

      archives[key] = (archives[key] || 0) + 1
   })

   const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))


   // // // // // // // // // // // //

    //年別アーカイブ 足してみた

 const yearSet = new Set<string>()

archiveList.forEach(([month]) => {
  const [y] = month.split("-")
  yearSet.add(y)
})

const yearList = Array.from(yearSet).sort((a, b) => b.localeCompare(a))
   

   return (
      <>
       <Header boxOn={true} orochi="" />

         <h1>公開月別一覧</h1>
         <h2>{date_id}</h2>

         <ul>
            {Yamata_news.contents.map((item) => (
               <li key={item.id}>
                  <a href={`/news/detail/${item.id}`}>
                     {item.title}</a>
               </li>
            ))}
         </ul>


         {/* 前後の月・ページネーション 0312 C案*/}
         <nav>
            {prevMonth ? (
               <a href={`/news/date/${prevMonth}`}>＜前の月</a>
            ) : (
               <span>前の月</span>
            )}

            {" | "}

            {nextMonth ? (
               <a href={`/news/date/${nextMonth}`}>次の月＞</a>
            ) : (
               <span>次の月</span>
            )}
         </nav>

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

         <Footer orochi="" />
      </>
   )
}

export default Page