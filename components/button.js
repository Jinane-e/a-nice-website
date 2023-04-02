import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import styles from './button.module.scss'
import utilStyles from '../styles/utils.module.css'
import { createElement, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import chroma from 'chroma-js'

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
  const glowButton = useRef(null)
  const [gradientElt, setGradientElt] = useState(null)

  useEffect(() => {
    const div = createElement('div', {className: styles.gradient})
    setGradientElt(div)
  }, [])

  useEffect(() => {
    if(gradientElt == null) return

    let ctx = gsap.context(() => {
      glowButton.current.addEventListener('pointermove', (e) => {
        const rect = glowButton.current.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(glowButton, {
          "--pointer-x": `${x}px`,
          "--pointer-y": `${y}px`,
          duration: 0.6,
        })

        gsap.to(glowButton, {
          "--button-glow": chroma
              .mix(
                getComputedStyle(glowButton.current)
                  .getPropertyValue("--button-glow-start")
                  .trim(),
                getComputedStyle(glowButton.current).getPropertyValue("--button-glow-end").trim(),
                x / rect.width
              )
              .hex(),
            duration: 0.2,
        })
      })
    }, glowButton)
    
    return () => ctx.revert()    
  }, [gradientElt])

  return (
    <button ref={glowButton} className={clsx({
      [styles.glowButton]: true,
      [styles.expand]: props.expand,
    })} {...props}>
      
      {gradientElt}
      <span className={styles.glowButton_span}>
        {children}
      </span>
    </button>
  )
}