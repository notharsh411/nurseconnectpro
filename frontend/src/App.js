import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Pill, Stethoscope } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import ChatBot from './components/ui/Chatbot.js';

const API_URL = 'http://localhost:5000/api';

const NurseConnectPro = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.id]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
    document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setStep(1);
          setAppointmentData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            description: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const renderAppointmentForm = () => {
    if (step === 1) {
      return (
        <form className="max-w-md mx-auto" onSubmit={handleNextStep}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={appointmentData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={appointmentData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              value={appointmentData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              value={appointmentData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Next
          </button>
        </form>
      );
    }

    return (
      <form className="max-w-md mx-auto" onSubmit={handleBookAppointment}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Select Date</label>
          <input
            type="date"
            id="date"
            value={appointmentData.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Select Time</label>
          <select
            id="time"
            value={appointmentData.time}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a time</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => setStep(1)} 
            className="w-1/2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button 
            type="submit" 
            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Confirm Appointment
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="bg-blue-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">NurseConnect Pro</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#services" className="text-blue-600 hover:text-blue-800">Services</a></li>
              <li><a href="#appointment" className="text-blue-600 hover:text-blue-800">Appointment</a></li>
              <li><a href="#consultation" className="text-blue-600 hover:text-blue-800">Consultation</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Professional Nursing Care at Your Fingertips</h2>
          <p className="text-xl mb-8">Experience top-tier nursing services with NurseConnect Pro</p>
          <a href="#appointment" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Book an Appointment
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<Calendar className="w-12 h-12 text-blue-500" />} title="Appointment Booking" description="Schedule your nursing care visits with ease" />
            <ServiceCard icon={<Video className="w-12 h-12 text-blue-500" />} title="Online Consultation" description="Connect with our nurses virtually for quick advice" />
            <ServiceCard icon={<Stethoscope className="w-12 h-12 text-blue-500" />} title="Diagnosis" description="Comprehensive health assessments and diagnoses" />
            <ServiceCard icon={<Pill className="w-12 h-12 text-blue-500" />} title="Medication Management" description="Expert guidance on your medication regimen" />
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            {step === 1 ? 'Book an Appointment' : 'Select Date & Time'}
          </h2>
          {renderAppointmentForm()}
        </div>
      </section>

      {/* Online Consultation Section */}
      <section id="consultation" className="bg-blue-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-800">Online Consultation</h2>
          <p className="text-xl mb-8">Connect with our experienced nurses from the comfort of your home</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Start Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 NurseConnect Pro. All rights reserved.</p>
        </div>
      </footer>

      {/* Alert */}
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-64">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Appointment booked successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default NurseConnectPro;