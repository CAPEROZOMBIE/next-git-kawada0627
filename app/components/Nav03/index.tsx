// app/components/Nav03/index.tsx ナビ

"use client";

import Link from "next/link"
import style from "./nav03.module.css"
import { useState } from "react";

function Nav03() {
   const [OpenNav,setOpenNav] = useState<boolean>(false);
   const open = () => setOpenNav(true)
   const close = () => setOpenNav(false)

   return (
      <>
         <nav className={`${style.nav} ${OpenNav && style.open}`}>
            <div className={style.overLay} onClick={close}>オーバーレイ
               <ul className={style.navul}>
                  <li><Link href="/">トップページへ</Link></li>
                  <li><Link href="/about">アバウトへ</Link></li>
               </ul>
            </div>
            <div className={`${style.btn} ${style.close}`} onClick={close}>閉じる</div>
         </nav>
         
         <div className={style.btn} onClick={open}>開く</div>
      </>
   )
}

export { Nav03 }