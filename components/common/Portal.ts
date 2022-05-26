// import React from 'react';
// import reactDom from 'react-dom';

interface Props {
  children: React.ReactElement;
}

// const ModalPortal = ({ children }: Props) => {
//   if(typeof window !== 'object') return;
//   const el = document.getElementById('modal');
//   if(el !== null) return reactDom.createPortal(children, el);
// };

// export default ModalPortal;


import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const Portal= ({ children }: Props) => {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])

   return mounted
      ? createPortal(children, 
        document.querySelector("#modal"))
      : null
}

export default Portal