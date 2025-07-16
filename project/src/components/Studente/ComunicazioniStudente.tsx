// Componente per visualizzare le comunicazioni per lo studente
import React, { useState, useEffect } from 'react';
import { Bell, Calendar, AlertCircle } from 'lucide-react';
import { comunicazioniApi } from '../../services/api';
import { Comunicazione } from '../../types';

const ComunicazioniStudente: React.FC = () => {
  const [comunicazioni, setComunicazioni] = useState<Comunicazione[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carica le comunicazioni al mount del componente
  useEffect(() => {
    loadComunicazioni();
  }, []);

  const loadComunicazioni = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await comunicazioniApi.getAll();
      setComunicazioni(data);
    } catch (err) {
      setError('Errore nel caricamento delle comunicazioni');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Caricamento comunicazioni...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Bell className="h-6 w-6 text-orange-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Comunicazioni</h2>
        </div>

        {/* Messaggio di errore */}
        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Comunicazioni Totali</p>
                <p className="text-2xl font-bold text-orange-900">{comunicazioni.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Recenti</p>
                <p className="text-2xl font-bold text-blue-900">
                  {comunicazioni.filter(c => {
                    // Simula comunicazioni recenti (ultime 7 giorni)
                    // In un'app reale avresti un campo data
                    return true;
                  }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Importanti</p>
                <p className="text-2xl font-bold text-green-900">
                  {comunicazioni.filter(c => c.testo.toLowerCase().includes('importante')).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista delle comunicazioni */}
        {comunicazioni.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Nessuna comunicazione disponibile</p>
            <p className="text-sm">Le comunicazioni dalla scuola appariranno qui</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comunicazioni.map((comunicazione, index) => {
              // Determina se la comunicazione è importante
              const isImportant = comunicazione.testo.toLowerCase().includes('importante') ||
                                comunicazione.testo.toLowerCase().includes('urgente') ||
                                comunicazione.testo.toLowerCase().includes('attenzione');

              return (
                <div
                  key={comunicazione.uuid}
                  className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                    isImportant 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isImportant 
                        ? 'bg-red-100' 
                        : 'bg-orange-100'
                    }`}>
                      <Bell className={`h-5 w-5 ${
                        isImportant 
                          ? 'text-red-600' 
                          : 'text-orange-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">
                            Comunicazione #{index + 1}
                          </h3>
                          {isImportant && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Importante
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Recente</span>
                        </div>
                      </div>
                      
                      <div className="text-gray-800 leading-relaxed">
                        <p>{comunicazione.testo}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Da: Segreteria Scolastica</span>
                          <span>Comunicazione generale</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pulsante per ricaricare */}
        <div className="mt-8 text-center">
          <button
            onClick={loadComunicazioni}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Aggiornamento...</span>
              </div>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Aggiorna Comunicazioni
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComunicazioniStudente;