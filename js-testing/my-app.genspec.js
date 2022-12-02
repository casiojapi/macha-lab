// generative tests for: my-app

const assert = require('assert');

require('mocha-testcheck').install();

const { add } = require('./my-app.js');

describe('my-app - generative', () => {
    describe('add', () => {
        
        check.it('commutative', gen.int, gen.int, (x, y) => {
            const left = add(x, y);
            const right = add(y, x);
            assert.equal(right, left);
        });

        check.it('assoc', gen.int, gen.int ,gen.int, (x, y, z) => {
            const left = add(x, add(y, z));
            const right = add(add(x, y), z);
            assert.equal(left, right);
        });
    });
});