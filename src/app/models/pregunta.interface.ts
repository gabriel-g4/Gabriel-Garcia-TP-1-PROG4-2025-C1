export interface Pregunta {
  id: number;
  pregunta: string;
  categoria: {
    nombre: string;
  };
  opciones: string[];
  respuestaCorrecta: string;
}