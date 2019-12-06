const { Router } = require('express');
const router = Router();

//routes
router.get('/', (req, res) => {
  res.json({"Title": "Hola "});
});

module.exports = router;
