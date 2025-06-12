/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const CropsController = () => import('#controllers/crops_controller')
const HarvestsController = () => import('#controllers/harvests_controller')
const ProducersController = () => import('#controllers/producers_controller')
const FarmsController = () => import('#controllers/farms_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/dashboard_data', [DashboardController, 'getDashboardData'])

router.get('/crops', [CropsController, 'getAll'])

router.get('/harvests', [HarvestsController, 'getAll'])
router.post('/harvests', [HarvestsController, 'create'])
router.delete('/harvests', [HarvestsController, 'deleteHarvest'])

router.post('/harvests/crops', [HarvestsController, 'addCropToHarvest'])
router.put('/harvests/crops', [HarvestsController, 'updageCropToHarvest'])
router.delete('/harvests/crops', [HarvestsController, 'deleteCropToHarvest'])

router.get('/farms', [FarmsController, 'getAll'])
router.post('/farms', [FarmsController, 'create'])
router.put('/farms/:farmId', [FarmsController, 'updateFarm']).where('farmId', /^[0-9]+$/)
router.delete('/farms/:farmId', [FarmsController, 'deleteFarm']).where('farmId', /^[0-9]+$/)

router.get('/producers', [ProducersController, 'getAll'])
router.post('/producers', [ProducersController, 'create'])
