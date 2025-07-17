// Dashboard principale per i docenti
import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  GraduationCap, 
  FileText, 
  Bell,
  Plus,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Importa i componenti specifici per ogni sezione
import AssegnaVoto from '../Docente/AssegnaVoto';
import AssegnaCompito from '../Docente/AssegnaCompito';
import GestisciMaterie from '../Docente/GestisciMaterie';
import MessaggiDocente from '../Docente/MessaggiDocente';
import ComunicazioniDocente from '../Docente/ComunicazioniDocente';
import RegistroVoti from '../Docente/RegistroVoti';
import { compitiApi, messaggiApi, votiApi } from '../../services/api';

type ActiveSection = 'overview' | 'voti' | 'compiti' | 'materie' | 'messaggi' | 'comunicazioni' | 'registro';

const DocenteDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  // stati per riepilogo
  const [votiCount, setVotiCount] = useState<number | null>(null);
  const [compitiCount, setCompitiCount] = useState<number | null>(null);
  const [messaggiCount, setMessaggiCount] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      caricaDatiRiepilogo();
    }
  }, [user]);

  const caricaDatiRiepilogo = async () => {
    try {
      const [voti, compiti, messaggi] = await Promise.all([
        votiApi.getByDocente(user.uuid),
        compitiApi.getByDocente(user.uuid),
        messaggiApi.getByDocente(user.uuid)
      ]);
      setVotiCount(voti.length);
      setCompitiCount(compiti.length);
      setMessaggiCount(messaggi.length);
    } catch (err) {
      console.error('Errore nel caricamento dei dati', err);
    }
  };

  // Menu items per la navigazione
  const menuItems = [
    { id: 'overview' as ActiveSection, label: 'Panoramica', icon: BarChart3 },
    { id: 'voti' as ActiveSection, label: 'Assegna Voti', icon: GraduationCap },
    { id: 'compiti' as ActiveSection, label: 'Assegna Compiti', icon: FileText },
    { id: 'materie' as ActiveSection, label: 'Gestisci Materie', icon: BookOpen },
    { id: 'messaggi' as ActiveSection, label: 'Messaggi', icon: MessageSquare },
    { id: 'comunicazioni' as ActiveSection, label: 'Comunicazioni', icon: Bell },
    { id: 'registro' as ActiveSection, label: 'Registro Voti', icon: Users },
  ];

  // Renderizza il contenuto basato sulla sezione attiva
  const renderContent = () => {
    switch (activeSection) {
      case 'voti':
        return <AssegnaVoto />;
      case 'compiti':
        return <AssegnaCompito />;
      case 'materie':
        return <GestisciMaterie />;
      case 'messaggi':
        return <MessaggiDocente />;
      case 'comunicazioni':
        return <ComunicazioniDocente />;
      case 'registro':
        return <RegistroVoti />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Benvenuto, Prof. {user?.nome} {user?.cognome}
            </h2>
            
            {/* Cards di riepilogo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Voti Assegnati</p>
                    <p className="text-2xl font-bold text-gray-900">{votiCount !== null ? votiCount : '...'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Compiti Assegnati</p>
                    <p className="text-2xl font-bold text-gray-900">{compitiCount !== null ? compitiCount : '...'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Messaggi</p>
                    <p className="text-2xl font-bold text-gray-900">{messaggiCount !== null ? messaggiCount : '...'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Azioni rapide */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveSection('voti')}
                  className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-600 font-medium">Assegna Voto</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('compiti')}
                  className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-600 font-medium">Nuovo Compito</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('comunicazioni')}
                  className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-purple-600 font-medium">Comunicazione</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('messaggi')}
                  className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-600 font-medium">Messaggi</span>
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
              Menu Docente
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

export default DocenteDashboard;