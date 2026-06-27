// news/[slug]/page.tsx 詳細ページ

// import style from './news.module.css';
import { getYamataNewsDetail} from '@/app/library/microcms';
import { Taniguchi_Date } from '@/app/library/date';
import { Header } from "@/app/components/Header"
import Image from 'next/image';
import { Footer } from '@/app/components/Footer';

type alltype = { params: Promise<{ slug: string }> }

async function Page({ params }: alltype) {
   const { slug } = await params;
   const newsdetail = await getYamataNewsDetail(slug);

   return (
      <>
         <Header orochi="あああ" boxOn={false} />
         <h1>詳細ページ</h1>
         <h3>{newsdetail.title}</h3>
         <time>{newsdetail.publishedAt && Taniguchi_Date(newsdetail.publishedAt)}</time>


         <figure>{newsdetail.thumbnail && (
            <Image
               src={newsdetail.thumbnail.url}
               alt={newsdetail.title}
               width={700}
               height={500}
               style={{ width: "100%", height: "auto", maxWidth: `${600}px` }}
               priority
            />
         )}
         </figure>
         <div>
            {newsdetail.content}
         </div>

         {/* カテゴリーページへのリンク */}
         <div>
            カテゴリー：<a href={`/news/category/${newsdetail.category.id}/1`}>{newsdetail.category.name}</a>
         </div>

         <Footer orochi="ったーー"/>

      </>
   );
}

export default Page