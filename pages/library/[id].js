import React, { useState, useEffect } from "react";
import NavBar from "../../Components/navbar/NavBar";
import CodeEditor from "../../Components/CodeEditor/CodeEditor";
import { codeEditorContainer } from "../../styles/CodeEditor.module.css";

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}library/onlyid`
  );
  const data = await response.json();
  const paths = data.map((post) => ({
    params: { id: post._id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}library/getbyid?id=${id}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};

const CodeEditors = ({ data }) => {
  const [srcDoc, setSrcDoc] = useState("");
  const [html, setHtml] = useState(data[0].html)
  const [css, setCss] = useState(data[0].css);
  const [js, setJs] = useState(data[0].js);
  console.log(data);
  return (
    <div className={codeEditorContainer}>
      <NavBar />
      <CodeEditor
        html={html}
        setHtml={setHtml}
        setCss={setCss}
        css={css}
        js={js}
        setJs={setJs}
        srcDoc={srcDoc}
        data={data}
        setSrcDoc={setSrcDoc}
      />
    </div>
  );
};

export default CodeEditors;
