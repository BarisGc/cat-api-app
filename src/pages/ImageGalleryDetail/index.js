import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Redirect } from 'react-router-dom'
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
        const data = state.imageGallery.items.find((item) => {
            return item.id === photo_id
        })
        return data
    });

   if (!imageInfo) {
        return <Redirect to="/" />
    }

    return (
        <>
            {photoURL && (
                <div className='ImageGalleryDetailElementContainer'>
                    <img className='ImageGalleryDetailElementImage' src={photoURL} alt='Cats' />
                    <h1>Cat Info (JSON)</h1>
                    {imageInfo && <div>{JSON.stringify(imageInfo, null, 2)}</div>}
                    {!imageInfo.url && <div>NO DETAILED INFORMATION ABOUT CAT</div>}
                </div>
            )}
        </>
    )
}

export default ImageGalleryDetail
