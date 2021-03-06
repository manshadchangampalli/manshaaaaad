import React from "react";
import NavBar from "../Components/navbar/NavBar";
import {
  libraryPage,
  inputBox,
  searchIcon,
  latestItem,
  resultBox,
} from "../styles/Library.module.css";
import SearchIcon from "../public/images/navImages/searchIcon.png";
import Logo from "../Components/logo/Logo";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import LibraryItem from "../Components/libraryitem/LibraryItem";
import Link from "next/link";
import ResponsiveNav from "../Components/navbar/ResponsiveNav";

export const getServerSideProps = async () => {
  const Response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}library/getrecentlyaddedlibraryName`
  );
  const data = await Response.json();

  return {
    props: {
      data: data,
    },
  };
};

const Library = ({ data }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [windowClick, setWindowOnClick] = useState(false);
  const allItemsRef = useRef();
  const serachBoxRef = useRef();
  const serachItemRef = useRef();
  useEffect(() => {
    if (allItemsRef.current) {
      allItemsRef.current.addEventListener("click", (e) => {
        if (serachBoxRef.current && serachItemRef.current) {
          if (
            !serachBoxRef.current.contains(e.target) &&
            !serachItemRef.current.contains(e.target)
          ) {
            setWindowOnClick(false);
          }
        }
      });
    }
  }, [windowClick]);

  const handleOnChange = (e) => {
    setWindowOnClick(true);
    setSearchInput(e.target.value);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}library/search?name=${e.target.value}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      }).catch((err)=>{
        console.log(err);
      })
  };
  return (
    <div ref={allItemsRef} className={libraryPage}>
      <Logo />
      <ResponsiveNav />
      <NavBar />
      <div className={inputBox}>
        <input ref={serachBoxRef} onChange={handleOnChange} type="text" />
        <div className={searchIcon}>
          <Image width={20} height={20} alt="" src={SearchIcon} />
        </div>
        {(searchData.length > 0 || searchInput.length > 0) && windowClick && (
          <ul ref={serachItemRef} className={resultBox}>
            {searchData.map((data, i) => (
              <>
                <Link href={`/library/${data._id}`} passHref>
                  <li key={i}>{data.name}</li>
                </Link>
              </>
            ))}
            {searchData.length === 0 && searchInput.length > 0 && (
              <li>No item found</li>
            )}
          </ul>
        )}
      </div>
      <div className={latestItem}>
        {data.map((data, i) => {
          return (
            <Link key={i} href={`/library/${data._id}`} passHref>
              <p>
                <LibraryItem name={data.name} />
              </p>
            </Link>
          );
        })}
      </div>
      <Link href={"/all-items"} passHref>
        <button>view all</button>
      </Link>
    </div>
  );
};

export default Library;
