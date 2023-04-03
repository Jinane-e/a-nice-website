import Image from 'next/image'
import Button from './button'
import styles from './home.module.css'
import utilStyles from '../styles/utils.module.css'

import homeData from '/pages/api/home-page.json'
import { CLOUDINARY_URL } from '../lib/cloudinary'

export default function Home({ onNavigate }) {
  const content = homeData.data.attributes
  const stack = content.stack.data

  return (
    <section className={`${utilStyles.Cell_home}`}>
      <div className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>

          {/* HEADING */}
          <div className={styles.Heading}>
            <h1 className={utilStyles.hugeHeading}>{content.title}</h1>
            <h2 className={utilStyles.hugeHeadingOutline}>{content.subtitle}</h2>
            
            {/* CTA */}
            <div className={`${styles.Cta}`}>
              <Button primary icon="chevron-right" iconWidth={7} onClick={() => onNavigate('About')}>Mon&nbsp;profil</Button>
            </div>
          </div>

          

          {/* FOOTER STACK */}
          <footer className={`${styles.Footer} ${utilStyles.min700}`}>
            <h3 className={utilStyles.linkTypo}>FAVORITE TECHNOLOGIES</h3>
            
            <ul className={styles.Footer_list}>
              {stack.map(techno => 
                <li key={techno.id} className={styles.Footer_element}>
                  <Image 
                    className={styles.Footer_image} 
                    src={`${CLOUDINARY_URL}/w_80/${techno.attributes.name}`} 
                    fill
                    sizes="80px" 
                    alt={techno.attributes.name.split('.')[0]} 
                  />
                </li>
              )}
            </ul>
          </footer>
        </div>
      </div>
    </section>
  )
}
