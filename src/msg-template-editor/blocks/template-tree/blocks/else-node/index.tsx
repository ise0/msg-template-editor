import { TemplateElseNode } from "../../../../types"
import { TemplateNodeActions } from "../template-node-actions"
import { PropsWithChildren } from "react"
import styles from './styles.module.css'

export function ElseNode({ node, children }: PropsWithChildren<{ node: TemplateElseNode }>) {
    return (
        <div className={styles['node']}>
            <div className={styles['container']}>
                <TemplateNodeActions node={node} />
                <h3 className={styles['title']}>Else</h3>
            </div>
            <div className={styles['childs']}>
                {children}
            </div>
        </div>
    )
}