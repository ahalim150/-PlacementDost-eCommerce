import React from 'react'
import style from '../Bubbles/Bubbles.module.css'

export default function Bubbles() {
  return (
    <>
        <div className={style['bubble-animation']}>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
            <div className={style['bubble-animation-item']}></div>
        </div>
    </>
  )
}
