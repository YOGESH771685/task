import { Component, signal } from '@angular/core';
import { TestPageComponent } from './component/response/TestPageComponent';
import { Home } from './component/home/home';
import { ResponsePagetwo } from "./component/response-pagetwo/response-pagetwo";
import { RouterOutlet } from '@angular/router';
import { DraftEvaluteComponent } from './component/draft-evalute-component/draft-evalute-component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Home, RouterOutlet,DraftEvaluteComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('auth-end-point');
}
