import Head from 'next/head'
import { useState } from 'react'

import Layout, { siteTitle } from '../components/layout'
import Home from '../components/home'
import About from '../components/about'
import Services from '../components/services'
import Portfolio from '../components/portfolio'
import Contact from '../components/contact'
import { getAboutData, getContactData, getGlobalData, getHomeData, getPortfolioData, getServicesData } from '../lib/api'

export default function SinglePage() {
  const [view, setView] = useState('Home')

  return (
    <Layout data={global?.data} view={view} onNavigate={setView}>
      <Head>
        <meta
          name="description"
          content="Jinane Ben Salem"
        />
        <title>{siteTitle}</title>
      </Head>
      
      <Home onNavigate={setView} />
      <About onNavigate={setView} />
      <Services onNavigate={setView} />
      <Portfolio onNavigate={setView} />
      <Contact onNavigate={setView} />

    </Layout>
  )
}

// export async function getStaticProps(ctx) {
//   const portfolioResponse = await getPortfolioData()
//   const aboutResponse = await getAboutData()
//   const servicesResponse = await getServicesData()
//   const homeResponse = await getHomeData()
//   const globalResponse = await getGlobalData()
//   const contactResponse = await getContactData()

//   return {
//     props:{
//       portfolio: portfolioResponse,
//       about: aboutResponse,
//       services: servicesResponse,
//       home: homeResponse,
//       global: globalResponse,
//       contact: contactResponse
//     }
//   }
// }