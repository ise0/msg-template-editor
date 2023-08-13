import React, { Dispatch, PropsWithChildren, SetStateAction, useContext, useReducer, useState } from "react";
import { Template } from "../types";
import { templateReducer } from "./template-reducer";
import { TemplateAction } from "./template-reducer";

type TemplateState = [Template, Dispatch<TemplateAction>];
type FocusedNode = { id: number, textCursorPosition?: number };
type FocusedNodeState = [FocusedNode | undefined, Dispatch<SetStateAction<FocusedNode | undefined>>];
type MovingTemplateNodeState = [number | undefined, Dispatch<SetStateAction<number | undefined>>];

const TemplateCtx = React.createContext<TemplateState | null>(null);
const FocusedNodeCtx = React.createContext<FocusedNodeState | null>(null);
const MovingTemplateNodeCtx = React.createContext<MovingTemplateNodeState | null>(null);

export function Ctx({ children, template }: PropsWithChildren<{ template: Template }>) {
    const templateState = useReducer(templateReducer, template);
    const focusedNodeState = useState<FocusedNode>();
    const movingTemplateNodeState = useState<number>();

    return (
        <TemplateCtx.Provider value={templateState}>
            <FocusedNodeCtx.Provider value={focusedNodeState}>
                <MovingTemplateNodeCtx.Provider value={movingTemplateNodeState}>
                    {children}
                </MovingTemplateNodeCtx.Provider>
            </FocusedNodeCtx.Provider>
        </TemplateCtx.Provider>
    );
}

export function useTemplate() {
    const value = useContext(TemplateCtx);
    if (value === null) {
        throw new Error("useTemplate must be used within a TemplateCtx");
    }
    return value;
}


export function useFocusedNode() {
    const value = useContext(FocusedNodeCtx);
    if (value === null) {
        throw new Error("useFocusedNode must be used within a FocusedNodeCtx");
    }
    return value;
}

export function useMovingNode() {
    const value = useContext(MovingTemplateNodeCtx);
    if (value === null) {
        throw new Error("useMovingNode must be used within a MovingTemplateNodeCtx");
    }
    return value;
}