import React from "react";
import preloadGif from '../../../assets/images/preloader.gif'

const Preloader: React.FC = () => {
    return (
        <div>
            <img src={preloadGif} alt="" />
        </div>
    )
}

export default Preloader;