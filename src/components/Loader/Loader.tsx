import React from 'react';
import loaderImg from './../../assets/Spin-1s-200px.svg'
import s from './Loader.module.css'

const Loader = () => {
    return (
        <div className={s.container}>
            <img src={loaderImg} alt="loader"/>
        </div>
    );
};

export default Loader;