
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as Tabs from '@radix-ui/react-tabs';
import { db } from '@/lib/db';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  LayoutDashboard, 
  FileText, 
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper components for UI
const Card = ({ children, className }) => (
  <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

const CardHeader = ({ title, description, icon: Icon }) => (
  <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
    {Icon && <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Icon size={20} /></div>}
    <div>
      <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      {description && <p className="text-sm text-slate-500">{description}</p>}
    </div>
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant] || variants.default)}>
      {children}
    </span>
  );
};

// Status badge helper
const StatusBadge = ({ status }) => {
  let variant = 'default';
  switch (status) {
    case 'Nouveau': variant = 'info'; break;
    case 'Qualifié': variant = 'purple'; break;
    case 'RDV pris': variant = 'warning'; break;
    case 'Proposition envoyée': variant = 'info'; break;
    case 'Gagné': variant = 'success'; break;
    case 'Perdu': variant = 'danger'; break;
    case 'En attente': variant = 'warning'; break;
    case 'En cours': variant = 'info'; break;
    case 'Terminé': variant = 'success'; break;
    default: variant = 'default';
  }
  return <Badge variant={variant}>{status}</Badge>;
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({
    leads: [],
    clients: [],
    demandes: [],
    messages: [],
    offres: []
  });

  useEffect(() => {
    // Load all data
    setData({
      leads: db.leads.getAll(),
      clients: db.clients.getAll(),
      demandes: db.demandes.getAll(),
      messages: db.messages.getAll(),
      offres: db.offres.getAll(),
    });
  }, []);

  const TabTrigger = ({ value, icon: Icon, label }) => (
    <Tabs.Trigger 
      value={value}
      className={cn(
        "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
        activeTab === value 
          ? "border-blue-600 text-blue-600 bg-blue-50/50" 
          : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      )}
    >
      <Icon size={16} />
      {label}
    </Tabs.Trigger>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Admin Dashboard | Horizon Marketing</title>
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Console</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Admin User</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8 overflow-x-auto">
            <Tabs.List className="flex min-w-max">
              <TabTrigger value="dashboard" icon={LayoutDashboard} label="Vue d'ensemble" />
              <TabTrigger value="leads" icon={Users} label="Leads (Prospects)" />
              <TabTrigger value="clients" icon={Briefcase} label="Clients" />
              <TabTrigger value="demandes" icon={FileText} label="Demandes" />
              <TabTrigger value="messages" icon={MessageSquare} label="Messages" />
              <TabTrigger value="offres" icon={ShoppingBag} label="Offres" />
            </Tabs.List>
          </div>

          {/* DASHBOARD CONTENT */}
          <Tabs.Content value="dashboard" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Users size={24} /></div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Leads</p>
                  <p className="text-2xl font-bold text-slate-900">{data.leads.length}</p>
                </div>
              </Card>
              <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-full"><Briefcase size={24} /></div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Clients Actifs</p>
                  <p className="text-2xl font-bold text-slate-900">{data.clients.length}</p>
                </div>
              </Card>
              <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-full"><AlertCircle size={24} /></div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Demandes en cours</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {data.demandes.filter(d => d.status === 'En cours' || d.status === 'En attente').length}
                  </p>
                </div>
              </Card>
              <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><TrendingUp size={24} /></div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Pipeline (Gagnés)</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {data.leads.filter(l => l.status === 'Gagné').length}
                  </p>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader title="Derniers Leads" icon={Users} />
                <div className="divide-y divide-slate-100">
                  {data.leads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-900">{lead.name}</p>
                        <p className="text-sm text-slate-500">{lead.company}</p>
                      </div>
                      <StatusBadge status={lead.status} />
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card>
                <CardHeader title="Dernières Demandes" icon={FileText} />
                <div className="divide-y divide-slate-100">
                  {data.demandes.slice(0, 5).map(demande => (
                    <div key={demande.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-900">{demande.title}</p>
                        <p className="text-xs text-slate-500">Client ID: {demande.client_id.slice(0,8)}...</p>
                      </div>
                      <StatusBadge status={demande.status} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Tabs.Content>

          {/* LEADS CONTENT */}
          <Tabs.Content value="leads" className="focus:outline-none">
            <Card>
              <CardHeader title="Gestion des Leads" description="Liste complète des prospects et leur statut." icon={Users} />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">Nom / Société</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Contact</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Source</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Besoin</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{lead.name}</div>
                          <div className="text-slate-500 text-xs">{lead.company}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-600">{lead.email}</div>
                          <div className="text-slate-500 text-xs">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{lead.source}</td>
                        <td className="px-6 py-4 text-slate-600">{lead.need}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(lead.created_at).toLocaleDateString('fr-CH')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tabs.Content>

          {/* CLIENTS CONTENT */}
          <Tabs.Content value="clients" className="focus:outline-none">
            <Card>
              <CardHeader title="Liste des Clients" description="Clients actifs ayant souscrit à un service." icon={Briefcase} />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">Société</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Contact Principal</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Téléphone</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Client depuis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.clients.map(client => (
                      <tr key={client.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{client.company}</td>
                        <td className="px-6 py-4 text-slate-600">{client.main_contact}</td>
                        <td className="px-6 py-4 text-slate-600">{client.email}</td>
                        <td className="px-6 py-4 text-slate-600">{client.phone}</td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(client.created_at).toLocaleDateString('fr-CH')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tabs.Content>

          {/* DEMANDES CONTENT */}
          <Tabs.Content value="demandes" className="focus:outline-none">
            <Card>
              <CardHeader title="Demandes & Tickets" description="Suivi des demandes clients." icon={FileText} />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">Titre</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Client (ID)</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Échéance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.demandes.map(demande => {
                      const client = data.clients.find(c => c.id === demande.client_id);
                      return (
                        <tr key={demande.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{demande.title}</div>
                            <div className="text-xs text-slate-500 truncate max-w-xs">{demande.description}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{demande.type}</td>
                          <td className="px-6 py-4 text-slate-600">
                            {client ? client.company : <span className="text-slate-400 font-mono text-xs">{demande.client_id.slice(0,8)}...</span>}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={demande.status} />
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {demande.due_date ? new Date(demande.due_date).toLocaleDateString('fr-CH') : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tabs.Content>
          
           {/* MESSAGES CONTENT */}
           <Tabs.Content value="messages" className="focus:outline-none">
            <Card>
              <CardHeader title="Historique des Messages" description="Derniers échanges avec les clients." icon={MessageSquare} />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">De</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Client</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Message</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.messages.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(msg => {
                      const client = data.clients.find(c => c.id === msg.client_id);
                      return (
                        <tr key={msg.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                            {new Date(msg.created_at).toLocaleString('fr-CH')}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={msg.sender_role === 'client' ? 'info' : (msg.sender_role === 'admin' ? 'purple' : 'default')}>
                              {msg.sender_role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-slate-900 font-medium">
                            {client ? client.company : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                            {msg.body}
                          </td>
                          <td className="px-6 py-4">
                            {msg.read_at ? (
                              <span className="flex items-center gap-1 text-green-600 text-xs">
                                <CheckCircle2 size={14} /> Lu
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-slate-400 text-xs">
                                <Clock size={14} /> Non lu
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tabs.Content>

          {/* OFFRES CONTENT */}
          <Tabs.Content value="offres" className="focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.offres.map(offre => (
                <Card key={offre.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{offre.name}</h3>
                      <p className="text-sm text-slate-500 font-mono mt-1">{offre.code}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">CHF {offre.price_chf}</span>
                      <p className="text-xs text-slate-500 capitalize">/{offre.billing_type === 'monthly' ? 'mois' : 'an'}</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Inclus:</h4>
                    <ul className="space-y-2">
                      {offre.features_json.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-green-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs.Content>

        </Tabs.Root>
      </main>
    </div>
  );
};

export default AdminPage;
