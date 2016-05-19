/// <reference path="../typings/browser.d.ts" />


import { expect } from "chai";
import Hello from '../source/hello/hello';

describe("Hello class", () => {
    it("Should say 'hello' when given 'hello'", () => {
        let expected = 'hello';
        let given = 'hello';
        let hello = new Hello(given);
        expect(hello.sayHello()).eql(expected);
    })
})