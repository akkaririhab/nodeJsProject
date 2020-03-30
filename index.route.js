const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const restaurantRoutes = require('./server/restaurant/restaurant.route');
const productRoutes=require('./server/product/product.route');
const promotionRoutes=require('./server/promotion/promotion.route');
const commandRoutes=require('./server/command/command.route');
const ingredientRoutes=require('./server/ingredient/ingredient.route');
const router = express.Router(); // eslint-disable-line new-cap




// mount user routes at /users
router.use('/users', userRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/product', productRoutes);
router.use('/promotion', promotionRoutes);
router.use('/command', commandRoutes);
router.use('/ingredient', ingredientRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);


module.exports = router;
