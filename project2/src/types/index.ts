// Definizione dei tipi TypeScript basati sui DTO del backend

export interface User {
  uuid: string;
  nome: string;
  cognome: string;
  username: string;
  password: string;
  ruolo: 'DOCENTE' | 'STUDENTE';
}

export interface Materia {
  uuid: string;
  nome: string;
}

export interface Compito {
  uuid: string;
  descrizione: string;
  scadenza: string; // LocalDate viene serializzato come string
  materiaUuid: string;
  docenteUuid: string;
  studenteUuid: string;
}

export interface Voto {
  uuid: string;
  valore: number;
  studenteUuid: string;
  docenteUuid: string;
  materiaUuid: string;
}

export interface Messaggio {
  uuid: string;
  contenuto: string;
  studenteUuid: string;
  docenteUuid: string;
  nomeStudente?: string;
  nomeDocente?: string;
}

export interface Comunicazione {
  uuid: string;
  testo: string;
  studenteUuid: string;
  docenteUuid: string;
}

// Tipi per le form
export interface LoginForm {
  username: string;
  password: string;
}

export interface CompitoForm {
  descrizione: string;
  scadenza: string;
  materiaUuid: string;
  studenteUuid: string;
}

export interface VotoForm {
  valore: number;
  studenteUuid: string;
  materiaUuid: string;
}

export interface MessaggioForm {
  contenuto: string;
  studenteUuid?: string;
  docenteUuid?: string;
}

export interface ComunicazioneForm {
  testo: string;
  studenteUuid: string;
  docenteUuid: string;
}