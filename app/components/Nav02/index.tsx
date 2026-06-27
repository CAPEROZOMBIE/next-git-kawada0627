// app/components/Nav02/index.tsx ナビ

"use client";

import Link from "next/link"
import style from "./nav02.module.css"
import { useEffect, useState } from "react"

function Nav02() {
   const [NavOpen ,setNavOpen] = useState(false);
   const HamburgerBtn = function () {
         setNavOpen((prev)=>!prev)
   }
   const CloseClick = function () {
      setNavOpen(false)
   }
   useEffect( function () {
      document.body.classList.toggle("no-scroll",NavOpen)
   },[NavOpen]);

   return (
      <div className={NavOpen ? style.open : style.close}>
         <button className={style.btn} onClick={HamburgerBtn}>ボタン</button>
         <nav onClick={CloseClick}>
            <ul className={style.ul}>
               <li><Link href="/">トップ</Link></li>
               <li><Link href="/about">アバウトページ</Link></li>
            </ul>
         </nav>
      </div>
   )
}

export {Nav02}


