import { Popup } from 'react-leaflet'
import { useState } from "react"
import { useEffect } from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function NewPopup({ viewedPlaces, setViewedPlaces, markerPosition, closePopup }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfDays, setNumberOfDays] = useState(0);

    const handleClick = () => {
        if (!markerPosition) return;
        const viewedPlace =
        {
            title,
            text,
            startDate,
            endDate,
            numberOfDays,
            lat: markerPosition.lat,
            lng: markerPosition.lng
        }

        setViewedPlaces((prew) => [...prew, viewedPlace]);
        setTitle("");
        setText("");
        closePopup();
    }

    useEffect(() => {
        console.log(viewedPlaces)

    }, [viewedPlaces])

    useEffect(() => {
        if (startDate && endDate) {
            const start = startDate;
            start.setHours(0, 0, 0, 0);
            const end = endDate;
            end.setHours(0, 0, 0, 0);
            const diffInMs = end - start;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            setNumberOfDays(diffInDays)

        } else {
            setNumberOfDays(0);
        }
    }, [startDate, endDate])

    return (
        <Popup>
            <h4 className="text-lg my-1 text-center justify-center">Pridať medzi navštívené miesta</h4>
            <label className="text-md">Názov miesta</label>
            <input
                type="text"
                className="mt-1 mb-4 h-[2rem] w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            >
            </input>
            <label className="text-md">Od</label>
            <DatePicker
                className="mt-1 mb-4 h-[2rem] w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy"
            />
            <label className="text-md">Do</label>
            <DatePicker
                className="mt-1 mb-4 h-[2rem] w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd.MM.yyyy"
            />
            <label className="text-md">Počet dní</label>

            <input
                type="number"
                className="mt-1 mb-4 h-[2rem] w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 p-4"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
            >
            </input>
            <label className="text-md">Napíšte niečo o tomto mieste</label>
            <textarea
                className=" mt-1 w-full h-32 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 p-4 mb-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder=""
            />
            <button
                className="h-[2rem] rounded-md bg-sky-400 hover:bg-sky-600  items-center px-4 text-white cursor-pointer"
                onClick={handleClick}
            >
                Pridať
            </button>
        </Popup>
    );
}

export default NewPopup;