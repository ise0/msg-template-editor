
export type TemplateRootNode = {
    id: number,
    type: 'root',
    parent: undefined,
    childs: number[]
};

export type TemplateTextareaNode = {
    id: number,
    type: 'textarea',
    parent: number,
    childs: number[]
    text: string
};

export type TemplateIfNode = {
    id: number,
    type: 'if',
    parent: number,
    childs: number[]
    condition: string,
    elseNodeId?: number
};
export type TemplateElseNode = {
    id: number,
    type: 'else',
    parent: number,
    childs: number[]
};

export type TemplateNode = TemplateRootNode | TemplateTextareaNode | TemplateIfNode | TemplateElseNode;

export type TemplateTree = Record<number, TemplateNode>;

export type Template = { tree: TemplateTree, vars: string[] };