import express from "express";
import {
  createFreelancer,
  getAllFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer,
} from "../controllers/freelancerController.js";

const router = express.Router();

router.post("/", createFreelancer);       // Create freelancer
router.get("/", getAllFreelancers);       // Get all freelancers
router.get("/:id", getFreelancerById);    // Get freelancer by ID
router.put("/:id", updateFreelancer);     // Update freelancer
router.delete("/:id", deleteFreelancer);  // Delete freelancer

export default router;