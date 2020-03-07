const express = require('express');
const router = express.Router();
const knex = require('../connection');
const months = require('../static/months');
const datePrettier = require('../helper/date_prettier');
const checkMonthType = require('../helper/check_month_type');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next();
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next();
});

router.get('/', (req, res) => {
    if (!req.query.tanggal && !req.query.bulan && !req.query.tahun && !req.query.nama) {
        knex.select('*').from('kalender_dewasa')
            .then(response => {
            res.json(response);
        });
    } else if (req.query.tanggal && req.query.bulan && req.query.tahun) {
        let dd = req.query.tanggal;
        let mm = req.query.bulan;
        let YYYY = req.query.tahun;
        
        mm = checkMonthType(mm);
        date = datePrettier('' + YYYY + '-' + mm + '-' + dd + '');

        knex.select('*').from('kalender_dewasa')
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_dewasa);
                    });
                    let result = `Tanggal ${date} adalah dewasa ${data.join()}`
                    res.json({
                        status: true,
                        message: result
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Tanggal ${date} tidak ada dewasa`
                    })
                }
            })
    } else if (req.query.tanggal && req.query.bulan) {
        let dd = req.query.tanggal;
        let mm = req.query.bulan;
        let YYYY = new Date().getFullYear();

        mm = checkMonthType(mm);
        date = datePrettier('' + YYYY + '-' + mm + '-' + dd + '');

        knex.select('*').from('kalender_dewasa')
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('month(tanggal) = ?', mm)
            .then(response => {
                let data = [];
                response.forEach(element => {
                    data.push(element.nama_dewasa);
                });
                let result = `Tanggal ${date} adalah dewasa ${data.join()}`
                res.json({
                    status: true,
                    message: result
                });
        });
    } else if (req.query.bulan && req.query.tahun) {
        let mm = req.query.bulan;
        let YYYY = req.query.tahun;

        mm = checkMonthType(mm);

        knex.select('*').from('kalender_dewasa')
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .then(response => {
                let data = [];
                response.forEach(element => {
                    data.push(element.nama_hari_raya);
                });
                let result = `Bulan ${months[mm]} tahun ${YYYY} adalah dewasa ${data.join()}`
                res.json({
                    status: true,
                    message: result
                });
            })
    } else if (req.query.tanggal && req.query.tahun) {
        let dd = req.query.tanggal;
        let YYYY = req.query.tahun;

        knex.select('*').from('kalender_dewasa')
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('year(tanggal) = ?', YYYY)
            .then(response => {
                let data = [];
                response.forEach(element => {
                    data.push(element.nama_dewasa);
                });
                let result = `Tanggal ${dd} tahun ${YYYY} adalah dewasa ${data.join()}`
                res.json({
                    status: true,
                    message: result
                }); 
            })
    } else if (req.query.tanggal) {
        let dd = req.query.tanggal;

        knex.select('*').from('kalender_dewasa')
            .whereRaw('day(tanggal) = ?', dd)
            .then(response => {
                let data = [];
                response.forEach(element => {
                    data.push(element.nama_dewasa);
                });
                let result = `Tanggal ${dd} adalah dewasa ${data.join()}`
                res.json({
                    status: true,
                    message: result
                });
        });
    } else if (req.query.nama) {
        knex.select('*').from('kalender_dewasa')
            .where('nama_dewasa', 'like', '%'+ req.query.nama +'%').then(response => {
                let data = [];
                response.forEach((element) => {
                    let date = element.tanggal;
                    date = datePrettier(date)
                    data.push(date);
                });
                let result = `Hari raya ${req.query.nama} jatuh pada tanggal ${data.join()}`
                res.json({
                    status: true,
                    message: result
                });
        });
    }
});

module.exports = router;