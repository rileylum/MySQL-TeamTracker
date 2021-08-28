const inquirer = require('inquirer');
const query = require('./utils/queries');
const menu = require('./utils/menu');
const cTable = require('console.table');

async function init() {
    await displayMenu();
};

async function displayMenu() {
    await inquirer.prompt(menu.menuQuestions)
        .then(answers => menuChoice(answers.menuOption))
        .catch(e => console.error(e));
};


// Called from menu questions to perform an action based on the users choice
menuChoice = async (answer) => {
    switch (answer) {
        case 'View All Employees':
            console.table(await query.getAllEmployees());
            await displayMenu();
            break;
        case 'View Employees By Manager':
            questions = await menu.buildViewEmployeesByManagerQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.getEmployeesByManager(answers.employeeManager))
                .then(employees => console.table(employees))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Add Employee':
            questions = await menu.buildEmployeeQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.addEmployee(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Delete Employee':
            questions = await menu.buildDeleteEmployeeQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.deleteEmployee(answers.employee))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Update Employee Role':
            questions = await menu.buildUpdateEmployeeRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.updateEmployeeRole(Object.values(answers).reverse()))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Update Employee Manager':
            questions = await menu.buildUpdateEmployeeManagerQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.updateEmployeeManager(Object.values(answers).reverse()))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Roles':
            console.table(await query.getAllRoles());
            await displayMenu();
            break;
        case 'Add Role':
            questions = await menu.buildRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.addRole(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Delete Role':
            questions = await menu.buildDeleteRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.deleteRole(answers.role))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Departments':
            console.table(await query.getAllDepartments());
            await displayMenu();
            break;
        case 'Add Department':
            await inquirer.prompt(menu.addDepartmentQuestions)
                .then(answers => query.addDepartment(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Delete Department':
            questions = await menu.buildDeleteDepartmentQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.deleteDepartment(answers.department))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View Employees By Department':
            questions = await menu.buildEmployeesByDepartmentQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.getEmployeesByDepartment(answers.department))
                .then(employees => console.table(employees))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View Deparment Utilized Budget':
            questions = await menu.buildEmployeesByDepartmentQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.getDepartmentUtilizedBudget(answers.department))
                .then(employees => console.table(employees))
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
