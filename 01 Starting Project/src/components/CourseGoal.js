"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseGoal_module_css_1 = require("./CourseGoal.module.css");
function CourseGoal(_a) {
    var icon = _a.icon, text = _a.text;
    return (<li className={CourseGoal_module_css_1.default.goal}>
      <span className={CourseGoal_module_css_1.default.icon}>{icon}</span>
      <span>{text}</span>
    </li>);
}
exports.default = CourseGoal;
