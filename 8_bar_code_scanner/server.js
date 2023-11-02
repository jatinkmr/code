const HID = require('node-hid')
const devices = HID.devices()

// Initialize the barcode scanner device.
const deviceList = JSON.stringify(devices)
console.log(`deviceList :- ${deviceList}`)


// Find the VID (Vendor ID) and PID (Product ID) of your FM3080 barcode scanner.
// You can use a tool like `lsusb` on Linux or `USBView` on Windows to identify these values.

const VID = 16700; // Replace with the actual Vendor ID of your scanner.
const PID = 8467; // Replace with the actual Product ID of your scanner.

const scannerDevice = devices.find((device) => {
    return device.vendorId === VID && device.productId === PID;
});

console.log('scannerDevice', scannerDevice);

if (!scannerDevice) {
    console.error('Barcode scanner not found. Make sure it is connected and the VID/PID are correct.');
    process.exit(1);
}

const scanner = new HID.HID(scannerDevice.path);
console.log('scanner :- ', scanner)

let barcodeData = ''; // Store barcode data.

// Listen for data from the HID device (keyboard input).
scanner.on('data', (data) => {
    data.forEach((charCode) => {
        if (charCode === 13) { // ASCII code for Enter key (end of barcode)
            console.log('Scanned Barcode:', barcodeData);
            barcodeData = ''; // Clear the stored data for the next scan.
        } else {
            barcodeData += String.fromCharCode(charCode);
        }
    });
});

console.log(`barcodeData :- ${barcodeData}`)
