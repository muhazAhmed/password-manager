const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.get('/', (req, res)=>{
    return res.json("Server is connected...")
})

// ========= User ============
router.post("/user/register", userController.register);
router.post("/user/login", userController.loginUser);
router.post("/user/logout", userController.logout);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router