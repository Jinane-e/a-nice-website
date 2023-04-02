import styles from './about.module.css'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import Button from './button'
import { getImagePath } from '../lib/api'


export default function About({ content, onNavigate }) {
  const experiences = content.attributes.experiences.data?.reverse()

  return (
    <section className={`${utilStyles.Cell_about}`}>

      <div className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>
          
          {/* HEADING */}
          <article className={styles.Heading}>
            <h1 className={utilStyles.mediumHeading}>{content.attributes.title}</h1>
            <Image src={getImagePath(content.attributes.picture?.data.attributes.url)} alt='me' fill className={styles.Heading_image} />
          </article>

          {/* LEGEND BELOW PICTURE */}
          <article className={styles.Legend}>
            <div className={utilStyles.textTypo} dangerouslySetInnerHTML={{ __html: content.attributes.legend }}></div>
          </article>

          {/* DESCRIPTION */}
          <article className={styles.Description}>
            <h2 className={utilStyles.bigHeading}>{content.attributes.descriptionTitle}</h2>
            <div className={utilStyles.textTypo} dangerouslySetInnerHTML={{ __html: content.attributes.descriptionText }}></div>
            
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
