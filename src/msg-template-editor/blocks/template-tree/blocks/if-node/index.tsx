import { TemplateIfNode } from "../../../../types"
import { useFocusedNode, useTemplate } from "../../../../lib"
import { TemplateNodeActions } from "../template-node-actions"
import { PropsWithChildren, useEffect, useRef } from "react"
import styles from './styles.module.css'

export function IfNode({ node, children }: PropsWithChildren<{ node: TemplateIfNode }>) {
    const [, dispatch] = useTemplate()
    const [, setFocusedNode] = useFocusedNode();
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!ref.current) return
        ref.current.style.height = '25px';
        ref.current.style.height = `${ref.current.scrollHeight || 25}px`;
    })

    return (
        <div className={styles['node']}>
            <div className={styles['container']}>
                <TemplateNodeActions node={node} />
                <h3 className={styles['if-title']}>IF</h3>
                <textarea
                    className={styles['textarea']}
                    ref={ref}
                    value={node.condition}
                    onFocus={() => setFocusedNode({ id: node.id })}
                    onChange={(e) => dispatch({ type: 'changeIfCondition', node, condition: e.target.value })}
                />
                <h3 className={styles['then-title']}>THEN</h3>
            </div>
            <div className={styles['childs']}>
                {children}
            </div>
        </div>
    )
}