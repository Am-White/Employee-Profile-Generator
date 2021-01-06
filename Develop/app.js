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

//Asks user which position to add
const positionInfo = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Please choose the role of this member:',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
    ]);
}

//Manager questionnaire
const employeeQuestions = [
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this member:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID number of this member:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the Email of this member:',
        },
        {
            type: 'input',
            name: 'position',
            message: 'Please enter your employee position:',
        }
    ];







    

//Add more people to the team
const addMember = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'addMember',
            message: 'Do you want to add another new member?',
            choices: ['Yes', 'No'],
        },
    ]);
}

//Creates HTML 
async function promptUser() {
    console.log("-----------------------");
    const roleType = await positionInfo();
    
    if (roleType.role === "Manager") {
        const managerData = await managerInfo();
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        employeeList.push(manager);

    } else if (roleType.role === "Engineer") {
        const engineerData = await engineerInfo();
        const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        employeeList.push(engineer);

    } else if (roleType.role === "Intern") {
        const internData = await internInfo();
        const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
        employeeList.push(intern);
    }

    addNewMember();
}

// Create a function to add new member or end up to write the team html file
async function addNewMember() {
    const newMember = await addMember();

    if (newMember.addMember === "Yes") {
        console.log("==x==");
        promptUser();
        
    } else if (newMember.addMember === "No") {
        const team = render(employeeList);
        fs.writeFileSync(outputPath, team);
        console.log("==x==");
        console.log("Your teams page has been created!")
    }
}

promptUser();
