export class Typer {
  private typeTimer: any;
  private readonly cursorInterval: any;

  private readonly typoProbability: number = 0.1;
  private readonly blinkDurationMs = 600;
  private readonly idleBlinkDuration = this.blinkDurationMs * 3;

  public constructor(
    private textToType: string,
    private printText: (text: string) => void,
    private toggleCursor: (show?: boolean) => void
  ) {
    this.cursorInterval = setInterval(this.toggleCursor, this.blinkDurationMs);
  }

  public start() {
    this.typeNextChar();
  }

  public end = (): void => {
    this.toggleCursor(false);
    clearTimeout(this.typeTimer);
    clearInterval(this.cursorInterval);
  };

  private typeNextChar(index: number = 0): void {
    const hasNotStarted = index === 0;
    const isDone = index > this.textToType.length;
    const delay = hasNotStarted || isDone ? this.idleBlinkDuration : Typer.getTypeInMs();

    this.typeTimer = setTimeout(() => {
      if (isDone) {
        this.end();
        return;
      }

      const nextIndex = this.getNextIndex(index);

      this.printText(this.textToType.substring(0, nextIndex));
      this.typeNextChar(nextIndex);
    }, delay);
  }

  private getNextIndex(index: number) {
    const isTypo = Math.random() < this.typoProbability;
    return isTypo && index > 0 ? --index : ++index;
  }

  private static getTypeInMs() {
    return Math.random() * 200 + 50;
  }
}
