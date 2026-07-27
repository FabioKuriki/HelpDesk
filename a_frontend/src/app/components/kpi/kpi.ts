import { Component, Input } from '@angular/core';
import { Card } from '../card/card';


@Component({
  selector: 'app-kpi',
  imports: [Card],
  templateUrl: './kpi.html',
  styleUrl: './kpi.css',
})
export class Kpi {
  @Input({required: true}) src!: String;
  @Input({required: true}) backgroundColor!: String;
  @Input({required: true}) title!: String;
  @Input({required: true}) value!: String;
}
