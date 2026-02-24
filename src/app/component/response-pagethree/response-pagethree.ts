import { Component, signal } from '@angular/core';
import { ControlInstance } from '../../../model/control.instance.model';
import { ControlInstanceService } from '../../service/control-instance';

@Component({
  selector: 'app-response-pagethree',
  standalone: true,
  templateUrl: './response-pagethree.html',
  styleUrl: './response-pagethree.css',
})
export class ResponsePagethree {

  controls = signal<ControlInstance[]>([]);
  loading = signal(true);

  constructor(private controlService: ControlInstanceService) {
    this.loadControls();
  }

  private loadControls(): void {

    this.controlService
      .getControlInstances('Global_dashboard')
      .subscribe({

        next: (data) => {

          this.controls.set(data);

          this.loading.set(false);

          console.log('Filtered Controls:', data);

        },

        error: (error) => {

          console.error(error);

          this.controls.set([]);

          this.loading.set(false);

        }

      });

  }

}
