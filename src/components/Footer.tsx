import { useEffect, useState, type FC } from "react";
import { 
    FiSearch, FiWifi, FiBluetooth, FiSquare, FiBattery, 
    FiSettings
} from "react-icons/fi";

interface DockApp {
    id: string;
    icon: React.ReactNode;
    isOpen: boolean;
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
            bottom: "90px",
            left: "30px",
            width: "580px",
            height: "520px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
            padding: "0",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
    >
        <div style={{
            padding: "20px",
            borderBottom: "1px solid #eee",
            background: "linear-gradient(to right, #f8f9fa, #ffffff)"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FiSearch size={20} color="#666" />
                <input
                    type="text"
                    placeholder="Search programs and files"
                    style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: "18px",
                        border: "2px solid #e0e0e0",
                        fontSize: "10px",
                        outline: "none",
                        background: "white",
                    }}
                />
            </div>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "20px", borderRight: "1px solid #eee" }}>
                <h3 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "14px", fontWeight: "600" }}>
                    open'ailleurs
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                        "Getting Started",
                        "Connect to a Projector",
                        "Calculator",
                        "Sticky Notes",
                        "Devices and Printers",
                        "Default Programs",
                        "Help and Support",
                    ].map((appName, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                border: "1px solid #eee",
                                background: "#fafafa",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f0f0f0";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fafafa";
                            }}
                        >
                            <span style={{ fontSize: "14px", color: "#333" }}>{appName}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                    <h3 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "13px", fontWeight: "600", opacity: 0.8 }}>
                        Pinned
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {[
                            "Edge",
                            "Word",
                            "Excel",
                            "PowerPoint",
                            "Outlook",
                            "Microsoft Store",
                        ].map((appName, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    border: "1px solid #eee",
                                    background: "#fafafa",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f0f0f0";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#fafafa";
                                }}
                            >
                                <span style={{ fontSize: "12px", color: "#333" }}>{appName}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "13px", fontWeight: "600", opacity: 0.8 }}>
                        Apps
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {[
                            "Settings",
                            "Xbox",
                            "Solitaire",
                            "Paint",
                            "LinkedIn",
                        ].map((appName, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    border: "1px solid #eee",
                                    background: "#fafafa",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f0f0f0";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#fafafa";
                                }}
                            >
                                <span style={{ fontSize: "12px", color: "#333" }}>{appName}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: "auto" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "13px", fontWeight: "600", opacity: 0.8 }}>
                        Recent
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {[
                            { name: "Victor Akala", action: "New message" },
                            { name: "Julio Pinto", action: "Miracast call" },
                            { name: "Krista Nowicka", action: "Miracast call" },
                            { name: "Momoko Fujito", action: "New message" },
                            { name: "Kayla Lewis", action: "New message" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    border: "1px solid #eee",
                                    background: "#fafafa",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f0f0f0";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#fafafa";
                                }}
                            >
                                <span style={{ fontSize: "12px", color: "#333" }}>{item.name}</span>
                                <span style={{ fontSize: "11px", color: "#666", opacity: 0.7 }}>{item.action}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
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
                        gap: "12px",
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
                        Search programs and files
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
                        gap: "20px",
                        position: "relative",
                        padding: "8px 15px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "15px",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FiWifi
                            size={18}
                            color={isWifiOn ? "#4CAF50" : "#666"}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                        />
                        <span style={{ fontSize: "12px", color: "black", opacity: 0.8 }}>
                            {isWifiOn ? "Connected" : "Offline"}
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FiBluetooth
                            size={18}
                            color={isBluetoothOn ? "#4CAF50" : "#666"}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                        />
                        <span style={{ fontSize: "12px", color: "black", opacity: 0.8 }}>
                            {isBluetoothOn ? "On" : "Off"}
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FiBattery size={18} color="black" />
                        <span style={{ fontSize: "12px", color: "black", opacity: 0.8 }}>
                            {batteryLevel}%
                        </span>
                    </div>

                    <FiSettings
                        size={18}
                        color="black"
                        onClick={() => {
                            setShowStatusMenu(!showStatusMenu);
                            setShowLauncher(false);
                        }}
                        style={{ cursor: "pointer", opacity: 0.8 }}
                    />

                    {showStatusMenu && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "90px",
                                right: "0px",
                                width: "300px",
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(20px)",
                                borderRadius: "15px",
                                padding: "20px",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                zIndex: 200,
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h3 style={{ margin: 0, fontSize: "16px", color: "#333", fontWeight: "600" }}>
                                    Network & System
                                </h3>
                                <span style={{ fontSize: "12px", color: "#666", opacity: 0.7 }}>
                                    open'ailleurs
                                </span>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <FiWifi size={20} color={isWifiOn ? "#4CAF50" : "#666"} />
                                        <div>
                                            <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>Wi-Fi</div>
                                            <div style={{ fontSize: "12px", color: "#666", opacity: 0.7 }}>
                                                {isWifiOn ? "Connected to HomeNetwork" : "Not connected"}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsWifiOn(!isWifiOn)}
                                        style={{
                                            background: isWifiOn ? "#4CAF50" : "#f5f5f5",
                                            color: isWifiOn ? "white" : "#666",
                                            border: `1px solid ${isWifiOn ? "#4CAF50" : "#ddd"}`,
                                            padding: "6px 15px",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {isWifiOn ? "Connected" : "Connect"}
                                    </button>
                                </div>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <FiBluetooth size={20} color={isBluetoothOn ? "#4CAF50" : "#666"} />
                                        <div>
                                            <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>Bluetooth</div>
                                            <div style={{ fontSize: "12px", color: "#666", opacity: 0.7 }}>
                                                {isBluetoothOn ? "Paired devices available" : "Turn on to pair"}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                                        style={{
                                            background: isBluetoothOn ? "#4CAF50" : "#f5f5f5",
                                            color: isBluetoothOn ? "white" : "#666",
                                            border: `1px solid ${isBluetoothOn ? "#4CAF50" : "#ddd"}`,
                                            padding: "6px 15px",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {isBluetoothOn ? "On" : "Off"}
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                paddingTop: "15px",
                                borderTop: "1px solid #eee",
                                display: "flex",
                                alignItems: "center",
                                gap: "15px"
                            }}>
                                <FiBattery size={24} color="#4CAF50" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>Battery</span>
                                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>{batteryLevel}%</span>
                                    </div>
                                    <div style={{
                                        width: "100%",
                                        height: "6px",
                                        background: "#eee",
                                        borderRadius: "3px",
                                        overflow: "hidden"
                                    }}>
                                        <div style={{
                                            width: `${batteryLevel}%`,
                                            height: "100%",
                                            background: batteryLevel > 20 ? "#4CAF50" : "#f44336",
                                            borderRadius: "3px"
                                        }} />
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#666", marginTop: "5px", opacity: 0.7 }}>
                                        {batteryLevel > 80 ? "Fully charged" : batteryLevel > 20 ? "Good battery life" : "Low battery"}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                                <div style={{ fontSize: "12px", color: "#666", opacity: 0.7, marginBottom: "10px" }}>
                                    System Information
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                                    <div>
                                        <div style={{ color: "#999" }}>OS Version</div>
                                        <div style={{ color: "#333", fontWeight: "500" }}>open'ailleurs</div>
                                    </div>
                                    <div>
                                        <div style={{ color: "#999" }}>Last Update</div>
                                        <div style={{ color: "#333", fontWeight: "500" }}>2 days ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer;