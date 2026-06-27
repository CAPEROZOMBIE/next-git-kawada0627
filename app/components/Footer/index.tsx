// app/components/Footer/index.tsx フッター

import { Nav04 } from "../Nav04"

type alltype = {orochi:string}

const Footer = ({orochi}:alltype) => {

   return(
      <>
      <br /><hr />{orochi}  
      <Nav04 />
         
  <br /> <br />
          
      </>
   )
}

export {Footer}