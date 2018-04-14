const expect = require('expect');
const {
    Users
} = require('./users');

describe('Users', () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '123',
                name: 'amit',
                room: '1'

            },
            {
                id: '124',
                name: 'rahul',
                room: '2'

            }, {
                id: '125',
                name: 'ankit',
                room: '1'

            }
        ];
    });

    it('should add new users', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Amit',
            room: '22'
        };

        let res = users.addUser('123', 'Amit', '22');
        expect(users.users).toEqual([user]);
        expect(res).toEqual(user);
    });

    it('should return users for room no 1', () => {

        let res = users.getUserList('1');
        expect(res).toEqual(['amit', 'ankit']);

    });

    it('should return users for room no 2', () => {

        let res = users.getUserList('2');
        expect(res).toEqual(['rahul']);

    });

    it('should remove a user', () => {

         let res = users.removeUser('124');
         console.log(users);
        expect(users).toNotContain(res);


    });

    it('should not remove a user', () => {

        let res = users.removeUser('99');
        console.log(users);

        expect(res).toEqual([]);

    });

    it('should find a user', () => {

        let res = users.getUser('124');
        expect(res).toEqual([{
            id: '124',
            name: 'rahul',
            room: '2'
        }]);

    });

    it('should not find a user', () => {
        let res = users.getUser('99');
        expect(res).toEqual([]);
        
    });


});