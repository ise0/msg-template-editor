import { Template } from "../types";
import { generateTemplateMsg } from "./generate-template-msg";

const templateWithAllNodes: Template = {
    tree: {
        0: { type: 'root', id: 0, childs: [1, 2], parent: undefined },
        1: { type: 'textarea', id: 1, childs: [], parent: 0, text: 'Hello, {firstName}! ' },
        2: { type: 'if', id: 2, childs: [3], parent: 0, condition: '{company}', elseNodeId: 4 },
        3: { type: 'textarea', id: 3, childs: [], parent: 2, text: 'I know you work at {company}.' },
        4: { type: 'else', id: 4, childs: [5], parent: 0 },
        5: { type: 'textarea', id: 5, childs: [], parent: 4, text: 'Where do you work at the moment?' }
    },
    vars: ['firstName', 'company']
};

const templateWithoutVars: Template = {
    tree: {
        0: { type: 'root', id: 0, childs: [1], parent: undefined },
        1: { type: 'textarea', id: 1, childs: [], parent: 0, text: 'Hello, {Mike}!' },
    },
    vars: []
};

const templateWithNestedIf: Template = {
    tree: {
        0: { type: 'root', id: 0, childs: [1], parent: undefined },
        1: { type: 'if', id: 1, childs: [2,3], parent: 0, condition: '{firstname}', elseNodeId: 5 },
        2: { type: 'textarea', id: 2, childs: [], parent: 1, text: 'Hello, {firstname}! ' },
        3: { type: 'if', id: 3, childs: [4], parent: 1, condition: '{company}' },
        4: { type: 'textarea', id: 4, childs: [], parent: 3, text: 'I know you work at {company}.' },
        5: { type: 'else', id: 5, childs: [6], parent: 1 },
        6: { type: 'textarea', id: 6, childs: [], parent: 5, text: 'What is your name?' }
    },
    vars: ['firstname', 'company']
};


test('generate template msg with textarea and if-then case', () => {
    const vars = {
        firstName: 'Bill',
        company: 'Microsoft'
    };
    expect(generateTemplateMsg(templateWithAllNodes, vars, undefined))
        .toBe('Hello, Bill! I know you work at Microsoft.');
});

test('generate template msg with textarea and else case', () => {
    const vars = {
        firstName: 'Bill'
    };
    expect(generateTemplateMsg(templateWithAllNodes, vars, undefined))
        .toBe('Hello, Bill! Where do you work at the moment?');
});

test('generate template msg with missing var in template ', () => {
    expect(generateTemplateMsg(templateWithoutVars, {}, undefined))
        .toBe('Hello, {Mike}!');
});

test('generate template msg with nested if', () => {
    const vars = {
        firstname: 'Bill',
        company: 'Microsoft'
    }
    expect(generateTemplateMsg(templateWithNestedIf, vars, undefined))
        .toBe('Hello, Bill! I know you work at Microsoft.');
});