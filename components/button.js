import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import styles from './button.module.scss'
import utilStyles from '../styles/utils.module.css'

export default function Button({ children, opaque, to, onClick, primary, secondary, icon, iconHeight, iconWidth, iconType, reversed, fill, ...props }) {  

  const iconImage = icon ? 
    <Image
      src={`/images/icons/${icon}.${iconType || 'svg'}`} 
      alt={icon} 
      height={iconHeight || 25} 
      width={iconWidth || 25} 
    /> 
    : null

  const content = reversed ?
    <>
      {iconImage}
      <span className={utilStyles.textTypo}>{children}</span>
    </>
    : <>
      <span className={utilStyles.textTypo}>{children}</span>
      {iconImage}
    </>

  if(onClick) return primary ? 
    <PrimaryButton
      expand={fill}
      onClick={onClick}
      {...props}
    >
      {content}
    </PrimaryButton> 
    : <button
        className={clsx({
          [styles.secondary]: secondary,
          [styles.hovered]: opaque,
          [styles.expand]: fill,
        })}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>

  return (
    <Link 
      className={clsx({
        [styles.primary]: primary,
        [styles.secondary]: secondary,
      })}
      href={to}
      {...props}
    >
      { content }
    </Link>
  )
}

const PrimaryButton = ({ children, expand = false, ...props }) => {

  return (
    <button className={clsx({
      [styles.glowButton]: true,
      [styles.expand]: props.expand,
    })} {...props}>
      
      <div className={styles.gradient}></div>
      <span className={styles.glowButton_span}>
        {children}
      </span>
    </button>
  )
}