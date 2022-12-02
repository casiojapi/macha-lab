// tests for: my-app

const assert = require('assert');
const { add } = require('./my-app.js');

describe('my-app', () => {
    describe('add', () => {
        it('should work with specefic values', () => {
            const result = add(1, 2);
            assert.equal(result, 3);
        });

        it('is commutative', () => {
            const left = add(666, 334);
            const right = add(334, 666);
            assert.equal(left, right);
        });
    });
});