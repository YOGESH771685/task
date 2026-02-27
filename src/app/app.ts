import { Component, signal } from '@angular/core';
import { TestPageComponent } from './component/response/TestPageComponent';
import { Home } from './component/home/home';
import { ResponsePagetwo } from "./component/response-pagetwo/response-pagetwo";
import { RouterOutlet } from '@angular/router';
import { DraftEvaluteComponent } from './component/PageModeller-draft-evalute-component/PageModeller-draft-evalute-component';
import { DataModellerComponent } from './component/data-modeller-component/data-modeller-component';
import { FluentComponent } from './component/fluent-component/fluent-component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('auth-end-point');
}
