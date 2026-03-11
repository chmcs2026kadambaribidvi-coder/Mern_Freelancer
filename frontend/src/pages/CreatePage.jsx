import api from '../lib/axios';
import { ArrowLeftIcon, UserPlusIcon, BriefcaseIcon, DollarSignIcon, CalendarIcon, SparklesIcon, MailIcon, LockIcon, ClockIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [availability, setAvailability] = useState('available');
  const [deadline, setDeadline] = useState('');
  const [payment, setPayment] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!name.trim()) {
      toast.error('Freelancer name is required')
      setLoading(false)
      return
    }
    if (!email.trim()) {
      toast.error('Email is required')
      setLoading(false)
      return
    }
    if (!password) {
      toast.error('Password is required')
      setLoading(false)
      return
    }
    if (!skills.trim()) {
      toast.error('Skills are required')
      setLoading(false)
      return
    }
    if (!experienceYears || experienceYears < 0) {
      toast.error('Experience years is required')
      setLoading(false)
      return
    }
    if (!hourlyRate || hourlyRate <= 0) {
      toast.error('Valid hourly rate is required')
      setLoading(false)
      return
    }

    try {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);

      if (skillsArray.length === 0) {
        toast.error('At least one skill is required')
        setLoading(false)
        return
      }

      const requestData = {
        freelancerId: `FL-${Date.now()}`,   // auto-generate unique ID
        name: name.trim(),
        email: email.trim(),
        password: password,
        skills: skillsArray,
        experienceYears: Number(experienceYears),
        hourlyRate: Number(hourlyRate),
        availability: availability,
      };

      if (deadline) requestData.deadline = deadline;
      if (payment) requestData.payment = Number(payment);

      console.log('Sending data to backend:', requestData);

      await api.post('/freelancers', requestData)

      toast.success('Freelancer created successfully!')
      navigate('/')
    } catch (error) {
      console.log('Error creating freelancer', error)
      console.log('Error response:', error.response?.data)
      toast.error(error.response?.data?.message || 'Failed to create freelancer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          {/* Header */}
          <div className='text-center mb-8'>
            <Link to={'/'} className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-200 mb-4'>
              <ArrowLeftIcon className='size-5' />
              Back to Dashboard
            </Link>

            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full'>
                <UserPlusIcon className='size-8 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-800'>Add New Freelancer</h1>
                <p className='text-gray-600'>Expand your talent network</p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
            <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-6'>
              <div className='flex items-center gap-3'>
                <SparklesIcon className='size-6 text-white' />
                <h2 className='text-xl font-bold text-white'>Freelancer Details</h2>
              </div>
              <p className='text-indigo-100 mt-1'>Fill in the information below to add a new freelancer</p>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-6'>

              {/* Freelancer Name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <UserPlusIcon className='size-4' />
                    Freelancer Name *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder='Enter full name'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <MailIcon className='size-4' />
                    Email *
                  </span>
                </label>
                <input
                  type="email"
                  placeholder='freelancer@example.com'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <LockIcon className='size-4' />
                    Password *
                  </span>
                </label>
                <input
                  type="password"
                  placeholder='Enter password'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Skills */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <BriefcaseIcon className='size-4' />
                    Skills *
                  </span>
                </label>
                <textarea
                  placeholder='Enter skills separated by commas (e.g., React, Node.js, Python)'
                  className='textarea textarea-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 resize-none'
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                />
                <div className='label'>
                  <span className='label-text-alt text-gray-500'>Separate multiple skills with commas</span>
                </div>
              </div>

              {/* Experience Years */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <ClockIcon className='size-4' />
                    Years of Experience *
                  </span>
                </label>
                <input
                  type='number'
                  placeholder='e.g. 3'
                  min='0'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  required
                />
              </div>

              {/* Hourly Rate */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <DollarSignIcon className='size-4' />
                    Hourly Rate (₹) *
                  </span>
                </label>
                <input
                  type='number'
                  placeholder='500'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                />
              </div>

              {/* Availability */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <SparklesIcon className='size-4' />
                    Availability
                  </span>
                </label>
                <select
                  className='select select-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 transition-all duration-200'
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value='available'>Available</option>
                  <option value='busy'>Busy</option>
                  <option value='offline'>Offline</option>
                </select>
              </div>

              {/* Deadline */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <CalendarIcon className='size-4' />
                    Deadline
                  </span>
                </label>
                <input
                  type='date'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <div className='label'>
                  <span className='label-text-alt text-gray-500'>Optional</span>
                </div>
              </div>

              {/* Total Payment */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text flex items-center gap-2 font-semibold text-gray-700'>
                    <DollarSignIcon className='size-4' />
                    Total Payment (₹)
                  </span>
                </label>
                <input
                  type='number'
                  placeholder='15000'
                  className='input input-bordered bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200'
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <div className='label'>
                  <span className='label-text-alt text-gray-500'>Optional - total project payment</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-4'>
                <button
                  type='submit'
                  className='w-full btn btn-primary bg-gradient-to-r from-indigo-500 to-purple-600 border-none hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                      Creating Freelancer...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <UserPlusIcon className='size-5' />
                      Create Freelancer
                    </div>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Tips */}
          <div className='mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6'>
            <h3 className='font-semibold text-blue-800 mb-2'>💡 Tips for adding freelancers:</h3>
            <ul className='text-sm text-blue-700 space-y-1'>
              <li>• Use specific skill names (e.g., "React.js" instead of "web dev")</li>
              <li>• Set competitive hourly rates based on experience</li>
              <li>• Include realistic deadlines for better project planning</li>
              <li>• Total payment is optional but helps with project budgeting</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage