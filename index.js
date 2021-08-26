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
// Choices array for department choices, faking results from DB
const roleDepartmentChoices = [
    {
        name: 'General Management',
        value: 1
    },
    {
        name: 'Human Resources',
        value: 2
    },
    {
        name: 'Sales & Marketing',
        value: 3
    }
]
// Questions Array for adding a role
const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Which department does the role belong to?',
        choices: roleDepartmentChoices
    }
];
// Choices array for role choices, faking results from DB
const employeeRoleChoices = [
    {
        name: 'CEO',
        value: 1
    },
    {
        name: 'Operations Manager',
        value: 2
    },
    {
        name: 'CFO',
        value: 3
    }
];
// Choices array for manager choices, faking results from DB
const employeeManagerChoices = [
    {
        name: 'None',
        value: null
    },
    {
        name: 'Marian Mcgregor',
        value: 1
    },
    {
        name: 'Xander Oliver',
        value: 2
    }
];
// Questions Array for adding an employee
const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the employee\'s first name?'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        choices: employeeRoleChoices
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: employeeManagerChoices
    }
];
// Choices Array for employee choices, faking results from DB
const employeeUpdateChoices = [
    {
        name: 'Marian Mcgregor',
        value: 1
    },
    {
        name: 'Xander Oliver',
        value: 2
    },
    {
        name: 'Isabelle Mullins',
        value: 3
    }
];
// Choices Array for role choices, faking results from DB
const employeeRoleUpdateChoices = [
    {
        name: 'CEO',
        value: 1
    },
    {
        name: 'Operations Manager',
        value: 2
    },
    {
        name: 'CFO',
        value: 3
    }
];
// Questions Array for updating an employees role
const updateEmployeeRoleQuestions = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s role do you want to update?',
        choices: employeeUpdateChoices
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Which role do you want to assign the selected employee?',
        choices: employeeRoleUpdateChoices
    }
];
// Called from menu questions to perform an action based on the users choice
menuChoice = async (answer) => {
    console.log(answer);
    switch (answer) {
        case 'View All Employees':
            console.log(await query.getAll('employee'));
            await displayMenu();
            break;
        case 'Add Employee':
            console.log("Adding Employee");
            await inquirer.prompt(addEmployeeQuestions)
                .then(answers => query.addEmployee(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Update Employee Role':
            console.log("Updating Employee Role");
            await inquirer.prompt(updateEmployeeRoleQuestions)
                .then(answers => query.updateEmployeeRole(Object.values(answers).reverse()))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Roles':
            console.log(await query.getAll('role'));
            await displayMenu();
            break;
        case 'Add Role':
            console.log("Adding Role");
            await inquirer.prompt(addRoleQuestions)
                .then(answers => query.addRole(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Departments':
            console.log(await query.getAll('department'));
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
