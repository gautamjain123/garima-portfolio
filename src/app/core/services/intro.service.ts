import { Injectable, signal } from '@angular/core';

/** Signals when the intro loader has lifted, so the hero can start its entrance. */
@Injectable({ providedIn: 'root' })
export class IntroService {
  readonly done = signal(false);
}
