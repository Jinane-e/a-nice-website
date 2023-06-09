import { useEffect, useRef, useState } from 'react'
import Button from './button'
import Input from './input'

import styles from './contact.module.css'
import utilStyles from '../styles/utils.module.css'
import clsx from 'clsx'

import contactData from '/pages/api/contact-page.json'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact({ currentViewport }) {
  const scrollRef = useRef()
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [buttonText, setButtonText] = useState('Envoyer')
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)
  const mailRegex = /(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+/g

  const content = contactData.data.attributes

  useEffect(() => {
    if(currentViewport === 'Contact') {
      scrollRef.current?.scrollTo(0, 0)
    }
  }, [currentViewport])

  const handleSend = (e) => {
    e.preventDefault()
    console.log(e)

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
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", email, subject, message})
    })
      .then(() => {
        setSent(true)
    
        setTimeout(() => {
          setButtonText('✨Merci !✨')
        }, 300)
        setError(null)
        setEmail('')
        setSubject('')
        setMessage('')
      })
      .catch(error => {
        setError('Something happened...')
        console.log(error)
      })
  }

  return (
    <section className={`${utilStyles.Cell_contact}`}>
      <div ref={scrollRef} className={utilStyles.Cell_content}>
        
        <div className={styles.Container}>
          
          {/* HEADING */}
          <div className={styles.Heading}>
            <h1 className={utilStyles.hugeHeading}>{content?.title}</h1>
            <p className={utilStyles.textTypo}>{content.description}</p>
          </div>

          {/* FORM */}
          <form
            data-netlify="true"
            name='contact'
            netlify-honeypot="bot-field"
            className={clsx({
              [styles.Form]: true,
              [styles.Form__sent]: sent
            })}
            onSubmit={handleSend}
          >
            <input type="hidden" name="form-name" value="contact" />
      
            <Input hasError={error != null && !email.match(mailRegex)} value={email} name="email" placeholder="Ton email*" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input hasError={error != null && subject.length<3}value={subject} outlined name="subject" placeholder="Sujet du message*" type="text" onChange={(e) => setSubject(e.target.value)}/>
            <Input hasError={error != null && message.length<3} value={message} outlined textArea name="message" placeholder="Ton message*" type="text" onChange={(e) => setMessage(e.target.value)}/>
          
            <span className={styles.Form_error}>{error}</span>
            <Button type="submit" primary icon={'send'} iconHeight={30} iconWidth={30} reversed fill onClick={handleSend}>{buttonText}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
