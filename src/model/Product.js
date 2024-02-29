// module.exports.products = [{
//     id: 1456,
//     img: "https://m.media-amazon.com/images/I/41EzGyFJ2LL._SX300_SY300_QL70_FMwebp_.jpg",
//     title: "realme narzo 60 5G",
//     desc:"Processor: Intel Celeron N4020, 1.1 GHz base speed, Up to 2.8 GHz Turbo Speed, 2 cores, 2 Threads, 4MB Cache Memory & Storage: 4GB SO-DIMM DDR4 2400MHz RAM, Support up to 8GB using 1x SO-DIMM Slot with | Storage: 256GB M.2 NVMe PCIe SSD Graphics: Integrated Intel HD Graphics Display: 15.6-inch (39.62 cms), LED-Backlit LCD, HD (1366 x 768) 16:9, 220nits, NanoEdge bezel, Anti-Glare Plane with 45% NTSC, 82% Screen-To-Body Ratio Operating System: Pre-loaded Windows 11 Home with lifetime validity Design & battery: Up to 19.9mm Thin | NanoEdge Bezels | Thin and Light Laptop | Laptop weight: 1.8 kg | 37WHrs, 2-cell Li-ion battery | Up to 6 hours battery life ;Note: Battery life depends on conditions of usage Keyboard: Chiclet Keyboard with 1.4mm Key Travel",
//     price: "14999"
// },{
//     id: 1457,
//     img: "https://m.media-amazon.com/images/I/41tXf+ETfoL._SY300_SX300_.jpg",
//     title: "OnePlus 12R",
//     desc:"Processor: Intel Celeron N4020, 1.1 GHz base speed, Up to 2.8 GHz Turbo Speed, 2 cores, 2 Threads, 4MB Cache Memory & Storage: 4GB SO-DIMM DDR4 2400MHz RAM, Support up to 8GB using 1x SO-DIMM Slot with | Storage: 256GB M.2 NVMe PCIe SSD Graphics: Integrated Intel HD Graphics Display: 15.6-inch (39.62 cms), LED-Backlit LCD, HD (1366 x 768) 16:9, 220nits, NanoEdge bezel, Anti-Glare Plane with 45% NTSC, 82% Screen-To-Body Ratio Operating System: Pre-loaded Windows 11 Home with lifetime validity Design & battery: Up to 19.9mm Thin | NanoEdge Bezels | Thin and Light Laptop | Laptop weight: 1.8 kg | 37WHrs, 2-cell Li-ion battery | Up to 6 hours battery life ;Note: Battery life depends on conditions of usage Keyboard: Chiclet Keyboard with 1.4mm Key Travel",
//     price: '39999'
// },{
//     id: 1458,
//     img:"https://m.media-amazon.com/images/I/41rJ+ha25XL._SY300_SX300_.jpg",
//     title: "ASUS VivoBook 15",
//     desc:"Processor: Intel Celeron N4020, 1.1 GHz base speed, Up to 2.8 GHz Turbo Speed, 2 cores, 2 Threads, 4MB Cache Memory & Storage: 4GB SO-DIMM DDR4 2400MHz RAM, Support up to 8GB using 1x SO-DIMM Slot with | Storage: 256GB M.2 NVMe PCIe SSD Graphics: Integrated Intel HD Graphics Display: 15.6-inch (39.62 cms), LED-Backlit LCD, HD (1366 x 768) 16:9, 220nits, NanoEdge bezel, Anti-Glare Plane with 45% NTSC, 82% Screen-To-Body Ratio Operating System: Pre-loaded Windows 11 Home with lifetime validity Design & battery: Up to 19.9mm Thin | NanoEdge Bezels | Thin and Light Laptop | Laptop weight: 1.8 kg | 37WHrs, 2-cell Li-ion battery | Up to 6 hours battery life ;Note: Battery life depends on conditions of usage Keyboard: Chiclet Keyboard with 1.4mm Key Travel",
//     price: '45000'
// }
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        required : true
    },
    desc: {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    img : {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Product', productSchema)




