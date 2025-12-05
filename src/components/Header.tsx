import { useState, useEffect, type FC } from "react";
import { FiBell } from "react-icons/fi";



const Header: FC = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        setCurrentDateTime(new Date());

        const now = new Date();
        const secondsUntilNextMinute = 60 - now.getSeconds() * 1000;

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
                background: "transparent", 
                color: "black", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",    
                padding: "0 20px",
                zIndex: 10, 
            }}
        >
            <div style={{ fontSize: "14px", fontWeight: "500", opacity: 0.8 }}>
                Open'ailleurs
            </div>

            <div 
                style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
            <span>
                    {currentDateTime.toLocaleDateString("fr-FR", { month: "short", day: "numeric" })
                        .replace(" ", ". ").replace(/\.$/, "")}
                </span>

                <span style={{ opacity: 0.7 }}>
                    {currentDateTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
            </div>


            <div 
                style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px", 
                    cursor: "pointer" 
                }}
            >
                <FiBell size={18} color="black" style ={{ opacity: 0.7 }}/>
                </div>
            </div>
    );
};

export default Header;