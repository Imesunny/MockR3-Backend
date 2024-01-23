const { Router } = require("express");
const { DoctorModel } = require("../models/doctor.model");

const doctorRouter = Router();

doctorRouter.get("/", async (req, res) => {
  try {
    const results = await DoctorModel.find();
    res.send({ Appointments: results });
    // res.json({message: "Hello from Doctor Model!"});
  } catch (error) {
    console.log("Error fetching data from the Doctor server: ", error);
  }
});

doctorRouter.post("/appointments", async (req, res) => {
  try {
    const {
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;

    const new_Appointment = await DoctorModel.create({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });
    res.json({ message: "New Appointment Created for the request!" });
  } catch (error) {
    console.log("Error while creating the appointment");
  }
});

doctorRouter.delete("/delete/:docID", async (req, res) => {
  try {
    const { docID } = req.params;
    const is_User = await DoctorModel.findOne({
      _id: docID,
    });

    if (is_User) {
      await DoctorModel.deleteOne({ _id: docID });
      res.json({ message: "Appointment deleted successfully" });
    } else {
      res.json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.log("Cannot delete the doctors data from DB", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





module.exports = doctorRouter;
