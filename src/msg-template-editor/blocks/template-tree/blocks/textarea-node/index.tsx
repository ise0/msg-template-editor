import { TemplateTextareaNode } from "../../../../types";
import { useFocusedNode, useTemplate } from "../../../../lib";
import { TemplateNodeActions } from "../template-node-actions";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from './styles.module.css';

export function TextareaNode({ node, children }: PropsWithChildren<{ node: TemplateTextareaNode }>) {
    const [, dispatch] = useTemplate();
    const [, setFocusedNode] = useFocusedNode();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [, setTextareaWidth] = useState(0)

    function updateFocusedNode() {
        setFocusedNode(prevValue => {
            if (prevValue?.id !== node.id ||
                prevValue.textCursorPosition !== ref.current?.selectionStart) {
                return { id: node.id, textCursorPosition: ref.current?.selectionStart }
            }
            return prevValue
        })
    }

    useEffect(() => {
        if (!ref.current) return
        const obs = new ResizeObserver(() => {
            if (ref.current) setTextareaWidth(ref.current.offsetWidth);
        });
        obs.observe(ref.current);
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        if (!ref.current) return
        ref.current.style.height = '25px';
        ref.current.style.height = `${ref.current.scrollHeight || 25}px`;
    })

    return (
        <div className={styles['node']}>
            <div className={styles['container']}>
                <TemplateNodeActions node={node} />
                <textarea
                    className={styles['textarea']}
                    ref={ref}
                    onFocus={updateFocusedNode}
                    value={node.text}
                    onKeyUp={updateFocusedNode}
                    onClick={updateFocusedNode}
                    onChange={(e) => dispatch({ type: 'changeTextareaText', node, text: e.target.value })}
                />
            </div>
            <div className={styles['childs']}>
                {children}
            </div>
        </div>
    )
}