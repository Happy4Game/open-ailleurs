import { useEffect, useState, type FC } from "react";
import { FiSearch, FiWifi, FiBluetooth, FiSquare, FiBattery, FiSettings } from "react-icons/fi";

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

    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [isWifiOn, setIsWifiOn] = useState(true);
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const [batteryLevel] = useState(78);
    const [showLauncher, setShowLauncher] = useState(false); 
    
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
        <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 99 }}>
            
            {showLauncher && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "80px", 
                        left: "40px", 
                        width: "350px", 
                        height: "400px", 
                        background: "white",
                        borderRadius: "10px",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                        padding: "20px",
                        zIndex: 100, 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <input 
                        type="text"
                        placeholder="Rechercher des applications, des fichiers..."
                        style={{
                            width: "90%",
                            padding: "10px",
                            marginBottom: "15px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                        }}
                    />
                    <p style={{ margin: 0, color: "#555" }}>Résultats récents / Applications</p>
                </div>
            )}
            
            <div 
                style={{
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
                <div 
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap : "12px",
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        padding: "8px 12px",
                        borderRadius: "20px",
                        border: "1px solid transparent",
                    }}
                    onClick={() => {
                        setShowLauncher(!showLauncher);
                        setShowStatusMenu(false); 
                    }}
                >
                    <div style={{ color: "black", opacity: 0.7, minWidth: "120px" }}>
                        Rechercher...
                    </div>
                    <FiSearch size={22} color="black" style={{ opacity: 0.7 }} />
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
            
            <div 
                style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "25px", 
                    position: "relative",
                }}
            >
                <FiWifi 
                    size={22} 
                    color={isWifiOn ? "black" : "gray"}
                    style={{ cursor: "pointer" }}
                />
                <FiBluetooth 
                    size={22} 
                    color={isBluetoothOn ? "black" : "gray"}
                    style={{ cursor: "pointer" }}
                />
                
                <div 
                    onClick={() => setShowStatusMenu((prev) => !prev)}
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "4px", 
                        fontSize: "14px", 
                        fontWeight: "500",
                        cursor: "pointer",
                        paddingBottom: "1px", 
                    }}
                >
                    <FiBattery size={20} color="black" /> 
                    <span style={{ color: "black", marginRight: "4px" }}>{batteryLevel}%</span>
                </div>

                <FiSettings 
                    size={22} 
                    color="black"
                    onClick={() => {
                        setShowStatusMenu((prev) => !prev);
                        setShowLauncher(false); 
                    }}
                    style={{ cursor: "pointer", opacity: 0.8 }}
                />

                {showStatusMenu && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "90px", 
                            right: 0,
                            background: "white",
                            padding: "15px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                            width: "250px",
                            zIndex: 100, 
                        }}
                    >
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Paramètres Rapides</h4>
                        
                        {/* Contrôle Wi-Fi */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span>Wi-Fi (MonRéseau)</span>
                            <button onClick={() => setIsWifiOn(!isWifiOn)} style={{ padding: "5px 10px", background: isWifiOn ? "#4CAF50" : "#f44336", color: "white", border: "none", borderRadius: "4px" }}>
                                {isWifiOn ? "Activé" : "Désactivé"}
                            </button>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span>Bluetooth</span>
                            <button onClick={() => setIsBluetoothOn(!isBluetoothOn)} style={{ padding: "5px 10px", background: isBluetoothOn ? "#4CAF50" : "#f44336", color: "white", border: "none", borderRadius: "4px" }}>
                                {isBluetoothOn ? "Activé" : "Désactivé"}
                            </button>
                        </div>

                        <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #eee", display: "flex", alignItems: "center" }}>
                            <FiBattery size={20} style={{ marginRight: "8px" }}/>
                            <span>Batterie: **{batteryLevel}%**</span>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Footer;