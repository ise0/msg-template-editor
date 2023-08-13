import { nodeIsChild } from "../../../../lib";
import { useMovingNode, useTemplate } from "../../../../lib/ctx";
import { TemplateNode } from "../../../../types";
import styles from './styles.module.css'

export function MoveBtn({ node, position }: { node: TemplateNode, position: number }) {
    const [template, dispatch] = useTemplate();
    const [movingNode, setMovingNode] = useMovingNode();

    if (!movingNode ||
        node.childs[position] === movingNode ||
        (position > 0 && node.childs[position - 1] === movingNode) ||
        nodeIsChild(template.tree, node, movingNode)
    ) {
        return null;
    }

    function moveNode() {
        if (!movingNode) return;
        dispatch({ type: 'moveNode', node: template.tree[movingNode], parentNode: node, position });
        setMovingNode(undefined)
    }

    return (
        <div className={styles['move-btn']} >
            <button
                className={styles['move-btn__cancel']}
                onClick={() => setMovingNode(undefined)}
                aria-label="cancel node moving"
            >
                x
            </button>
            <button onClick={moveNode} className={styles['move-btn__here']}>here</button>
        </div>
    )
}