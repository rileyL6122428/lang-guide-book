import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'loading-circle',
  template: `
    <section id="test">
      THIS IS THE LOADING BAR
      <canvas id="loading-circle" width="380" height="380"> </canvas>
    </section>
  `
})
export class LoadingCircle implements OnInit, OnDestroy {

  private theta: number;
  private removeDrawToken: any;

  constructor() {
    this.theta = 0;
  }

  ngOnInit(): void {
    this.removeDrawToken = setInterval(() => this.draw(), 20);
  }

  ngOnDestroy(): void {
    clearInterval(this.removeDrawToken);
  }

  private draw(): void {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("loading-circle");

    var context: CanvasRenderingContext2D = canvas.getContext("2d");
    this.theta += 0.1;

    context.clearRect(0, 0, 400, 400)

    context.globalAlpha = 0.8;
    context.fillStyle = "black"
    this.drawRoundedSquare(context, 5,15,370);

    context.translate(190,200)
    context.rotate(this.theta)
    context.strokeStyle = "#25A3FC";
    context.lineWidth = 15;

    var incrementTotal = 60
    for(var idx = 0; idx < incrementTotal; idx++) {
      context.globalAlpha = (1/incrementTotal) * idx
      context.beginPath();
      context.arc(
        0,
        0,
        100,
        (idx + this.loadingOverlapOffset(idx))/(incrementTotal / 2) * Math.PI,
        (idx + 1)/(incrementTotal / 2) * Math.PI,
        false
      );
      context.stroke();
    }

    context.globalAlpha = 1
    context.rotate(-this.theta)
    context.translate(-190,-200)
  }

  private loadingOverlapOffset(rotateIdx: number): number {
         if (rotateIdx < 15) { return  0    ; }
    else if (rotateIdx < 30) { return -0.01 ; }
    else if (rotateIdx < 45) { return -0.018; }
    else if (rotateIdx < 60) { return -0.035; }
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
}
