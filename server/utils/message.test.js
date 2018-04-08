var expect = require('expect');
var {generateMessage} =  require('./message');
describe('Generate Message',()=>{

    it('should generate correct message object',()=>{

        let res = generateMessage('Amit','Testing Testing');
        expect((res)=>{
            expect(res.from).toBe('Amit')
            .expect(res.text).toBe('Testing Testing')
            .expect(res.createdAt).toBeA(number);
        });
    });
});