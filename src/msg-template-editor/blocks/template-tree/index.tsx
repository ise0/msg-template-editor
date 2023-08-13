import { useTemplate } from "../../lib";
import { TemplateNode as TTemplateNode } from "../../types";
import { RootNode } from "./blocks/root-node";
import { TextareaNode } from "./blocks/textarea-node";
import { IfNode } from "./blocks/if-node";
import { ElseNode } from "./blocks/else-node";
import { MoveBtn } from "./blocks/move-node-btn";
import styles from './styles.module.css';
import React from "react";



function TemplateNode({ node }: { node: TTemplateNode }) {
    const [template] = useTemplate();

    const nodeChilds = node.type !== 'textarea' &&
        <>
            {node.childs.map((el, i) =>
                <React.Fragment key={el}>
                    <MoveBtn node={node} position={i} />
                    <TemplateNode node={template.tree[el]} />
                </React.Fragment>
            )}
            <MoveBtn node={node} position={node.childs.length} />
        </>;

    switch (node.type) {
        case 'root':
            return <RootNode node={node} children={nodeChilds} />;
        case 'textarea':
            return <TextareaNode node={node} children={nodeChilds} />;
        case 'if':
            return (
                <div className={styles["if-block"]}>
                    <IfNode node={node} children={nodeChilds} />
                    {node.elseNodeId && <TemplateNode node={template.tree[node.elseNodeId]} />}
                </div>
            );
        case 'else':
            return <ElseNode node={node} children={nodeChilds} />;
    }
}

export function TemplateTree() {
    const [template] = useTemplate();
    return <TemplateNode node={template.tree[0]} />;
}