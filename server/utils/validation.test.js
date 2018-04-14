const expect = require('expect');
const {isRealString }= require('./validation');

describe('isRealString()',()=>{

    it('should reject non-string values',()=>{

        let result = isRealString(98);
        expect(result).toBe(false);

    });

    it('should reject string with only spaces',()=>{

        let result = isRealString('     ');
        expect(result).toBe(false);

    });

    it('should allow string with non-spaces characters',()=>{
        let result = isRealString('   amit   ');
        expect(result).toBe(true);
    });
});