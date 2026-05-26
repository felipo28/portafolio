import { Component, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { NgFor, NgIf, NgStyle, NgClass } from '@angular/common';
import { DataService, Project } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, NgClass],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {

  constructor(private zone: NgZone, private data: DataService) {}

  projects: Project[] = [];
  loading = true;

  readonly TRANSITION_MS = 900;
  readonly AUTOPLAY_DELAY = 5500;

  /** Tarjetas visibles según el ancho de pantalla */
  get perPage(): number {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  }

  /** Índice del primer card visible (0 … maxIndex) */
  currentIndex = 0;
  skipTransition = false;
  isAnimating = false;
  showAll = false;

  private autoplayInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.data.getProjects().then(projects => {
      this.projects = projects;
      this.loading = false;
      this.startAutoplay();
    });
  }
  ngOnDestroy(): void { this.stopAutoplay(); }

  @HostListener('window:resize')
  onResize(): void {
    this.currentIndex = 0;
  }

  /** Última posición válida: todos los cards visibles son proyectos reales */
  get maxIndex(): number {
    return Math.max(0, this.projects.length - this.perPage);
  }

  /** Estilo del track: translateX basado en currentIndex */
  get trackStyle(): Record<string, string> {
    const pct = (this.currentIndex / this.projects.length) * 100;
    return {
      transform: `translateX(-${pct}%)`,
      transition: this.skipTransition
        ? 'none'
        : `transform ${this.TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
      width: `${(this.projects.length / this.perPage) * 100}%`
    };
  }

  get cardWrapWidth(): string {
    return `${100 / this.projects.length}%`;
  }

  /** Un punto por cada posición válida */
  get dots(): number[] {
    return Array.from({ length: this.maxIndex + 1 }, (_, i) => i);
  }

  trackByIndex(index: number): number { return index; }

  next(): void {
    if (this.isAnimating) return;

    if (this.currentIndex >= this.maxIndex) {
      // Último grupo → regresa instantáneamente al primero
      this.skipTransition = true;
      this.currentIndex = 0;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => { this.zone.run(() => { this.skipTransition = false; }); }, 50);
      });
      return;
    }

    this.isAnimating = true;
    this.skipTransition = false;
    this.currentIndex++;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => { this.isAnimating = false; });
      }, this.TRANSITION_MS);
    });
  }

  prev(): void {
    if (this.isAnimating) return;

    if (this.currentIndex <= 0) {
      // Primer grupo → salta instantáneamente al último
      this.skipTransition = true;
      this.currentIndex = this.maxIndex;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => { this.zone.run(() => { this.skipTransition = false; }); }, 50);
      });
      return;
    }

    this.isAnimating = true;
    this.skipTransition = false;
    this.currentIndex--;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => { this.isAnimating = false; });
      }, this.TRANSITION_MS);
    });
  }

  goTo(i: number): void {
    if (this.isAnimating || i === this.currentIndex) return;
    this.isAnimating = true;
    this.skipTransition = false;
    this.currentIndex = i;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => { this.isAnimating = false; });
      }, this.TRANSITION_MS);
    });
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.zone.runOutsideAngular(() => {
      this.autoplayInterval = setInterval(() => {
        this.zone.run(() => { if (!this.showAll) this.next(); });
      }, this.AUTOPLAY_DELAY);
    });
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  toggleAll(): void {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.stopAutoplay();
    } else {
      this.skipTransition = true;
      this.currentIndex = 0;
      setTimeout(() => { this.skipTransition = false; }, 50);
      this.startAutoplay();
    }
  }
}
