import Masonry from 'react-masonry-css';
import './styles.css';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from "../../redux/breedsSlice";

function Home() {
    const breeds = useSelector((state) => state.breeds.items);
    const nextPage = useSelector((state) => state.breeds.page);
    const hasNextPage = useSelector((state) => state.breeds.hasNextPage);
    const isLoading = useSelector((state) => state.breeds.isLoading);
    const error = useSelector((state) => state.breeds.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [dispatch])

    if (error) {
        return <Error message={error} />
    }

    return (
        <div>
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {breeds.map((breed) => (
                    <div key={breed.id}>
                        <img alt={breed.name}
                            src={breed.image ?
                                //There is no image in some api responses so i use a dummy image
                                breed.image.url : "https://cdn2.thecatapi.com/images/mEAYWK6yE.jpg"} className="breed_image" />
                        <div className="breed_name" >
                            {breed.image ? breed.name : "No Photo, Just Little Dummy Cat"}
                        </div>
                    </div>
                ))
                }
            </Masonry >

            <div style={{ padding: '20px 0 40px 0', textAlign: 'center' }}>
                {isLoading && <Loading />}
                {hasNextPage && !isLoading && (<button onClick={() => dispatch(fetchBreeds(nextPage))}>Load More ({nextPage})</button>)}
                {
                    !hasNextPage && <div>There is nothing to be shown !</div>
                }
            </div>
        </div >
    );
}

export default Home