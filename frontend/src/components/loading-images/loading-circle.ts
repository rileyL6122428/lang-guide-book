import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'loading-circle',
  template: `
    <canvas id="loading-circle" width="380" height="380"> </canvas>
  `
})
export class LoadingCircle implements OnInit, OnDestroy {

  private theta: number;
  private drawIntervalToken: any;
  private canvas: HTMLCanvasElement;
  private drawingContext: CanvasRenderingContext2D;

  private backgroundAlpha: number;
  private backgroundColor: string;

  ngOnInit(): void {
    this.theta = 0;
    this.canvas = <HTMLCanvasElement> document.getElementById("loading-circle");
    this.drawingContext = this.canvas.getContext("2d");

    this.backgroundColor = "white";
    this.backgroundAlpha = 1;

    this.drawIntervalToken = setInterval(() => this.draw(), 20);
  }

  ngOnDestroy(): void {
    clearInterval(this.drawIntervalToken);
  }

  private draw(): void {
    this.theta += 0.1;

    this.drawBackground();

    this.drawingContext.translate(190,200)
    this.drawingContext.rotate(this.theta)
    this.drawingContext.strokeStyle = "#f44e42";
    this.drawingContext.lineWidth = 30;

    var incrementTotal = 60
    for(var idx = 0; idx < incrementTotal; idx++) {
      this.drawingContext.globalAlpha = (1/incrementTotal) * idx;
      this.drawingContext.beginPath();
      this.drawingContext.arc(
        0,
        0,
        100,
        (idx + this.loadingOverlapOffset(idx))/(incrementTotal / 2) * Math.PI,
        (idx + 1)/(incrementTotal / 2) * Math.PI,
        false
      );
      this.drawingContext.stroke();
    }

    this.drawingContext.globalAlpha = 1
    this.drawingContext.rotate(-this.theta)
    this.drawingContext.translate(-190,-200)
  }

  private drawBackground(): void {
    this.drawingContext.clearRect(0, 0, 400, 400)

    this.drawingContext.globalAlpha = this.backgroundAlpha;
    this.drawingContext.fillStyle = this.backgroundColor;
    this.drawRoundedSquare(this.drawingContext, 5,15,370);
  }

  private drawRoundedSquare(drawingContext: CanvasRenderingContext2D, x: number, y: number, sideLength: number): void {
    drawingContext.beginPath();
    drawingContext.moveTo(x + sideLength / 10, y + sideLength / 10)
    drawingContext.arc(x + sideLength / 10, y + sideLength / 10, sideLength / 10,  Math.PI, 1.5 * Math.PI, false);

    drawingContext.lineTo(x + 9 * sideLength / 10, y)
    drawingContext.lineTo(x + 9 * sideLength / 10, y + sideLength / 10)
    drawingContext.arc(x + 9 * sideLength / 10, y + sideLength / 10, sideLength / 10, 1.5 * Math.PI, 2 * Math.PI, false);

    drawingContext.lineTo(x + sideLength , y + sideLength * 9 / 10)
    drawingContext.lineTo(x + 9 * sideLength / 10, y + sideLength * 9 / 10)
    drawingContext.arc(x + 9 * sideLength / 10, y + sideLength * 9 / 10, sideLength / 10, 2 * Math.PI, 2.5 * Math.PI, false);

    drawingContext.lineTo(x + sideLength / 10, y + sideLength);
    drawingContext.lineTo(x + sideLength / 10 , y + sideLength * 9 / 10);
    drawingContext.arc(x + sideLength / 10, y + sideLength * 9 / 10, sideLength / 10, 2.5 * Math.PI, 3 * Math.PI, false);

    drawingContext.lineTo(x, y + sideLength / 10)
    drawingContext.fill();
  }

  private loadingOverlapOffset(rotateIdx: number): number {
    if (rotateIdx < 15) { return  0    ; }
    else if (rotateIdx < 30) { return -0.01 ; }
    else if (rotateIdx < 45) { return -0.018; }
    else if (rotateIdx < 60) { return -0.035; }
  }

}
