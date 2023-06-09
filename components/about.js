import Image from 'next/image'
import Button from './button'

import styles from './about.module.css'
import utilStyles from '../styles/utils.module.css'

import aboutData from '/pages/api/about-page.json'
import { CLOUDINARY_URL } from '../lib/cloudinary'
import { useEffect, useRef } from 'react'

export default function About({ currentViewport, onNavigate }) {
  const scrollRef = useRef()
  const content = aboutData.data.attributes
  const experiences = content.experiences.data?.reverse()
  const picture = content.picture

  useEffect(() => {
    if(currentViewport === 'About') {
      scrollRef.current?.scrollTo(0, 0)
    }
  }, [currentViewport])

  return (
    <section className={`${utilStyles.Cell_about}`}>

      <div ref={scrollRef} className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>
          
          {/* HEADING */}
          <article className={styles.Heading}>
            <h1 className={utilStyles.mediumHeading}>{content.title}</h1>
            <Image 
              src={`${CLOUDINARY_URL}/w_500/${picture?.data.attributes.name}`} 
              alt='me' 
              sizes="(max-width: 600px) 100vw, (max-width: 910px) 500px, 400px" 
              fill 
              className={styles.Heading_image} />
          </article>

          {/* LEGEND BELOW PICTURE */}
          <article className={styles.Legend}>
            <div className={utilStyles.textTypo} dangerouslySetInnerHTML={{ __html: content.legend }}></div>
          </article>

          {/* DESCRIPTION */}
          <article className={styles.Description}>
            <h2 className={utilStyles.bigHeading}>{content.descriptionTitle}</h2>
            <div className={utilStyles.textTypo} dangerouslySetInnerHTML={{ __html: content.descriptionText }}></div>
            
            <div className={styles.Cta}>
              <Button primary icon="chevron-right" iconWidth={7} onClick={() => onNavigate('Services')}>Mes&nbsp;Services</Button>
            </div>
          </article>

          {/* TIMELINE EXPERIENCES */}
          {experiences?.length > 0 && 
            <article className={styles.Timeline}>

              <ul className={styles.Timeline_list}>
                {experiences?.map(exp => 
                  <li key={exp.id} className={styles.Timeline_cell}>
                    <h3 suppressHydrationWarning className={utilStyles.boldHeading}>{exp.attributes.period}</h3>
                    <p suppressHydrationWarning className={utilStyles.textTypo}>{exp.attributes.legend}</p>
                  </li>
                )}
              </ul>

              <div className={styles.Timeline_separator}></div>
            </article>
          }
        </div>
      </div>
    </section>
  )
}
