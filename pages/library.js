import React from "react";
import NavBar from "../Components/navbar/NavBar";
import {
  libraryPage,
  inputBox,
  searchIcon,
  latestItem,
  itemBox,
} from "../styles/Library.module.css";
import SearchIcon from "../public/images/navImages/searchIcon.png";
import Logo from "../Components/logo/Logo";
import Image from "next/image";
import { useEffect, useState } from "react";
import LibraryItem from "../Components/libraryitem/LibraryItem";
import Link from "next/link";

export const getStaticProps = async() => {
  const Response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}library/getrecentlyaddedlibraryName`)
  const data = await Response.json()

  return {
    props:{
      data:data
    }
  }

}


const Library = ({data}) => {
  const [pointTop, setPointTop] = useState(500);
  const [pointLeft, setPointLeft] = useState(500);
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setPointLeft(e.clientX);
      setPointTop(e.clientY);
    });
  }, []);
  return (
    <div className={libraryPage}>
      <Logo />
      <NavBar />;
      <div className={inputBox}>
        <input type="text" />
        <div className={searchIcon}>
          <Image width={20} height={20} alt="" src={SearchIcon} />
        </div>
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
