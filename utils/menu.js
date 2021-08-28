const query = require('./queries');

// Choices array for menu questions
const menuChoices = [
    'View All Employees',
    'View Employees By Manager',
    'Add Employee',
    'Delete Employee',
    'Update Employee Role',
    'Update Employee Manager',
    'View All Roles',
    'Add Role',
    'Delete Role',
    'View All Departments',
    'View Employees By Department',
    'View Deparment Utilized Budget',
    'Add Department',
    'Delete Department',
    'Quit'
]
// Questions Array for menu
const menuQuestions = [
    {
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: menuChoices
    }
];
// Questions Array for adding a department
const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }
];
// Choices array for department choices from DB
const getDepartmentChoices = async () => {
    const allDepartments = await query.getAllDepartments();
    return (allDepartments.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    }))
};
// Questions array for inquirer
const buildRoleQuestions = async () => {
    roleQuestions = [
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        }
    ];
    departments = await getDepartmentChoices();
    roleQuestions.push({
        type: 'list',
        name: 'roleDepartment',
        message: 'Which department does the role belong to?',
        choices: departments
    });
    return roleQuestions;
};

// Choices array for role choices from DB
const getRoleChoices = async () => {
    const allRoles = await query.getAllRoles();
    return (allRoles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    }))
};
//  Choices array for manager choices from DB
const getEmployeeChoices = async () => {
    const allEmployees = await query.getAllEmployees();

    return allEmployees.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id
        }
    })
};

const getManagerChoices = async () => {
    const employeeList = [{ name: 'None', value: null }] // value for no manager
    employees = await getEmployeeChoices();
    employeeList.push(...employees);
    return employeeList;
};
// Questions array for inquirer 
const buildEmployeeQuestions = async () => {
    employeeQuestions = [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the employee\'s last name?'
        }
    ];
    roles = await getRoleChoices();
    managers = await getManagerChoices();
    employeeQuestions.push({
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        choices: roles
    });
    employeeQuestions.push({
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: managers
    });
    return employeeQuestions;
}

// Questions Array for updating an employees role
const buildUpdateEmployeeRoleQuestions = async () => {
    employees = await getEmployeeChoices();
    roles = await getRoleChoices();
    return [{
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s role do you want to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Which role do you want to assign the selected employee?',
        choices: roles
    }]
};

const buildUpdateEmployeeManagerQuestions = async () => {
    employees = await getEmployeeChoices();
    managers = await getManagerChoices();
    return [{
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s manager do you want to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Which manager do you want to assign the selected employee?',
        choices: managers
    }]
};

const getCurrentManagerChoices = async () => {
    const allCurrentManagers = await query.getAllCurrentManagers();

    return allCurrentManagers.map(manager => {
        return {
            name: manager.first_name + ' ' + manager.last_name,
            value: manager.id
        }
    })
};

const buildViewEmployeesByManagerQuestions = async () => {
    managers = await getCurrentManagerChoices();
    return [{
        type: 'list',
        name: 'employeeManager',
        message: 'Which manager\'s employee\'s do you want to view?',
        choices: managers
    }]
};

const buildEmployeesByDepartmentQuestions = async () => {
    departments = await getDepartmentChoices();
    return [{
        type: 'list',
        name: 'department',
        message: 'Which department\'s employee\'s do you want to view?',
        choices: departments
    }]
}

const buildDeleteEmployeeQuestions = async () => {
    employees = await getEmployeeChoices();
    return [{
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to delete?',
        choices: employees
    }]
}

const buildDeleteRoleQuestions = async () => {
    roles = await getRoleChoices();
    return [{
        type: 'list',
        name: 'role',
        message: 'Which role do you want to delete?',
        choices: roles
    }]
}

const buildDeleteDepartmentQuestions = async () => {
    departments = await getDepartmentChoices();
    return [{
        type: 'list',
        name: 'department',
        message: 'Which department do you want to delete?',
        choices: departments
    }]
}


module.exports = {
    menuChoices,
    menuQuestions,
    addDepartmentQuestions,
    buildRoleQuestions,
    buildEmployeeQuestions,
    buildUpdateEmployeeRoleQuestions,
    buildUpdateEmployeeManagerQuestions,
    buildViewEmployeesByManagerQuestions,
    buildEmployeesByDepartmentQuestions,
    buildDeleteEmployeeQuestions,
    buildDeleteRoleQuestions,
    buildDeleteDepartmentQuestions
}