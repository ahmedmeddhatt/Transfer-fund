const express = require('express');
const router = express.Router();
const transfer = require('../controller/transferController');


router.route('/')
.get(transfer.getAllAcc)
// .post(transfer.addAccount);

router.route('/transaction')
.post(transfer.addFund);

router.route('/:acc')
.get(transfer.getMyAcc)
.patch(transfer.updateAcc)
.delete(transfer.deleteAcc);



router.route('/check-balance/:acc')
.get(transfer.checkBalance);

module.exports = router;