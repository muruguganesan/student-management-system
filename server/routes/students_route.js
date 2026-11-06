const express = require("express");

const router = express.Router();
const studentController = require("../controllers/students_controller");

// View All Records
router.get('', studentController.view);

// Add New Record Form Render
router.get('/add-student', studentController.addUser);

// Add New Record
router.post('/save', studentController.saveUser);

// Deleting Data
router.post('/delete-student/:id', studentController.deleteUser);

// Edit User Page
router.get('/edit-student/:id', studentController.editUserPage);

// Update User Page
router.post('/update/:id', studentController.updateUser);



// router.get('', (req, res) => {
//     const students = [
//         {
//             id: 1,
//             name: "Ligesh",
//             age: 25,
//             location: "Chennai"
//         },
//         {
//             id: 2,
//             name: "Vignesh",
//             age: 20,
//             location: "Coimbatore"
//         },
//         {
//             id: 3,
//             name: "Rakesh",
//             age: 25,
//             location: "Trichy"
//         },
//         {
//             id: 4,
//             name: "Sudha",
//             age: 20,
//             location: "Chennai"
//         },
//     ];
//     res.render("home", {students});
// });


module.exports = router;