import { useEffect, useState } from "react";

export function useSprite(src: string | null) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!src) {
            setImage(null);
            return;
        }

        console.log(src);

        const img = new Image();
        img.src = src;
        img.onload = () => setImage(img);

    }, [src]);

    return image;
}
