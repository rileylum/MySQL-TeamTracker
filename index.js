const inquirer = require('inquirer');
const query = require('./utils/queries');

async function init() {
    await displayMenu();
};

async function displayMenu() {
    await inquirer.prompt(menuQuestions)
        .then(answers => menuChoice(answers.menuOption))
        .catch(e => console.error(e));
};

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

// Called from menu questions to perform an action based on the users choice
menuChoice = async (answer) => {
    console.log(answer);
    switch (answer) {
        case 'View All Employees':
            console.log(await query.getAllEmployees());
            await displayMenu();
            break;
        case 'Add Employee':
            console.log("Adding Employee");
            questions = await buildEmployeeQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.addEmployee(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Update Employee Role':
            console.log("Updating Employee Role");
            questions = await buildUpdateEmployeeRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.updateEmployeeRole(Object.values(answers).reverse()))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Roles':
            console.log(await query.getAllRoles());
            await displayMenu();
            break;
        case 'Add Role':
            console.log("Adding Role");
            questions = await buildRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.addRole(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Departments':
            console.log(await query.getAllDepartments());
            await displayMenu();
            break;
        case 'Add Department':
            console.log("Adding Department");
            await inquirer.prompt(addDepartmentQuestions)
                .then(answers => query.addDepartment(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Quit':
            console.log("Quitting, Bye!");
            break;
        default:
            console.error("Something went wrong");
            break;
    }
};

init();
