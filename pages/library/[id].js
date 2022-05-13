import React,{ useState } from "react";
import NavBar from "../../Components/navbar/NavBar";
import CodeEditor from "../../Components/CodeEditor/CodeEditor";
import {
  codeEditorContainer,
} from "../../styles/CodeEditor.module.css";

const CodeEditors = () => {
  const [srcDoc,setSrcDoc] = useState("")
  return (
    <div className={codeEditorContainer}>
      <NavBar />
      <CodeEditor srcDoc={srcDoc} setSrcDoc={setSrcDoc}/>
    </div>
  );
};

export default CodeEditors;
