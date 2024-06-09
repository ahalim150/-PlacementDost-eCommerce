import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Sale/Sale.module.css'

export default function Sale() {
  return (
    <div className={style['buy-now']}>
      <Link to='/products' className={style['buy-now__link']}>
        <span className={style['buy-large']}>
          <span className={style['buy-large__num']}>25</span>
          <span className={style['buy-large__s']}>%</span>
        </span>
        <span className={style['buy-icon']}></span>
      </Link>
    </div>
  )
}
