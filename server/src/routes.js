const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const{generatePassword, passwordManger, getPasswords}= require("./controllers/passwordController")
router.get('/', (req, res)=>{
    return res.json("Server is connected...")
})

// ========= User ============
router.post("/user/register", userController.register);
router.post("/user/login", userController.loginUser);
router.post("/user/logout", userController.logout);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

router.post("/generatePassword",generatePassword)
router.post("/addPassword",passwordManger)
router.get("/getPass/:id",getPasswords)



module.exports = router