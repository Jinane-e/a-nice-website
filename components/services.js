import Image from 'next/image'
import Button from './button'

import styles from './services.module.css'
import utilStyles from '../styles/utils.module.css'

import servicesData from '/pages/api/services-page.json'
import { CLOUDINARY_URL } from '../lib/cloudinary'

export default function Services({ onNavigate }) {
  const content = servicesData.data.attributes
  const services = content.services?.data
  const firstStack = content.firstStack?.data
  const secondStack = content.secondStack?.data

  return (
    <section className={utilStyles.Cell_services}>

      <div className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>
          
          {/* HEADING */}
          <article className={styles.Heading}>
            <h1 className={utilStyles.hugeHeading}>{content.title}</h1>
            <p className={utilStyles.textTypo}>{content.description}</p>
          </article>

          {/* SERVICES LIST */}
          <article className={styles.Services}>

            <ul className={styles.Services_list}>
              {services?.map(service => 
                <li key={service.id} className={styles.Services_block}>
                  <div className={styles.Services_image}>
                    <Image src={CLOUDINARY_URL+service.attributes.icon.data.attributes.name} fill alt="devices" />
                  </div>
                  
                  <h2 className={utilStyles.specialHeading}>{service.attributes.name}</h2>
                  <p className={utilStyles.textTypo}>{service.attributes.description}</p>
                </li>
              )}
            </ul>
          </article>

          {/* CTA TO PORTFOLIO */}
          <div className={styles.Cta}>
            <Button primary icon="chevron-right" iconWidth={7} onClick={() => onNavigate('Portfolio')}>Exemples</Button>
          </div>

          {/* FAVORITE STACK */}
          <article className={styles.Stack}>
            <h3 className={utilStyles.linkTypo}>TECHNOLOGIES PRÉFÉRÉES</h3>

            <ul className={styles.Stack_list}>
              {firstStack.map(techno => 
                <li key={techno.id} className={styles.Stack_element}>
                  <Image className={styles.Stack_image} src={CLOUDINARY_URL+techno.attributes.name} fill alt={techno.attributes.name.split('.')[0]} />
                </li>
              )}
            </ul>
          </article>

          {/* SECOND STACK */}
          <article className={styles.Stack}>
            <h3 className={utilStyles.linkTypo}>AUTRES COMPÉTENCES</h3>

            <ul className={styles.Stack_list}>
              {secondStack.map(techno => 
                <li key={techno.id} className={styles.Stack_element}>
                  <Image className={styles.Stack_image} src={CLOUDINARY_URL+techno.attributes.name} fill alt="" />
                </li>
              )}
            </ul>
          </article>

        </div>
      </div>
    </section>
  )
}
