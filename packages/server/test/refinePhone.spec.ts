import { expect } from "chai";
import {refinePhone} from "../src/utils/refinePhone"
import 'mocha'


describe('refine phone number to expected format', () => {
    it('return refined phone number without begining 0', () => {
        expect(refinePhone("9121112112")).to.equal("989121112112")
    });
    it('return refined phone number with begining +', () => {
        expect(refinePhone("+9121112112")).to.equal("989121112112")
    });
    it('return refined phone number begins with many unnecessary numbers ', () => {
        expect(refinePhone("00000000000009121112112")).to.equal("989121112112")
    });
    it('return refined phone number begins with 00', () => {
        expect(refinePhone("009121112112")).to.equal("989121112112")
    });
    it('return refined phone number begins with +0', () => {
        expect(refinePhone("+09121112112")).to.equal("989121112112")
    });
});
