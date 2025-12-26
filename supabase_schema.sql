
-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. CLIENTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id), -- Link to Supabase Auth User
  company TEXT NOT NULL,
  main_contact TEXT,
  email TEXT,
  phone TEXT
);

-- -----------------------------------------------------------------------------
-- 2. LEADS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'Nouveau',
  source TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  need TEXT,
  budget TEXT,
  deadline TEXT,
  notes TEXT
);

ALTER TABLE leads ADD CONSTRAINT leads_status_check 
  CHECK (status IN ('Nouveau', 'Qualifié', 'RDV pris', 'Proposition envoyée', 'Gagné', 'Perdu'));

-- -----------------------------------------------------------------------------
-- 3. DEMANDES TABLE (Requests/Tickets/Diagnostics)
-- -----------------------------------------------------------------------------
CREATE TABLE demandes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type TEXT,
  status TEXT DEFAULT 'En attente',
  title TEXT NOT NULL,
  description TEXT,
  diagnostic_data JSONB, -- To store detailed diagnostic form fields
  due_date TIMESTAMP WITH TIME ZONE
);

-- -----------------------------------------------------------------------------
-- 4. DOCUMENTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  url TEXT NOT NULL,
  description TEXT
);

-- -----------------------------------------------------------------------------
-- 5. MESSAGES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  sender_role TEXT CHECK (sender_role IN ('client', 'admin', 'system')),
  body TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE
);

-- -----------------------------------------------------------------------------
-- 6. OFFRES TABLE (Offers/Services)
-- -----------------------------------------------------------------------------
CREATE TABLE offres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price_chf DECIMAL(10, 2),
  billing_type TEXT CHECK (billing_type IN ('one-time', 'monthly', 'yearly')),
  features_json JSONB DEFAULT '[]'::jsonb
);

-- -----------------------------------------------------------------------------
-- 7. RDV TABLE (Appointments)
-- -----------------------------------------------------------------------------
CREATE TABLE rdv (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  channel TEXT,
  status TEXT DEFAULT 'Confirmé'
);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- -----------------------------------------------------------------------------

-- 1. Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE offres ENABLE ROW LEVEL SECURITY;
ALTER TABLE rdv ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin 
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. CLIENTS POLICIES
-- Client: Can see own profile
CREATE POLICY "Clients can view own profile" 
  ON clients FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Admin: Full access
CREATE POLICY "Admins have full access to clients" 
  ON clients FOR ALL 
  TO authenticated 
  USING (is_admin());


-- 3. DEMANDES POLICIES
-- Client: Can see own demandes
CREATE POLICY "Clients can view own demandes" 
  ON demandes FOR SELECT 
  TO authenticated 
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Admin: Full access
CREATE POLICY "Admins have full access to demandes" 
  ON demandes FOR ALL 
  TO authenticated 
  USING (is_admin());


-- 4. DOCUMENTS POLICIES
-- Client: Can see own documents
CREATE POLICY "Clients can view own documents" 
  ON documents FOR SELECT 
  TO authenticated 
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Admin: Full access
CREATE POLICY "Admins have full access to documents" 
  ON documents FOR ALL 
  TO authenticated 
  USING (is_admin());


-- 5. MESSAGES POLICIES
-- Client: Can see own messages
CREATE POLICY "Clients can view own messages" 
  ON messages FOR SELECT 
  TO authenticated 
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Client: Can insert messages (Reply)
CREATE POLICY "Clients can send messages" 
  ON messages FOR INSERT 
  TO authenticated 
  WITH CHECK (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Admin: Full access
CREATE POLICY "Admins have full access to messages" 
  ON messages FOR ALL 
  TO authenticated 
  USING (is_admin());


-- 6. LEADS, OFFRES, RDV POLICIES (Simplified)
CREATE POLICY "Admins have full access to leads" ON leads FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Public can insert leads" ON leads FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins have full access to offres" ON offres FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admins have full access to rdv" ON rdv FOR ALL TO authenticated USING (is_admin());
