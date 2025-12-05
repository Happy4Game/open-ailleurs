import { useState, useEffect, type FC } from "react";
import { FiBell } from "react-icons/fi";



const Header: FC = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        setCurrentDateTime(new Date());

        const now = new Date();
        const secondsUntilNextMinute = (60 - now.getSeconds()) * 1000;

        const timeoutId = setTimeout(() => {
            setCurrentDateTime(new Date());

            const intervalId = setInterval(() => {
                setCurrentDateTime(new Date());
            }, 60000);   
            return () => clearInterval(intervalId);
        }, secondsUntilNextMinute);
        
        return () => clearTimeout(timeoutId);
    }, []);
    
    return (
        <div 
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "40px",
                backgroundColor: "rgba(50, 50, 50, 0.4)", 
                backdropFilter: "blur(5px)",
                color: "white", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", 
                padding: "0 20px",
                zIndex: 10, 
            }}
        >
            <div style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9 }}>
                Open'ailleurs
            </div>

            <div 
                style={{
                    position: "absolute", 
                    left: "50%",
                    transform: "translateX(-50%)", 
                    
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "500",
                }}
            >
                <div 
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px", 
                    }}
                >
                    <span>
                        {currentDateTime.toLocaleDateString("fr-FR", { month: "short", day: "numeric" })
                            .replace(" ", ". ").replace(/\.$/, "")}
                    </span>

                    <span style={{ opacity: 0.9 }}>
                        {currentDateTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                </div>

                <div 
                    style={{ 
                        marginLeft: "15px",
                        display: "flex", 
                        alignItems: "center", 
                        cursor: "pointer",
                    }}
                >
                    <FiBell size={18} color="white" style ={{ opacity: 0.9 }}/>
                </div>
            </div>

            <div></div> 

        </div>
    );
};

export default Header;