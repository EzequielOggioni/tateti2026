import { Component, signal } from '@angular/core';
import { Jugada } from './jugada';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  public jugadorActual: number = 1;
  public lista: Array<Jugada> = Array.from({ length: 9 }, (_, i) => new Jugada());

  public asignar(lugar: Jugada): void {
    if(lugar.activa) return;
    lugar.activa = true;
    lugar.jugador = this.jugadorActual;
    this.jugadorActual = this.jugadorActual == 1 ? 2 : 1;
    this.validar();
  }
  public validar() {
    const combinaciones = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const combinacion of combinaciones) {
      const [a, b, c] = combinacion;    
      if (this.lista[a].jugador !== 0 &&
          this.lista[a].jugador === this.lista[b].jugador &&
          this.lista[a].jugador === this.lista[c].jugador
        && this.lista[a].activa && this.lista[b].activa && this.lista[c].activa
        ) {
        alert(`Jugador ${this.lista[a].jugador} gana!`);
        this.reiniciar();
        break;
      }
    }
  }
  public reiniciar(): void {
    this.lista.forEach(jugada => {
      jugada.activa = false;
      jugada.jugador = 0;
    });
  }
}
