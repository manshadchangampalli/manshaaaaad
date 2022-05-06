import { useRouter } from 'next/router'
import React from 'react'
import NavBar from '../../../Components/navbar/NavBar'
import CodeEditor from '../../../Components/CodeEditor/CodeEditor'
import style from './manshad.module.css'

const Manshad = () => {
    const router = useRouter();
const submitButtonClicked = (html,css,js) => {
    console.log(html,css,js);
    router.push("/owner/dashboard")
}
  return (
    <div className={style.postPage}>
        <NavBar owner/>
        <CodeEditor owner submitButtonClicked={submitButtonClicked}/>
    </div>
  )
}

export default Manshad