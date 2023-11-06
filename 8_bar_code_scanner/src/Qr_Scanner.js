// React function to read the input from both QR Scanner and KeyBoard
import React, {
  useEffect,
  useState,
} from 'react';

const BarcodeScanner = () => {
    const [scannedData, setScannedData] = useState("");
    const [storedData, setStoredData] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setScannedData("");
        } else {
            setScannedData((prevData) => prevData + event.key);
        }
    };

    useEffect(() => {
        const storedDataHandleKeyDown = (event) => {
            console.log("storedDataHandleKeyDown :- ", event);
            if (event.key === "Enter" || event.type.toLowerCase() === "click")
                console.log("storedData is here", storedData);
        };
        window.addEventListener("keydown", storedDataHandleKeyDown);

        return () => {
            window.removeEventListener("keydown", storedDataHandleKeyDown);
        };
    }, [storedData]);

    useEffect(() => {
        if (scannedData !== "") {
            setStoredData(scannedData);
        }
    }, [scannedData]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keydown", handleOnClickData);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keydown", handleOnClickData);
        };
    }, []);

    const handleOnClickData = (event) => {
        if (event.key === "Enter" || event.type.toLowerCase() === "click") {
            setScannedData("");
            console.log("inside Enter storedData :- ", storedData);
        }
    };

    return (
        <div>
            <h1>Barcode Scanner</h1>
            <p>Scanned Data: {scannedData}</p>
            <p>Stored Data: {storedData}</p>

            <button onClick={handleOnClickData}>click</button>
        </div>
    );
};

export default BarcodeScanner;
