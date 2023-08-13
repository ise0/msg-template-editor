import { useState } from "react";
import { MsgTemplateEditor } from "../msg-template-editor";
import { getTemplateState, saveTemplate } from "./lib";
import './normalize.css';
import './global-styles.css';
import styles from "./styles.module.css";

export function App() {
    const [showMsgTemplateEditor, setShowMsgTemplateEditor] = useState(false);

    return (!showMsgTemplateEditor ?
        <button className={styles['show-btn']} onClick={() => setShowMsgTemplateEditor(true)}>
            Message editor
        </button>
        :
        <MsgTemplateEditor
            template={getTemplateState()}
            saveTemplate={saveTemplate}
            closeWidget={() => setShowMsgTemplateEditor(false)}
        />
    );
}