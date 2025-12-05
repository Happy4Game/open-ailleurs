import { useEffect, useState, type FC } from "react";
import { FiSearch, FiWifi, FiBluetooth, FiSquare } from "react-icons/fi";

interface DockApp {
    id : string;
    icon : React.ReactNode;
    isOpen : boolean;
}


const Footer: FC = () => {
    const [mouseX, setMouseX] = useState<number | null>(null);
    const [apps, setApps] = useState<DockApp[]>([
        {
            id: "windows",
            icon: <FiSquare size={28} color="black" />,
            isOpen: false,
        }
    ]);

    const [showWifiMenu, setShowWifiMenu] = useState(false);
    const [showBluetoothMenu, setShowBluetoothMenu] = useState(false);
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);    
    }, []);
    
    const toggleApp = (id: string) => {
        setApps((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, isOpen: !app.isOpen } : app
            )
        );
    };

    const calculateScale = (iconIndex: number) => {
        if (mouseX === null) return 1;

        const baseX = 100 + iconIndex * 70;
        const distance = Math.abs(mouseX - baseX);

        const maxDistance = 140;
        const scale = Math.max(1, 1.8 - distance / maxDistance);

        return scale;
    };
    
    return (
        <div 
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "80px",
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                backdropFilter: "blur(10px)", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 40px",
                borderTop: "1px solid rgba(255, 255, 255, 0.5)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap : "12px" }}>
                    <div
                        style= {{
                            width: "130px",
                            height: "16px",
                            borderRadius: "20px",
                            background: "#ddd"
                        }}
                    />
                    <FiSearch size={22} color="black" />
                </div>
            <div 
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "40px",
                    position: "relative",
                }}
            >
                {apps.map((app, index) => (
                    <div
                        key={app.id}
                        onClick={() => toggleApp(app.id)}
                        style={{
                            cursor: "pointer",
                            position: "relative",
                            transform: `scale(${calculateScale(index)})`,
                            transition: "transform 0.15s ease-out",
                            filter: "drop-shadow(0 0 5px rgba(0,0,0,0.2))",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.filter = 
                                "drop-shadow(0 0 10px rgba(255,255,255,0.7))";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.filter =
                                "drop-shadow(0 0 5px rgba(0,0,0,0.2))";
                        }}
                    >
                        {app.icon}

                        {app.isOpen && (
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "-6px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap : "20px" }}>

                <div style={{ position: "relative" }}>
                    <FiWifi 
                        size={24}
                        color="black"
                        onClick={() => setShowWifiMenu((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />
                    {showWifiMenu && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "40px",
                                right: 0,
                                background: "white",
                                padding: "10px 15px",
                                borderRadius: "6px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                        >
                            <p style={{ margin: 0 }}>Wi-Fi</p>
                            <button>Activer/Desactiver</button>
                        </div>
                    )}
                </div>

                <div style={{ position: "relative" }}>
                    <FiBluetooth 
                        size={24}
                        color="black"
                        onClick={() => setShowBluetoothMenu((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />  
                    {showBluetoothMenu && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "40px",
                                right: 0,
                                background: "white",
                                padding: "10px 15px",
                                borderRadius: "6px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                        >
                            <p style={{ margin: 0 }}>Bluetooth</p>
                            <button>Activer/Desactiver</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer;