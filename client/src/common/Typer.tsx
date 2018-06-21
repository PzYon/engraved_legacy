export class Typer {
    private timer: any;

    public constructor(private textToType: string) {
    }

    public startTyping(onType: (typedText: string) => void) {
        this.typeNext(0, 500, onType);
    }

    private typeNext(index: number, delay: number, onType: (typedText: string) => void): void {
        if (index > this.textToType.length) {
            clearTimeout(this.timer);
        } else {
            this.timer = setTimeout(() => {
                const nextIndex = (Math.random() > 0.85 && index > 0) ? --index : ++index;

                onType(this.textToType.substring(0, nextIndex));
                this.typeNext(nextIndex, (Math.random() * 200) + 100, onType);

            }, delay);
        }
    }
}