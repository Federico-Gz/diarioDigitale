// Componente per gestire le comunicazioni del docente
import React, { useState, useEffect } from 'react';
import { Bell, Send, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { comunicazioniApi, authApi } from '../../services/api';
import { Comunicazione, ComunicazioneForm, User as UserType } from '../../types';


const ComunicazioniDocente: React.FC = () => {
  const { user } = useAuth();
  const [comunicazioni, setComunicazioni] = useState<Comunicazione[]>([]);
  const [studenti, setStudenti] = useState<UserType[]>([]);
  const [formData, setFormData] = useState<ComunicazioneForm>({
    testo: '',
    studenteUuid: '',
    docenteUuid: ''
  });
  const [isGenerale, setIsGenerale] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carica le comunicazioni al mount del componente
  useEffect(() => {
    if(user){
      loadComunicazioni();
      loadStudenti();
    }
  }, []);

  const loadComunicazioni = async () => {
    if (!user) return;
    try {
      const data = await comunicazioniApi.getDistinctByDocente(user!.uuid);
      setComunicazioni(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nel caricamento delle comunicazioni' });
    }
  };

  const loadStudenti = async () => {
    try {
      const studentiData = await authApi.getStudenti();
      setStudenti(studentiData);
    } catch (error) {
      console.log('Impossibile caricare gli studenti');
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

  // Gestisce l'invio della comunicazione
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      if (isGenerale) {
        // Comunicazione generale a tutti gli studenti
        await comunicazioniApi.createGenerale({
          docenteUuid: user.uuid,
          testo: formData.testo,
        });
      } else {
        // Comunicazione specifica per uno studente
        await comunicazioniApi.create({
          testo: formData.testo,
          studenteUuid: formData.studenteUuid,
          docenteUuid: user.uuid,
        });
      }

      setMessage({ type: 'success', text: 'Comunicazione inviata con successo!' });
      
      // Reset del form
      setFormData({
        testo: '',
        studenteUuid: '',
        docenteUuid: ''
      });

      // Ricarica le comunicazioni
      setTimeout(() => {
        loadComunicazioni();
      }, 1000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nell\'invio della comunicazione' });
    } finally {
      setLoading(false);
    }
  };

  // Gestisce l'eliminazione di una comunicazione
  const handleDelete = async (comunicazione: Comunicazione) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa comunicazione?')) {
      return;
    }

    try {
      await comunicazioniApi.delete(comunicazione.uuid);
      await comunicazioniApi.deleteByDocenteAndTesto(comunicazione.docenteUuid, comunicazione.testo);
      setComunicazioni(prev => prev.filter(com => com.uuid !== comunicazione.uuid));
      setMessage({ type: 'success', text: 'Comunicazione eliminata con successo!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Errore nell\'eliminazione della comunicazione' });
    }
  };


  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form per creare nuova comunicazione */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Send className="h-6 w-6 text-orange-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Nuova Comunicazione</h2>
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
            {/* Tipo di comunicazione */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo di Comunicazione
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    value="generale"
                    checked={isGenerale}
                    onChange={() => setIsGenerale(true)}
                    className="mr-2"
                  />
                  <span className="text-sm">Comunicazione Generale</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    value="specifica"
                    checked={!isGenerale}
                    onChange={() => setIsGenerale(false)}
                    className="mr-2"
                  />
                  <span className="text-sm">Studente Specifico</span>
                </label>
              </div>
            </div>

            {/* Selezione Studente (solo se comunicazione specifica) */}
            {!isGenerale && (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
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
            )}

            {/* Testo della comunicazione */}
            <div>
              <label htmlFor="testo" className="block text-sm font-medium text-gray-700 mb-2">
                Testo della Comunicazione *
              </label>
              <textarea
                id="testo"
                name="testo"
                rows={6}
                required
                value={formData.testo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Scrivi la comunicazione..."
              />
              <p className="mt-1 text-sm text-gray-500">
                {isGenerale 
                  ? 'Questa comunicazione sarà inviata a tutti gli studenti'
                  : 'Scrivi una comunicazione per lo studente selezionato'
                }
              </p>
            </div>

            {/* Pulsante Invia */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Invio in corso...</span>
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Invia Comunicazione
                </>
              )}
            </button>
          </form>
        </div>

        {/* Lista comunicazioni */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-orange-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Comunicazioni Inviate</h2>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comunicazioni.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nessuna comunicazione inviata</p>
                <p className="text-sm">Le tue comunicazioni appariranno qui</p>
              </div>
            ) : (
              comunicazioni.map((comunicazione) => (
                <div
                  key={comunicazione.uuid}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Comunicazione
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(comunicazione)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Elimina comunicazione"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{comunicazione.testo}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComunicazioniDocente;