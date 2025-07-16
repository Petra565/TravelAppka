import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

function GeocoderControl({ setSelectedPosition }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false,
        })
            .on('markgeocode', function (e) {
                const center = e.geocode.center;
                setSelectedPosition(center)
                map.setView(center, 10); // nastaví mapu na vyh¾adanú pozíciu
            })
            .addTo(map);

        return () => {
            map.removeControl(geocoder);
        };
    }, [map]);

    return null;
}
export default GeocoderControl
