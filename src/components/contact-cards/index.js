import React, {useState, useEffect} from 'react';
import Contentstack from 'contentstack';
import styles from './index.module.css';

<script src="https://cdn.jsdelivr.net/npm/contentstack@latest/dist/web/contentstack.min.js"></script>

const API_KEY = 'blt2260b25d78f02c35';
const DELIVERY_TOKEN = 'cs58fb72625764c334e0fd165d'
const CONTENT_TYPE = 'contact'

const ContactCard = () => {

    const [contact, setContact] = useState([])

  const Stack = Contentstack.Stack({ "api_key": API_KEY, "delivery_token": DELIVERY_TOKEN, "environment": "development" });
  const Query = Stack.ContentType(CONTENT_TYPE).Query();

  const getContent = async () => {
    Query
      .where("title")
      .includeCount()
      .toJSON()
      .find()
      .then(function success(result) {
        setContact(result[0][0].card)

      },
        function error(err) {
        });
  }
  useEffect(() => {
    getContent();
  })


  return (
    <>
    <h1 className={`${styles.heading}`}>Looking for something else?</h1>
    <div className={`container ${styles.cc_container}`}>
        {contact && contact.map((contcard) => {
            return(
<div className={`${styles.cc_card}`}>
            <h1 className={`${styles.head}`}>{contcard.card_title}</h1>
            <p className={`${styles.para}`}>{contcard.card_description}</p>
            <a className={`${styles.link}`} href={contcard.card_link.href}>→</a>
            
        </div>
            )
        })}
        
    </div>
    </>
  )
}

export default ContactCard