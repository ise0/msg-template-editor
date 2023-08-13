import { useState } from "react";
import { Ctx, useTemplate } from "./lib";
import styles from './styles.module.css'
import { VarsPicker } from "./blocks/vars-picker";
import { TemplateTree } from "./blocks/template-tree";
import { MsgPreviewModal } from "./blocks/template-preview";
import { Template } from "./types";

export type { Template };

type Props = { template: Template, closeWidget: () => void, saveTemplate: (template: Template) => Promise<unknown> };

export function MsgTemplateEditor({ template, closeWidget, saveTemplate }: Props) {
    return (
        <Ctx template={template}>
            <MsgTemplateEditorWithoutCtx closeWidget={closeWidget} saveTemplate={saveTemplate} />
        </Ctx>
    )
}

function MsgTemplateEditorWithoutCtx({ closeWidget, saveTemplate }: Omit<Props, 'template'>) {
    const [template] = useTemplate()
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div className={styles["template-editor"]}>
            <div className={styles['container-1']}>
                <VarsPicker />
                <div className={styles['container-2']}>
                    <button className={styles['btn']} onClick={() => setShowPreview(true)}>Preview</button>
                    <button className={styles['btn']} onClick={() => saveTemplate(template)}>Save</button>
                    <button className={styles['btn']} onClick={closeWidget}>Close</button>
                </div>
            </div>
            <div className={styles['template-tree']}><TemplateTree /></div>
            {showPreview && <MsgPreviewModal close={() => setShowPreview(false)} />}
        </div>
    );
}
