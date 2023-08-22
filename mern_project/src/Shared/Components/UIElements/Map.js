import React, {useEffect, useRef} from 'react';

import './Map.css';

const Map = props => {

    const {coordinates, zoom} = props;

    const mapRef = useRef();

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: coordinates,
            zoom: zoom
        });

        new window.google.maps.Marker({
            position: coordinates,
            map: map
        })
    }, [coordinates, zoom])


    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}>
        </div>
    );
}

export default Map;