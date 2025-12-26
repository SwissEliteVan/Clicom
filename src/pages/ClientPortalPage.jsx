
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import * as Tabs from '@radix-ui/react-tabs';
import { db } from '@/lib/db';
import { 
  User, 
  MessageSquare, 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  File,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// --- Helper Components ---

const StatusBadge = ({ status }) => {
  let colorClass = "bg-slate-100 text-slate-600";
  if (status === "Terminé" || status === "Gagné") colorClass = "bg-green-100 text-green-700";
  else if (status === "En cours") colorClass = "bg-blue-100 text-blue-700";
  else if (status === "En attente") colorClass = "bg-amber-100 text-amber-700";
  else if (status === "Perdu") colorClass = "bg-red-100 text-red-700";

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", colorClass)}>
      {status}
    </span>
  );
};

const TabButton = ({ value, label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={cn(
      "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all w-full md:w-auto",
      isActive 
        ? "border-blue-600 text-blue-600 bg-blue-50/50" 
        : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
    )}
  >
    <Icon size={18} />
    {label}
  </button>
);

// --- Main Page Component ---

const ClientPortalPage = () => {
  const { toast } = useToast();
  // Simulate Logged In User (TechStart SA)
  // In a real app, this would come from an Auth Context
  const [currentClient, setCurrentClient] = useState(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [demandes, setDemandes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Load Data on Mount
  useEffect(() => {
    // 1. Get Simulated Client (First client in DB)
    const allClients = db.clients.getAll();
    const simulatedClient = allClients[0]; 
    
    if (simulatedClient) {
      setCurrentClient(simulatedClient);

      // 2. Fetch specific data for this client
      refreshData(simulatedClient.id);
    }
  }, []);

  const refreshData = (clientId) => {
    // Demandes
    const allDemandes = db.demandes.getAll();
    setDemandes(allDemandes.filter(d => d.client_id === clientId));

    // Documents
    const allDocs = db.documents.getAll();
    setDocuments(allDocs.filter(d => d.client_id === clientId));

    // Messages
    const allMsgs = db.messages.getAll();
    setMessages(allMsgs.filter(m => m.client_id === clientId).sort((a,b) => new Date(a.created_at) - new Date(b.created_at)));
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'messages') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentClient) return;

    // Save to DB
    db.messages.create({
      client_id: currentClient.id,
      sender_role: 'client',
      body: newMessage,
    });

    // Clear input & refresh
    setNewMessage("");
    refreshData(currentClient.id);

    // Simulate auto-reply for better UX demo
    setTimeout(() => {
      db.messages.create({
        client_id: currentClient.id,
        sender_role: 'system',
        body: "Merci pour votre message. Un administrateur vous répondra sous peu.",
      });
      refreshData(currentClient.id);
    }, 1000);
  };

  const handleFileUpload = () => {
    if (!currentClient) return;

    // Simulate file upload
    const fileName = prompt("Simulation: Entrez le nom du fichier à uploader (ex: Brief_v2.pdf)");
    if (fileName) {
      db.documents.create({
        client_id: currentClient.id,
        name: fileName,
        type: 'Upload Client',
        url: '#'
      });
      refreshData(currentClient.id);
      toast({
        title: "Fichier ajouté",
        description: `Le document ${fileName} a été transmis à l'équipe.`,
      });
    }
  };

  if (!currentClient) return <div className="min-h-screen flex items-center justify-center">Chargement du portail...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Helmet>
        <title>Espace Client | {currentClient.company}</title>
      </Helmet>

      {/* Portal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Espace Client</h1>
              <p className="text-xs text-slate-500 mt-0.5">{currentClient.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-medium text-slate-700">{currentClient.main_contact}</span>
              <span className="text-xs text-slate-500">{currentClient.email}</span>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 border border-slate-300">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden flex flex-col md:flex-row">
          <TabButton 
            value="dashboard" 
            label="Vue d'ensemble" 
            icon={LayoutDashboard} 
            isActive={activeTab === 'dashboard'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            value="documents" 
            label="Documents" 
            icon={FileText} 
            isActive={activeTab === 'documents'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            value="messages" 
            label="Messagerie" 
            icon={MessageSquare} 
            isActive={activeTab === 'messages'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Bonjour, {currentClient.main_contact.split(' ')[0]} 👋</h2>
              <p className="text-blue-100 max-w-2xl">
                Bienvenue sur votre espace. Retrouvez ici l'avancement de vos projets, vos documents et échangez directement avec notre équipe.
              </p>
            </div>

            {/* Demandes Grid */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Vos demandes en cours
              </h3>
              
              {demandes.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
                  Aucune demande en cours.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demandes.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          {item.type === 'Support' ? <AlertCircle size={20} /> : <FileText size={20} />}
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 line-clamp-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2 h-10">{item.description}</p>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>Créé le: {new Date(item.created_at).toLocaleDateString('fr-CH')}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Create New Request Card (Simulated) */}
                  <button 
                    onClick={() => toast({ title: "Non implémenté", description: "Utilisez la page contact pour le moment." })}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer min-h-[200px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <span className="text-2xl font-light">+</span>
                    </div>
                    <span className="font-medium">Nouvelle demande</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- DOCUMENTS TAB --- */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Documents partagés</h3>
                <p className="text-sm text-slate-500">Contrats, rapports et livrables.</p>
              </div>
              <Button onClick={handleFileUpload} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Upload size={16} />
                Envoyer un fichier
              </Button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {documents.length === 0 ? (
                <div className="p-12 text-center text-slate-500">Aucun document disponible.</div>
              ) : (
                documents.map(doc => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                        <File size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{doc.type || 'Document'}</span>
                          <span>•</span>
                          <span>{new Date(doc.created_at).toLocaleDateString('fr-CH')}</span>
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600">
                      <Download size={18} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* --- MESSAGES TAB --- */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[600px]">
            {/* Chat Area */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    H
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Support Horizon</h3>
                  <p className="text-xs text-green-600 font-medium">En ligne</p>
                </div>
              </div>

              <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50">
                {messages.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Démarrez une conversation avec notre équipe.</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className={cn("flex", msg.sender_role === 'client' ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-5 py-3 shadow-sm",
                        msg.sender_role === 'client' 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"
                      )}>
                        <p className="text-sm leading-relaxed">{msg.body}</p>
                        <p className={cn("text-[10px] mt-1 text-right", msg.sender_role === 'client' ? "text-blue-200" : "text-slate-400")}>
                          {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Button type="submit" disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default ClientPortalPage;
