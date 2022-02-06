const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json("API REST Movies");
});

module.exports = router;
