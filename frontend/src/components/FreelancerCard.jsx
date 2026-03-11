import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';
import { formatData } from '../lib/utils';

const FreelancerCard = ({ freelancer, setFreelancers }) => {
  const location = useLocation();
  const isActive = location.pathname === `/freelancer/${freelancer._id}`;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this freelancer?')) return;
    try {
      await api.delete(`/freelancers/${freelancer._id}`);
      setFreelancers(prev => prev.filter(f => f._id !== freelancer._id));
      toast.success('Freelancer deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete freelancer');
    }
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow p-6 border-t-4 border-blue-500 hover:shadow-xl transition ${
        isActive ? 'ring-2 ring-indigo-500' : ''
      }`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
      >
        ✕
      </button>

      <Link to={`/freelancer/${freelancer._id}`} className="block">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{freelancer.name}</h3>
      </Link>

      <div className="text-lg font-semibold text-gray-700 mb-1">
        ₹{freelancer.hourlyRate}/h
      </div>
      {freelancer.payment != null && (
        <div className="text-sm text-gray-600 mb-1">Total: ₹{freelancer.payment}</div>
      )}
      {freelancer.deadline && (
        <div className="text-sm text-gray-600">
          Deadline: {formatData(new Date(freelancer.deadline))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {freelancer.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FreelancerCard;