import { useState } from "react";
import { Modal } from "../../../../../modal";
import { TemplateNode } from "../../../../types";
import { RootNodeActions } from "./blocks/root-node-actions";
import { TextareaNodeActions } from "./blocks/textarea-node-actions";
import { IfNodeActions } from "./blocks/if-node-actions";
import { ElseNodeActions } from "./blocks/else-node-actions";
import styles from './styles.module.css';

export function TemplateNodeActions({ node }: { node: TemplateNode }) {
    const [showActions, setShowActions] = useState(false);
    return (
        <>
            <button className={styles['show-btn']} onClick={() => setShowActions(true)} aria-label="Edit" />
            {showActions &&
                <Modal alignX="center" alignY="center" autoClose={() => setShowActions(false)}>
                    <div className={styles['actions-modal']}>
                        {node.type === 'root' &&
                            <RootNodeActions
                                setShowActions={setShowActions}
                                node={node}
                            />
                        }
                        {node.type === 'textarea' &&
                            <TextareaNodeActions
                                setShowActions={setShowActions}
                                node={node}
                            />
                        }
                        {node.type === 'if' &&
                            <IfNodeActions
                                setShowActions={setShowActions}
                                node={node}
                            />
                        }
                        {node.type === 'else' &&
                            <ElseNodeActions
                                setShowActions={setShowActions}
                                node={node}
                            />
                        }
                        <button onClick={() => setShowActions(false)} className={styles['close-btn']}>Close</button>
                    </div>
                </Modal>
            }
        </>
    )
}