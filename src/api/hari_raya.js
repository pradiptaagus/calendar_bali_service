const express = require('express');
const router = express.Router();
const knex = require('../../connection');
const months = require('../static/months');
const datePrettier = require('../helper/date_prettier');
const checkMonthType = require('../helper/check_month_type');
const capitalize = require('../helper/capitalize');

router.get('/', (req, res) => {
    console.log(req.query);
    if (!req.query.day && !req.query.month && !req.query.year && !req.query.name) {
        console.log("masuk")
        knex.select('*')
            .from('kalender_hari_raya')
            .limit(3)
            .then(response => {
                res.json({
                    status: true,
                    data: response
                });
            });
    } 
    // Day + Month + Year + Name
    else if (req.query.day && req.query.month && req.query.year && req.query.name) {
        let dd = req.query.day;
        let mm = req.query.month
        let YYYY = req.query.year;
        let name = req.query.name;

        mm = checkMonthType(mm);
        const date = datePrettier(YYYY + '-' + mm + '-' + dd);

        knex.select('*').from('kalender_hari_raya')
            .where('nama_hari_raya', 'like', `%${name}%`)
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Hari raya ${req.query.name.split(' ').map((item) => capitalize(item)).join(' ')} Tanggal ${date} ditemukan.`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Hari raya ${req.query.name.split(' ').map((item) => capitalize(item)).join(' ')} Tanggal ${date} tidak ditemukan.`
                    });
                }
            });
    }
    // Day + Month + Year
    else if (req.query.day && req.query.month && req.query.year) {
        let dd = req.query.day;
        let mm = req.query.month;
        let YYYY = req.query.year;

        mm = checkMonthType(mm);
        const date = datePrettier(YYYY + '-' + mm + '-' + dd);

        knex.select('*').from('kalender_hari_raya')
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Tanggal ${date} adalah hari raya ${data.join(', ')}.`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Tanggal ${date} tidak ada hari raya.`
                    });
                }
            });
    } 
    // Name + Month + Year
    else if (req.query.name && req.query.month && req.query.year) {
        let name = req.query.name;
        let mm = req.query.month;
        let YYYY = req.query.year;
        mm = checkMonthType(mm);

        knex.select('*').from('kalender_hari_raya')
            .where('nama_hari_raya', 'like', `%${name}%`)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Hari raya ${name} bulan ${month} tahun ${YYYY} jatuh pada tanggal ${data.join(', ')}`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Hari raya ${name} bulan ${req.query.month} tahun ${YYYY} tidak ditemukan.`
                    });
                }                
            });
    }
    // Day + Month
    else if (req.query.day && req.query.month) {
        let dd = req.query.day;
        let mm = req.query.month;
        let YYYY = new Date().getFullYear();

        mm = checkMonthType(mm);
        const date = datePrettier(YYYY + '-' + mm + '-' + dd);

        knex.select('*').from('kalender_hari_raya')
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Tanggal ${date} adalah hari raya ${data.join(', ')}.`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Tanggal ${date} tidak ada hari raya.`
                    });
                }                
            });
    } 
    // Day + Year
    else if (req.query.day && req.query.year) {
        let dd = req.query.day;
        let mm = new Date().getMonth() + 1;
        console.log(mm)
        let YYYY = req.query.year;
        const date = datePrettier(YYYY + '-' + mm + '-' + dd);

        knex.select('*').from('kalender_hari_raya')
            .whereRaw('day(tanggal) = ?', dd)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Tanggal ${date} adalah hari raya ${data.join(', ')}`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Tanggal ${date} tidak ada hari raya.`
                    });
                }
            });
    }
    // Month + Year
    else if (req.query.month && req.query.year) {
        let mm = req.query.month;
        mm = checkMonthType(mm);
        let YYYY = req.query.year;        

        knex.select('*').from('kalender_hari_raya')
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Bulan ${months[mm]} Tahun ${YYYY} adalah hari raya ${data.join(', ')}.`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Bulan ${months[mm]} Tahun ${YYYY} tidak ada hari raya.`
                    });
                }
            });
    } 
    // Name + Month
    else if (req.query.name && req.query.month) {
        const date = new Date();
        let name = req.query.name;
        let mm = req.query.month;
        mm = checkMonthType(mm);
        let YYYY = date.getFullYear();

        knex.select('*').from('kalender_hari_raya')
            .where('nama_hari_raya', 'like', `%${name}%`)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach((element) => {
                        let date = element.tanggal;
                        date = datePrettier(date)
                        data.push(date);
                    });
                    res.json({
                        status: true,
                        message: `Hari raya ${req.query.name.split(' ').map((item) => (capitalize(item))).join(' ')} Bulan ${months[mm - 1]} Tahun ${YYYY} jatuh pada tanggal ${data.join(', ')}`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Hari raya ${req.query.name.split(' ').map((item) => (capitalize(item))).join(' ')} Bulan ${months[mm - 1]} Tahun ${YYYY} tidak ditemukan.`
                    })
                }
            });
    }
    // Name + Year
    else if (req.query.name && req.query.year) {
        const date = new Date();
        let name = req.query.name
        let mm = date.getMonth() + 1;
        let YYYY = req.query.year;

        knex.select('*').from('kalender_hari_raya')
            .where('nama_hari_raya', 'like', `%${name}%`)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach((element) => {
                        let date = element.tanggal;
                        date = datePrettier(date)
                        data.push(date);
                    });
                    res.json({
                        status: true,
                        message: `Dewasa ${req.query.name.split(' ').map((item) => (capitalize(item))).join(' ')} Bulan ${months[mm - 1]} Tahun ${YYYY} jatuh pada tanggal ${data.join(', ')}`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Dewasa ${req.query.name.split(' ').map((item) => (capitalize(item))).join(' ')} Bulan ${months[mm - 1]} Tahun ${YYYY} tidak ditemukan.`
                    })
                }
            });
    }
    // Name
    else if (req.query.name) {
        const date = new Date();
        let mm = date.getMonth() + 1;
        let YYYY = date.getFullYear();
        let name = req.query.name;

        knex.select('*').from('kalender_hari_raya')
            .where('nama_hari_raya', 'like', `%${name}%`)
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length >  0) {
                    let data = [];
                    response.forEach((element) => {
                        let date = datePrettier(element.tanggal)
                        data.push(date);
                    });
                    res.json({
                        status: true,
                        message: `Hari raya ${req.query.name.split(' ').map((item) => (capitalize(item))).join(' ')} Bulan ${months[mm - 1]} Tahun ${YYYY} jatuh pada tanggal ${data.join(', ')}.`
                    });

                } else {
                    res.json({
                        status: true,
                        message: `Hari raya ${req.query.name.split(' ').map((item) => (capitalize(item))).join(' ')} Bulan ${months[mm - 1]} Tahun ${YYYY} tidak ditemukan.`
                    });
                }
            });
    }
    // Month
    else if (req.query.month) {
        const date = new Date();
        let mm = req.query.month;
        mm = checkMonthType(mm);
        let YYYY = date.getFullYear();

        knex.select('*').from('kalender_hari_raya')
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach((element) => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Bulan ${months[mm]} Tahun ${YYYY} adalah hari raya ${data.join(', ')}.`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Bulan ${months[mm]} Tahun ${YYYY} tidak ada hari raya.`
                    });
                }
            });
    }
    // Year
    else if (req.query.year) {
        const date = new Date();
        let mm = date.getMonth() + 1;
        let YYYY = req.query.year;

        knex.select('*').from('kalender_hari_raya')
            .whereRaw('month(tanggal) = ?', mm)
            .whereRaw('year(tanggal) = ?', YYYY)
            .limit(3)
            .then(response => {
                if (response.length > 0) {
                    let data = [];
                    response.forEach(element => {
                        data.push(element.nama_hari_raya);
                    });
                    res.json({
                        status: true,
                        message: `Bulan ${months[mm - 1]} Tahun ${YYYY} adalah hari raya ${data.join(', ')}.`
                    });
                } else {
                    res.json({
                        status: true,
                        message: `Bulan ${months[mm - 1]} Tahun ${YYYY} tidak ada hari raya.`
                    })
                }
            });
    }    
});

module.exports = router;