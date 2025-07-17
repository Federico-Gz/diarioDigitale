// Componente per visualizzare i compiti dello studente
import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, BookOpen, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { compitiApi, materieApi } from '../../services/api';
import { Compito, Materia } from '../../types';

const CompitiStudente: React.FC = () => {
  const { user } = useAuth();
  const [compiti, setCompiti] = useState<Compito[]>([]);
  const [materie, setMaterie] = useState<Materia[]>([]);
  const [selectedMateria, setSelectedMateria] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [markingId, setMarkingId] = useState<string | null>(null); // stato per disabilitare il bottone mentre fa la chiamata

  // Carica i dati al mount del componente
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Ascolta per aggiornamenti quando viene assegnato un nuovo compito
  useEffect(() => {
    const handleCompitoAssegnato = () => {
      loadData();
    };

    window.addEventListener('compitoAssegnato', handleCompitoAssegnato);
    
    return () => {
      window.removeEventListener('compitoAssegnato', handleCompitoAssegnato);
    };
  }, []);

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Carica tutti i compiti e filtra quelli dello studente
      const compitiData = await compitiApi.getByStudente(user.uuid);
      setCompiti(compitiData);

      // Carica le materie
      const materieData = await materieApi.getAll();
      setMaterie(materieData);
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per segnare compito come completato
  const handleMarkAsCompleted = async (uuid: string) => {
    setMarkingId(uuid);
    try {
      await compitiApi.markAsCompleted(uuid);
      await loadData(); // ricarica dati dopo completamento
    } catch (error) {
      console.error('Errore nel segnare compito come completato:', error);
      alert('Errore durante il completamento del compito. Riprova.');
    } finally {
      setMarkingId(null);
    }
  };

  // Filtra i compiti per materia se selezionata
  const compitiFiltrati = selectedMateria 
    ? compiti.filter(compito => compito.materiaUuid === selectedMateria)
    : compiti;

  // Ottieni il nome della materia dall'UUID
  const getNomeMateria = (materiaUuid: string) => {
    const materia = materie.find(m => m.uuid === materiaUuid);
    return materia?.nome || 'Materia sconosciuta';
  };

  // Calcola i giorni rimanenti alla scadenza
  const getGiorniRimanenti = (scadenza: string) => {
    const oggi = new Date();
    const dataScadenza = new Date(scadenza);
    const differenza = dataScadenza.getTime() - oggi.getTime();
    const giorni = Math.ceil(differenza / (1000 * 3600 * 24));
    return giorni;
  };

  // Determina il colore in base alla scadenza
  const getColorScadenza = (scadenza: string) => {
    const giorni = getGiorniRimanenti(scadenza);
    if (giorni < 0) return 'text-red-600 bg-red-50 border-red-200'; // Scaduto
    if (giorni <= 3) return 'text-orange-600 bg-orange-50 border-orange-200'; // Urgente
    if (giorni <= 7) return 'text-yellow-600 bg-yellow-50 border-yellow-200'; // Prossimo
    return 'text-green-600 bg-green-50 border-green-200'; // Normale
  };

  // Formatta la data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Raggruppa i compiti per stato
  const compitiScaduti = compitiFiltrati.filter(c => getGiorniRimanenti(c.scadenza) < 0);
  const compitiUrgenti = compitiFiltrati.filter(c => {
    const giorni = getGiorniRimanenti(c.scadenza);
    return giorni >= 0 && giorni <= 3;
  });
  const compitiProssimi = compitiFiltrati.filter(c => {
    const giorni = getGiorniRimanenti(c.scadenza);
    return giorni > 3 && giorni <= 7;
  });
  const compitiNormali = compitiFiltrati.filter(c => getGiorniRimanenti(c.scadenza) > 7);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Caricamento compiti...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header con statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Scaduti</p>
              <p className="text-2xl font-bold text-red-900">{compitiScaduti.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">Urgenti</p>
              <p className="text-2xl font-bold text-orange-900">{compitiUrgenti.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">Prossimi</p>
              <p className="text-2xl font-bold text-yellow-900">{compitiProssimi.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Totali</p>
              <p className="text-2xl font-bold text-blue-900">{compiti.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header con filtro */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Compiti Assegnati</h2>
          </div>

          {/* Filtro per materia */}
          <div className="flex items-center space-x-4">
            <label htmlFor="materia-filter" className="text-sm font-medium text-gray-700">
              Filtra per materia:
            </label>
            <select
              id="materia-filter"
              value={selectedMateria}
              onChange={(e) => setSelectedMateria(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Tutte le materie</option>
              {materie.map((materia) => (
                <option key={materia.uuid} value={materia.uuid}>
                  {materia.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista dei compiti */}
        {compitiFiltrati.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Nessun compito assegnato</p>
            <p className="text-sm">
              {selectedMateria 
                ? 'Nessun compito per la materia selezionata' 
                : 'I tuoi compiti appariranno qui quando saranno assegnati'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {compitiFiltrati
              .sort((a, b) => new Date(a.scadenza).getTime() - new Date(b.scadenza).getTime())
              .map((compito) => {
                const giorni = getGiorniRimanenti(compito.scadenza);
                const colorClass = getColorScadenza(compito.scadenza);
                
                return (
                  <div
                    key={compito.uuid}
                    className={`border rounded-lg p-6 ${colorClass} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {getNomeMateria(compito.materiaUuid)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Compito assegnato
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-gray-800 leading-relaxed">
                            {compito.descrizione}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Scadenza: {formatDate(compito.scadenza)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {giorni < 0 
                                ? `Scaduto da ${Math.abs(giorni)} giorni`
                                : giorni === 0
                                ? 'Scade oggi'
                                : giorni === 1
                                ? 'Scade domani'
                                : `${giorni} giorni rimanenti`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          giorni < 0 
                            ? 'bg-red-100 text-red-800'
                            : giorni <= 3
                            ? 'bg-orange-100 text-orange-800'
                            : giorni <= 7
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {giorni < 0 
                            ? 'SCADUTO'
                            : giorni <= 3
                            ? 'URGENTE'
                            : giorni <= 7
                            ? 'PROSSIMO'
                            : 'IN TEMPO'
                          }
                        </span>
                         <button
                          disabled={markingId === compito.uuid}
                          onClick={() => handleMarkAsCompleted(compito.uuid)}
                          className="mt-2 px-3 py-1 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {markingId === compito.uuid ? 'Caricamento...' : 'Fatto'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompitiStudente;