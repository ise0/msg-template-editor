import { Template, TemplateNode } from "../types";

function checkIfCondition(condition: string, vars: Record<string, string>) {
    const res = condition.matchAll(/{([^{}\s]+?)}/g);
    const conditionVars = res ? Array.from(res) : [];
    return conditionVars.every(el => vars[el[1]] !== undefined);
}

function fillTextWithVars(text: string, templateVars: string[], vars: Record<string, string>) {
    return text.replace(/{([^{}\s]+?)}/g, (match, ...args) => {
        if (templateVars.includes(args[0])) return vars[args[0]] || '';
        return match
    });
}

export function generateTemplateMsg(template: Template, vars: Record<string, string>, node?: TemplateNode): string {
    const { tree } = template;
    if (!node) node = tree[0];

    switch (node.type) {
        case 'root':
            return node.childs.reduce((text, nodeId) => {
                return text + generateTemplateMsg(template, vars, tree[nodeId]);
            }, '');
        case 'textarea':
            return fillTextWithVars(node.text, template.vars, vars);
        case 'if':
            if (checkIfCondition(node.condition, vars)) {
                return node.childs.reduce((msg, nodeId) => {
                    return msg + generateTemplateMsg(template, vars, tree[nodeId])
                }, '');
            } else {
                return node.elseNodeId ? generateTemplateMsg(template, vars, tree[node.elseNodeId]) : '';
            }
        case 'else':
            return node.childs.reduce((msg, nodeId) => {
                return msg + generateTemplateMsg(template, vars, tree[nodeId])
            }, '');
    }
}