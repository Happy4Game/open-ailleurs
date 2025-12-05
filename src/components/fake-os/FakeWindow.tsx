import { useState, useRef, type FC, useEffect, useCallback } from "react";
import { FiMinimize2, FiMaximize2, FiX } from "react-icons/fi";

interface FakeWindowProps {
    id: string;
    title: string;
    url?: string;
    initialWidth: number;
    initialHeight: number;
    initialTop: number;
    initialLeft: number;
    onClose: (id: string) => void;
    onFocus: (id: string) => void;
    zIndex: number;
    children?: React.ReactNode;
}

const FakeWindow: FC<FakeWindowProps> = ({
    id,
    title,
    url,
    initialWidth,
    initialHeight,
    initialTop,
    initialLeft,
    onClose,
    onFocus,
    zIndex,
    children,
}) => {
    const [position, setPosition] = useState({ top: initialTop, left: initialLeft });
    const [size] = useState({ width: initialWidth, height: initialHeight });
    const [isMaximized, setIsMaximized] = useState(false);
    
    const windowRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return;

        const target = e.target as HTMLElement;
        const isControl = target.closest('.window-controls');
        if (isControl) return; 

        onFocus(id);
        isDragging.current = true;
        const rect = windowRef.current!.getBoundingClientRect();
        
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        
        let newLeft = e.clientX - offset.current.x;
        let newTop = e.clientY - offset.current.y;

        const bodyWidth = window.innerWidth;
        const bodyHeight = window.innerHeight;
        const currentWidth = size.width;
        const currentHeight = size.height;

        newLeft = Math.max(0, Math.min(newLeft, bodyWidth - currentWidth));
        newTop = Math.max(0, Math.min(newTop, bodyHeight - currentHeight));

        setPosition({ top: newTop, left: newLeft });
    }, [size.width, size.height]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const windowStyle: React.CSSProperties = isMaximized 
        ? {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
            border: 'none', 
        }
        : {
            top: position.top,
            left: position.left,
            width: size.width,
            height: size.height,
            borderRadius: '10px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
        };

    return (
        <div 
            ref={windowRef}
            style={{
                ...windowStyle,
                position: "absolute",
                backgroundColor: "white",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                zIndex: zIndex,
                minWidth: 300,
                minHeight: 200,
            }}
            onMouseDown={() => onFocus(id)}
        >
            <div 
                onMouseDown={handleMouseDown}
                onDoubleClick={toggleMaximize}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: "#f0f0f0",
                    cursor: isMaximized ? 'default' : 'grab',
                    borderBottom: '1px solid #ccc',
                    userSelect: 'none',
                }}
            >
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {title}
                </span>
                
                <div className="window-controls" style={{ display: "flex", gap: "8px" }}>
                    <FiMinimize2 
                        size={18} 
                        color="#777" 
                        style={{ cursor: "pointer" }}
                        onClick={() => onClose(id)}
                    />
                    <div onClick={toggleMaximize} style={{ display: 'flex', cursor: 'pointer' }}>
                        {isMaximized ? (
                            <FiMinimize2 size={18} color="#777" />
                        ) : (
                            <FiMaximize2 size={18} color="#777" />
                        )}
                    </div>
                    <FiX 
                        size={18} 
                        color="#d9534f"
                        style={{ cursor: "pointer" }}
                        onClick={() => onClose(id)}
                    />
                </div>
            </div>

            {/* render children if fourni, sinon iframe (comportement précédent) */}
            <div style={{ flexGrow: 1, overflow: "hidden", padding: "10px" }}>
                {children ? (
                    <div style={{ width: '800px', height: '600px' }}>
                        {children}
                    </div>
                ) : (
                    <iframe
                        src={url}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title={title}
                        allowFullScreen
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                )}
            </div>
        </div>
    );
};

export default FakeWindow;