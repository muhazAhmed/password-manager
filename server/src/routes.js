const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const passwordController = require("./controllers/passwordController")


router.get('/', (req, res)=>{
    return res.json("Api is Working!...")
})

// ========= User ============
router.post("/user/register", userController.register);
router.post("/user/login", userController.loginUser);
router.post("/user/logout", userController.logout);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

// ============= Password ====================
router.post("/generatePassword",passwordController.generatePassword)
router.post("/addPassword/:id",passwordController.createPasswordDB)
router.get("/getPassword/:id",passwordController.getPasswords)



module.exports = router