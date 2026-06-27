// library/microcms.ts

// microcmsインポート

import { createClient, MicroCMSImage, MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";

// env 

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
   throw new Error("MICROCMS_SERVICE_DOMAIN is required")
}
if (!process.env.MICROCMS_API_KEY) {
   throw new Error("MICROCMS_API_KEY is required")
}
const client = createClient({
   serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
   apiKey: process.env.MICROCMS_API_KEY
})

// type　MyNews

export type MyNews = {
   title: string;
   description: string;
   content: string;
   thumbnail?: MicroCMSImage;
   category: MyCategory;
} & MicroCMSListContent

// type　MyCategory

export type MyCategory = {
   name: string;
} & MicroCMSListContent



// 一覧ページのエンドポイント、受け取り

export const getYamataNews = async (queries?: MicroCMSQueries) => {
   const Ichiran = await client.getList<MyNews>({
      endpoint: "news",
      queries,
   })
   return Ichiran
}

// 月別アーカイブ用（全記事取得）getAllContents　gptで

export const getAllYamataNews = async (queries:MicroCMSQueries) => {
  const newsdao = await client.getAllContents<MyNews>({
    endpoint: "news",
    queries
  })

  return newsdao
}

// 詳細ページのエンドポイント、受け取り

export const getYamataNewsDetail = async (
   contentId: string,
   queries?: MicroCMSQueries
) => {
   const detail = await client.getListDetail<MyNews>({
      endpoint: "news",
      contentId,
      queries,
   })
   return detail
}


// カテゴリーのエンドポイント（カテゴリーネームで使う）、受け取り
// getListDetailで一件受け取り

export const getYamataCategory = async (contentId: string) => {
   const catedao = await client.getListDetail<MyCategory>({
      endpoint: "categories",
      contentId
   })
   return catedao
}

// カテゴリーのエンドポイント（カテゴリー一覧で使う）、受け取り
// getListで複数件受け取り

export const getYamataCategoryList = async () => {
   const catelist = await client.getList<MyCategory>({
      endpoint: "categories"
   })
   return catelist.contents
}





// リミッター解除版 ただgetAllContentsを定義しただけ ×

// export const getYamataNewsDate = async (queries?: MicroCMSQueries) => {
//   const allNews: MyNews[] = []
//   let offset = 0
//   const limit = 100

//   while (true) {
//     const res = await client.getList<MyNews>({
//       endpoint: "news",
//       queries: { ...queries, limit, offset },
//     })

//     allNews.push(...res.contents)

//     if (res.contents.length < limit) break
//     offset += limit
//   }

//   return {
//     contents: allNews,
//     totalCount: allNews.length,
//   }
// }


