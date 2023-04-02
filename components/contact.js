import { useRef, useState } from 'react'
import Button from './button'
import Input from './input'

import styles from './contact.module.css'
import utilStyles from '../styles/utils.module.css'
import clsx from 'clsx'

export default function Contact({ content }) {
  const formRef = useRef(null)
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [buttonText, setButtonText] = useState('Envoyer')
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)
  const mailRegex = /(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+/g

  const handleSend = (e) => {
    e.preventDefault()

    if(!email) {
      setError('❌N\'oublie pas ton email !❌')
      return
    } else if(!email.match(mailRegex)) {
      setError('❌On dirait que ce mail n\'est pas bon...❌')
      return
    } else if(!subject) {
      setError('❌Donne un titre à ton message!❌')
      return
    } else if(!message) {
      setError('❌Il manque ton message!❌')
      return
    }

    // Send message
    // formRef.current.submit()
    setSent(true)
    
    setTimeout(() => {
      setButtonText('✨Merci !✨')
    }, 300)
    setError(null)
    setEmail('')
    setSubject('')
    setMessage('')
  }

  return (
    <section className={`${utilStyles.Cell_contact}`}>
      <div className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>
          
          {/* HEADING */}
          <div className={styles.Heading}>
            <h1 className={utilStyles.hugeHeading}>{content.attributes?.title}</h1>
            <p className={utilStyles.textTypo}>{content.attributes.description}</p>
          </div>

          {/* FORM */}
          <form 
            ref={formRef}
            method='POST'
            action='/'
            name='contact'
            data-netlify="true" 
            netlify-honeypot="bot-field" 
            className={clsx({
              [styles.Form]: true,
              [styles.Form__sent]: sent
            })}
          >
            <input type="hidden" name="contactform" value="contact" />
      
            <Input hasError={error != null && !email.match(mailRegex)} value={email} name="email" placeholder="Ton email*" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input hasError={error != null && subject.length<3}value={subject} outlined name="subject" placeholder="Sujet du message*" type="text" onChange={(e) => setSubject(e.target.value)}/>
            <Input hasError={error != null && message.length<3} value={message} outlined textArea name="message" placeholder="Ton message*" type="text" onChange={(e) => setMessage(e.target.value)}/>
          
            <span className={styles.Form_error}>{error}</span>
            <Button primary icon={'send'} iconHeight={30} iconWidth={30} reversed onClick={handleSend} fill>{buttonText}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
