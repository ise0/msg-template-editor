import { useState } from 'react'
import styles from './styles.module.css'
import { useFocusedNode, useTemplate } from '../../lib'

export function VarsPicker() {
    const [template, dispatch] = useTemplate();
    const [varInput, setVarInput] = useState('');
    const [focusedNode] = useFocusedNode();

    function onVarClick(varName: string) {
        if (!focusedNode) return;
        const node = template.tree[focusedNode.id];
        if (node.type === 'textarea') {
            const text = node.text;
            let cursorPosition = focusedNode.textCursorPosition || 0;
            dispatch({ type: 'changeTextareaText', node, text: `${text.slice(0, cursorPosition)}{${varName}}${text.slice(cursorPosition)}` });
        } else if (node.type === 'if') {
            const text = node.condition;
            if (text.includes(`{${varName}}`)) return;
            dispatch({ type: 'changeIfCondition', node, condition: `{${varName}} ${text}` });
        }
    }

    function deleteVar(varName: string) {
        dispatch({ type: 'changeVars', vars: template.vars.filter(el => el !== varName) })
    }

    return (
        <div className={styles['vars-picker']}>
            <h3 className={styles['title']}>Variables</h3>
            <div className={styles['container']}>
                <input
                    className={styles['var-input']}
                    type="text"
                    value={varInput}
                    onChange={(e) => setVarInput(e.target.value.replaceAll(/[{}\s]/g, ''))}
                    onKeyDown={(e) => {
                        if (e.key !== 'Enter' || template.vars.includes(varInput) || !varInput) return;
                        dispatch({ type: "changeVars", vars: [...template.vars, varInput] });
                        setVarInput('');
                    }}
                />
            </div>
            <div className={styles['vars']}>
                {template.vars.map(el => (
                    <div className={styles['var']} key={el}>
                        <button className={styles['var__del-btn']} onClick={() => deleteVar(el)} aria-label='delete'>-</button>
                        <button className={styles['var__add-btn']} onClick={() => onVarClick(el)}>{el}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}