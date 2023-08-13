import { TemplateAction, useTemplate } from "../../../../../../lib";
import { TemplateElseNode } from "../../../../../../types";

type Props = {
    setShowActions: (state: boolean) => void,
    node: TemplateElseNode,
}
export function ElseNodeActions({ node, setShowActions }: Props) {
    const [, dispatch] = useTemplate();

    function dispatchWithClose(a: TemplateAction) {
        setShowActions(false);
        dispatch(a);
    }

    return (
        <>
            <button onClick={() => dispatchWithClose({ type: 'delete', node })}>Delete</button>
            <button onClick={() => dispatchWithClose({ type: 'addTextarea', node })}>Add text area</button>
            <button onClick={() => dispatchWithClose({ type: 'addIf', node })}>Add if</button>
        </>
    )
}