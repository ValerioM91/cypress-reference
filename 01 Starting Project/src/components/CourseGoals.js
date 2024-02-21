"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gr_1 = require("react-icons/gr");
var CourseGoal_1 = require("./CourseGoal");
var CourseGoals_module_css_1 = require("./CourseGoals.module.css");
var GOALS = [
    {
        icon: <gr_1.GrInstall />,
        text: 'Learn how to install & start Cypress',
    },
    {
        icon: <gr_1.GrEdit />,
        text: 'Learn how to write tests with Cypress',
    },
    {
        icon: <gr_1.GrTerminal />,
        text: 'Understand the core Cypress features & commands',
    },
    {
        icon: <gr_1.GrResources />,
        text: 'Customize & configure Cypress for your requirements',
    },
    {
        icon: <gr_1.GrUserExpert />,
        text: 'Learn how to write good tests & follow best practices',
    },
    {
        icon: <gr_1.GrKey />,
        text: 'Dive into more complex problems - e.g., user authentication testing',
    },
];
function CourseGoals() {
    return (<ul className={CourseGoals_module_css_1.default.goals}>
      {GOALS.map(function (goal) { return (<CourseGoal_1.default key={goal.text} {...goal}/>); })}
    </ul>);
}
exports.default = CourseGoals;
