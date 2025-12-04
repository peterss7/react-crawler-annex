import { useEffect, useState } from "react";
import type { KeysState } from "../types/KeyTypes";
import { INITIAL_KEYS } from "../constants/KeyConstants";

export default function useArrowKeys(): KeysState {
    const [keys, setKeys] = useState<KeysState>(INITIAL_KEYS);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) {
                console.log(`Hi: ${e.key}`);
                setKeys((prev) => ({ ...prev, [e.key]: true }));
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) {
                setKeys((prev) => ({ ...prev, [e.key]: false }));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    });
    return keys;
}