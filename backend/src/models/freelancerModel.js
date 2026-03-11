import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema(
  {
    freelancerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], required: true },
    experienceYears: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    availability: { type: String, enum: ["available", "busy", "offline"], default: "available" },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;