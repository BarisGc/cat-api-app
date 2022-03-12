import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

function Detail() {
    const [breedDetail, setBreedDetail] = useState(null);
    const [breedImages, setBreedImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const { breed_customname } = useParams();

    useEffect(() => {

        axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/breeds/search?q=${breed_customname}`)
            .then((res1) => res1.data)
            .then(detailData => {
                setBreedDetail(detailData[0])
                axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/images/${detailData[0].reference_image_id}`)
                    .then((res2) => res2.data)
                    .then(imageData => {
                        setBreedImages(imageData)
                    })
                    .catch((error) => {
                        // Error
                        if (error.response) {
                            /*
                             * The request was made and the server responded with a
                             * status code that falls out of the range of 2xx
                             */
                            setIsError(error.response.data.message)
                        } else if (error.request) {
                            /*
                             * The request was made but no response was received, `error.request`
                             * is an instance of XMLHttpRequest in the browser and an instance
                             * of http.ClientRequest in Node.js
                             */
                            setIsError(error.request.responseText)
                        } else {
                            // Something happened in setting up the request and triggered an Error
                            setIsError(error.message)
                        }
                        console.log(error.config);
                    })
                    .finally(() => setLoading(false))
            })
    }, [breed_customname])

    if (isError) {
        return <Error message={isError} />
    }

    return (
        <div>
            {loading && <Loading />}
            {breedDetail && breedImages && (
                <div>
                    <h1>{breedDetail.name}</h1>
                    <p>{breedDetail.description}</p>
                    <img src={breedImages.url} alt='Breeds' style={{ width: '50%' }} />
                </div>
            )}
        </div>
    )
}

export default Detail