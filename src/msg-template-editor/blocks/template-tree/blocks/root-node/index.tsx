import { TemplateRootNode } from "../../../../types"
import { TemplateNodeActions } from "../template-node-actions"
import { PropsWithChildren } from "react"
import styles from './styles.module.css'

export function RootNode({ node, children }: PropsWithChildren<{ node: TemplateRootNode }>) {
    return (
        <div className={styles['node']}>
            <div className={styles['container']}>
                <TemplateNodeActions node={node} />
                <h3 className={styles['title']}>TEMPLATE TREE</h3>
            </div>
            <div className={styles['childs']}>
                {children}
            </div>
        </div>
    )
}