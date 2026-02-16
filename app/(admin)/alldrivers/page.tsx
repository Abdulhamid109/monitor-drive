"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', phone: '9876543210', enrollmentType: 'Basic', days: 30 },
    { id: 2, name: 'Jane Smith', phone: '9876543211', enrollmentType: 'Premium', days: 60 },
    { id: 3, name: 'Robert Johnson', phone: '9876543212', enrollmentType: 'Standard', days: 45 },
    { id: 4, name: 'Emily Davis', phone: '9876543213', enrollmentType: 'Basic', days: 30 },
    { id: 5, name: 'Michael Brown', phone: '9876543214', enrollmentType: 'Premium', days: 90 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    enrollmentType: '',
    days: 0
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.enrollmentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (customer: any) => {
    setEditingId(customer.id);
    setEditFormData({
      name: customer.name,
      phone: customer.phone,
      enrollmentType: customer.enrollmentType,
      days: customer.days
    });
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'days' ? parseInt(value) || 0 : value
    });
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers(customers.map(customer =>
      customer.id === editingId ? { ...customer, ...editFormData } : customer
    ));
    setEditingId(null);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 top-[10vh] relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Customer Management</h1>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="mb-6">
          <Link
            href="/driver"
            className="block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm sm:text-base text-center transition-colors"
          >
            Add New Customer
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  {editingId === customer.id ? (
                    <>
                      <td colSpan={4} className="p-3 sm:p-4">
                        <form onSubmit={handleEditFormSubmit} className="space-y-3">
                          {/* Name Field - Stacked on mobile */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditFormChange}
                              className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                              type="text"
                              name="phone"
                              value={editFormData.phone}
                              onChange={handleEditFormChange}
                              className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Enrollment Type</label>
                              <select
                                name="enrollmentType"
                                value={editFormData.enrollmentType}
                                onChange={handleEditFormChange}
                                className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              >
                                <option value="Basic">Basic</option>
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Days</label>
                              <input
                                type="number"
                                name="days"
                                value={editFormData.days}
                                onChange={handleEditFormChange}
                                className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-sm sm:text-base font-medium text-gray-900">{customer.name}</div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-sm sm:text-base text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-sm sm:text-base text-gray-500">{customer.enrollmentType}</div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                        <div className="text-sm sm:text-base text-gray-500">{customer.days}</div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-3 justify-end">
                          <button
                            onClick={() => handleEditClick(customer)}
                            className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm"
                          >
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 text-xs sm:text-sm">
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && !editingId && (
            <div className="p-4 text-center text-gray-500">
              No customers found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
    <div>
        <Footer/>
    </div>
    </>
  );
};

export default CustomersPage;
