import React from 'react'
import style from '../NotFound/NotFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <section className={`${style.page_404}`}>
        <div className={`${style.container}`}>
          <div className={style.row}>
            <div className={style.col_sm_12}>
              <div className={`${style.col_sm_10} col-sm-offset-1 text-center mx-auto`}>
                <div className={style.four_zero_four_bg}>
                  <h1 className="text-center">404</h1>
                </div>
                <div className={style.contant_box_404}>
                  <h3 className={style.h2}>Look like you're lost</h3>
                  <p>the page you are looking for not available!</p>
                  <Link to="/" className={style.link_404}>Go to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
