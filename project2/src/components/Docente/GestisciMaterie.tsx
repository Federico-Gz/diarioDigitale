// Componente per gestire le materie
import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { materieApi } from '../../services/api';
import { Materia } from '../../types';

const GestisciMaterie: React.FC = () => {
  const [materie, setMaterie] = useState<Materia[]>([]);
  const [newMateria, setNewMateria] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carica le materie al mount del componente
  useEffect(() => {
    loadMaterie();
  }, []);

  const loadMaterie = async () => {
    try {
      const data = await materieApi.getAll();
      setMaterie(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nel caricamento delle materie' });
    }
  };

  // Gestisce l'aggiunta di una nuova materia
  const handleAddMateria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMateria.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const nuovaMateria = await materieApi.create({ nome: newMateria.trim() });
      setMaterie(prev => [...prev, nuovaMateria]);
      setNewMateria('');
      setMessage({ type: 'success', text: 'Materia aggiunta con successo!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nell\'aggiunta della materia' });
    } finally {
      setLoading(false);
    }
  };

  // Gestisce l'eliminazione di una materia
  const handleDeleteMateria = async (uuid: string, nome: string) => {
    if (!window.confirm(`Sei sicuro di voler eliminare la materia "${nome}"?`)) {
      return;
    }

    try {
      await materieApi.delete(uuid);
      setMaterie(prev => prev.filter(materia => materia.uuid !== uuid));
      setMessage({ type: 'success', text: 'Materia eliminata con successo!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nell\'eliminazione della materia' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Gestisci Materie</h2>
        </div>

        {/* Messaggio di feedback */}
        {message && (
          <div className={`mb-6 p-4 rounded-md flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={`text-sm ${
              message.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {message.text}
            </span>
          </div>
        )}

        {/* Form per aggiungere nuova materia */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aggiungi Nuova Materia</h3>
          <form onSubmit={handleAddMateria} className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={newMateria}
                onChange={(e) => setNewMateria(e.target.value)}
                placeholder="Nome della materia"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi
                </>
              )}
            </button>
          </form>
        </div>

        {/* Lista delle materie */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Materie Esistenti</h3>
          
          {materie.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nessuna materia presente</p>
              <p className="text-sm">Aggiungi la prima materia usando il form sopra</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materie.map((materia) => (
                <div
                  key={materia.uuid}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{materia.nome}</h4>
                        <p className="text-sm text-gray-500">Materia scolastica</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteMateria(materia.uuid, materia.nome)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Elimina materia"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestisciMaterie;