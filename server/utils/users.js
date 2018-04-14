class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {

        let user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var users = this.users.filter((user) => user.id === id);
        if(users){
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return users;
    }

    getUser(id) {
        var users = this.users.filter((user) => user.id === id);
        // if(!users){
        //     return '';
        // }
        return users;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var nameArray = users.map((user) => user.name);

        return nameArray;   
    }
}
module.exports = {
    Users
};


// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription(){
//         return `${this.name} is ${this.age} year's old.`;
//     }
// }

// let user1 = new Person('Amit',22);
// console.log(user1.getUserDescription());