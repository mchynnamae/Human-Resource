
export interface Employee {
    employee_id: string;
    full_name: string;
    job_title: string;
    department_name: string;
    department_location: string;
    manager_first_name: string | null;
    manager_last_name: string | null;
    status: 'Active' | 'On Leave' | 'Terminated';
    salary: number;
    hire_date: string;
    date_of_birth: string;
    email: string;
    phone_number: string;
    address_street: string;
    address_city: string;
    address_state: string;
    address_zip_code: string;
}
