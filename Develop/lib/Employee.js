// TODO: Write code to define and export the Employee class
function Employee (name) {

    this.name = name;
    this.id = id;
    this.email = email;

}

Employee.prototype.getName = function() {
    return this.name;
}

module.exports = Employee