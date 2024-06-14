import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./S1.css";

const Contact_us = () => {
  const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      emailjs
        .sendForm('service_8dkewfz', 'template_ih2x3lc', form.current, {
          publicKey: 'NoeAQqUZ_Ospcrys5',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        );
      e.target.reset();
    };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-heading">Contact Us</h2>
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact_us;
