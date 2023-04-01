import React from "react";
import preloadGif from '../../../assets/images/preloader.gif'
import m from './preloader.module.css'

const Preloader: React.FC = () => {
    return (
        <div className={m.preloaderWrapper}>
            <img className={m.preloader} src={preloadGif} alt="" />
        </div>
    )
}

export default Preloader;