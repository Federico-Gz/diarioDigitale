// Servizio per le chiamate API al backend Spring Boot aggiornato
import { User, Materia, Compito, Voto, Messaggio, Comunicazione, LoginForm, CompitoForm, VotoForm, MessaggioForm, ComunicazioneForm } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Utility per gestire le risposte HTTP
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// AUTH API
export const authApi = {
  // Login utente
  login: async (credentials: LoginForm): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/login?username=${credentials.username}&password=${credentials.password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // Registrazione nuovo utente
  register: async (userData: Omit<User, 'uuid'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Ottieni utente per UUID
  getUserByUuid: async (uuid: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${uuid}`);
    return handleResponse(response);
  },

  // Ottieni tutti gli studenti
  getStudenti: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users/studenti`);
    return handleResponse(response);
  },

  // Ottieni tutti i docenti
  getDocenti: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users/docenti`);
    return handleResponse(response);
  },
};

// MATERIE API
export const materieApi = {
  // Ottieni tutte le materie
  getAll: async (): Promise<Materia[]> => {
    const response = await fetch(`${API_BASE_URL}/materie`);
    return handleResponse(response);
  },

  // Ottieni materia per UUID
  getByUuid: async (uuid: string): Promise<Materia> => {
    const response = await fetch(`${API_BASE_URL}/materie/${uuid}`);
    return handleResponse(response);
  },

  // Crea nuova materia
  create: async (materia: Omit<Materia, 'uuid'>): Promise<Materia> => {
    const response = await fetch(`${API_BASE_URL}/materie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(materia),
    });
    return handleResponse(response);
  },

  // Elimina materia
  delete: async (uuid: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/materie/${uuid}`, {
      method: 'DELETE',
    });
  },
};

// COMPITI API
export const compitiApi = {
  // Ottieni tutti i compiti
  getAll: async (): Promise<Compito[]> => {
    const response = await fetch(`${API_BASE_URL}/compiti`);
    return handleResponse(response);
  },

  // Ottieni compiti per studente
  getByStudente: async (studenteUuid: string): Promise<Compito[]> => {
    const response = await fetch(`${API_BASE_URL}/compiti/studente/${studenteUuid}`);
    return handleResponse(response);
  },

  // Ottieni compiti per docente
  getByDocente: async (docenteUuid: string): Promise<Compito[]> => {
    const response = await fetch(`${API_BASE_URL}/compiti/docente/${docenteUuid}`);
    return handleResponse(response);
  },

  // Ottieni compito per UUID
  getByUuid: async (uuid: string): Promise<Compito> => {
    const response = await fetch(`${API_BASE_URL}/compiti/${uuid}`);
    return handleResponse(response);
  },

  // Crea nuovo compito (solo docenti)
  create: async (compito: CompitoForm & { docenteUuid: string }): Promise<Compito> => {
    const response = await fetch(`${API_BASE_URL}/compiti`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compito),
    });
    return handleResponse(response);
  },

  // Elimina compito (solo docenti)
  delete: async (uuid: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/compiti/${uuid}`, {
      method: 'DELETE',
    });
  },
};

// VOTI API
export const votiApi = {
  // Ottieni voti per studente
  getByStudente: async (studenteUuid: string): Promise<Voto[]> => {
    const response = await fetch(`${API_BASE_URL}/voti/studente/${studenteUuid}`);
    return handleResponse(response);
  },

  // Ottieni voti assegnati da docente
  getByDocente: async (docenteUuid: string): Promise<Voto[]> => {
    const response = await fetch(`${API_BASE_URL}/voti/docente/${docenteUuid}`);
    return handleResponse(response);
  },

  // Assegna nuovo voto (solo docenti)
  create: async (voto: VotoForm & { docenteUuid: string }): Promise<Voto> => {
    const response = await fetch(`${API_BASE_URL}/voti`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voto),
    });
    return handleResponse(response);
  },
};

// MESSAGGI API
export const messaggiApi = {
  // Ottieni messaggi per studente
  getByStudente: async (studenteUuid: string): Promise<Messaggio[]> => {
    const response = await fetch(`${API_BASE_URL}/messaggi/studente/${studenteUuid}`);
    return handleResponse(response);
  },

  // Ottieni messaggi per docente
  getByDocente: async (docenteUuid: string): Promise<Messaggio[]> => {
    const response = await fetch(`${API_BASE_URL}/messaggi/docente/${docenteUuid}`);
    return handleResponse(response);
  },

  // Invia nuovo messaggio
  create: async (messaggio: MessaggioForm): Promise<Messaggio> => {
    const response = await fetch(`${API_BASE_URL}/messaggi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messaggio),
    });
    return handleResponse(response);
  },
};

// COMUNICAZIONI API
export const comunicazioniApi = {
  // Ottieni tutte le comunicazioni
  getAll: async (): Promise<Comunicazione[]> => {
    const response = await fetch(`${API_BASE_URL}/comunicazioni`);
    return handleResponse(response);
  },

  // Crea nuova comunicazione (solo docenti)
  create: async (comunicazione: ComunicazioneForm): Promise<Comunicazione> => {
    const response = await fetch(`${API_BASE_URL}/comunicazioni`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunicazione),
    });
    return handleResponse(response);
  },

  // Crea comunicazione generale (solo docenti)
  createGenerale: async (comunicazione: { docenteUuid: string; testo: string }): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/comunicazioni/generale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunicazione),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

   // Elimina comunicazione
  delete: async (uuid: string): Promise<void> => {
    if (!uuid || uuid === "null") {
    throw new Error("UUID non valido per eliminazione");
    }
    console.log('API: Eliminando comunicazione con UUID:', uuid);
    const response = await fetch(`${API_BASE_URL}/comunicazioni/${uuid}`, {
      method: 'DELETE',
    });
    console.log('API: Risposta eliminazione status:', response.status);
    
    if (!response.ok) {
      console.error('API: Errore eliminazione:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('API: Dettagli errore:', errorText);
      throw new Error(`Errore eliminazione: ${response.status} ${response.statusText}`);
    }
    
    console.log('API: Comunicazione eliminata con successo');
  },
};