// app/components/Nav04/index.tsx ナビ

"use client";

import Link from "next/link"
import style from "./nav04.module.css"
import { useEffect, useState } from "react";

function Nav04() {
   const [ navOpen , setnavOpen ] = useState<boolean>(false)
   const open = () => setnavOpen(true)
   const close = () => setnavOpen(false)

   useEffect(()=>{
      document.body.classList.toggle("no-scroll",navOpen)
   },[navOpen])


   return (
      <>
         <nav className={`${style.nav} ${navOpen && style.open}`}>
            <div className={style.overLay} onClick={close}>
               <ul className={`${style.ul} ${navOpen && style.open}`}>
                  <li><Link href="/">トップページへ</Link></li>
                  <li><Link href="/about">アバウトへ</Link></li>
                  <li><Link href="/news/1">ニュース</Link></li>
               </ul>
            </div>
            <button className={style.close} onClick={close}>閉じる</button>
         </nav>
         <button className={style.btn} onClick={open}>開く</button>
      </>
   )
}

export { Nav04 }