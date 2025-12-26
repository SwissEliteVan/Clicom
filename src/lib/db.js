
/**
 * LocalStorage Database Simulation
 * 
 * This file simulates the Supabase database behavior using LocalStorage.
 * It allows development of the frontend features without a live backend connection.
 */

const DB_KEY = 'app_local_db_v1';

// Helper to generate IDs
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const CLIENT_ID_1 = uuidv4();
const CLIENT_ID_2 = uuidv4();
const CLIENT_ID_3 = uuidv4();

const INITIAL_DATA = {
  leads: [
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
      status: 'Nouveau',
      source: 'Formulaire Web',
      name: 'Sophie Martin',
      email: 'sophie@boulangerie-martin.ch',
      phone: '079 111 22 33',
      company: 'Boulangerie Martin',
      need: 'Visibilité locale',
      budget: '1000-2000',
      deadline: 'Urgent',
      notes: 'Veut être visible sur Google Maps.'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'Nouveau',
      source: 'Appel entrant',
      name: 'Thomas Müller',
      email: 'thomas@garage-muller.ch',
      phone: '078 444 55 66',
      company: 'Garage Müller',
      need: 'Campagne Ads',
      budget: '2000-5000',
      deadline: '1 mois',
      notes: 'A déjà fait des pubs Facebook sans succès.'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      status: 'Qualifié',
      source: 'LinkedIn',
      name: 'Sarah Weber',
      email: 'contact@fiduciaire-weber.ch',
      phone: '021 333 44 55',
      company: 'Fiduciaire Weber',
      need: 'Refonte site web',
      budget: '5000+',
      deadline: '3 mois',
      notes: 'Site actuel très vieux (2010).'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
      status: 'RDV pris',
      source: 'Recommandation',
      name: 'Michel Dubois',
      email: 'm.dubois@renovation.ch',
      phone: '076 777 88 99',
      company: 'Dubois Rénovation',
      need: 'Lead Generation',
      budget: '2000-5000',
      deadline: 'Immédiat',
      notes: 'RDV fixé le 25/12.'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      status: 'Proposition envoyée',
      source: 'Site Web',
      name: 'Elena Rossi',
      email: 'elena@rossi-archi.ch',
      phone: '079 222 33 44',
      company: 'Rossi Architecture',
      need: 'SEO & Content',
      budget: '5000+',
      deadline: 'Flexible',
      notes: 'Devis #2023-45 envoyé hier.'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
      status: 'Gagné',
      source: 'Event Networking',
      name: 'Hans Meier',
      email: 'h.meier@meier-logistics.ch',
      phone: '044 123 45 67',
      company: 'Meier Logistics',
      need: 'Full Marketing',
      budget: '10000+',
      deadline: 'Urgent',
      notes: 'Contrat signé !'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
      status: 'Perdu',
      source: 'Cold Call',
      name: 'Claire Petit',
      email: 'claire@fleurs-petit.ch',
      phone: '022 555 66 77',
      company: 'Petit Fleurs',
      need: 'Social Media',
      budget: '<1000',
      deadline: 'N/A',
      notes: 'Budget insuffisant pour nos services.'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      status: 'Gagné',
      source: 'Site Web',
      name: 'David Schmid',
      email: 'david@schmid-it.ch',
      phone: '079 999 00 11',
      company: 'Schmid IT',
      need: 'SEO Technique',
      budget: '2000-5000',
      deadline: '2 mois',
      notes: 'Onboardé hier.'
    }
  ],
  clients: [
    {
      id: CLIENT_ID_1,
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
      company: 'TechStart SA',
      main_contact: 'Julie Bertrand',
      email: 'julie@techstart.ch',
      phone: '021 111 22 22'
    },
    {
      id: CLIENT_ID_2,
      created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
      company: 'GreenGarden Sàrl',
      main_contact: 'Marc Vert',
      email: 'marc@greengarden.ch',
      phone: '022 333 44 44'
    },
    {
      id: CLIENT_ID_3,
      created_at: new Date(Date.now() - 86400000 * 90).toISOString(),
      company: 'SwissWatches Ltd',
      main_contact: 'Pierre Horloger',
      email: 'pierre@swisswatches.ch',
      phone: '032 555 66 66'
    }
  ],
  demandes: [
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      client_id: CLIENT_ID_1,
      type: 'Support',
      status: 'En attente',
      title: 'Problème accès Analytics',
      description: 'Je ne vois plus mes données sur le dashboard.',
      due_date: new Date(Date.now() + 86400000 * 2).toISOString()
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      client_id: CLIENT_ID_1,
      type: 'Modification',
      status: 'En cours',
      title: 'Changement texte Homepage',
      description: 'Remplacer le paragraphe 2 par le texte ci-joint.',
      due_date: new Date(Date.now() + 86400000 * 5).toISOString()
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      client_id: CLIENT_ID_2,
      type: 'Nouvelle fonctionnalité',
      status: 'En attente',
      title: 'Ajout formulaire contact',
      description: 'Besoin d\'un formulaire pour les devis jardinage.',
      due_date: new Date(Date.now() + 86400000 * 10).toISOString()
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
      client_id: CLIENT_ID_2,
      type: 'Support',
      status: 'Terminé',
      title: 'Bug mobile',
      description: 'Le menu ne s\'ouvrait pas sur iPhone.',
      due_date: new Date(Date.now() - 86400000 * 10).toISOString()
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      client_id: CLIENT_ID_3,
      type: 'SEO',
      status: 'En cours',
      title: 'Optimisation pages produits',
      description: 'Revoir les balises meta des 10 produits phares.',
      due_date: new Date(Date.now() + 86400000 * 20).toISOString()
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
      client_id: CLIENT_ID_3,
      type: 'Reporting',
      status: 'Terminé',
      title: 'Rapport mensuel Mai',
      description: 'Envoyer le PDF des stats.',
      due_date: new Date(Date.now() - 86400000 * 1).toISOString()
    }
  ],
  documents: [
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      client_id: CLIENT_ID_1,
      name: 'Audit_Tech_2023.pdf',
      type: 'Audit',
      url: '#'
    },
    {
      id: uuidv4(),
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      client_id: CLIENT_ID_2,
      name: 'Contrat_Maintenance.pdf',
      type: 'Contrat',
      url: '#'
    }
  ],
  messages: [
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 0.1).toISOString(), client_id: CLIENT_ID_1, sender_role: 'client', body: 'Bonjour, avez-vous reçu ma demande ?', read_at: null },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 0.2).toISOString(), client_id: CLIENT_ID_1, sender_role: 'admin', body: 'Oui Julie, nous regardons ça ce matin.', read_at: new Date().toISOString() },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 1).toISOString(), client_id: CLIENT_ID_1, sender_role: 'client', body: 'Merci de votre rapidité !', read_at: new Date().toISOString() },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 2).toISOString(), client_id: CLIENT_ID_2, sender_role: 'client', body: 'Le site est down ??', read_at: null },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 1.9).toISOString(), client_id: CLIENT_ID_2, sender_role: 'system', body: 'Alerte: Maintenance serveur en cours.', read_at: null },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 1.8).toISOString(), client_id: CLIENT_ID_2, sender_role: 'admin', body: 'C\'est juste une mise à jour Marc, retour dans 5min.', read_at: null },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 5).toISOString(), client_id: CLIENT_ID_3, sender_role: 'admin', body: 'Pierre, le rapport est prêt.', read_at: new Date().toISOString() },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 4.9).toISOString(), client_id: CLIENT_ID_3, sender_role: 'client', body: 'Parfait, merci.', read_at: new Date().toISOString() },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 10).toISOString(), client_id: CLIENT_ID_3, sender_role: 'client', body: 'On peut se voir lundi ?', read_at: new Date().toISOString() },
    { id: uuidv4(), created_at: new Date(Date.now() - 86400000 * 9.9).toISOString(), client_id: CLIENT_ID_3, sender_role: 'admin', body: 'Lundi 14h c\'est noté.', read_at: new Date().toISOString() }
  ],
  offres: [
    {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      code: 'CLIC-CLIENTS',
      name: 'Clic & Clients',
      price_chf: 1490,
      billing_type: 'monthly',
      features_json: ['Gestion Google Ads', 'Landing Page optimisée', 'Tracking conversions', 'Rapport mensuel']
    },
    {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      code: 'ACQUISITION-TURBO',
      name: 'Acquisition Turbo',
      price_chf: 2990,
      billing_type: 'monthly',
      features_json: ['SEO Avancé', 'Google Ads + Facebook Ads', 'CRM Setup', 'Automation email', 'Rapport hebdomadaire']
    }
  ],
  rdv: []
};

// Low-level DB Access
const getDb = () => {
  try {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : INITIAL_DATA;
  } catch (e) {
    console.error('Error reading local DB', e);
    return INITIAL_DATA;
  }
};

const saveDb = (data) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving local DB', e);
  }
};

// Database Interface
export const db = {
  leads: {
    getAll: () => getDb().leads,
    getById: (id) => getDb().leads.find(l => l.id === id),
    create: (data) => {
      const dbData = getDb();
      const newLead = {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        status: 'Nouveau', // Default status
        ...data
      };
      dbData.leads.push(newLead);
      saveDb(dbData);
      return newLead;
    },
    update: (id, updates) => {
      const dbData = getDb();
      const index = dbData.leads.findIndex(l => l.id === id);
      if (index === -1) return null;
      dbData.leads[index] = { ...dbData.leads[index], ...updates };
      saveDb(dbData);
      return dbData.leads[index];
    },
    delete: (id) => {
      const dbData = getDb();
      dbData.leads = dbData.leads.filter(l => l.id !== id);
      saveDb(dbData);
      return true;
    }
  },

  clients: {
    getAll: () => getDb().clients,
    create: (data) => {
      const dbData = getDb();
      const newClient = { id: uuidv4(), created_at: new Date().toISOString(), ...data };
      dbData.clients.push(newClient);
      saveDb(dbData);
      return newClient;
    }
  },
  
  demandes: {
    getAll: () => getDb().demandes,
    create: (data) => {
      const dbData = getDb();
      const newDemande = { 
        id: uuidv4(), 
        created_at: new Date().toISOString(), 
        status: 'En attente',
        ...data 
      };
      dbData.demandes.push(newDemande);
      saveDb(dbData);
      return newDemande;
    }
  },

  documents: {
    getAll: () => getDb().documents,
    create: (data) => {
      const dbData = getDb();
      const newDoc = { 
        id: uuidv4(), 
        created_at: new Date().toISOString(), 
        ...data 
      };
      dbData.documents.push(newDoc);
      saveDb(dbData);
      return newDoc;
    }
  },

  messages: {
    getAll: () => getDb().messages,
    create: (data) => {
      const dbData = getDb();
      const newMsg = { 
        id: uuidv4(), 
        created_at: new Date().toISOString(), 
        read_at: null,
        ...data 
      };
      dbData.messages.push(newMsg);
      saveDb(dbData);
      return newMsg;
    }
  },

  offres: {
    getAll: () => getDb().offres,
  },

  // Generic helper for other tables if needed simply
  table: (tableName) => ({
    getAll: () => getDb()[tableName] || [],
    create: (data) => {
      const dbData = getDb();
      if (!dbData[tableName]) dbData[tableName] = [];
      const record = { id: uuidv4(), created_at: new Date().toISOString(), ...data };
      dbData[tableName].push(record);
      saveDb(dbData);
      return record;
    }
  })
};
