import Freelancer from "../models/freelancerModel.js";

// Get all freelancers
export async function getAllFreelancers(req, res) {
  try {
    const freelancers = await Freelancer.find().sort({ createdAt: -1 });
    res.status(200).json(freelancers);
  } catch (error) {
    console.error("Error in getAllFreelancers", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get freelancer by ID
export async function getFreelancerById(req, res) {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
    res.status(200).json(freelancer);
  } catch (error) {
    console.error("Error in getFreelancerById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new freelancer
export async function createFreelancer(req, res) {
  try {
    const { freelancerId, name, email, password, skills, experienceYears, hourlyRate, availability, rating } = req.body;

    if (!freelancerId || !name || !email || !password || !skills || experienceYears === undefined || hourlyRate === undefined) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const freelancer = new Freelancer({
      freelancerId,
      name,
      email,
      password,
      skills,
      experienceYears,
      hourlyRate,
      availability,
      rating,
    });

    const savedFreelancer = await freelancer.save();
    res.status(201).json(savedFreelancer);
  } catch (error) {
    console.error("Error in createFreelancer", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update freelancer
export async function updateFreelancer(req, res) {
  try {
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFreelancer) return res.status(404).json({ message: "Freelancer not found" });
    res.status(200).json(updatedFreelancer);
  } catch (error) {
    console.error("Error in updateFreelancer", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete freelancer
export async function deleteFreelancer(req, res) {
  try {
    const deletedFreelancer = await Freelancer.findByIdAndDelete(req.params.id);
    if (!deletedFreelancer) return res.status(404).json({ message: "Freelancer not found" });
    res.status(200).json({ message: "Freelancer deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFreelancer", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
