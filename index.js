import inquirer from "inquirer";
import fs from "node:fs/promises";

// create array with questions
    // prompts to get answers to put into md file
// title, description, installation, usage, and licence...
function createQuestions() {
    let questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a short description of your project:',
        },
        {
            type: 'input',
      name: 'installation',
      message: 'How do users install your application?',
        },
        {
            type: 'input',
      name: 'usage',
      message: 'How is your application used?',
        },
        {
            type: 'input',
            name: 'license',
            message: 'What is the license for your project?',
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'How can others contribute to your project?',
        },
        {
            type: 'input',
      name: 'tests',
      message: 'How can users test your application?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        }
    ];

    return questions;
}

// returns the answers
async function promptUser(questions) {
    let answers = {};

    answers = await inquirer.prompt(questions);
    console.log(answers);
    return answers;
}


function generateHTMLString(answers) {
    const md = `# ${answers.title}
## Description
    ${answers.description}

## Table of Contents
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Questions](#questions)

## Installation
    ${answers.installation}
    
## Usage
    ${answers.usage}
    
## License
    This project is licensed under the ${answers.license} license.
    
## Contributing
    ${answers.contributing}
    
## Tests
    ${answers.tests}
    
## Questions
    For any questions, please contact ${answers.email}.
      `;
    return md;
}

async function writeToFile(filename, htmlString) {
    try {
        await fs.writeFile(filename, htmlString);
    }
    catch (err) {
        console.log("Error writing to file", err);
    }
}

async function main() {
    const questions = createQuestions();
    const answers = await promptUser(questions);
    const htmlString = generateHTMLString(answers);
    writeToFile("README.md", htmlString);
}

main();
