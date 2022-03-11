import Masonry from 'react-masonry-css';
import './styles.css';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBreeds } from "../../redux/breedsSlice";

function Home() {
    const breeds = useSelector((state) => state.breeds.items);
    const isLoading = useSelector((state) => state.breeds.isLoading);
    const error = useSelector((state) => state.breeds.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [dispatch])

    if (isLoading) {
        return <Loading />
    }

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
                        <img alt={breed.name} src={breed.image.url} className="breed_image" />
                        <div className="breed_name" >
                            {breed.name}
                        </div>
                    </div>
                ))
                }
            </Masonry >
        </div >
    );
}

export default Home