import { TemplateAction, useTemplate } from "../../../../../../lib";
import { useFocusedNode, useMovingNode } from "../../../../../../lib/ctx";
import { TemplateIfNode } from "../../../../../../types";

type Props = {
    setShowActions: (state: boolean) => void,
    node: TemplateIfNode,
}
export function IfNodeActions({ node, setShowActions }: Props) {
    const [, dispatch] = useTemplate();
    const [focusedNode, setFocusedNode] = useFocusedNode();
    const [movingNode, setMovingNode] = useMovingNode();


    function deleteNode() {
        if (node.id === focusedNode?.id) setFocusedNode(undefined);
        if (node.id === movingNode) setMovingNode(undefined);
        dispatch({ type: 'delete', node })
        setShowActions(false);
    }

    const dispatchWithClose = (a: TemplateAction) => {
        setShowActions(false);
        dispatch(a);
    }

    return (
        <>
            <button onClick={deleteNode}>Delete</button>
            <button onClick={() => { setMovingNode(node.id); setShowActions(false) }}>Move</button >
            {node.elseNodeId === undefined && <button onClick={() => dispatchWithClose({ type: 'addElse', node })}>Add else</button>}
            <button onClick={() => dispatchWithClose({ type: 'addTextarea', node })}>Add text area</button>
            <button onClick={() => dispatchWithClose({ type: 'addIf', node })}>Add if</button>
        </>
    )
}