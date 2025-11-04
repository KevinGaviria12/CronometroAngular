import { Component, OnDestroy } from '@angular/core';
import { CronoService } from './services/crono-service.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // 
})
export class App implements OnDestroy {

  time = '00:00:00:000'; // valor inicial
  sub?: Subscription;

  constructor(private crono: CronoService) {}

  start() {
    // Evitar múltiples suscripciones
    if (this.sub && !this.sub.closed) return;

    // Iniciar suscripción al Observable del servicio
    this.sub = this.crono.getTimer().subscribe((value: string) => {
      this.time = value;
    });
  }

  stop() {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  reset() {
    this.stop(); // Detiene el contador
    this.time = '00:00:00:000'; 
    // Nota: no volvemos a llamar a this.start() aquí para que
    // el botón "Reiniciar" deje el cronómetro en 00:00:00:000 y
    // lo detenga. Si prefieres que reinicie automáticamente, descomenta:
    // this.start();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
