// Componente per visualizzare i voti dello studente
import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { votiApi, materieApi } from '../../services/api';
import { Voto, Materia } from '../../types';

const VotiStudente: React.FC = () => {
  const { user } = useAuth();
  const [voti, setVoti] = useState<Voto[]>([]);
  const [materie, setMaterie] = useState<Materia[]>([]);
  const [selectedMateria, setSelectedMateria] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Carica i dati al mount del componente
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Ascolta per aggiornamenti quando viene assegnato un nuovo voto
  useEffect(() => {
    const handleVotoAssegnato = () => {
      loadData();
    };

    window.addEventListener('votoAssegnato', handleVotoAssegnato);
    
    return () => {
      window.removeEventListener('votoAssegnato', handleVotoAssegnato);
    };
  }, []);

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Carica i voti dello studente
      const votiData = await votiApi.getByStudente(user.uuid);
      setVoti(votiData);

      // Carica le materie
      const materieData = await materieApi.getAll();
      setMaterie(materieData);
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtra i voti per materia se selezionata
  const votiFiltrati = selectedMateria 
    ? voti.filter(voto => voto.materiaUuid === selectedMateria)
    : voti;

  // Raggruppa i voti per materia
  const votiPerMateria = voti.reduce((acc, voto) => {
    if (!acc[voto.materiaUuid]) {
      acc[voto.materiaUuid] = [];
    }
    acc[voto.materiaUuid].push(voto);
    return acc;
  }, {} as Record<string, Voto[]>);

  // Calcola la media per una materia
  const calcolaMedia = (votiMateria: Voto[]) => {
    if (votiMateria.length === 0) return 0;
    const somma = votiMateria.reduce((sum, voto) => sum + voto.valore, 0);
    return (somma / votiMateria.length).toFixed(2);
  };

  // Calcola la media generale
  const mediaGenerale = voti.length > 0 
    ? (voti.reduce((sum, voto) => sum + voto.valore, 0) / voti.length).toFixed(2)
    : '0.00';

  // Ottieni il nome della materia dall'UUID
  const getNomeMateria = (materiaUuid: string) => {
    const materia = materie.find(m => m.uuid === materiaUuid);
    return materia?.nome || 'Materia sconosciuta';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Caricamento voti...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header con statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Media Generale</p>
              <p className="text-2xl font-bold text-blue-900">{mediaGenerale}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Voti Totali</p>
              <p className="text-2xl font-bold text-green-900">{voti.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Materie</p>
              <p className="text-2xl font-bold text-purple-900">
                {Object.keys(votiPerMateria).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header con filtro */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">I Miei Voti</h2>
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

        {/* Contenuto principale */}
        {voti.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Nessun voto disponibile</p>
            <p className="text-sm">I tuoi voti appariranno qui quando saranno assegnati</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Vista per materia */}
            {Object.entries(votiPerMateria).map(([materiaUuid, votiMateria]) => {
              // Filtra se è selezionata una materia specifica
              if (selectedMateria && materiaUuid !== selectedMateria) {
                return null;
              }

              return (
                <div key={materiaUuid} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getNomeMateria(materiaUuid)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {votiMateria.length} vot{votiMateria.length === 1 ? 'o' : 'i'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Media</p>
                      <p className={`text-2xl font-bold ${
                        parseFloat(calcolaMedia(votiMateria)) >= 6
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {calcolaMedia(votiMateria)}
                      </p>
                    </div>
                  </div>

                  {/* Lista dei voti per questa materia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {votiMateria.map((voto, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                              voto.valore >= 6 ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              {voto.valore}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Voto #{index + 1}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Recente
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Messaggio se nessuna materia corrisponde al filtro */}
            {selectedMateria && !votiPerMateria[selectedMateria] && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nessun voto per la materia selezionata</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VotiStudente;