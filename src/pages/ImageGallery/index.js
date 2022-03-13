import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchAllPhotos,
    imageGallerySelector,
    statusSelector,
    errorSelector
} from '../../redux/imageGallerySlice';

import Error from '../../components/Error';
import Loading from '../../components/Loading';
import Item from './Item';
import './styles.css';

function ImageGallery() {
    const dispatch = useDispatch();
    const data = useSelector(imageGallerySelector)
    const status = useSelector(statusSelector)
    const error = useSelector(errorSelector)

    useEffect(() => {
        // if "status" boolean is not used, the page refreshes !
        if (status === 'idle') {
            dispatch(fetchAllPhotos());
        }
    }, [dispatch, status])

    if (error) {
        return <Error message={error} />;
    }

    return (
        <div >
            <h1 className='ImageGalleryItemsHeader'><i>ImageGallery (Random Cat Photos)</i></h1>
            {status === 'loading' && <Loading />}
            {status === 'succeeded' && data.map((element) =>
                <Item key={element.id} element={element} />)}
        </div>
    )
}

export default ImageGallery