import { Template, TemplateElseNode, TemplateIfNode, TemplateNode, TemplateRootNode, TemplateTextareaNode, TemplateTree } from "../types";

export type TemplateAction =
    { type: "addTextarea", node: Exclude<TemplateNode, TemplateTextareaNode> } |
    { type: "addIf", node: Exclude<TemplateNode, TemplateTextareaNode> } |
    { type: "addElse", node: TemplateIfNode } |
    { type: "changeIfCondition", node: TemplateIfNode, condition: string } |
    { type: "changeTextareaText", node: TemplateTextareaNode, text: string } |
    { type: "delete", node: Exclude<TemplateNode, TemplateRootNode> } |
    { type: "changeVars", vars: string[] } |
    { type: "moveNode", node: TemplateNode, parentNode: TemplateNode, position: number };

export function newNodeId(tree: TemplateTree) {
    return Math.max(...Object.values(tree).map(el => el.id)) + 1;
}

export function templateReducer(state: Template, action: TemplateAction): Template {
    const { tree } = state;
    switch (action.type) {
        case "addTextarea": {
            const { node } = action;
            const id = newNodeId(state.tree);
            const newTextareaNode: TemplateTextareaNode = {
                id,
                type: 'textarea',
                parent: node.id,
                childs: [],
                text: ''
            };
            const updatedNode = { ...node, childs: [...node.childs, id] };
            const updatedTree = { ...tree, [updatedNode.id]: updatedNode, [id]: newTextareaNode };
            return { ...state, tree: updatedTree };
        }
        case "addIf": {
            const id = newNodeId(state.tree);
            const newIfNode: TemplateIfNode = {
                id,
                type: 'if',
                parent: action.node.id,
                childs: [],
                condition: ''
            };
            const updatedNode = { ...action.node, childs: [...action.node.childs, id] };
            const updatedTree = { ...tree, [updatedNode.id]: updatedNode, [id]: newIfNode };
            return { ...state, tree: updatedTree };
        }
        case "addElse": {
            const id = newNodeId(state.tree);
            const newElseNode: TemplateElseNode = {
                id,
                type: 'else',
                parent: action.node.id,
                childs: []
            };
            const updatedNode: TemplateIfNode = { ...action.node, elseNodeId: id };
            const updatedTree = { ...tree, [updatedNode.id]: updatedNode, [id]: newElseNode };
            return { ...state, tree: updatedTree };
        }
        case 'delete': {
            const updatedTree = { ...tree };

            const updatedParentNode = { ...tree[action.node.parent] };
            if (action.node.type === 'else' && updatedParentNode.type === 'if' && updatedParentNode.elseNodeId) {
                updatedParentNode.elseNodeId = undefined;
            }
            updatedParentNode.childs = updatedParentNode.childs.filter(el => el !== action.node.id);
            updatedTree[updatedParentNode.id] = updatedParentNode;

            const deleteNodeFromTree = (node: TemplateNode) => {
                if (node.type === 'if' && node.elseNodeId) deleteNodeFromTree(updatedTree[node.elseNodeId]);
                node.childs.forEach(el => deleteNodeFromTree(updatedTree[el]));
                delete updatedTree[node.id];
            }
            deleteNodeFromTree(action.node)

            return { ...state, tree: updatedTree };
        }
        case 'changeTextareaText': {
            const updatedNode = { ...action.node, text: action.text };
            const updatedTree = { ...tree, [updatedNode.id]: updatedNode };
            return { ...state, tree: updatedTree };
        }
        case 'changeIfCondition': {
            const updatedNode = { ...action.node, condition: action.condition };
            const updatedTree = { ...tree, [updatedNode.id]: updatedNode };
            return { ...state, tree: updatedTree };
        }
        case 'changeVars':
            return { ...state, vars: [...action.vars].sort() };
        case 'moveNode': {
            if (action.node.type === 'root') return state;

            let { position } = action;

            if (action.parentNode.id === action.node.parent &&
                action.parentNode.childs.indexOf(action.node.id) < position) {
                position--
            }

            const updatedNode = { ...action.node, parent: action.parentNode.id };

            const prevParent = { ...state.tree[action.node.parent] };
            prevParent.childs = prevParent.childs.filter(el => el !== action.node.id);

            const newParent = { ...state.tree[action.parentNode.id] };
            newParent.childs = newParent.childs.filter(el => el !== action.node.id);
            newParent.childs = [
                ...newParent.childs.slice(0, position),
                updatedNode.id,
                ...newParent.childs.slice(position)
            ];

            const updatedTree = {
                ...state.tree,
                [prevParent.id]: prevParent,
                [newParent.id]: newParent,
                [updatedNode.id]: updatedNode,
            };

            return { ...state, tree: updatedTree }
        }
    }
}