import { useTemplate } from "../../../../../../lib";
import { useFocusedNode, useMovingNode } from "../../../../../../lib/ctx";
import { TemplateTextareaNode } from "../../../../../../types";

type Props = {
    setShowActions: (state: boolean) => void,
    node: TemplateTextareaNode,
}
export function TextareaNodeActions({ node, setShowActions }: Props) {
    const [, dispatch] = useTemplate();
    const [focusedNode, setFocusedNode] = useFocusedNode();
    const [movingNode, setMovingNode] = useMovingNode();


    function deleteNode() {
        if (node.id === focusedNode?.id) setFocusedNode(undefined);
        if (node.id === movingNode) setMovingNode(undefined);
        dispatch({ type: 'delete', node })
        setShowActions(false);
    }

    return (
        <>
            <button onClick={deleteNode}>Delete</button>
            <button onClick={() => { setMovingNode(node.id); setShowActions(false) }}>Move</button >
        </>
    )
}