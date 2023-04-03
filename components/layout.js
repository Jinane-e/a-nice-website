import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

import Button from './button'
import IconButton from './iconButton'

import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.css'

import globalData from '/pages/api/global.json'

const name = 'Jinane'
export const siteTitle = 'A Nice Website - Jinane Ben Salem'

export default function Layout({ children, view, onNavigate }) {
  const [menuActive, setMenuActive] = useState(null)
  const content = globalData.data.attributes

  useEffect(() => {
    function handleKeyDown(e) {
      const code = e.code || e.key
      switch(code) {
        case 'ArrowUp':
          goUp()
          break
        case 'ArrowDown':
          goDown()
          break
        case 'ArrowLeft':
          goLeft()
          break
        case 'ArrowRight':
          goRight()
          break
        default: break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [view])

  const handleMenuClick = (linkName) => {
    if(menuActive) setMenuActive(false)
    onNavigate(linkName)
  }

  const goUp = () => {
    switch(view) {
      case 'Home': onNavigate('About')
        break
      case 'Contact': onNavigate('Home')
        break
      default: break
    }
  }

  const goDown = () => {
    switch(view) {
      case 'Home': onNavigate('Contact')
        break
      case 'About': onNavigate('Home')
        break
      default: break
    }
  }

  const goLeft = () => {
    switch(view) {
      case 'Home': onNavigate('Services')
        break
      case 'Portfolio': onNavigate('Home')
        break
      default: break
    }
  }

  const goRight = () => {
    switch(view) {
      case 'Home': onNavigate('Portfolio')
        break
      case 'Services': onNavigate('Home')
        break
      default: break
    }
  }
  
  return (
    <div className={styles.Container}>
      
      <div>
        <div className={styles.Background_blob}></div>
        <div className={styles.Background_blob}></div>
        <div className={styles.Background_noise}>
          <Image 
            src="/images/backgrounds/noise.png"
            fill 
            sizes="100vw" 
            alt="" 
          />
        </div>
      </div>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* VIEWS CONTAINER */}
      <main className={`${utilStyles.Grid} ${clsx({
        [utilStyles.Grid__3x3]: view === 'Home',
        [utilStyles.Grid__1x3]: view === 'About',
        [utilStyles.Grid__3x1]: view === 'Services',
        [utilStyles.Grid__3x5]: view === 'Portfolio',
        [utilStyles.Grid__5x3]: view === 'Contact',
      })}`}>
        {children}
      </main>

      {/* FIXED OVERLAY */}
      <div>

        {/* TOP BAR */}
        <header className={clsx({
          [styles.Header]: true,
          [styles.Header__hidden]: menuActive
        })}>
          
          <nav className={styles.Header_navBar}>
            <ul className={styles.Header_navBar_list}>
              <li className={utilStyles.linkTypo}>
                <Button secondary className={view === 'Home' ? styles.Header_navBar_link__active : styles.Header_navBar_link} onClick={() => onNavigate('Home')}>Accueil</Button>
              </li>
              <li className={utilStyles.linkTypo}>
                <Button secondary className={view === 'About' ? styles.Header_navBar_link__active : styles.Header_navBar_link} onClick={() => onNavigate('About')}>À propos</Button>
              </li>
              <li className={utilStyles.linkTypo}>
                <Button secondary className={view === 'Portfolio' ? styles.Header_navBar_link__active : styles.Header_navBar_link} onClick={() => onNavigate('Portfolio')}>Portfolio</Button>
              </li>
              <li className={utilStyles.linkTypo}>
                <Button secondary  className={view === 'Services' ? styles.Header_navBar_link__active : styles.Header_navBar_link} onClick={() => onNavigate('Services')}>Services</Button>
              </li>
            </ul>
          </nav>
          
          <div className={styles.Header_cta}>
            <Button primary icon="chevron-right" iconWidth={6} iconHeight={12} onClick={() => onNavigate("Contact")}>Contact</Button>
          </div>          
        </header>

        {/* LEFT BAR */}
        <footer className={clsx({
          [styles.Footer]: true,
          [styles.Footer__hidden]: menuActive
        })}>
          <ul className={styles.Footer_socials}>
            <li>
              <IconButton icon="mail" onClick={() => handleMenuClick('Contact')} />
            </li>
            <li>
              <IconButton icon="discord" externalTo={content.discord} />
            </li>
            <li>
              <IconButton icon="linkedin" externalTo={content.linkedin} />
            </li>
          </ul>

          <div className={styles.Footer_separator}></div>

          <div className={`${styles.Footer_credits} ${utilStyles.smallTypo}`}>
            <p>{content.credits}</p>
          </div>
        </footer>

        <div className={clsx({
          [styles.Footer_border]: true,
          [styles.Footer_border__visible]: menuActive
        })}></div>
        
        {/* TOP LEFT CORNER ICON */}
        <button className={styles.BackToHome} onClick={() => handleMenuClick('Home')}>
          <Image
            src="/images/logo.png"
            alt={name}
            height={64}
            width={64}
          />
        </button>

        {/* <div className={`${utilStyles.max600} ${styles.Cta__responsive}`}>
          <Button fill primary onClick={() => onNavigate("Contact")}>Contact</Button>
        </div> */}

        {/* MENU HAMBURGER FOR MOBILE */}
        <Hamburger active={menuActive} onClick={() => setMenuActive(!menuActive)} />

        {/* MENU FOR MOBILE */}
        <Menu active={menuActive} onNavigate={handleMenuClick} />

      </div>

      {/* FLOATING JOYSTICK */}
      <div className={clsx({
        [styles.Joystick]: true,
        [utilStyles.min600]: true,
        [styles.Joystick__corner]: view !== 'Home'
      })}>

        <svg width="151" height="151" viewBox="0 0 151 151" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_121_164)">
            <mask id="path-1-inside-1_121_164" fill="white">
              <path fillRule="evenodd" clipRule="evenodd" d="M97.199 13.403C97.199 9.53699 94.0649 6.40298 90.199 6.40298H60.801C56.935 6.40298 53.801 9.537 53.801 13.403V42.801C53.801 46.667 50.6669 49.801 46.801 49.801L17.403 49.801C13.537 49.801 10.403 52.935 10.403 56.801V86.199C10.403 90.065 13.537 93.199 17.403 93.199H53.801V93.199C53.9109 93.199 54 93.2881 54 93.398V126.398C54 130.264 57.134 133.398 61 133.398H90.398C94.264 133.398 97.398 130.264 97.398 126.398V100C97.398 96.134 100.532 93 104.398 93H134C137.866 93 141 89.866 141 86V57C141 53.134 137.866 50 134 50H97.398C97.2881 50 97.199 49.9109 97.199 49.801V49.801V13.403Z"/>
            </mask>
            <path d="M17.403 49.801L17.403 46.801L17.403 49.801ZM46.801 49.801V52.801V49.801ZM60.801 9.40298H90.199V3.40298H60.801V9.40298ZM56.801 42.801V13.403H50.801V42.801H56.801ZM46.801 46.801L17.403 46.801L17.403 52.801L46.801 52.801L46.801 46.801ZM7.40301 56.801V86.199H13.403V56.801H7.40301ZM17.403 96.199H53.801V90.199H17.403V96.199ZM51 93.398V126.398H57V93.398H51ZM61 136.398H90.398V130.398H61V136.398ZM100.398 126.398V100H94.398V126.398H100.398ZM104.398 96H134V90H104.398V96ZM144 86V57H138V86H144ZM134 47H97.398V53H134V47ZM94.199 13.403V49.801H100.199V13.403H94.199ZM97.398 47C98.945 47 100.199 48.2541 100.199 49.801H94.199C94.199 51.5677 95.6312 53 97.398 53V47ZM134 96C139.523 96 144 91.5228 144 86H138C138 88.2091 136.209 90 134 90V96ZM100.398 100C100.398 97.7909 102.189 96 104.398 96V90C98.8752 90 94.398 94.4772 94.398 100H100.398ZM90.398 136.398C95.9209 136.398 100.398 131.921 100.398 126.398H94.398C94.398 128.607 92.6072 130.398 90.398 130.398V136.398ZM51 126.398C51 131.921 55.4772 136.398 61 136.398V130.398C58.7909 130.398 57 128.607 57 126.398H51ZM53.801 96.199C52.2541 96.199 51 94.9449 51 93.398H57C57 91.6312 55.5678 90.199 53.801 90.199V96.199ZM7.40301 86.199C7.40301 91.7218 11.8802 96.199 17.403 96.199V90.199C15.1939 90.199 13.403 88.4081 13.403 86.199H7.40301ZM17.403 46.801C11.8802 46.801 7.40301 51.2781 7.40301 56.801H13.403C13.403 54.5919 15.1939 52.801 17.403 52.801L17.403 46.801ZM50.801 42.801C50.801 45.0101 49.0101 46.801 46.801 46.801L46.801 52.801C52.3238 52.801 56.801 48.3238 56.801 42.801H50.801ZM90.199 9.40298C92.4081 9.40298 94.199 11.1939 94.199 13.403H100.199C100.199 7.88013 95.7218 3.40298 90.199 3.40298V9.40298ZM144 57C144 51.4772 139.523 47 134 47V53C136.209 53 138 54.7909 138 57H144ZM60.801 3.40298C55.2781 3.40298 50.801 7.88015 50.801 13.403H56.801C56.801 11.1938 58.5918 9.40298 60.801 9.40298V3.40298Z" fill="#EAEBEF" mask="url(#path-1-inside-1_121_164)"/>
            <mask id="path-3-inside-2_121_164" fill="white">
              <path fillRule="evenodd" clipRule="evenodd" d="M46.6866 8C46.6866 3.58172 50.2683 0 54.6866 0H96.3134C100.732 0 104.313 3.58173 104.313 8.00001V34.6866C104.313 39.1048 107.895 42.6866 112.313 42.6866H139C143.418 42.6866 147 46.2683 147 50.6866V92.3134C147 96.7317 143.418 100.313 139 100.313H112.313C107.895 100.313 104.313 103.895 104.313 108.313V135C104.313 139.418 100.732 143 96.3134 143H54.6866C50.2683 143 46.6866 139.418 46.6866 135V108.313C46.6866 103.895 43.1048 100.313 38.6866 100.313H12C7.58173 100.313 4 96.7317 4 92.3134V50.6866C4 46.2683 7.58172 42.6866 12 42.6866H38.6866C43.1048 42.6866 46.6866 39.1048 46.6866 34.6866V8Z"/>
            </mask>
            <path d="M96.3134 -1H54.6866V1H96.3134V-1ZM105.313 34.6866V8.00001H103.313V34.6866H105.313ZM139 41.6866H112.313V43.6866H139V41.6866ZM148 92.3134V50.6866H146V92.3134H148ZM112.313 101.313H139V99.3134H112.313V101.313ZM105.313 135V108.313H103.313V135H105.313ZM54.6866 144H96.3134V142H54.6866V144ZM45.6866 108.313V135H47.6866V108.313H45.6866ZM38.6866 99.3134H12V101.313H38.6866V99.3134ZM5 92.3134V50.6866H3V92.3134H5ZM12 43.6866H38.6866V41.6866H12V43.6866ZM45.6866 8V34.6866H47.6866V8H45.6866ZM38.6866 43.6866C43.6571 43.6866 47.6866 39.6571 47.6866 34.6866H45.6866C45.6866 38.5526 42.5526 41.6866 38.6866 41.6866V43.6866ZM5 50.6866C5 46.8206 8.13401 43.6866 12 43.6866V41.6866C7.02944 41.6866 3 45.716 3 50.6866H5ZM12 99.3134C8.13401 99.3134 5 96.1794 5 92.3134H3C3 97.284 7.02945 101.313 12 101.313V99.3134ZM47.6866 108.313C47.6866 103.343 43.6571 99.3134 38.6866 99.3134V101.313C42.5526 101.313 45.6866 104.447 45.6866 108.313H47.6866ZM54.6866 142C50.8206 142 47.6866 138.866 47.6866 135H45.6866C45.6866 139.971 49.716 144 54.6866 144V142ZM103.313 135C103.313 138.866 100.179 142 96.3134 142V144C101.284 144 105.313 139.971 105.313 135H103.313ZM112.313 99.3134C107.343 99.3134 103.313 103.343 103.313 108.313H105.313C105.313 104.447 108.447 101.313 112.313 101.313V99.3134ZM146 92.3134C146 96.1794 142.866 99.3134 139 99.3134V101.313C143.971 101.313 148 97.284 148 92.3134H146ZM139 43.6866C142.866 43.6866 146 46.8206 146 50.6866H148C148 45.716 143.971 41.6866 139 41.6866V43.6866ZM103.313 34.6866C103.313 39.6571 107.343 43.6866 112.313 43.6866V41.6866C108.447 41.6866 105.313 38.5526 105.313 34.6866H103.313ZM54.6866 -1C49.716 -1 45.6866 3.02944 45.6866 8H47.6866C47.6866 4.13401 50.8206 1 54.6866 1V-1ZM96.3134 1C100.179 1 103.313 4.13401 103.313 8.00001H105.313C105.313 3.02945 101.284 -1 96.3134 -1V1Z" fill="white" mask="url(#path-3-inside-2_121_164)"/>
            <path d="M96.3134 -1H54.6866V1H96.3134V-1ZM105.313 34.6866V8.00001H103.313V34.6866H105.313ZM139 41.6866H112.313V43.6866H139V41.6866ZM148 92.3134V50.6866H146V92.3134H148ZM112.313 101.313H139V99.3134H112.313V101.313ZM105.313 135V108.313H103.313V135H105.313ZM54.6866 144H96.3134V142H54.6866V144ZM45.6866 108.313V135H47.6866V108.313H45.6866ZM38.6866 99.3134H12V101.313H38.6866V99.3134ZM5 92.3134V50.6866H3V92.3134H5ZM12 43.6866H38.6866V41.6866H12V43.6866ZM45.6866 8V34.6866H47.6866V8H45.6866ZM38.6866 43.6866C43.6571 43.6866 47.6866 39.6571 47.6866 34.6866H45.6866C45.6866 38.5526 42.5526 41.6866 38.6866 41.6866V43.6866ZM5 50.6866C5 46.8206 8.13401 43.6866 12 43.6866V41.6866C7.02944 41.6866 3 45.716 3 50.6866H5ZM12 99.3134C8.13401 99.3134 5 96.1794 5 92.3134H3C3 97.284 7.02945 101.313 12 101.313V99.3134ZM47.6866 108.313C47.6866 103.343 43.6571 99.3134 38.6866 99.3134V101.313C42.5526 101.313 45.6866 104.447 45.6866 108.313H47.6866ZM54.6866 142C50.8206 142 47.6866 138.866 47.6866 135H45.6866C45.6866 139.971 49.716 144 54.6866 144V142ZM103.313 135C103.313 138.866 100.179 142 96.3134 142V144C101.284 144 105.313 139.971 105.313 135H103.313ZM112.313 99.3134C107.343 99.3134 103.313 103.343 103.313 108.313H105.313C105.313 104.447 108.447 101.313 112.313 101.313V99.3134ZM146 92.3134C146 96.1794 142.866 99.3134 139 99.3134V101.313C143.971 101.313 148 97.284 148 92.3134H146ZM139 43.6866C142.866 43.6866 146 46.8206 146 50.6866H148C148 45.716 143.971 41.6866 139 41.6866V43.6866ZM103.313 34.6866C103.313 39.6571 107.343 43.6866 112.313 43.6866V41.6866C108.447 41.6866 105.313 38.5526 105.313 34.6866H103.313ZM54.6866 -1C49.716 -1 45.6866 3.02944 45.6866 8H47.6866C47.6866 4.13401 50.8206 1 54.6866 1V-1ZM96.3134 1C100.179 1 103.313 4.13401 103.313 8.00001H105.313C105.313 3.02945 101.284 -1 96.3134 -1V1Z" fill="url(#paint0_radial_121_164)" mask="url(#path-3-inside-2_121_164)"/>
            <path d="M96.3134 -1H54.6866V1H96.3134V-1ZM105.313 34.6866V8.00001H103.313V34.6866H105.313ZM139 41.6866H112.313V43.6866H139V41.6866ZM148 92.3134V50.6866H146V92.3134H148ZM112.313 101.313H139V99.3134H112.313V101.313ZM105.313 135V108.313H103.313V135H105.313ZM54.6866 144H96.3134V142H54.6866V144ZM45.6866 108.313V135H47.6866V108.313H45.6866ZM38.6866 99.3134H12V101.313H38.6866V99.3134ZM5 92.3134V50.6866H3V92.3134H5ZM12 43.6866H38.6866V41.6866H12V43.6866ZM45.6866 8V34.6866H47.6866V8H45.6866ZM38.6866 43.6866C43.6571 43.6866 47.6866 39.6571 47.6866 34.6866H45.6866C45.6866 38.5526 42.5526 41.6866 38.6866 41.6866V43.6866ZM5 50.6866C5 46.8206 8.13401 43.6866 12 43.6866V41.6866C7.02944 41.6866 3 45.716 3 50.6866H5ZM12 99.3134C8.13401 99.3134 5 96.1794 5 92.3134H3C3 97.284 7.02945 101.313 12 101.313V99.3134ZM47.6866 108.313C47.6866 103.343 43.6571 99.3134 38.6866 99.3134V101.313C42.5526 101.313 45.6866 104.447 45.6866 108.313H47.6866ZM54.6866 142C50.8206 142 47.6866 138.866 47.6866 135H45.6866C45.6866 139.971 49.716 144 54.6866 144V142ZM103.313 135C103.313 138.866 100.179 142 96.3134 142V144C101.284 144 105.313 139.971 105.313 135H103.313ZM112.313 99.3134C107.343 99.3134 103.313 103.343 103.313 108.313H105.313C105.313 104.447 108.447 101.313 112.313 101.313V99.3134ZM146 92.3134C146 96.1794 142.866 99.3134 139 99.3134V101.313C143.971 101.313 148 97.284 148 92.3134H146ZM139 43.6866C142.866 43.6866 146 46.8206 146 50.6866H148C148 45.716 143.971 41.6866 139 41.6866V43.6866ZM103.313 34.6866C103.313 39.6571 107.343 43.6866 112.313 43.6866V41.6866C108.447 41.6866 105.313 38.5526 105.313 34.6866H103.313ZM54.6866 -1C49.716 -1 45.6866 3.02944 45.6866 8H47.6866C47.6866 4.13401 50.8206 1 54.6866 1V-1ZM96.3134 1C100.179 1 103.313 4.13401 103.313 8.00001H105.313C105.313 3.02945 101.284 -1 96.3134 -1V1Z" fill="url(#paint1_radial_121_164)" fillOpacity="0.7" mask="url(#path-3-inside-2_121_164)"/>
            
            {/* LEFT */}
            <path onClick={goLeft} cursor={view === 'Home' || view === 'Portfolio' ? 'pointer' : 'initial'} d="M22.5823 73.1773C21.3682 72.3887 21.3682 70.6113 22.5823 69.8227L34.9106 61.8153C36.2411 60.9511 38 61.906 38 63.4925V79.5075C38 81.094 36.2411 82.0489 34.9106 81.1847L22.5823 73.1773Z" fill="#EAEBEF" fillOpacity={view === 'Home' || view === 'Portfolio' ? '1' : '0.1'}/>
            {/* RIGHT */}
            <path onClick={goRight} cursor={view === 'Services' || view === 'Home' ? 'pointer' : 'initial'} d="M128.418 69.8227C129.632 70.6113 129.632 72.3887 128.418 73.1773L116.089 81.1847C114.759 82.0489 113 81.094 113 79.5075V63.4925C113 61.906 114.759 60.9511 116.089 61.8153L128.418 69.8227Z" fill="#EAEBEF" fillOpacity={view === 'Home' || view === 'Services' ? '1' : '0.1'}/>
            {/* TOP */}
            <path onClick={goUp} cursor={view === 'Home' || view === 'Contact' ? 'pointer' : 'initial'} d="M73.8227 20.5823C74.6113 19.3682 76.3887 19.3682 77.1773 20.5823L85.1847 32.9106C86.0489 34.2411 85.094 36 83.5075 36H67.4925C65.906 36 64.9511 34.2411 65.8153 32.9106L73.8227 20.5823Z" fill="#EAEBEF" fillOpacity={view === 'Home' || view === 'Contact' ? '1' : '0.1'}/>
            {/* BOTTOM */}
            <path onClick={goDown} cursor={view === 'Home' || view === 'About' ? 'pointer' : 'initial'} d="M77.1773 119.418C76.3887 120.632 74.6113 120.632 73.8227 119.418L65.8153 107.089C64.9511 105.759 65.906 104 67.4925 104H83.5075C85.094 104 86.0489 105.759 85.1847 107.089L77.1773 119.418Z" fill="#EAEBEF" fillOpacity={view === 'Home' || view === 'About' ? '1' : '0.1'}/>
          </g>
          <defs>
            <filter id="filter0_d_121_164" x="0" y="0" width="151" height="181" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_121_164"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_121_164" result="shape"/>
            </filter>
            <radialGradient id="paint0_radial_121_164" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(92.5746 138.731) rotate(-121.122) scale(132.139)">
              <stop stopColor="#C1AEF8"/>
              <stop offset="1" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

function Hamburger({ active, onClick }) {
  return (
    <svg
      className={clsx({
        [styles.Hamburger]: true,
        [styles.Hamburger__active]: active
      })} 
      viewBox="0 0 100 100" 
      width="80"
      onClick={onClick}
    >
      <path
        className={`${styles.Hamburger_top} ${styles.Hamburger_line}`}
        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
      <path
        className={`${styles.Hamburger_middle} ${styles.Hamburger_line}`}
        d="m 70,50 h -40" />
      <path
        className={`${styles.Hamburger_bottom} ${styles.Hamburger_line}`}
        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
    </svg>
  )
}

function Menu({ active, onNavigate }) {
  return (
    <div className={clsx({
      [styles.Menu]: true,
      [utilStyles.max600]: true,
      [styles.Menu__active]: active,
      [styles.Menu__closed]: active === false, // to ignore null value
    })}>
      <nav>
        <ul className={styles.Menu_list}>
          <li className={styles.Menu_link}>
            <button className={utilStyles.hugeHeading} onClick={() => onNavigate('Home')}>ACCUEIL</button>
          </li>
          <li className={styles.Menu_link}>
          <button className={utilStyles.hugeHeading} onClick={() => onNavigate('About')}>À PROPOS</button>
          </li>
          <li className={styles.Menu_link}>
            <button className={utilStyles.hugeHeading} onClick={() => onNavigate('Services')}>SERVICES</button>
          </li>
          <li className={styles.Menu_link}>
            <button className={utilStyles.hugeHeading} onClick={() => onNavigate('Portfolio')}>PORTFOLIO</button>
          </li>
          <li className={styles.Menu_link}>
            <button className={utilStyles.hugeHeading} onClick={() => onNavigate('Contact')}>CONTACT</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}