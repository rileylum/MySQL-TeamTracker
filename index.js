const inquirer = require('inquirer');

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

const menuQuestions = [
    {
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: menuChoices
    }
];

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }
];

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
const employeeManagerChoices = [
    {
        name: 'None',
        value: NaN
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
]
menuChoice = (answer) => {
    console.log(answer);
    switch (answer) {
        case 'View All Employees':
            console.log("Viewing All Employees");
            break;
        case 'Add Employee':
            console.log("Adding Employee");
            inquirer.prompt(addEmployeeQuestions)
                .then(answers => console.log(answers))
                .catch(e => console.error(e));
            break;
        case 'Update Employee Role':
            console.log("Updating Employee Role");
            inquirer.prompt(updateEmployeeRoleQuestions)
                .then(answers => console.log(answers))
                .catch(e => console.error(e));
            break;
        case 'View All Roles':
            console.log("Viewing All Roles");
            break;
        case 'Add Role':
            console.log("Adding Role");
            inquirer.prompt(addRoleQuestions)
                .then(answers => console.log(answers))
                .catch(e => console.error(e));
            break;
        case 'View All Departments':
            console.log("Viewing All Departments");
            break;
        case 'Add Department':
            console.log("Adding Department");
            inquirer.prompt(addDepartmentQuestions)
                .then(answers => console.log(answers))
                .catch(e => console.error(e));
            break;
        case 'Quit':
            console.log("Quitting, Bye!");
            break;
        default:
            console.error("Something went wrong");
            break;
    }
};



inquirer.prompt(menuQuestions)
    .then(answers => menuChoice(answers.menuOption))
    .catch(e => console.error(e));