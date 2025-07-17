// Dashboard principale per gli studenti
import React, { useEffect, useState } from 'react';
import { 
  GraduationCap, 
  MessageSquare, 
  FileText, 
  Bell,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Importa i componenti specifici per ogni sezione
import VotiStudente from '../Studente/VotiStudente';
import CompitiStudente from '../Studente/CompitiStudente';
import MessaggiStudente from '../Studente/MessaggiStudente';
import ComunicazioniStudente from '../Studente/ComunicazioniStudente';
import { compitiApi, comunicazioniApi, votiApi } from '../../services/api';

type ActiveSection = 'overview' | 'voti' | 'compiti' | 'messaggi' | 'comunicazioni';

const StudenteDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  // Stati per i dati riepilogo
  const [mediaVoti, setMediaVoti] = useState<number | null>(null);
  const [compitiDaFare, setCompitiDaFare] = useState<number | null>(null);
  const [comunicazioni, setComunicazioni] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchDashboardData() {
      try {
        // Recupera voti e calcola media
        const voti = await votiApi.getByStudente(user.uuid);
        const media = voti.length > 0 ? voti.reduce((acc, v) => acc + v.valore, 0) / voti.length : 0;
        setMediaVoti(media);

        // Recupera compiti assegnati e conta quelli non ancora completati
        const compiti = await compitiApi.getByStudente(user.uuid);
        // Esempio: consideriamo compiti da fare quelli con data scadenza futura e non completati
        const oggi = new Date();
        const daFareCount = compiti.filter(c => !c.completato && new Date(c.scadenza) >= oggi).length;
        setCompitiDaFare(daFareCount);


        // Recupera comunicazioni e conta quelle recenti o tutte (a seconda della logica)
        const comms = await comunicazioniApi.getAll();
        // Per esempio: considera tutte le comunicazioni visibili
        setComunicazioni(comms.length);

      } catch (error) {
        console.error('Errore caricamento dati dashboard:', error);
      }
    }

    fetchDashboardData();
  }, [user]);
  // Menu items per la navigazione
  const menuItems = [
    { id: 'overview' as ActiveSection, label: 'Panoramica', icon: BarChart3 },
    { id: 'voti' as ActiveSection, label: 'I Miei Voti', icon: GraduationCap },
    { id: 'compiti' as ActiveSection, label: 'Compiti Assegnati', icon: FileText },
    { id: 'messaggi' as ActiveSection, label: 'Messaggi', icon: MessageSquare },
    { id: 'comunicazioni' as ActiveSection, label: 'Comunicazioni', icon: Bell },
  ];

  // Renderizza il contenuto basato sulla sezione attiva
  const renderContent = () => {
    switch (activeSection) {
      case 'voti':
        return <VotiStudente />;
      case 'compiti':
        return <CompitiStudente />;
      case 'messaggi':
        return <MessaggiStudente />;
      case 'comunicazioni':
        return <ComunicazioniStudente />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Benvenuto, {user?.nome} {user?.cognome}
            </h2>
            
            {/* Cards di riepilogo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Media Voti</p>
                    <p className="text-2xl font-bold text-gray-900">{mediaVoti}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Compiti da Fare</p>
                    <p className="text-2xl font-bold text-gray-900">{compitiDaFare}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Nuovi Messaggi</p>
                    <p className="text-2xl font-bold text-gray-900">-</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="flex items-center">
                  <Bell className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Comunicazioni</p>
                    <p className="text-2xl font-bold text-gray-900">{comunicazioni}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sezione compiti in scadenza */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                Compiti in Scadenza
              </h3>
              <div className="text-gray-600">
                <p>Nessun compito in scadenza nei prossimi giorni.</p>
              </div>
            </div>

            {/* Azioni rapide */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accesso Rapido</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveSection('voti')}
                  className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-600 font-medium">Vedi Voti</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('compiti')}
                  className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <FileText className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-600 font-medium">Compiti</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('messaggi')}
                  className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-purple-600 font-medium">Messaggi</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('comunicazioni')}
                  className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-600 font-medium">Comunicazioni</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <nav className="mt-8">
          <div className="px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Menu Studente
            </h3>
          </div>
          <div className="mt-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudenteDashboard;