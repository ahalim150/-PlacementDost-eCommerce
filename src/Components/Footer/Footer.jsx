import React from 'react'
import style from '../Footer/Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer>
        <div class={style["footer-wrapper"]}>
          <div class={style["footer-section"]}>
            <div class={style["footer-subscribe"]}>
              <h2>
              stay up-to-date with the latest releases.. Subscribe now 
              </h2>
              <div class={style["input-box"]}>
                <input type="email" placeholder="Email Address" />
                <button>
                  <svg width="41" height="22" viewBox="0 0 41 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.002 11.001H0.501953M40.002 11.001L30.002 1.00098M40.002 11.001L30.002 21.001" stroke="#0E100F"></path>
                  </svg>
                </button>
              </div>
            </div>
            <nav class={style["footer-nav"]}>
              <div>
                <h3>Company</h3>
                <ul>
                  <li><Link href="#">About</Link></li>
                  <li><Link href="#">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3>GSAP</h3>
                <ul>
                  <li><Link href="#">Pricing</Link></li>
                  <li><Link href="#">Resources</Link></li>
                  <li><Link href="#">Community</Link></li>
                </ul>
              </div>
              <div>
                <h3>Connect</h3>
                <ul>
                  <li><Link href="#">Codepen</Link></li>
                  <li><Link href="#">GitHub</Link></li>
                  <li><Link href="#">Facebook</Link></li>
                  <li><Link href="#">Linkedin</Link></li>
                </ul>
              </div>
            </nav>
          </div>

          <div class={style["footer-copyright"]}>
            <p>©2024 Ahmed Abd El-Halim, All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
