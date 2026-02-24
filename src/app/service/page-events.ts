// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, Observable } from 'rxjs';
// import {
//   PageEvent,
//   PageEventsApiResponse,
//   PageEventApi
// } from '../../model/page.event.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class PageEventsService {

//   private apiUrl = 'http://192.168.1.123:4284/devum/pageEventsContainers';

//   constructor(private http: HttpClient) {}

//   getPageEvents(): Observable<PageEvent[]> {
//     return this.http.get<PageEventsApiResponse>(this.apiUrl).pipe(
//       map((response) =>
//         response.published.map((event: PageEventApi) => ({
//           ...event,
//           eventActionContainers: this.parseContainers(
//             event.eventActionContainers
//           )
//         }))
//       )
//     );
//   }

//   private parseContainers(value: string) {
//     try {
//       return JSON.parse(value);
//     } catch {
//       return [];
//     }
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  PageEvent,
  PageEventsApiResponse,
  PageEventApi,
  EventActionContainer
} from '../../model/page.event.model';

@Injectable({
  providedIn: 'root',
})
export class PageEventsService {
  private apiUrl =
    'http://192.168.1.123:4284/devum/pageEventsContainers/draftsByAggregateName/Global_dashboard';

  constructor(private http: HttpClient) {}

  //  returns invalid events
  getPageEvents(): Observable<PageEvent[]> {
    return this.http.get<PageEventsApiResponse>(this.apiUrl).pipe(
      map((response) => {

        const allEvents = [...(response.published || []), ...(response.drafts || [])];

        return allEvents.map((event: PageEventApi) => {
          const parsedContainers = this.parseContainers(event.eventActionContainers);

          const isInvalid = this.checkInvalidContainers(parsedContainers);

          return {
            ...event,
            eventActionContainers: parsedContainers,
            isInvalid: isInvalid,
          };
        });
      }),

      // filtering only invalid events
      map((events) => events.filter((event) => event.isInvalid === true)),
    );
  }

  //  Converting backend  string into  JSON
  private parseContainers(value: string): EventActionContainer[] {
    if (!value || value.trim() === '') {
      return [];
    }

    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }

  //  Validation logic
  private checkInvalidContainers(containers: EventActionContainer[]): boolean {
    // checking null, undefined, empty//like containers mising or empty
    if (!containers || containers.length === 0) {
      return true;
    }

    // checking all containers have empty actions and  paramBindings
    return containers.every((container) => {
      const actionsEmpty = !container.actions || container.actions.length === 0;

      const paramBindingsEmpty = !container.paramBindings || container.paramBindings.length === 0;

      return actionsEmpty && paramBindingsEmpty;
    });
  }
}
//pageEventsContainers
