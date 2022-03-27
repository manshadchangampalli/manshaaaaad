import Head from 'next/head'
import Image from 'next/image'
import BackgroundBox from '../Components/backgroundboxes/BackgroundBox'
import NavBar from '../Components/navbar/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
   <div className={styles.homePage}>
     <NavBar/>
     <BackgroundBox/>
   </div>
  )
}
