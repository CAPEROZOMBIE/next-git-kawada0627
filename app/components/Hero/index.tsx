// app/components/Hero/index.tsx ヒーロー

import Image from "next/image"
type alltype = { src: string, max_width_prop: number, copy: string, text: string, HeroImageOn:boolean }
const Hero = ({ src, max_width_prop, copy, text, HeroImageOn = true }: alltype) => {

   return (
      <>
         <h2>{copy}</h2>

         {HeroImageOn &&
         <figure>
            <Image
               src={src}
               alt=""
               width={1000}
               height={800}
               style={{ width: "100%", height: "auto", maxWidth: `${max_width_prop}px` }}
               priority

               
            />
         </figure>}

         <p>{text}</p>
      </>
   )
}

export { Hero }