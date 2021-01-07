const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
//------------------------
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

askForEmployeePosition();

//======Base line questions=======
function askForEmployeePosition() {
    console.log("======X======");
    console.log("ADD a position");
    console.log("======X======");


    inquirer.prompt({
        message: "What is this employee's position?",
        name:"position",
        type:"list",
        choices: ["Engineer", "Intern", "Manager"]

    }).then((response) => {
        if (response.position === "Engineer") {
            askForEngineerInfo()
        } else if (response.position === "Intern") {
            askForInternInfo();
        } else if (response.position === "Manager") {
            askForManagerInfo();
        }
    });
//=======Engineer=======
    function askForEngineerInfo() {
        console.log("======X======");
        console.log("ADD an Engineer position");
        console.log("======X======");


        inquirer.prompt([
            ...employeeQuestions,
            {
                type:"input",
                message: "What is this employees GitHub username?",
                name: "github"
            }
        ])
        .then(({name, id, email, github}) => {
            employees.push(new Engineer(name, id, email, github));
            //(response.name, response.id, response.email, response.github)
            askToContinue();
        })
        .catch(e => {
            console.log(e);
        })
    }
//=======Intern=======
    function askForInternInfo() {
        console.log("======X======");
        console.log("ADD an Intern position");
        console.log("======X======");


        inquirer.prompt([
            ...employeeQuestions,
            {
                type:"input",
                message:"What school is the intern attending?",
                name: "school"
            }
        ])
        .then(({name, id, email, school}) => {
            employees.push(new Intern(name, id, email, school));

            askToContinue();
        })
    }
//======Manager questions to add======
    function askForManagerInfo() {
        console.log("======X======");
        console.log("ADD an Intern position");
        console.log("======X======");


        inquirer.prompt([
            ...employeeQuestions,
            {
                type:"input",
                message: "What is the employees phone number?",
                name: "phone"
            }
        ])
        .then(({name, id, email, phone}) => {
            employees.push(new Manager(name, id, email, phone));

            askToContinue();
        })
        .catch(e => {
            console.log(e);
        })
    }
//======Continue prompt?=======
    function askToContinue() {
        inquirer.prompt({
            message: "Do you want to add another team member?",
            name: "addNew",
            type:"list",
            choices: [
                "yes",
                "no"
            ],
        }).then(({addNew}) => {
            if (addNew === "yes") {
                askForEmployeePosition();
            } else {
                console.log("Team profiles built successfully!");
                console.log(employees);
                createHtmlFile();
            }
        })
    }
}
//=======Render function for HTML file to be created======
function createHtmlFile() {
    const html = render(employees);
        if (! fs.existsSync(OUTPUT_DIR))
            fs.mkdirSync(OUTPUT_DIR);

    fs.writeFile(outputPath, html, (err) => {
        if (err) console.log(err);
        else console.log("HTML page created!");
    });
}

