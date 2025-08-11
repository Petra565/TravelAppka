import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState, useEffect } from 'react'
function Menu({ viewedPlaces, setIndexToOpen, setIsMenuOpen, viewport }) {
    const [name, setName] = useState('')
    const [plannedPlaces, setPlannedPlaces] = useState([])

    const [examplePlannedPlaces, setExamplePlannedPlaces] = useState(['Paris','Zagreb', 'NewYork', 'Nice'])

    const handleClickButtonAdd = () => {
        const plannedPlacesCopy = [...plannedPlaces]
        setPlannedPlaces([...plannedPlacesCopy, name])
        setName('')
    }

    const handleClickButtonDelete = (indexToDelete) => {
        const copyOfplannedPlaces = [...plannedPlaces]
        setPlannedPlaces(copyOfplannedPlaces.filter((Place, index) => index !== indexToDelete))
    }

    useEffect(() => {
        setPlannedPlaces(prev =>
            prev.filter(place =>
                !viewedPlaces.some(viewed => viewed.title.toLowerCase().includes(place.toLowerCase())
                )
            )
        )
    }, [viewedPlaces])


    useEffect(() => {
        const storedPlaces = localStorage.getItem('plannedPlaces');
        if (storedPlaces) {
            setPlannedPlaces(JSON.parse(storedPlaces));
        }
    }, []);

    useEffect(() => {
        if (plannedPlaces.length > 0) {
            localStorage.setItem('plannedPlaces', JSON.stringify(plannedPlaces));
        }
    }, [plannedPlaces]);

    useEffect(() => {
        const storedPlaces = localStorage.getItem('plannedPlaces');
        if (!storedPlaces) {
            setPlannedPlaces(examplePlannedPlaces);
            localStorage.setItem('plannedPlaces', JSON.stringify(examplePlannedPlaces));
        } else {
            setPlannedPlaces(JSON.parse(storedPlaces))
        }
    }, [])

    return (
        <aside className="min-w-[360px] bg-[#ffb703] absolute left-1/2 transform -translate-x-1/2 sm:translate-x-0 z-600 sm:right-2 sm:left-auto top-40 sm:top-54 px-4 py-4 sm:px-6 sm:py-6 rounded-xl  ">
            <TabGroup>
                <TabList className="grid grid-cols-2 gap-1 sm:gap-4">
                    <Tab className="col-span-1 border border-[white] text-[white] hover:bg-[#CC9200] data-selected:text-[#ffb703] data-selected:bg-white rounded-xl px-1 py-1 sm:px-4 sm:py-2 cursor-pointer">Navštívené miesta</Tab>

                    <Tab className="col-span-1 border border-[white] text-[white] hover:bg-[#CC9200] data-selected:text-[#ffb703] data-selected:bg-white rounded-xl px-4 py-2 cursor-pointer">Plánované miesta</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel className="mt-2 sm:mt-4 grid grid-cols-2 text-white">

                        <h1 className="col-span-1 text-center text-lg sm:text-xl mb-2 sm:mb-4">Miesto</h1>

                        <h1 className="col-span-1 text-center text-lg sm:text-xl mb-2 sm:mb-4">Počet dní</h1>

                        <section className="listOfViewedPlaces grid col-span-full grid-cols-2 max-h-[280px] sm:max-h-[280px] overflow-y-auto">
                            {viewedPlaces.map((place, index) => (
                                <div
                                    key={index}
                                    className="grid col-span-full py-1 grid-cols-2 text-center bg-white text-sky-400 rounded-xl mb-1 sm:mb-4 cursor-pointer hover:bg-sky-400 hover:text-white"
                                    onClick={() => {
                                        setIndexToOpen(index)

                                        if (viewport === 'small') {
                                            setIsMenuOpen(false)
                                        }

                                    }}
                                >
                                    <div className="col-span-1">{place.title}</div>

                                    <div className="col-span-1">{place.numberOfDays}</div>
                                </div>
                            ))}
                        </section>

                        <p className="col-span-full font-bold text-center">Celkový počet navštívených miest: {viewedPlaces.length}</p>
                    </TabPanel>

                    <TabPanel className="mt-4 sm:mt-4 grid grid-cols-4">
                        <div className="gap-1 sm:gap-4 grid col-span-full grid-cols-4">
                            <input
                                type='text'
                                className="col-span-3 w-full bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                value={name}
                                placeholder={'Napíšte názov miesta'}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </input>

                            <button
                                className="col-span-1 rounded-xl bg-sky-400 hover:bg-sky-600 items-center px-4 text-white cursor-pointer"
                                onClick={handleClickButtonAdd}
                            >
                                Pridať
                            </button>
                        </div>

                        {plannedPlaces.length > 0 &&
                            <section className="list mt-4 bg-white grid col-span-full grid-cols-4  py-2 rounded-sm grid-cols-2 max-h-[295px] sm:max-h-[295px] overflow-y-auto">
                                <h1 className="text-black font-[Corinthia] place-items-center grid text-4xl col-span-full">Plánované miesta</h1>

                                {plannedPlaces.map((place, index) => (
                                    <div className="grid col-span-full grid-cols-5 items-center pl-4"
                                        key={index}
                                    >
                                        <div
                                            className="col-span-4 text-sky-400 border-b border-b-gray-400 font-[Corinthia] text-2xl sm:text-4xl"
                                        >
                                            {place}
                                        </div>

                                        <button
                                            className="col-span-1 h-[2rem] items-center rounded-xl justify-items-center px-4 text-red-600 cursor-pointer"
                                            index={index}
                                            onClick={() => handleClickButtonDelete(index)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="transition-transform duration-200 ease-in-out hover:scale-125 text-red-600 bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </section>
                        }
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </aside>
    );
}

export default Menu;