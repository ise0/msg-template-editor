import { TemplateNode, TemplateTree } from "../types"

export function nodeIsChild(tree: TemplateTree, node: TemplateNode, parent: number): boolean {
    if (node.id === parent) {
        return true;
    } else if (node.parent === undefined) {
        return false;
    }
    return nodeIsChild(tree, tree[node.parent], parent);
}