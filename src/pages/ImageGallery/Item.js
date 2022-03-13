import React from 'react'

import { Link } from 'react-router-dom';
import './styles.css'

function Item({ element }) {

    return (
        <div className='ImageGalleryItems'>
            <Link to={`/image_gallery/${element.id}`}>
                <img alt='ImageGalleryPhoto' src={element.url} />
            </Link>
        </div>
    )
}

export default Item