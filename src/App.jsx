import { useState, useEffect } from 'react'
import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Map from '../src/components/Map'

function App() {
    const headerRef = useRef(null)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [viewport, setViewport] = useState('')

    useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.offsetHeight;
            setHeaderHeight(height)
        }
    }, [])

    useEffect(() => {
        if (headerHeight === 96) {
            setViewport('small')
        } else {
            setViewport('big')
        }
    }, [headerHeight])

    return (
        <>
            <header
                ref={headerRef}
                className="font-[Corinthia] font-bold text-[4rem] sm:text-[6rem] text-white bg-[#ffb703] px-6 w-full text-center"
            >
                TravelApp
            </header>

            {headerHeight && (
                <Map
                    headerHeight={headerHeight}
                    viewport={viewport}
                ></Map>
            )}

        </>
    )
}

export default App
