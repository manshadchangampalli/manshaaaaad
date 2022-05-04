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
} from "../styles/AllItems.module.css";

const AllItems = () => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className={allItems}>
      <NavBar />
      <div className={inputBox}>
        <input type="search" />
        <div className={searchIcon}>
          <Image width={20} height={20} alt="" src={SearchIcon} />
        </div>
      </div>
      <div className={itemsContainer}>
        {data.map((data, i) => {
          return(
            <Link key={i} href={"/library/id"} passHref>
            <p>
             <LibraryItem key={i}/>
            </p>
            </Link>
             );
        })}
      </div>
    </div>
  );
};

export default AllItems;
