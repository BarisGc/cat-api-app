import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './styles.css'

function ImageGalleryDetail() {
    const [photoURL, setPhotoURL] = useState(null)
    const { photo_id } = useParams();

    useEffect(() => {
        async function getPhoto() {
            try {
                const fetchSinglePhoto = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/images/${photo_id}`)
                setPhotoURL(fetchSinglePhoto.data.url)
            } catch (error) {
                console.error(error);
            }
        }
        getPhoto()
    }, [photo_id])



    const imageInfo = useSelector((state) => {
        console.log(state.imageGallery.items)
        return (state.imageGallery.items.find((item) => item.image.id === Number(photo_id)))
    }
    );


    return (
        <>
            {photoURL && (
                <div >
                    <img className='ImageGalleryDetailElementImage' src={photoURL} alt='Cats' />
                    <h1>Cat Info</h1>
                    {imageInfo && <pre>{JSON.stringify(imageInfo, null, 2)}</pre>}
                    {!imageInfo && <p>NO DETAILED INFORMATION ABOUT CAT</p>}
                </div>
            )}
        </>
    )
}

export default ImageGalleryDetail