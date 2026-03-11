import React, { useEffect, useState } from 'react'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import FreelancerCard from "../components/FreelancerCard.jsx";
import FreelancerNotFound from "../components/FreelancerNotFound.jsx";
import { SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFreelancers, setFilteredFreelancers] = useState([])

  // alerts derived from freelancers array
  const alerts = [];
  freelancers.forEach(f => {
    if (f.deadline) {
      const days = (new Date(f.deadline) - new Date()) / (1000 * 60 * 60 * 24);
      if (days >= 0 && days <= 7) {
        alerts.push(`Deadline soon: ${f.name}`);
      }
    }
    if (f.payment && f.payment > 0) {
      alerts.push(`Payment due: ${f.name} (₹${f.payment})`);
    }
  });

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await api.get('/freelancers')
        console.log(res.data)
        setFreelancers(res.data)
        setFilteredFreelancers(res.data)
      } catch (error) {
        console.log("Error fetching freelancers")
        console.log(error)
        toast.error("Failed to load freelancers")
      } finally {
        setLoading(false)
      }
    }
    fetchFreelancers();
  }, [])

  useEffect(() => {
    const filtered = freelancers.filter(freelancer =>
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredFreelancers(filtered)
  }, [searchTerm, freelancers])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Header bar with title and add link */}
      <section className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4'>
        <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Freelancer Hub</h1>
          <Link
            to='/add-freelancer'
            className='bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition'
          >
            Add Freelancer
          </Link>
        </div>
      </section>


      {/* Alerts */}
      {alerts.length > 0 && (
        <section className='bg-blue-900 text-white py-6'>
          <div className='max-w-7xl mx-auto px-4'>
            <h2 className='text-xl font-bold mb-3'>Alerts</h2>
            <ul className='space-y-1'>
              {alerts.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Search Bar */}
      <section className='py-8 bg-blue-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='relative max-w-md mx-auto'>
            <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5' />
            <input
              type='text'
              placeholder='Search freelancers...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
            />
          </div>
        </div>
      </section>

      {/* Freelancers Section */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              {searchTerm ? `Found ${filteredFreelancers.length} Freelancers` : 'Meet Our Freelancers'}
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Browse through our curated list of talented professionals ready to bring your projects to life.
            </p>
          </div>

          {loading && (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
              <span className='ml-3 text-lg text-gray-600'>Loading freelancers...</span>
            </div>
          )}

          {!loading && filteredFreelancers.length === 0 && searchTerm && (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>No freelancers found</h3>
              <p className='text-gray-600'>Try adjusting your search terms</p>
            </div>
          )}

          {!loading && freelancers.length === 0 && !searchTerm && <FreelancerNotFound />}

          {filteredFreelancers.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredFreelancers.map((freelancer) => (
                <FreelancerCard
                  key={freelancer._id}
                  freelancer={freelancer}
                  setFreelancers={setFreelancers}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage