const express = require('express')
const router = express.Router()
const axios = require("axios")
const CryptoData = require('../models/cryptoDataSchema')
const moment = require('moment')
require('moment-timezone')

router.get('/',(req,res)=>{
    const baseUnit = "btc"
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData, unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})

router.get('/eth',(req,res)=>
{
    const baseUnit = "eth"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})
router.get('/usdt',(req,res)=>
{
    const baseUnit = "usdt"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})

router.get('/trx',(req,res)=>
{
    const baseUnit = "trx"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})

router.get('/xrp',(req,res)=>
{
    const baseUnit = "xrp"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})
router.get('/dash',(req,res)=>
{
    const baseUnit = "dash"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})
router.get('/zec',(req,res)=>
{
    const baseUnit = "zec"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})
router.get('/xem',(req,res)=>
{
    const baseUnit = "xem"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})
router.get('/iost',(req,res)=>
{
    const baseUnit = "iost"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})
router.get('/win',(req,res)=>
{
    const baseUnit = "win"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})

router.get('/wrx',(req,res)=>
{
    const baseUnit = "wrx"; // Change this to the desired base_unit
    fetchDataByBaseUnit(baseUnit)
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');
    });

})



router.get('/telegram' , (req , res)=>{
    res.render("../views/telegram.ejs")
    // router code here
})

const fetchDataByBaseUnit = async (baseUnit) => {
    try {
        // fetching the data
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers')
        const res_data = await response.data

        // slice the top 10 results
        const result = Object.values(res_data).slice(0,10)

        // creating an array of Data Model instance
        const cryptoDataArray = result.map((data) => new CryptoData(data))

        // store the data in DB collection
        await CryptoData.insertMany(cryptoDataArray)

        // process the data

        var storedData = await CryptoData.find({ "base_unit": baseUnit }).sort({ _id: -1 }).limit(10)

        storedData.reverse()

        const processedData = []

        storedData.forEach((data) => {
            var { base_unit, name, buy, sell, volume, open, low, high, last } = data;

            const timestamp = moment.utc(data.at * 1000)
            const tradeTime = timestamp.tz('Asia/Kolkata').format('DD/MM/YYYY [at] h:mm A')

            base_unit = base_unit.toUpperCase()
            // Create an object containing the processed data for each base unit
            const processedDoc = {
                baseUnit: base_unit,
                name: name,
                buy: buy,
                sell: sell,
                volume: volume,
                open: open,
                low: low,
                high: high,
                last: last,
                tradeTime: tradeTime,
            }

            processedData.push(processedDoc)
        })

        CryptoData.deleteMany({})

        return processedData;
    } catch (err) {
        console.log(err.message)
        throw new Error('Internal error fetching and storing data');
    }
}

// Example usage:



module.exports = router