const query = require('./queries');

// Choices array for menu questions
const menuChoices = [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Department',
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
    employeeList = [{ name: 'None', value: null }] // value for no manager
    employees = allEmployees.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id
        }
    })
    employeeList.push(...employees);
    return employeeList;
}
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
    managers = await getEmployeeChoices();
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

module.exports = {
    menuChoices,
    menuQuestions,
    addDepartmentQuestions,
    buildRoleQuestions,
    buildEmployeeQuestions,
    buildUpdateEmployeeRoleQuestions
}