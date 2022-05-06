import React from "react";
import NavBar from "../../Components/navbar/NavBar";
import CodeEditor from "../../Components/CodeEditor/CodeEditor";
import {
  codeEditorContainer,
} from "../../styles/CodeEditor.module.css";

const CodeEditors = () => {
  return (
    <div className={codeEditorContainer}>
      <NavBar />
      <CodeEditor/>
    </div>
  );
};

export default CodeEditors;
