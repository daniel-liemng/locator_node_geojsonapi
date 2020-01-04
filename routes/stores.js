const express = require("express");
const router = express.Router();

const { getStores, addStore } = require("../controllers/stores");

// router.get("/", (req, res) => {
//   res.send("hello");
// });

router
  .route("/")
  .get(getStores)
  .post(addStore);

module.exports = router;
