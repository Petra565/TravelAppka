import { useState } from "react"
import { useEffect } from "react"
import moment from "moment"
import Alert from './Alert'

function PopupContent({ place, openEdit, index, viewedPlaces, setViewedPlaces }) {
    const [placeFromPopup, setPlaceFromPopup] = useState(null)
    let [isOpen, setIsOpen] = useState(false);
    const [deletePlace, setDeletePlace] = useState(false)

    useEffect(() => {
        if (deletePlace === true) {
            const viewedPlacesCopy = [...viewedPlaces]
            const updatedPlaces = viewedPlacesCopy.filter((viewedplace) => viewedplace !== place)
            setViewedPlaces(updatedPlaces)
        }
        return

    }, [deletePlace])

    return (

        <div className="">
            <h4 className="mt-4 text-lg rounded-md text-center bg-[#ffb703] text-white ">{place.title}</h4>
            <h6 className="mt-4 text-md rounded-md text-center">Od {place.startDate ? moment(place.startDate).format('DD.MM.YYYY') : ''} do {place.endDate ? moment(place.endDate).format('DD.MM.YYYY') : ''}</h6>
            <h6 className="mt-4 text-md rounded-md text-center">Počet dní: {place.numberOfDays}</h6>
            <p className="break-words text-center whitespace-pre-wrap">{place.text}</p>
            <div className="buttons grid grid-cols-2 gap-x-4">
                <button
                    className="col-span-1 h-[2rem] rounded-md bg-sky-400 hover:bg-sky-600  items-center px-4 text-white cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
                        openEdit()
                    }}
                >
                    Upraviť
                </button>
                <button
                    className="col-span-1 h-[2rem] rounded-md bg-[#ffb703] hover:bg-[#CC9200] items-center px-4 text-white cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    Vymazať
                </button>
            </div>

            {isOpen === true && (
                < Alert
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setDeletePlace={setDeletePlace}
                >
                </Alert>
            )}

        </div>
    );
}

export default PopupContent;