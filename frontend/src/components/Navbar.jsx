import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-indigo-600">
          FreelancerHub
        </Link>
        <Link
          to="/add-freelancer"
          className="btn btn-primary hidden sm:inline-flex items-center gap-2"
        >
          <span>Add Freelancer</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;