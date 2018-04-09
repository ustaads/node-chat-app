var expect = require('expect');
var {generateMessage, generateLocationMessage} =  require('./message');
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

describe('Generate Location Message',()=>{
    it('should generate correct latitude and longitude',()=>{

        let from = 'Amit';
        let latitude = 1;
        let longitude = 2;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let res = generateLocationMessage(from,latitude,longitude);
        expect((res)=>{
            
            expect(res.createdAt).toBeA(number)
            .expect(res.from).toBe(from)
            .expect(res.url).toBe(url);

        });
    });
});