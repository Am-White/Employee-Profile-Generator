const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

//Question prompt for position
function positionInfo () {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'newPosition',
            message: 'Please choose this members position:',
            choices: [{name: 'Engineer', value: 0}, {name:'Intern', value: 1}, {name:'No more team members', value:2}],
        }
    ]).then((newPositionType) => {
        //Questions for engineer
        if (newPositionType.newPosition === 0) {
            engineerInfo();
        //Questions for Intern
        } else if (newPositionType.newPosition === 1) {
            internInfo();
        // Exit app
        } else {
            createHtmlFile();
        }
    });
}

//Manager
function managerInfo () {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this person:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id of this person:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email of this person:',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter the office number of this person:',
        },

    ]).then ((managerData) => {
        const newManager = newManager(managerData.name, managerData.id, managerData.email, manager.officeNumber);
        employeeList.push(newManager);
        positionInfo();
    });
}

//Engineer
const engineerInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this person:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id of this person:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email of this person:',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please enter the github username of this person:',
        },
    ]);
}

//Intern
const internInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this person:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id of this person:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email of this person:',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Please enter the school this person attends:',
        },
    ]);
}

//Add member
const addPosition = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'addPosition',
            message: 'Do you want to add a new member?',
            choices: ['Yes', 'No'],
        },
    ]);
}

//Creating HTML
async function promptUser() {
    console.log("============");
    const positionType = await positionInfo();

    if(positionType.position === "Manager") {
        const managerData = await managerInfo();
        const manager = new Manager (managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        htmlBlock.push(manager);

    } else if (positionType.position === "engineer") {
        const engineerData = await engineerInfo();
        const engineer = new Engineer (engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        htmlBlock.push(engineer);

    } else if (positionType.position === "intern") {
        const internData = await internInfo();
        const intern = new Intern (internData.name, internData.id, internData.email, internData.school);
        htmlBlock.push(intern);
    }

    addNewMember();
}

//Create a function to add member
async function addNewMember() {
    const newMember = await addPosition();

    if (newMember.addMember === "Yes") {
        console.log("==========");
        promptUser();

    } else if (newMember.addPosition === "No") {
        const team = render(htmlE);
        fs.writeFileSync(outputPath, team);
        console.log("==========");
        console.log("Your teams HTML has been generated!")
    }
}

promptUser();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
