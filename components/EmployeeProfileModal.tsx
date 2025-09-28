
import React from 'react';
import { Employee } from '../types';

interface EmployeeProfileModalProps {
    employee: Employee;
    onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode; wide?: boolean }> = ({ label, value, wide = false }) => (
    <div className={wide ? 'sm:col-span-2' : ''}>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-lg text-slate-900 dark:text-slate-100 break-words">{value || 'N/A'}</p>
    </div>
);

const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({ employee, onClose }) => {

    const formatCurrency = (value: number | null | undefined) => {
        if (value === null || value === undefined) return 'N/A';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getStatusChip = (status: 'Active' | 'On Leave' | 'Terminated' | null | undefined) => {
        if (!status) return <span className="text-slate-500">N/A</span>;
        const baseClasses = "px-3 py-1 text-sm font-semibold rounded-full inline-block";
        const styles = {
            Active: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
            'On Leave': "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
            Terminated: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
        };
        return <span className={`${baseClasses} ${styles[status]}`}>{status}</span>;
    };
    
    const managerName = `${employee.manager_first_name || ''} ${employee.manager_last_name || ''}`.trim() || 'N/A';
    const fullAddress = [employee.address_street, employee.address_city, employee.address_state, employee.address_zip_code].filter(Boolean).join(', ') || 'N/A';


    return (
        <div 
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl transform animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div>
                         <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{employee.full_name || 'Employee Profile'}</h2>
                         <p className="text-md text-slate-600 dark:text-slate-400">{employee.job_title || 'No Title'}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        <DetailItem label="Employee ID" value={employee.employee_id} />
                        <DetailItem label="Status" value={getStatusChip(employee.status)} />
                        <DetailItem label="Department" value={employee.department_name} />
                        <DetailItem label="Location" value={employee.department_location} />
                        <DetailItem label="Manager" value={managerName} />
                        <DetailItem label="Salary" value={formatCurrency(employee.salary)} />
                        <DetailItem label="Hire Date" value={formatDate(employee.hire_date)} />
                        <DetailItem label="Date of Birth" value={formatDate(employee.date_of_birth)} />
                        <DetailItem label="Email" value={employee.email} wide />
                        <DetailItem label="Phone" value={employee.phone_number} wide />
                        <DetailItem label="Address" value={fullAddress} wide />
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default EmployeeProfileModal;
