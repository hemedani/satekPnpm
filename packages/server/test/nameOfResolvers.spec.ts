import { expect } from "chai";
import { createResolverName, deleteResolverName, getAllResolverName, updateResolverName, getResolverName } from "../src/utils/nameOfResolvers"
import { plural } from "pluralize"
import 'mocha'


describe('testing name of resolvers',()=>{
    it('create resolver',()=>{
        expect(createResolverName("resolverTest")).to.equal("create"+"resolverTest");
    });
    it('delete resolver',()=>{
        expect(deleteResolverName("resolverTest")).to.equal("delete"+"resolverTest");
    });
    it('get resolver for all tables',()=>{
        expect(getAllResolverName("resolverTest")).to.equal("get"+plural("resolverTest"));
    });
    it('update resolver',()=>{
        expect(updateResolverName("resolverTest")).to.equal("update"+"resolverTest");
    });
    it('single get resolver',()=>{
        expect(getResolverName("resolverTest")).to.equal("get"+"resolverTest");
    });


});