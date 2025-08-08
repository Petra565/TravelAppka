import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from "react"
import 'leaflet/dist/leaflet.css';
import LocationMarker from './LocationMarker'
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import GeocoderControl from './Geocoder'
import Menu from './Menu'

function Map({ headerHeight, viewport }) {
    const [viewedPlaces, setViewedPlaces] = useState([])
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [indexToOpen, setIndexToOpen] = useState(false)

    const examplePlace1 =
    {
        title: 'Príklad-London',
        text: 'Sem napíšte zážitky, ktoré ste zažili na tomto mieste alebo napíšte čo sa vám na tomto mieste páčilo.',
        startDate: "2025-06-30T22:00:00.000Z",
        endDate: "2025-07-31T22:00:00.000Z",
        numberOfDays: 31,
        lat: 51.50190410761811,
        lng: - 0.09887695312500001
    }

    const examplePlace2 =
    {
        title: "Príklad-Oslo",
        text: "Sem napíšte zážitky, ktoré ste zažili na tomto mieste alebo napíšte čo sa vám na tomto mieste páčilo.",
        startDate: "2025-06-30T22:00:00.000Z",
        endDate: "2025-08-31T22:00:00.000Z",
        numberOfDays: 62,
        lat: 59.94125582542067,
        lng: 10.747032165527346,
    }

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

    useEffect(() => {
        const storedPlaces = localStorage.getItem('viewedPlaces');
        if (!storedPlaces) {
            const examplePlaces = [examplePlace1, examplePlace2];
            setViewedPlaces(examplePlaces);
            localStorage.setItem('viewedPlaces', JSON.stringify(examplePlaces));
        } else {
            setViewedPlaces(JSON.parse(storedPlaces))
        }
    }, [])

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
                className="bg-sky-400 hover:bg-sky-600 absolute right-2 top-27 sm:top-40 px-4 py-2 rounded-xl  text-white cursor-pointer z-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                Menu
            </button>
            {isMenuOpen &&
                <Menu
                    viewedPlaces={viewedPlaces}
                    setIndexToOpen={setIndexToOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                    viewport={viewport}
                ></Menu>
            }

            <MapContainer
                center={position}
                zoom={2.5}
                style={{ height: `calc(100vh - ${headerHeight}px)`, width: '100%' }}
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
                    setIndexToOpen={setIndexToOpen}
                >
                </LocationMarker>

            </MapContainer>
        </>
    );
}

export default Map;