// Componente per visualizzare il registro dei voti
import React, { useState, useEffect } from 'react';
import { BarChart3, User, BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { votiApi, materieApi } from '../../services/api';
import { Voto, Materia } from '../../types';

const RegistroVoti: React.FC = () => {
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

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Carica i voti assegnati dal docente
      const votiData = await votiApi.getByDocente(user.uuid);
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

  // Raggruppa i voti per studente
  const votiPerStudente = votiFiltrati.reduce((acc, voto) => {
    if (!acc[voto.studenteUuid]) {
      acc[voto.studenteUuid] = [];
    }
    acc[voto.studenteUuid].push(voto);
    return acc;
  }, {} as Record<string, Voto[]>);

  // Calcola la media per uno studente
  const calcolaMedia = (votiStudente: Voto[]) => {
    if (votiStudente.length === 0) return 0;
    const somma = votiStudente.reduce((sum, voto) => sum + voto.valore, 0);
    return (somma / votiStudente.length).toFixed(2);
  };

  // Ottieni il nome della materia dall'UUID
  const getNomeMateria = (materiaUuid: string) => {
    const materia = materie.find(m => m.uuid === materiaUuid);
    return materia?.nome || 'Materia sconosciuta';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Caricamento registro...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Registro Voti</h2>
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

        {/* Statistiche generali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Voti Totali</p>
                <p className="text-2xl font-bold text-blue-900">{votiFiltrati.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Studenti Valutati</p>
                <p className="text-2xl font-bold text-green-900">
                  {Object.keys(votiPerStudente).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Media Generale</p>
                <p className="text-2xl font-bold text-purple-900">
                  {votiFiltrati.length > 0 
                    ? (votiFiltrati.reduce((sum, voto) => sum + voto.valore, 0) / votiFiltrati.length).toFixed(2)
                    : '0.00'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabella dei voti */}
        {Object.keys(votiPerStudente).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Nessun voto assegnato</p>
            <p className="text-sm">
              {selectedMateria 
                ? 'Nessun voto per la materia selezionata' 
                : 'Inizia ad assegnare voti agli studenti'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Studente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Media
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Materie
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(votiPerStudente).map(([studenteUuid, votiStudente]) => (
                  <tr key={studenteUuid} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Studente {studenteUuid.substring(0, 8)}...
                          </div>
                          <div className="text-sm text-gray-500">
                            {votiStudente.length} vot{votiStudente.length === 1 ? 'o' : 'i'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {votiStudente.map((voto, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              voto.valore >= 6
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {voto.valore}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        parseFloat(calcolaMedia(votiStudente)) >= 6
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {calcolaMedia(votiStudente)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {[...new Set(votiStudente.map(v => v.materiaUuid))].map((materiaUuid) => (
                          <span
                            key={materiaUuid}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-800"
                          >
                            {getNomeMateria(materiaUuid)}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroVoti;