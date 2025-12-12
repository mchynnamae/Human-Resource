import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Employee } from '../types';
import DashboardCard from './DashboardCard';
import LoadingSpinner from './LoadingSpinner';
import AverageSalaryChart from './AverageSalaryChart';
import NewHiresChart from './NewHiresChart';
import TenureDistributionChart from './TenureDistributionChart';
import AgeDistributionChart from './AgeDistributionChart';
import StatusBreakdown from './StatusBreakdown';
import Header from './Header';
import Sidebar from './Sidebar';
import EmployeeProfileModal from './EmployeeProfileModal';
import EmptyDashboard from './EmptyDashboard';

const supabaseUrl = 'https://xogdibcevtxsgmneznnn.supabase.co';
// The user provided key is an anon public key, safe to be exposed in frontend code.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZ2RpYmNldnR4c2dtbmV6bm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUyODEsImV4cCI6MjA3NDE4MTI4MX0.-qD62by36ovRhhQRQw05dMbxYDj8uqGFkGt7qgqwhfw';
const supabase = createClient(supabaseUrl, supabaseKey);


const Dashboard: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Employee[]>([]);
    const [activeFilter, setActiveFilter] = useState<{ type: 'department' | 'manager' | 'none', value: string }>({ type: 'none', value: '' });
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError(null);
            
            // FETCH ALL EMPLOYEES
            // We explicitly set .limit(5000) to override the Supabase client default of 1000 rows.
            // We ensure there is NO .range() method chained here, as that would restrict the result set.
            // Note: If you still see 1000 rows, check Supabase Project Settings > API > Max Rows.
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .limit(5000);

            if (error) {
                // Provide a more descriptive error message in the UI
                const errorMessage = `Message: ${error.message}${error.details ? ` | Details: ${error.details}` : ''}`;
                setError(errorMessage);
                console.error("Supabase error:", error);
            } else {
                setEmployees(data || []);
            }
            setLoading(false);
        };

        fetchEmployees();
    }, []);
    
    // Live Employee Search Logic (CRITICAL INTERACTIVE FEATURE FIX)
    useEffect(() => {
        if (searchTerm.length > 1) {
            const query = searchTerm.toLowerCase();
            const results = employees.filter(e => 
                // Safely search across name, ID, and title
                e.full_name?.toLowerCase().includes(query) ||
                e.job_title?.toLowerCase().includes(query) ||
                e.employee_id?.toLowerCase().includes(query)
            ).slice(0, 10); // Limit suggestions to keep UI fast
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, employees]);


    const filteredEmployees = useMemo(() => {
        let filtered = employees;

        if (activeFilter.type !== 'none') {
            if (activeFilter.type === 'department') {
                filtered = filtered.filter(emp => emp.department_name === activeFilter.value);
            } else if (activeFilter.type === 'manager') {
                 filtered = filtered.filter(emp => {
                    const managerName = `${emp.manager_first_name || ''} ${emp.manager_last_name || ''}`.trim();
                    return managerName === activeFilter.value;
                 });
            }
        }
        
        return filtered;
    }, [employees, activeFilter]);

    const aggregatedData = useMemo(() => {
        // For sidebar lists - use the full unfiltered employee list to ensure it's always complete.
        const departmentSet = new Set<string>();
        employees.forEach(emp => {
            if (emp.department_name) {
                departmentSet.add(emp.department_name);
            }
        });
        const departments = Array.from(departmentSet).sort();
        
        // START FIX: Ensure all distinct manager names are correctly collected.
        const managers = Array.from(new Set(
            employees
                .map(e => {
                    const firstName = e.manager_first_name?.trim();
                    const lastName = e.manager_last_name?.trim();
                    if (firstName && lastName) {
                        return `${firstName} ${lastName}`;
                    }
                    if (firstName) {
                        return firstName;
                    }
                    // Ignore entries where both names are missing or empty
                    return null;
                })
                .filter((name): name is string => Boolean(name)) // Filter out null/empty strings
        )).sort();
        // END FIX

        // For charts and metrics - use the currently filtered employee list.
        if (!filteredEmployees.length) {
            return {
                departments,
                managers,
                charts: null
            };
        }

        const now = new Date();
        const fiveYearsAgo = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());

        const avgSalaryByTitle = filteredEmployees.reduce((acc, emp) => {
            if (!acc[emp.job_title]) {
                acc[emp.job_title] = { total: 0, count: 0 };
            }
            acc[emp.job_title].total += emp.salary;
            acc[emp.job_title].count++;
            return acc;
        }, {} as Record<string, { total: number; count: number }>);
        
        const newHiresByYear = filteredEmployees
            .filter(emp => new Date(emp.hire_date) >= fiveYearsAgo)
            .reduce((acc, emp) => {
                const year = new Date(emp.hire_date).getFullYear();
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {} as Record<number, number>);

        const tenureDistribution = filteredEmployees.reduce((acc, emp) => {
            const tenure = (now.getTime() - new Date(emp.hire_date).getTime()) / (1000 * 3600 * 24 * 365.25);
            let category = '20+ years';
            if (tenure < 1) category = '< 1 year';
            else if (tenure < 3) category = '1-3 years';
            else if (tenure < 5) category = '3-5 years';
            else if (tenure < 10) category = '5-10 years';
            else if (tenure < 20) category = '10-20 years';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const ageDistribution = filteredEmployees.reduce((acc, emp) => {
            const age = (now.getTime() - new Date(emp.date_of_birth).getTime()) / (1000 * 3600 * 24 * 365.25);
            let category = '60+';
            if (age < 20) category = '< 20';
            else if (age < 30) category = '20-29';
            else if (age < 40) category = '30-39';
            else if (age < 50) category = '40-49';
            else if (age < 60) category = '50-59';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const statusBreakdown = filteredEmployees.reduce((acc, emp) => {
            if (emp.status) {
                acc[emp.status] = (acc[emp.status] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return {
            departments,
            managers,
            charts: {
                avgSalaryByTitle: Object.entries(avgSalaryByTitle).map(([title, { total, count }]) => ({ name: title, value: Math.round(total / count) })),
                newHiresByYear: Object.entries(newHiresByYear).map(([year, count]) => ({ name: year, value: count })).sort((a, b) => Number(a.name) - Number(b.name)),
                tenureDistribution: Object.entries(tenureDistribution).map(([name, value]) => ({ name, value })),
                ageDistribution: Object.entries(ageDistribution).map(([name, value]) => ({ name, value })),
                statusBreakdown: Object.entries(statusBreakdown).map(([name, value]) => ({ name, value })),
                totalEmployees: filteredEmployees.length,
            }
        };
    }, [employees, filteredEmployees]);
    
     const handleFilterSelect = (type: 'department' | 'manager' | 'none', value: string) => {
        if (activeFilter.type === type && activeFilter.value === value) {
            setActiveFilter({ type: 'none', value: '' }); // Un-toggle if same filter is clicked
        } else {
            setActiveFilter({ type, value });
        }
        setSidebarOpen(false);
    };
    
    const handleEmployeeSelect = (employee: Employee) => {
        // Use a defensive copy in case the state mutation was an issue
        setSelectedEmployee({ ...employee }); 
        setSearchTerm('');
        setSearchResults([]);
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700 p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Error Fetching Data</h2>
                    <p>{error}</p>
                    <p className="mt-4 text-sm">Please check the console for more details and ensure the Supabase service is running correctly.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="relative min-h-screen flex">
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setSidebarOpen(false)}
                departments={aggregatedData?.departments || []}
                managers={aggregatedData?.managers || []}
                onFilterSelect={handleFilterSelect}
                activeFilter={activeFilter}
                resetFilters={() => setActiveFilter({type: 'none', value:''})}
             />
            <main className="flex-1 transition-all duration-300">
                <Header 
                    onMenuClick={() => setSidebarOpen(true)}
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    searchResults={searchResults}
                    onEmployeeSelect={handleEmployeeSelect}
                />

                <div className="p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-200">
                     <header className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Human Resource - CloudInkCo</h1>
                        {employees.length > 0 && (
                             <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
                                {activeFilter.type !== 'none' 
                                    ? `Filtered by ${activeFilter.type}: ${activeFilter.value}`
                                    : 'Analytical insights into the workforce.'
                                }
                            </p>
                        )}
                    </header>

                    {employees.length === 0 ? (
                        <EmptyDashboard />
                    ) : aggregatedData?.charts ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <StatusBreakdown data={aggregatedData.charts.statusBreakdown} total={aggregatedData.charts.totalEmployees} />
                            
                            <DashboardCard title="Average Salary by Job Title" className="lg:col-span-2">
                                <AverageSalaryChart data={aggregatedData.charts.avgSalaryByTitle} />
                            </DashboardCard>

                            <DashboardCard title="New Hires Over Last 5 Years">
                               <NewHiresChart data={aggregatedData.charts.newHiresByYear} />
                            </DashboardCard>

                            <DashboardCard title="Employee Tenure Distribution">
                                <TenureDistributionChart data={aggregatedData.charts.tenureDistribution} />
                            </DashboardCard>

                            <DashboardCard title="Staff Age Distribution">
                                <AgeDistributionChart data={aggregatedData.charts.ageDistribution} />
                            </DashboardCard>
                        </div>
                    ) : (
                         <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No Data Found</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">There is no employee data matching your current filters.</p>
                        </div>
                    )}
                </div>
            </main>
            {selectedEmployee && (
                <EmployeeProfileModal 
                    employee={selectedEmployee} 
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;