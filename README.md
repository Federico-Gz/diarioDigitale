
# Diario Digitale

Un'applicazione web moderna per la gestione delle attività scolastiche e la comunicazione tra studenti e docenti.

## 📋 Descrizione

Diario Digitale è un'applicazione web pensata per facilitare la comunicazione e la gestione delle attività tra studenti e docenti. Grazie a una dashboard personalizzata, ogni utente può accedere facilmente alle informazioni e funzioni a lui dedicate, rendendo più semplice seguire voti, compiti e comunicazioni.

## 🚀 Tecnologie utilizzate

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: H2
- **Architettura**: Client-Server

## ⚡ Funzionalità

### 👨‍🎓 Funzionalità Studente

- Visualizzare i voti assegnati
- Visualizzare i compiti assegnati
- Visualizzare comunicazioni generali
- Ricevere messaggi privati dai docenti

### 👨‍🏫 Funzionalità Docente

- Assegnare voti agli studenti
- Scrivere comunicazioni generali
- Inviare messaggi privati a singoli studenti
- Visualizzare il registro voti con riepilogo dei voti assegnati
- Creare o eliminare materie

## 🎯 Caratteristiche principali

- **Dashboard personalizzata**: Ogni utente ha una dashboard personalizzata in base al tipo di accesso (studente o docente)
- **Interfaccia intuitiva**: Design user-friendly per facilitare l'utilizzo
- **Comunicazione bidirezionale**: Sistema di messaggistica tra docenti e studenti
- **Gestione completa**: Amministrazione di voti, compiti e materie

## 🛠️ Installazione

### Prerequisiti

- Node.js (versione 14 o superiore) - [Download qui](https://nodejs.org/)
- **Java 21** - [Download qui](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)

### Setup del progetto

1. **Download del progetto**
   - Scarica il progetto come ZIP da GitHub oppure clona il repository:
   ```bash
   git clone https://github.com/Federico-Gz/diarioDigitale.git
   cd diarioDigitale
   ```

2. **Avvio del Backend**
   - Il backend Spring è nella cartella `src/`
   - Esegui il file JAR precompilato:
   ```bash
   java -jar target/diario-digitale-backend.jar
   ```
   *Oppure se il JAR non è disponibile, usa il wrapper Maven incluso:*
   ```bash
   ./mvnw spring-boot:run    # Su Linux/Mac
   mvnw.cmd spring-boot:run  # Su Windows
   ```

3. **Avvio del Frontend**
   - Apri un nuovo terminale e naviga nella cartella frontend
   ```bash
   cd front
   npm install
   npm start
   ```

## 🔧 Utilizzo

1. **Avvia il backend** (porta 8080) - deve essere avviato per primo
2. **Avvia il frontend** (porta 5173) - si aprirà automaticamente nel browser
3. **Accedi all'applicazione** su `http://localhost:5173`
4. **Effettua il login** con le credenziali appropriate (studente o docente)


## 📊 Struttura del progetto

```
diarioDigitale/
├── src/               # Backend Spring Boot
│   ├── main/
│   ├── pom.xml
│   └── ...
├── front/             # Frontend React
│   ├── src/
│   ├── package.json
│   └── ...
├── target/            # File JAR compilati
└── README.md
```

## 🤝 Contributi

Il progetto è stato sviluppato da:

- **Federico Graziani** - [@Federico-Gz](https://github.com/Federico-Gz)
- **Luca Aprile**
- **Pierluigi Vitale**

### Metodologia di sviluppo

- **Backend**: Sviluppo modulare con suddivisione del lavoro e integrazione collaborativa
- **Frontend**: Sviluppo collaborativo con implementazione graduale delle funzionalità


---

*Diario Digitale - Semplificare la comunicazione scolastica*
