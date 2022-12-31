import Styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { useContext } from 'react';

function Home(
    {onClickLocation}
) {

    //const locationName = useContext(AppContext).locationName;
    const itemsLocations = useContext(AppContext).itemsLocations;
    const isLoaded = useContext(AppContext).isLoaded;
    const onClickLocationButton = (idLocation) => {
        onClickLocation(idLocation);
    }
    return (
        <div className={Styles.Home}>
                <ul>
                    <Link to="../freezer">
                        {(isLoaded ? itemsLocations : [...Array(5)])
                            .map((obj, index) => (
                        <li onClick={() => onClickLocationButton(obj.id)} key={index}>
                            <p>{isLoaded ? obj.locationName : ''}</p>
                        </li>))}
                    </Link>
                </ul>
        </div>
    )
}

export default Home;
