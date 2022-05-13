import { useRouter } from 'next/router'
import React from 'react'
import NavBar from '../../../Components/navbar/NavBar'
import CodeEditor from '../../../Components/CodeEditor/CodeEditor'
import style from './manshad.module.css'
import { useState } from 'react'

const Manshad = () => {
  const [checkName, setCheckName] = useState("")
  const [popup, setPopup] = useState(false)
  const [projName, setProjName] = useState("")
  const [srcDoc, setSrcDoc] = useState("");
  const [code, setCode] = useState({
    html: "",
    css: "",
    js: ""
  })
  const router = useRouter();
  const handleData = () => {
    setCheckName("")
    const data = {
      html: code.html,
      css: code.css,
      js: code.js,
      name: projName
    }
    if ((code.html === "" && code.css === "" && code.js === "") || projName === "") {
      if (projName === "") {
        setCheckName("*The name is missing")
      }
      return
    }

    fetch("http://localhost:3001/api/library", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => console.log(res))
      .catch(err => {
        console.log(error);
      })
  }
  const submitButtonClicked = (html, css, js) => {
    setCheckName("")
    if (html === "" && css === "" && js === "") {
      setSrcDoc(
    `<html>
        <style>
        *{
          margin:0;
          padding;0;
          text-align:center;
        }
          body{
            overflow:hidden;
            display:grid;
            place-content:center;
            height:100vh;
            width:100vw;
            color:red;
          }
        </style>
      <body>
        <h1> there is no code </h1>
        <p>(html, css and js are empty)</p>
      </body>
    </html>`)
    return
    }
    setCode({
      html: html,
      css: css,
      js: js
    })
    setPopup(!popup)
  }
  return (
    <div className={style.postPage}>
      {
        popup &&
        <div className={style.popupForLibraryName}>
          <div className={style.popupContainer}>
            <svg onClick={() => setPopup(!popup)} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L12.3137 12.3137" stroke="white" />
              <path d="M12.1569 0.843262L0.843152 12.157" stroke="white" />
            </svg>
            <form >
              <p style={{ color: "red" }}>{checkName}</p>
              <input value={projName} type="text" onChange={(e) => {
                setProjName(e.target.value)
              }} />
              <button onClick={handleData} type='button'>confirm</button>
            </form>
          </div>
        </div>
      }
      <NavBar owner />
      <CodeEditor setSrcDoc={setSrcDoc} srcDoc={srcDoc} owner submitButtonClicked={submitButtonClicked} />
    </div>
  )
}

export default Manshad