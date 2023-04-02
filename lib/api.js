import { remark } from 'remark'
import html from 'remark-html'

export async function fetcher(url, options = {}) {
  let response 

  if(!options) {
    response = await fetch(url)
  } else {
    response = await fetch(url, options)
  }

  const json = await response.json()
  
  return json
}

export async function getGlobalData() {

  let response = await(fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/global`))
  const json = response.json()

  return json
}

export async function getContactData() {

  let response = await(fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-page`))
  const json = response.json()

  return json
}

export async function getPortfolioData() {

  let response = await(fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/portfolio-page?populate[projects][populate][0]=image`))
  const json = response.json()

  return json
}

export async function getHomeData() {

  let response = await(fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate=*`))
  const json = response.json()

  return json
}

export async function getAboutData() {

  let response = await(fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?populate[experiences]=*&populate=picture`))
  const json = await response.json()

  if(json.data?.attributes?.descriptionText) {
    const mkDescription = json.data?.attributes?.descriptionText
    const formattedText = await remark()
      .use(html)
      .process(mkDescription)

    json.data.attributes.descriptionText = String(formattedText)
  }

  if(json.data?.attributes?.legend) {
    const mkDescription = json.data?.attributes?.legend
    const formattedText = await remark()
      .use(html)
      .process(mkDescription)

    json.data.attributes.legend = String(formattedText)
  }

  return json
}

export async function getServicesData() {
  let response = await(fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services-page?populate[services][populate]=*&populate[firstStack]=*&populate[secondStack]=*`))
  const json = await response.json()

  return json
}

export function getImagePath(imageURL) {
  return process.env.NEXT_PUBLIC_STRAPI_URL + imageURL
}