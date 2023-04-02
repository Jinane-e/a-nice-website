import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import styles from './button.module.scss'

export default function IconButton({ to, externalTo, onClick, icon, iconType, ...props }) {

  const iconImage = icon ? 
    <Image
      src={`/images/icons/${icon}.${iconType || 'svg'}`}
      alt={icon} 
      height={15} 
      width={15} 
    /> 
    : null

  if(onClick != null) return (
    <button
      className={styles.iconButton}
      onClick={onClick}
      {...props}
    >
      {iconImage}
    </button>
  )

  // External link
  if(externalTo != null) return (
    <a 
      className={styles.iconButton}
      href={externalTo}
      target="_blank"
      {...props}
    >
      {iconImage}
    </a>
  )

  // Internal link
  return (
    <Link 
      className={styles.iconButton} 
      href={to} 
      {...props}
    >
      {iconImage}
    </Link>
  )
}