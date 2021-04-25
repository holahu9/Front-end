import React from 'react'
import img from '../../assets/890-loading-animation.gif';
import './style.css'
export default function Loading() {
    return (
        <div className='conatinerLoading'>
            <img className="sizeImageLoad" src={img} alt='showloading' />
        </div >
    )
}
