import React, { useState, useCallback, type FC } from 'react';
import FakeWindow from './FakeWindow'; 

interface AppConfig {
    id: string;
    title: string;
    url: string; 
    initial: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    isOpen: boolean;
    zIndex: number;
}

const initialApps: AppConfig[] = [
    {
        id: "geogebra",
        title: "GeoGebra",
        url: "https://www.geogebra.org/classic?lang=fr",
        initial: { width: 800, height: 600, top: 50, left: 50 },
        isOpen: true, 
        zIndex: 10,
    },
    {
        id: "stellarium",
        title: "Stellarium",
        url: "https://stellarium-web.org/",
        initial: { width: 900, height: 700, top: 100, left: 150 },
        isOpen: false, 
        zIndex: 9,
    },
    {
        id: "scratch",
        title: "Scratch",
        url: "https://scratch.mit.edu/projects/editor/",
        initial: { width: 750, height: 550, top: 150, left: 250 },
        isOpen: false,
        zIndex: 8,
    },

];

const Desktop: FC = () => {
    const [apps, setApps] = useState<AppConfig[]>(initialApps);
    const [maxZIndex, setMaxZIndex] = useState(11);

    const handleClose = useCallback((id: string) => {
        setApps(prevApps => 
            prevApps.map(app => 
                app.id === id ? { ...app, isOpen: false } : app
            )
        );
    }, []);
    
    const handleFocus = useCallback((id: string) => {
        setMaxZIndex(prev => prev + 1);
        const newZIndex = maxZIndex + 1;

        setApps(prevApps => 
            prevApps.map(app => 
                app.id === id ? { ...app, zIndex: newZIndex } : app
            )
        );
    }, [maxZIndex]);

    return (
        <div 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: 1 
            }}
        >
            {apps.map(app => 
                app.isOpen && (
                    <FakeWindow
                        key={app.id}
                        id={app.id}
                        title={app.title}
                        url={app.url} 
                        initialWidth={app.initial.width}
                        initialHeight={app.initial.height}
                        initialTop={app.initial.top}
                        initialLeft={app.initial.left}
                        onClose={handleClose}
                        onFocus={handleFocus}
                        zIndex={app.zIndex}
                    />
                )
            )}
        </div>
    );
};

export default Desktop;