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
        case 'Add Employee':
            console.log("Adding Employee");
            questions = await menu.buildEmployeeQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.addEmployee(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'Update Employee Role':
            console.log("Updating Employee Role");
            questions = await menu.buildUpdateEmployeeRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.updateEmployeeRole(Object.values(answers).reverse()))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Roles':
            console.table(await query.getAllRoles());
            await displayMenu();
            break;
        case 'Add Role':
            console.log("Adding Role");
            questions = await menu.buildRoleQuestions();
            await inquirer.prompt(questions)
                .then(answers => query.addRole(Object.values(answers)))
                .catch(e => console.error(e));
            await displayMenu();
            break;
        case 'View All Departments':
            console.table(await query.getAllDepartments());
            await displayMenu();
            break;
        case 'Add Department':
            console.log("Adding Department");
            await inquirer.prompt(menu.addDepartmentQuestions)
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
