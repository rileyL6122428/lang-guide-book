import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'loading-circle',
  template: `
    <canvas id="loading-circle" width="380" height="380"> </canvas>
  `
})
export class LoadingCircle implements OnInit, OnDestroy {

  private theta: number;
  private removeDrawToken: any;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private backgroundAlpha: number;
  private backgroundColor: string;

  ngOnInit(): void {
    this.theta = 0;
    this.canvas = <HTMLCanvasElement> document.getElementById("loading-circle");
    this.context = this.canvas.getContext("2d");

    this.backgroundColor = "white";
    this.backgroundAlpha = 1;

    this.removeDrawToken = setInterval(() => this.draw(), 20);
  }

  ngOnDestroy(): void {
    clearInterval(this.removeDrawToken);
  }

  private draw(): void {
    this.theta += 0.1;

    this.drawBackground();

    this.context.translate(190,200)
    this.context.rotate(this.theta)
    this.context.strokeStyle = "#f44e42";
    this.context.lineWidth = 30;

    var incrementTotal = 60
    for(var idx = 0; idx < incrementTotal; idx++) {
      this.context.globalAlpha = (1/incrementTotal) * idx;
      this.context.beginPath();
      this.context.arc(
        0,
        0,
        100,
        (idx + this.loadingOverlapOffset(idx))/(incrementTotal / 2) * Math.PI,
        (idx + 1)/(incrementTotal / 2) * Math.PI,
        false
      );
      this.context.stroke();
    }

    this.context.globalAlpha = 1
    this.context.rotate(-this.theta)
    this.context.translate(-190,-200)
  }

  private drawBackground(): void {
    this.context.clearRect(0, 0, 400, 400)

    this.context.globalAlpha = this.backgroundAlpha;
    this.context.fillStyle = this.backgroundColor;
    this.drawRoundedSquare(this.context, 5,15,370);
  }

  private drawRoundedSquare(context: CanvasRenderingContext2D, x: number, y: number, side: number): void {
    context.beginPath();
    context.moveTo(x + side / 10, y + side / 10)
    context.arc(x + side / 10, y + side / 10, side / 10,  Math.PI, 1.5 * Math.PI, false);

    context.lineTo(x + 9 * side / 10, y)
    context.lineTo(x + 9 * side / 10, y + side / 10)
    context.arc(x + 9 * side / 10, y + side / 10, side / 10, 1.5 * Math.PI, 2 * Math.PI, false);

    context.lineTo(x + side , y + side * 9 / 10)
    context.lineTo(x + 9 * side / 10, y + side * 9 / 10)
    context.arc(x + 9 * side / 10, y + side * 9 / 10, side / 10, 2 * Math.PI, 2.5 * Math.PI, false);

    context.lineTo(x + side / 10, y + side);
    context.lineTo(x + side / 10 , y + side * 9 / 10);
    context.arc(x + side / 10, y + side * 9 / 10, side / 10, 2.5 * Math.PI, 3 * Math.PI, false);

    context.lineTo(x, y + side / 10)
    context.fill();
  }

  private loadingOverlapOffset(rotateIdx: number): number {
    if (rotateIdx < 15) { return  0    ; }
    else if (rotateIdx < 30) { return -0.01 ; }
    else if (rotateIdx < 45) { return -0.018; }
    else if (rotateIdx < 60) { return -0.035; }
  }

}
