import { useState } from 'react';
import './FakeOs.css';
import linux from '../../assets/linux.png';
import libreoffice from '../../assets/appLogos/libreoffice.png';
import libreofficePage from '../../assets/fakepage/libreoffice_page.png';
import scratch from '../../assets/appLogos/scratch.png';
import qrprint from '../../assets/appLogos/QRPrint.png';
import blender from '../../assets/appLogos/blender.png';
import vlc from '../../assets/appLogos/vlc.png';
import git from '../../assets/appLogos/git.png';
import geogebra from '../../assets/appLogos/geogebra.png';
import stellarium from '../../assets/appLogos/stellarium.png';
import Footer from '../Footer';
import Header from '../Header';
import FakeWindow from './FakeWindow'; 

interface AppConfig {
    id: string;
    title: string;
    url?: string;
    isOpen: boolean;
    zIndex: number;
}

function FakeOS() {
    const [apps, setApps] = useState<AppConfig[]>([
        {
            id: "geogebra",
            title: "GeoGebra",
            url: "https://www.geogebra.org/classic?lang=fr",
            isOpen: false,
            zIndex: 10,
        },
        {
            id: "stellarium",
            title: "Stellarium",
            url: "https://stellarium-web.org/",
            isOpen: false,
            zIndex: 9,
        },
        {
            id: "scratch",
            title: "Scratch",
            url: "https://scratch.mit.edu/projects/editor/?tutorial=getStarted",
            isOpen: false,
            zIndex: 8,
        },
        {
            id: "libreoffice",
            title: "LibreOffice",
            url: undefined,
            isOpen: false,
            zIndex: 7,
        },
        {
            id: "blender",
            title: "Blender",
            url: "https://www.blender.org/",
            isOpen: false,
            zIndex: 6,
        },
        {
            id: "vlc",
            title: "VLC Media Player",
            url: "https://www.videolan.org/vlc/",
            isOpen: false,
            zIndex: 5,
        },
        {
            id: "git",
            title: "Git",
            url: "https://git-scm.com/",
            isOpen: false,
            zIndex: 4,
        },
        {
            id: "qrprint",
            title: "QRPrint",
            url: "https://qrprint.forge.apps.education.fr/app/",
            isOpen: false,
            zIndex: 3,
        },
    ]);

    const [maxZIndex, setMaxZIndex] = useState(11);
    const [libreText, setLibreText] = useState('');

    const handleAppClick = (appId: string) => {
        setMaxZIndex(prev => prev + 1);
        const newZIndex = maxZIndex + 1;
        
        setApps(prevApps => 
            prevApps.map(app => 
                app.id === appId 
                    ? { ...app, isOpen: true, zIndex: newZIndex } 
                    : app
            )
        );
    };

    const handleCloseWindow = (appId: string) => {
        setApps(prevApps => 
            prevApps.map(app => 
                app.id === appId ? { ...app, isOpen: false } : app
            )
        );
    };

    const handleFocusWindow = (appId: string) => {
        setMaxZIndex(prev => prev + 1);
        const newZIndex = maxZIndex + 1;
        
        setApps(prevApps => 
            prevApps.map(app => 
                app.id === appId ? { ...app, zIndex: newZIndex } : app
            )
        );
    };

    const getInitialPosition = (index: number) => {
        const positions = [
            { top: 50, left: 50 },
            { top: 100, left: 150 },
            { top: 150, left: 250 },
            { top: 80, left: 80 },
            { top: 120, left: 200 },
            { top: 100, left: 100 },
            { top: 130, left: 180 },
            { top: 90, left: 120 },
        ];
        return positions[index % positions.length];
    };

    return (
        <>
            <Header />
            <div className='fakeos-body'>
                <img className='linux-img' src={linux} alt="Image de fond" />
                
                {apps.map((app, index) => 
                    app.isOpen && (
                       
                        app.id === 'libreoffice' ? (
                            <FakeWindow
                                key={app.id}
                                id={app.id}
                                title={app.title}
                                initialWidth={800}
                                initialHeight={600}
                                initialTop={getInitialPosition(index).top}
                                initialLeft={getInitialPosition(index).left}
                                onClose={handleCloseWindow}
                                onFocus={handleFocusWindow}
                                zIndex={app.zIndex}
                            >
                                {/* contenu: image de page + textarea 'caché' */}
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <img src={libreofficePage} alt="LibreOffice page" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    
                                    <textarea
                                        value={libreText}
                                        onChange={(e) => setLibreText(e.target.value)}
                                        placeholder="Commencez à écrire..."
                                        style={{
                                            position: 'absolute',
                                            top: '170px',
                                            left: '150px',
                                            width: 'calc(100% - 350px)',
                                            height: 'calc(100% - 150px)',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            resize: 'none',
                                            color: 'rgba(0,0,0,0.95)',
                                            fontSize: 16,
                                            fontFamily: 'serif',
                                            lineHeight: 1.5,
                                            
                                        }}
                                    />
                                </div>
                            </FakeWindow>
                        ) : (
                            <FakeWindow
                                key={app.id}
                                id={app.id}
                                title={app.title}
                                url={app.url}
                                initialWidth={800}
                                initialHeight={600}
                                initialTop={getInitialPosition(index).top}
                                initialLeft={getInitialPosition(index).left}
                                onClose={handleCloseWindow}
                                onFocus={handleFocusWindow}
                                zIndex={app.zIndex}
                            />
                        )
                    )
                )}
                
                <div className='list-app-row'>
                    <div onClick={() => handleAppClick('libreoffice')} style={{ cursor: 'pointer' }}>
                        <img src={libreoffice} alt="Libreoffice" />
                        <p>Libreoffice</p>
                    </div>
                    <div onClick={() => handleAppClick('scratch')} style={{ cursor: 'pointer' }}>
                        <img src={scratch} alt="Scratch" />
                        <p>Scratch</p>
                    </div>
                    <div onClick={() => handleAppClick('qrprint')} style={{ cursor: 'pointer' }}>
                        <img src={qrprint} alt="QRPrint" />
                        <p>QRPrint</p>
                    </div>
                </div>
                <div className='list-app-row'>
                    <div onClick={() => handleAppClick('blender')} style={{ cursor: 'pointer' }}>
                        <img src={blender} alt="Blender" />
                        <p>Blender</p>
                    </div>
                    <div onClick={() => handleAppClick('vlc')} style={{ cursor: 'pointer' }}>
                        <img src={vlc} alt="VLC" />
                        <p>VLC</p>
                    </div>
                </div>
                <div className='list-app-row'></div>
                <div className='list-app-row'>
                    <div onClick={() => handleAppClick('git')} style={{ cursor: 'pointer' }}>
                        <img src={git} alt="git" />
                        <p>Git</p>
                    </div>
                    <div onClick={() => handleAppClick('geogebra')} style={{ cursor: 'pointer' }}>
                        <img src={geogebra} alt="GeoGebra" />
                        <p>GeoGebra</p>
                    </div>
                    <div onClick={() => handleAppClick('stellarium')} style={{ cursor: 'pointer' }}>
                        <img src={stellarium} alt="Stellarium" />
                        <p>Stellarium</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FakeOS;