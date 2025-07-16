// Componente per assegnare compiti agli studenti
import React, { useState, useEffect } from 'react';
import { FileText, Save, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { compitiApi, materieApi, userApi } from '../../services/api';
import { CompitoForm, User, Materia } from '../../types';

const AssegnaCompito: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CompitoForm>({
    descrizione: '',
    scadenza: '',
    materiaUuid: '',
    studenteUuid: '',
  });
  const [studenti, setStudenti] = useState<User[]>([]);
  const [materie, setMaterie] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carica studenti e materie al mount del componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Carica le materie
      const materieData = await materieApi.getAll();
      setMaterie(materieData);
      
      const studentiData = await userApi.getStudenti();
      setStudenti(studentiData);
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nel caricamento dei dati' });
    }
  };

  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Rimuovi il messaggio quando l'utente modifica il form
    if (message) setMessage(null);
  };

  // Gestisce il submit del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      // Assegna il compito chiamando l'API
      await compitiApi.create({
        ...formData,
        docenteUuid: user.uuid,
      });

      setMessage({ type: 'success', text: 'Compito assegnato con successo!' });
      
      // Reset del form
      setFormData({
        descrizione: '',
        scadenza: '',
        materiaUuid: '',
        studenteUuid: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nell\'assegnazione del compito' });
    } finally {
      setLoading(false);
    }
  };

  // Ottieni la data minima (oggi)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Assegna Compito</h2>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selezione Studente */}
          <div>
            <label htmlFor="studenteUuid" className="block text-sm font-medium text-gray-700 mb-2">
              Studente *
            </label>
            <select
              id="studenteUuid"
              name="studenteUuid"
              required
              value={formData.studenteUuid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Seleziona uno studente</option>
              {studenti.map((studente) => (
                <option key={studente.uuid} value={studente.uuid}>
                  {studente.nome} {studente.cognome}
                </option>
              ))}
            </select>
            {studenti.length === 0 && (
              <p className="mt-1 text-sm text-gray-500">
                Nessuno studente disponibile. Aggiungi studenti al sistema.
              </p>
            )}
          </div>

          {/* Selezione Materia */}
          <div>
            <label htmlFor="materiaUuid" className="block text-sm font-medium text-gray-700 mb-2">
              Materia *
            </label>
            <select
              id="materiaUuid"
              name="materiaUuid"
              required
              value={formData.materiaUuid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Seleziona una materia</option>
              {materie.map((materia) => (
                <option key={materia.uuid} value={materia.uuid}>
                  {materia.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Descrizione del Compito */}
          <div>
            <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700 mb-2">
              Descrizione del Compito *
            </label>
            <textarea
              id="descrizione"
              name="descrizione"
              rows={4}
              required
              value={formData.descrizione}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Descrivi il compito da assegnare..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Fornisci una descrizione chiara e dettagliata del compito
            </p>
          </div>

          {/* Data di Scadenza */}
          <div>
            <label htmlFor="scadenza" className="block text-sm font-medium text-gray-700 mb-2">
              Data di Scadenza *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="scadenza"
                name="scadenza"
                required
                min={getMinDate()}
                value={formData.scadenza}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Seleziona la data entro cui il compito deve essere completato
            </p>
          </div>

          {/* Pulsante Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Assegnazione in corso...</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Assegna Compito
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssegnaCompito;