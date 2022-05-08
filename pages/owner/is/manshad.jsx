import { useRouter } from 'next/router'
import React from 'react'
import NavBar from '../../../Components/navbar/NavBar'
import CodeEditor from '../../../Components/CodeEditor/CodeEditor'
import style from './manshad.module.css'
import { useState } from 'react'

const Manshad = () => {
  const [popup, setPopup] = useState(false)
  const router = useRouter();
  const handleData = () => {
    
  }
  const submitButtonClicked = (html, css, js) => {
    // router.push("/owner/dashboard")
    setPopup(!popup)
  }
  return (
    <div className={style.postPage}>
      {
        popup &&
        <div className={style.popupForLibraryName}>
          <div className={style.popupContainer}>
            <svg onClick={()=>setPopup(!popup)} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L12.3137 12.3137" stroke="white" />
              <path d="M12.1569 0.843262L0.843152 12.157" stroke="white" />
            </svg>
            <form >
              <input type="text" />
              <button onClick={handleData} type='button'>confirm</button>
            </form>
          </div>
        </div>
      }
      <NavBar owner />
      <CodeEditor owner submitButtonClicked={submitButtonClicked} />
    </div>
  )
}

export default Manshad