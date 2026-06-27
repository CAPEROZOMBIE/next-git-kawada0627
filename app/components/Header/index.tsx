// app/components/Header/index.tsx ヘッダー

// import { Nav } from "../Nav"
import Image from "next/image"
import Link from "next/link"
import style from "./header.module.css" 
import { Nav04 } from "../Nav04"


type alltype = { orochi: string, boxOn:boolean }
const Header = ({ boxOn = false }: alltype) => {

   return (
      <>
      <div className="top-header">
         <h1>
            <Link href="/">
               <Image
                  src="/logo.png"
                  alt=""
                  width={160}
                  height={0}
                  style={{width:"100%",height:"auto",maxWidth:"160px"}}
                  priority
               />
            </Link>
         </h1>
         <h2 className={ boxOn? style.boxbg : style.boxbg2 }>ヤマタの</h2>
         <Nav04 />
         
      </div><hr />
      </>
   )
}

export { Header }