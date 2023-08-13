import { Template } from "../../msg-template-editor";

export function getTemplateState(): Template {
    const template: Template = JSON.parse(localStorage.getItem('template') || 'null') ||
        { tree: { 0: { id: 0, type: 'root', parent: undefined, childs: [] } }, vars: [] };

    if (template.vars.length === 0) template.vars = ['firstname', 'lastname', 'company', 'position'].sort();

    return template;
}

export async function saveTemplate(template: Template) {
    localStorage.setItem('template', JSON.stringify(template));
}