const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model();

class KalenderHariRaya extends Model {}
KalenderHariRaya.init({
    id: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    id_kalender: {
        type: Sequelize.BIGINT,
    },
    tanggal: {
        type: Sequelize.DATE
    },
    bulan: {
        type: Sequelize.TINYINT,
    },
    tahun: {
        type: Sequelize.TINYINT
    },
    id_hari_raya: {
        type: Sequelize.INTEGER
    },
    nama_hari_raya: {
        type: Sequelize.nama_hari_raya
    },
}, {
    sequelize,
    modelName: 'kalender_hari_raya',
    freezeTableName: true
});
