import { Popup } from 'react-leaflet'
import { useState } from "react"
import { useEffect } from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function EditPopupContent({ editPlaceIndex, placeToEdit, closePopup, setViewedPlaces, viewedPlaces}) {
    const [editedPlace, setEditedPlace] = useState({
        title: '',
        text: '',
        startDate: null,
        endDate: null,
        numberOfDays: 0,
        lat: null,
        lng: null
    })

    useEffect(() => {
        if (placeToEdit) {
            setEditedPlace({
                title: placeToEdit.title ?? "",
                text: placeToEdit.text ?? "",
                startDate: placeToEdit.startDate ? new Date(placeToEdit.startDate) : null,
                endDate: placeToEdit.endDate ? new Date(placeToEdit.endDate) : null,
                numberOfDays: placeToEdit.numberOfDays ?? 0,
                lat: placeToEdit.lat,
                lng: placeToEdit.lng
            })
        }
    }, [])

    const handleClickButtonSave = () => {
        const updatedPlaces=[...viewedPlaces]
        updatedPlaces[editPlaceIndex] = editedPlace
        setViewedPlaces(updatedPlaces)
        closePopup()
    }

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const s = new Date(start);
        const e = new Date(end);
        s.setHours(0, 0, 0, 0);
        e.setHours(0, 0, 0, 0);
        return (e - s) / (1000 * 60 * 60 * 24);
    };

    const numberOfDays = calculateDays(editedPlace?.startDate, editedPlace?.endDate);

    return (
        <>
            <h4 className="text-lg my-1 text-center justify-center">Pridať medzi navštívené miesta</h4>

            <label className="text-md">Názov miesta</label>

            <label className="text-md">Názov miesta</label>

            <input
                type="text"
                className="mt-1 mb-4 h-[2rem] w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                value={editedPlace.title}
                onChange={(e) => setEditedPlace({ ...editedPlace, title: e.target.value })}
            >
            </input>

            <div className="w-full"><label className="text-md w-full">Od</label></div>

            <DatePicker
                className=" w-full mt-1 mb-4 h-[2rem] border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                selected={editedPlace.startDate}
                onChange={(date, event) => {
                    if (event) event.stopPropagation();
                    setEditedPlace({ ...editedPlace, startDate: date });
                }}
                dateFormat="dd.MM.yyyy"
                wrapperClassName="w-full"
            />

            <div className="w-full"><label className="text-md">Do</label></div>

            <DatePicker
                className=" w-full mt-1 mb-4 h-[2rem] border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                selected={editedPlace.endDate}
                onChange={(date, event) => {
                    if (event) event.stopPropagation();
                    setEditedPlace({ ...editedPlace, endDate: date });
                }}
                dateFormat="dd.MM.yyyy"
                wrapperClassName="w-full"
            />

            <div className="w-full"><label className="text-md">Počet dní</label></div>

            <input
                type="number"
                className="mt-1 mb-4 h-[2rem] w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                value={numberOfDays}
                onChange={(e) => setEditedPlace({ ...editedPlace, numberOfDays: e.target.value })}
            >
            </input>

            <label className="text-md">Napíšte niečo o tomto mieste</label>

            <textarea
                className=" mt-1 w-full h-32 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 p-4 mb-2"
                value={editedPlace.text}
                onChange={(e) => setEditedPlace({ ...editedPlace, text: e.target.value })}
                placeholder=""
            />

            <div className="buttons grid grid-cols-2 gap-x-4">
                <button
                    className="col-span-1 h-[2rem] rounded-md bg-sky-400 hover:bg-sky-600  items-center px-4 text-white cursor-pointer"
                    onClick={handleClickButtonSave}
                >
                    Uložiť
                </button>

                <button
                    className="col-span-1 h-[2rem] rounded-md bg-[#ffb703] hover:bg-[#CC9200]  items-center px-4 text-white cursor-pointer"
                    onClick={(event) => {
                        if (event) event.stopPropagation()
                        closePopup()
                    }}
                >
                    Zrušiť
                </button>
            </div>
        </>

    );
}

export default EditPopupContent;