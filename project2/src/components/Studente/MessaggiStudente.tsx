// Componente per visualizzare i messaggi dello studente
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { messaggiApi, authApi } from '../../services/api';
import { Messaggio, MessaggioForm, User as UserType } from '../../types';

const MessaggiStudente: React.FC = () => {
  const { user } = useAuth();
  const [messaggi, setMessaggi] = useState<Messaggio[]>([]);
  const [docenti, setDocenti] = useState<UserType[]>([]);
  const [formData, setFormData] = useState<MessaggioForm>({
    contenuto: '',
    docenteUuid: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carica i messaggi al mount del componente
  useEffect(() => {
    if (user) {
      loadMessaggi();
      loadDocenti();
    }
  }, [user]);

  const loadMessaggi = async () => {
    if (!user) return;
    
    try {
      const data = await messaggiApi.getByStudente(user.uuid);
      setMessaggi(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nel caricamento dei messaggi' });
    }
  };

  const loadDocenti = async () => {
    try {
      const docentiData = await authApi.getDocenti();
      setDocenti(docentiData);
    } catch (error) {
      console.log('Impossibile caricare i docenti');
    }
  };

  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Rimuovi il messaggio quando l'utente modifica il form
    if (message) setMessage(null);
  };

  // Gestisce l'invio del messaggio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      await messaggiApi.create({
        ...formData,
        studenteUuid: user.uuid,
      });

      setMessage({ type: 'success', text: 'Messaggio inviato con successo!' });
      
      // Reset del form
      setFormData({
        contenuto: '',
        docenteUuid: '',
      });

      // Ricarica i messaggi
      loadMessaggi();
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nell\'invio del messaggio' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form per inviare nuovo messaggio */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Send className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Invia Messaggio</h2>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selezione Docente */}
            <div>
              <label htmlFor="docenteUuid" className="block text-sm font-medium text-gray-700 mb-2">
                Destinatario *
              </label>
              <select
                id="docenteUuid"
                name="docenteUuid"
                required
                value={formData.docenteUuid}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleziona un docente</option>
                {docenti.map((docente) => (
                  <option key={docente.uuid} value={docente.uuid}>
                    Prof. {docente.nome} {docente.cognome}
                  </option>
                ))}
              </select>
              {docenti.length === 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  Nessun docente disponibile nel sistema.
                </p>
              )}
            </div>

            {/* Contenuto del messaggio */}
            <div>
              <label htmlFor="contenuto" className="block text-sm font-medium text-gray-700 mb-2">
                Messaggio *
              </label>
              <textarea
                id="contenuto"
                name="contenuto"
                rows={4}
                required
                maxLength={150}
                value={formData.contenuto}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Scrivi il tuo messaggio..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Massimo 150 caratteri ({formData.contenuto.length}/150)
              </p>
            </div>

            {/* Pulsante Invia */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Invio in corso...</span>
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Invia Messaggio
                </>
              )}
            </button>
          </form>
        </div>

        {/* Lista messaggi ricevuti */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Messaggi Ricevuti</h2>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messaggi.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nessun messaggio ricevuto</p>
                <p className="text-sm">I messaggi dai tuoi docenti appariranno qui</p>
              </div>
            ) : (
              messaggi.map((messaggio) => (
                <div
                  key={messaggio.uuid}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          Da: {messaggio.nomeDocente || 'Docente'}
                        </h4>
                      </div>
                      <p className="text-gray-700 text-sm">{messaggio.contenuto}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessaggiStudente;