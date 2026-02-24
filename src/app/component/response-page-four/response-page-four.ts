// import { Component, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EventActionContainer, PageEvent } from '../../../model/page.event.model';
// import {PageEventsService } from '../../service/page-events';

// @Component({
//   selector: 'app-response-page-four',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './response-page-four.html',
//   styleUrl: './response-page-four.css',
// })
// export class ResponsePageFour {

//   pageEvents = signal<PageEvent[]>([]);
//   loading = signal(true);
//   error = signal('');

//   constructor(private pageEventsService: PageEventsService) {
//     this.loadPageEvents();
//   }

//   private loadPageEvents() {
//     this.pageEventsService.getPageEvents().subscribe({
//       next: (events) => {
//         this.pageEvents.set(events);
//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error(err);
//         this.error.set('Failed to load page events');
//         this.loading.set(false);
//       },
//     });
//   }

//   getContainers(containers: EventActionContainer[] | null | undefined) {
//     return containers ?? [];
//   }
// }




import { Component, OnInit } from '@angular/core';
import { PageEvent } from '../../../model/page.event.model';
import { PageEventsService } from '../../service/page-events';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-page-events',
  templateUrl: './response-page-four.html'
})
export class ResponsePageFour implements OnInit {

  invalidEvents: PageEvent[] = [];
  loading: boolean = true;

  constructor(private pageEventsService: PageEventsService) {}

  ngOnInit(): void {

    this.pageEventsService
      .getPageEvents()
      .pipe(


        catchError((error) => {
          console.error('Error fetching page events:', error);
          return of([]);

        }),

        //  Always stop loading (success OR error)
        finalize(() => {
          this.loading = false;
        })

      )
      .subscribe((events) => {

        this.invalidEvents = events;

        console.log('Invalid Page Events:', this.invalidEvents);

      });

  }

}
