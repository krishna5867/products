import React, { useState } from 'react'
import Image1 from "../assets/img.jpg"
import Image2 from "../assets/img2.jpg"
import Image3 from "../assets/img3.jpg"

const Carousel = () => {
    const [currIndex, setIndex] = useState(0);
    const images = [Image1, Image2, Image3];

    const handleNext = () => {
        setIndex((prev) => (prev + 1 ) % images.length );
    };
    const handlePrev = () => {
        setIndex((prev)=> (prev - 1 + images.length)  % images.length );
     };


    return (
        <div className='flex gap-4 items-center justify-center py-5'>
            <button onClick={handlePrev}>Prev</button>
            <img src={images[currIndex]} alt='' className='w-40' />
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default Carousel
