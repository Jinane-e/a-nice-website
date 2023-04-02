import clsx from 'clsx'

import styles from './input.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Input({ children, textArea, placeholder, name, value, hasError, outlined, onChange, ...props }) {

  if(textArea) return (
    <textarea
      className={clsx({
        [utilStyles.textTypo]: true,
        [styles.Input]: true,
        [styles.TextArea]: true,
        [styles.Input__outlined]: outlined,
        [styles.Input__error]: hasError
      })}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
  return (
    <input
      className={clsx({
        [utilStyles.textTypo]: true,
        [styles.Input]: true,
        [styles.Input__outlined]: outlined,
        [styles.Input__error]: hasError
      })}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}