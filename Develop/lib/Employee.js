// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {

    this.name = name;
    this.id = id;
    this.email = email;
    this.position = "Employee";

    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getPosition(){
        return this.position;
    }
}

module.exports = Employee;