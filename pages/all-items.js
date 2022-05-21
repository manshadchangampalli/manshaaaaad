import Image from "next/image";
import Link from "next/link";
import React from "react";
import LibraryItem from "../Components/libraryitem/LibraryItem";
import NavBar from "../Components/navbar/NavBar";
import SearchIcon from "../public/images/navImages/searchIcon.png";
import {
  allItems,
  searchIcon,
  inputBox,
  itemsContainer,
  searchBoxContainer,
  resultBox,
} from "../styles/AllItems.module.css";
import Logo from "../Components/logo/Logo";
import { useState, useEffect, useRef } from "react";

export const getStaticProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}library/getalllibrariesname`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};

const AllItems = ({ data }) => {
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
          if ((!serachBoxRef.current.contains(e.target) && !serachItemRef.current.contains(e.target))) {
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
      `${process.env.NEXT_PUBLIC_BASE_URL}library/search?name=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      });
  };

  return (
    <div ref={allItemsRef} className={allItems}>
      <Logo />
      <NavBar />
      <div className={searchBoxContainer}>
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
      </div>
      <div className="itemsWraper">
        <div className={itemsContainer}>
          {data.map((data, i) => {
            return (
              <Link key={i} href={`library/${data._id}`} passHref>
                <p>
                  <LibraryItem name={data.name} key={i} />
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllItems;
