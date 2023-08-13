import { useTemplate } from "../../lib";
import { generateTemplateMsg } from "../../lib/generate-template-msg";
import { useState } from "react";
import styles from './styles.module.css'
import { Modal } from "../../../modal";

export function MsgPreviewModal({ close }: { close: () => void }) {
    const [template] = useTemplate();
    const [vars, setVars] = useState<Record<string, string>>({});

    return (
        <Modal alignX="center" alignY="center" autoClose={close}>
            <div className={styles['msg-preview']}>
                <h3 className={styles['title']}>Message preview</h3>
                <p className={styles['text']}>{generateTemplateMsg(template, vars)}</p>
                <div className={styles['vars']}>
                    <h4 className={styles['vars__title']}>Variables:</h4>
                    {template.vars.map(el =>
                        <label className={styles['var']} key={el}>
                            <div className={styles['var__label']}>{el}</div>
                            <input className={styles['var__input']} type="text" onChange={(e) =>
                                setVars(prevValue => {
                                    const newValue = { ...prevValue, [el]: e.target.value }
                                    if (newValue[el] === '') delete newValue[el]
                                    return newValue
                                })
                            } />
                        </label>)}
                </div>
                <button onClick={close} className={styles["close-btn"]}>Close</button>
            </div>
        </Modal>
    );
}