import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const FreelancerDetailPage = () => {

  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await api.get(`/freelancers/${id}`);
        setFreelancer(res.data);
      } catch (error) {
        console.error("Error fetching freelancer", error);
        toast.error("Failed to fetch the freelancer");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this freelancer?")) return;

    try {
      await api.delete(`/freelancers/${id}`);
      toast.success("Freelancer deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting freelancer", error);
      toast.error("Failed to delete freelancer");
    }
  };

  const handleSave = async () => {

    if (!freelancer.name.trim() || !freelancer.skills.length) {
      toast.error("Please add freelancer name and skills");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/freelancers/${id}`, {
        name: freelancer.name,
        skills: freelancer.skills,
        hourlyRate: Number(freelancer.hourlyRate),
        deadline: freelancer.deadline,
        payment: freelancer.payment ? Number(freelancer.payment) : undefined
      });

      toast.success("Freelancer updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating freelancer", error);
      toast.error("Failed to update freelancer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Dashboard
            </Link>

            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Freelancer
            </button>
          </div>

          {/* FORM CARD */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              {/* FREELANCER NAME */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Freelancer Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Freelancer name"
                  className="input input-bordered"
                  value={freelancer.name}
                  onChange={(e) =>
                    setFreelancer({ ...freelancer, name: e.target.value })
                  }
                />
              </div>

              {/* SKILLS */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Skills (comma-separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, Python"
                  className="input input-bordered"
                  value={freelancer.skills.join(', ')}
                  onChange={(e) =>
                    setFreelancer({ ...freelancer, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })
                  }
                />
              </div>

              {/* HOURLY RATE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Hourly Rate (₹)</span>
                </label>
                <input
                  type="number"
                  placeholder="500"
                  className="input input-bordered"
                  value={freelancer.hourlyRate}
                  onChange={(e) =>
                    setFreelancer({ ...freelancer, hourlyRate: e.target.value })
                  }
                />
              </div>

              {/* TOTAL PAYMENT */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Total Payment (₹, optional)</span>
                </label>
                <input
                  type="number"
                  placeholder="15000"
                  className="input input-bordered"
                  value={freelancer.payment || ''}
                  onChange={(e) =>
                    setFreelancer({ ...freelancer, payment: e.target.value })
                  }
                />
              </div>

              {/* DEADLINE */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Deadline (optional)</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={freelancer.deadline?.substring(0, 10) || ''}
                  onChange={(e) =>
                    setFreelancer({ ...freelancer, deadline: e.target.value })
                  }
                />
              </div>

              {/* ACTION */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving ..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FreelancerDetailPage;