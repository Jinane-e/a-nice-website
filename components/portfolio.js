import styles from './portfolio.module.css'
import utilStyles from '../styles/utils.module.css'
import Button from './button'
import Image from 'next/image'
import { getImagePath } from '../lib/api'


export default function Portfolio({ content, onNavigate }) {
  const projects = content.attributes.projects.data

  return (
    <section className={utilStyles.Cell_portfolio}>

      <div className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>

          {/* HEADING */}
          <article className={styles.Heading}>
            <h1 className={utilStyles.hugeHeading}>{content.attributes.title}</h1>
            <p className={utilStyles.textTypo}>{content.attributes.description}</p>
          </article>

          {/* FOOTER & CTA */}
          <article className={styles.Footer}>
            <p className={utilStyles.textTypo}>Besoin d’un site vitrine, d’une application ou d’un autre service ?<br/> <br/>Contacte-moi pour en parler</p>
            <Button fill primary icon="chevron-right" iconWidth={6} iconHeight={12} onClick={() => onNavigate('Contact')}>Contacte-moi</Button>
          </article>

          {/* GALLERY */}
          <article className={styles.Gallery}>
            <div className={styles.Gallery_separator}></div>
            <div className={styles.Gallery_separator}></div>
            <div className={styles.Gallery_separator}></div>

            <ul className={styles.Gallery_list}>
              {projects?.map(project => 
                <li key={project.id} className={styles.Gallery_cell}>
                  {project.attributes.link ?
                    <a href={project.attributes.link} target="_blank">
                      <h2 suppressHydrationWarning className={utilStyles.smallTypo}>{project.attributes.legend}</h2>
                      <Image src={getImagePath(project.attributes.image?.data.attributes.url)} fill alt="screenshot" className={styles.Gallery_image} />
                    </a>
                    : <>
                      <h2 suppressHydrationWarning className={utilStyles.smallTypo}>{project.attributes.legend}</h2>
                      <Image src={getImagePath(project.attributes.image?.data.attributes.url)} fill alt="screenshot" className={styles.Gallery_image} />
                    </>
                  }
                  
                </li>
              )}
              
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}