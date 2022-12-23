const express = require('express');
const contractController = require('../controllers/contractController')
const { protect } = require('../controllers/authController')

const router = express.Router();

router.route('/allcontracts').get(contractController.getAllContracts)

router.use(protect)

router
    .route('/')
    .get(contractController.getUserContracts)
    .post(contractController.initializeContract);

router.route('/:contractId').get(contractController.getContract)
router.route('/:contractId').patch(contractController.updateDueContract)
router.route('/:contractId/accept').patch(contractController.acceptContract)
router.route('/:contractId/deny').patch(contractController.denyContract)
router.route('/:contractId/delete').delete(contractController.deleteContract)
router.route('/:contractId/finish/initialise').patch(contractController.initialiseFinishContract)
router.route('/:contractId/finish/accept').patch(contractController.acceptFinishContract)
router.route('/:contractId/finish/submit').patch(contractController.finishContract)
router.route('/:contractId/break').patch(contractController.leaveContract)


module.exports = router;