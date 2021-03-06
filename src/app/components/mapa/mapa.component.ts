import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 4.814221;
  lng = -75.6974997;

  constructor( public snackBar: MatSnackBar,
               public dialog: MatDialog) {

    if ( localStorage.getItem('marcadores') ){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }

   }

  ngOnInit() {

  }

  agregarMarcador( evento ){

    const coords: { lat: number, lng: number } = evento.coords;

    const nuevoMarcador = new Marcador( coords.lat, coords.lng );

    this.marcadores.push( nuevoMarcador );

    this.guardarStorage();
    this.snackBar.open('Marcador Agregado', 'Cerrar', { duration: 2500 });

  }

  borrarMarcador( i: number ){

    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Eliminado', 'Cerrar', { duration: 2500 });

  }

  editarMarcador(marcador: Marcador){
    const dialogRef = this.dialog.open( MapaEditarComponent , {
      width: '250px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if ( !result ){
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;

      this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration: 2500 });

    });

  }

  guardarStorage(){

    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ))

  }

}
