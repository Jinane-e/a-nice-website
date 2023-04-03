import Button from './button'
import Image from 'next/image'

import styles from './portfolio.module.css'
import utilStyles from '../styles/utils.module.css'

import aboutData from '/pages/api/portfolio-page.json'
import { CLOUDINARY_URL } from '../lib/cloudinary'
import { useEffect, useRef } from 'react'

export default function Portfolio({ currentViewport, onNavigate }) {
  const scrollRef = useRef()
  const content = aboutData.data.attributes
  const projects = content.projects.data

  useEffect(() => {
    if(currentViewport === 'Portfolio') {
      scrollRef.current?.scrollTo(0, 0)
    }
  }, [currentViewport])

  return (
    <section className={utilStyles.Cell_portfolio}>

      <div ref={scrollRef} className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>

          {/* HEADING */}
          <article className={styles.Heading}>
            <h1 className={utilStyles.hugeHeading}>{content.title}</h1>
            <p className={utilStyles.textTypo}>{content.description}</p>
          </article>

          {/* FOOTER & CTA */}
          <article className={styles.Footer}>
            <p className={utilStyles.textTypo}>Besoin d’un site vitrine, d’une application ou d’un autre service&nbsp;?<br/> <br/>Contacte-moi pour en parler</p>
            <Button fill primary icon="chevron-right" iconWidth={6} iconHeight={12} onClick={() => onNavigate('Contact')}>Contacte-moi</Button>
          </article>

          {/* GALLERY */}
          <article className={styles.Gallery}>
            <div className={styles.Gallery_separator}></div>
            <div className={styles.Gallery_separator}></div>
            <div className={styles.Gallery_separator}></div>

            <ul className={styles.Gallery_list}>
              {projects?.map(project => {
                const image = <Image
                                src={`${CLOUDINARY_URL}/w_500/${project.attributes.image?.data.attributes.name}`}
                                fill 
                                sizes="(max-width: 600px) 400px, 500px" 
                                alt="screenshot" 
                                className={styles.Gallery_image}
                              />

                return (
                  <li key={project.id} className={styles.Gallery_cell}>
                    {project.attributes.link ?
                      <a href={project.attributes.link} target="_blank">
                        <h2 suppressHydrationWarning className={utilStyles.smallTypo}>{project.attributes.legend}</h2>
                        {image}
                      </a>
                      : <>
                        <h2 suppressHydrationWarning className={utilStyles.smallTypo}>{project.attributes.legend}</h2>
                        {image}
                      </>
                    }
                  </li>
                )
              }
              )}
              
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
