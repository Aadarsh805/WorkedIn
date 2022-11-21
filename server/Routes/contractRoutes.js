const express = require('express');
const contractController = require('../Controllers/contractController')
const { protect } = require('../Controllers/authController')

const router = express.Router();

router.use(protect)

router
    .route('/')
    .get(contractController.getContract)
    .post(contractController.initializeContract)


router
    .route('/:contractId')
    .patch(contractController.acceptContract)
    .patch(contractController.denyContract)
    .patch(contractController.updateContract)


module.exports = router;

// create a contract --> groupchatID, 
// view one contracts of user
// update contract --> can only update due date, responsibilities

//  Routes --> 
// 1) Initialize contract
// 2) Accept Contract
// 3) Deny Contract
// 4) Update Contract
// 5) Get Contract (notification) 