import { Popup } from 'react-leaflet'
import { useState } from "react"
import { useEffect } from "react"
import moment from "moment"

function PopupComponent({ title, text, startDate, endDate, numberOfDays }) {

    const handleClickButtonEdit = () => {

    }

    const handleClickButtonDelete = () => {

    }

    return (

        <Popup
            className="min-w-[20rem]"
        >
            <div className="">
                <h4 className="mt-4 text-lg rounded-md text-center bg-[#faa302] text-white ">{title}</h4>
                <h6 className="mt-4 text-md rounded-md text-center">Od {startDate ? moment(startDate).format('DD.MM.YYYY') : ''} do {endDate ? moment(endDate).format('DD.MM.YYYY') : ''}</h6>
                <h6 className="mt-4 text-md rounded-md text-center">Počet dní: {numberOfDays}</h6>
                <p className="break-words text-center whitespace-pre-wrap">{text}</p>
                <div className="buttons grid grid-cols-2 gap-x-4">
                    <button
                        className="col-span-1 h-[2rem] rounded-md bg-sky-400 hover:bg-sky-600  items-center px-4 text-white cursor-pointer"
                        onClick={handleClickButtonEdit}
                    >
                        Upraviť
                    </button>
                    <button
                        className="col-span-1 h-[2rem] rounded-md bg-[#faa302] hover:bg-[#c78202] items-center px-4 text-white cursor-pointer"
                        onClick={handleClickButtonDelete}
                    >
                        Vymazať
                    </button>
                </div>
            </div>
        </Popup>
    );
}

export default PopupComponent;