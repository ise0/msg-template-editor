import { TemplateAction, useTemplate } from "../../../../../../lib";
import { TemplateRootNode } from "../../../../../../types";

type Props = {
    setShowActions: (state: boolean) => void,
    node: TemplateRootNode,
}
export function RootNodeActions({ node, setShowActions }: Props) {
    const [, dispatch] = useTemplate()

    const dispatchWithClose = (a: TemplateAction) => {
        setShowActions(false);
        dispatch(a);
    }

    return (
        <>
            <button onClick={() => dispatchWithClose({ type: 'addTextarea', node })}>Add text area</button>
            <button onClick={() => dispatchWithClose({ type: 'addIf', node })}>Add if</button>
        </>
    )
}