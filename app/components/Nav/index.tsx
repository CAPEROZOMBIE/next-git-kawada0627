// app/components/Nav/index.tsx ナビ

"use client";

import Link from "next/link"
import style from "./nav.module.css"
import { useState } from "react"
import { useEffect } from "react";

function Nav() {
   const [navIsOpen, setNavIsOpen] = useState(false)

   // 開閉ボタン
   const Hbutton = () => {
      setNavIsOpen((prev) => !prev)
   }

   // 閉じる
   const closeClick = () => {
      setNavIsOpen(false)
   }

   // スクロール防止
   useEffect(() => {
      document.body.classList.toggle("no-scroll", navIsOpen);
   }, [navIsOpen]);

   return (
      <nav className={navIsOpen ? style.open : style.close}>
         {/* <nav> */}
         <div className={style.btn} onClick={Hbutton}>ボタン</div>

         <ul className={style.navul} onClick={closeClick}>
            <li><Link href="/">トップページへ</Link></li>
            <li><Link href="/about">アバウトへ</Link></li>
         </ul>

      </nav>
   )
}

export { Nav }