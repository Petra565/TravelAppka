import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from "react"
import 'leaflet/dist/leaflet.css';
import LocationMarker from './LocationMarker'
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import GeocoderControl from './Geocoder'
import Menu from './Menu'


function Map() {
    const [viewedPlaces, setViewedPlaces] = useState([])
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [indexToOpen, setIndexToOpen] = useState(false)

    useEffect(() => {
        const storedPlaces = localStorage.getItem('viewedPlaces');
        if (storedPlaces) {
            setViewedPlaces(JSON.parse(storedPlaces));
        }
    }, []);

    useEffect(() => {
        if (viewedPlaces.length > 0) {
            localStorage.setItem('viewedPlaces', JSON.stringify(viewedPlaces));
        }
    }, [viewedPlaces]);

    const MapRightClickHandler = () => {
        useMapEvents({
            contextmenu(e) {
                setSelectedPosition(e.latlng);
            }
        });

        return null;
    };

    const position = [51.505, -0.09]

    const bounds = [
        [-85, -180],
        [85, 180]
    ];

    return (
        <>
            <button
                className="bg-sky-400 hover:bg-sky-600 absolute right-2 top-40 px-4 py-2 rounded-xl  text-white cursor-pointer z-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                Menu
            </button>
            {isMenuOpen &&
                <Menu
                    viewedPlaces={viewedPlaces}
                    setIndexToOpen={setIndexToOpen }
                ></Menu>
            }

            <MapContainer
                center={position}
                zoom={2.5}
                style={{ height: '100vh', width: '100%' }}
                minZoom={2.5}
                scrollWheelZoom={true}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                worldCopyJump={false}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    noWrap={true}
                />
                <GeocoderControl
                    setSelectedPosition={setSelectedPosition}
                ></GeocoderControl>
                <MapRightClickHandler />
                <LocationMarker
                    clickedPosition={selectedPosition}
                    setClickedPosition={setSelectedPosition}
                    viewedPlaces={viewedPlaces}
                    setViewedPlaces={setViewedPlaces}
                    indexToOpen={indexToOpen}
                    setIndexToOpen={setIndexToOpen }
                >
                </LocationMarker>

            </MapContainer>
        </>
    );
}

export default Map;