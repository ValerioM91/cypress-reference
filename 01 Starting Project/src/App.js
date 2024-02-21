"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseGoals_1 = require("./components/CourseGoals");
var Header_1 = require("./components/Header");
function App() {
    return (<>
      <Header_1.default />
      <main>
        <CourseGoals_1.default />
      </main>
    </>);
}
exports.default = App;
