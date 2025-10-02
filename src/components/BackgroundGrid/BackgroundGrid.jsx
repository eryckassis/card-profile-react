import { useRef, useEffect } from 'react';
import '../BackgroundGrid.css';

function BackgroundGrid({ radius = 200}) {
    const gridRef = useRef(null);

    useEffect(() => {
        const handlePointerMove = (e) => {
            if (gridRef.current) {
                gridRef.current.style.setProperty("--x", `${e.clientX}px`);
                gridRef.current.style.setProperty("--y", `${e.clienty}px`);
                gridRef.current.style.setProperty("--x", `${e.clientX}px`);
            }
        }
    })
}