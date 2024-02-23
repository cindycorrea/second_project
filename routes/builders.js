const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");
const buildersController = require("../controllers/builders");

router.get("/builders", buildersController.getAllBuilders);
router.get("/builders/:id", buildersController.getBuilder);
router.post("/builders", requiresAuth(), buildersController.newBuilder);
router.put("/builders/:id", requiresAuth(), buildersController.updateBuilder);
router.delete(
  "/builders/:id",
  requiresAuth(),
  buildersController.deleteBuilder
);

module.exports = router;
