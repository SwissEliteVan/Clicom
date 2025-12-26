
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import KeyBenefits from '@/components/KeyBenefits';
import ServicesSection from '@/components/ServicesSection';
import PricingPreviewSection from '@/components/PricingPreviewSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FreeDiagnosticSection from '@/components/FreeDiagnosticSection';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ResultsPage from '@/pages/ResultsPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ContactPage from '@/pages/ContactPage';
import LegalPage from '@/pages/LegalPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';
import AdminPage from '@/pages/AdminPage';
import ClientPortalPage from '@/pages/ClientPortalPage';
import DiagnosticPage from '@/pages/DiagnosticPage';
import DiagnosticConfirmationPage from '@/pages/DiagnosticConfirmationPage';
import PricingPage from '@/pages/PricingPage';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import BackToTop from '@/components/BackToTop';
import { Toaster } from '@/components/ui/toaster';

// Layout component to wrap pages
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans text-slate-900">
      <ScrollRestoration />
      {/* Security Headers Simulation via Meta Tags for Frontend */}
      <Helmet>
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="DENY" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" />
      </Helmet>
      
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <BackToTop />
      <CookieConsent />
      <Toaster />
      <Footer />
    </div>
  );
};

// Home page component
const HomePage = () => (
  <>
    <Helmet>
      <title>Marketing Digital pour PME Suisse | Gagnez des clients, pas juste des clics</title>
      <meta 
        name="description" 
        content="Marketing digital sans blabla pour PME suisses. Résultats concrets, budget maîtrisé, contact unique. Testez notre pack découverte et boostez votre CA dès aujourd'hui." 
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Clic COM",
          "image": "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d",
          "description": "Agence de marketing digital suisse pour PME. SEO, Google Ads, Création de sites web.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rue de l'Exemple 123",
            "addressLocality": "Lausanne",
            "postalCode": "1000",
            "addressCountry": "CH"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 46.5197,
            "longitude": 6.6323
          },
          "url": "https://clic-com.ch",
          "telephone": "+41210000000",
          "priceRange": "$$"
        })}
      </script>
    </Helmet>
    <HeroSection />
    <KeyBenefits />
    <ServicesSection />
    <PricingPreviewSection />
    <CaseStudiesSection />
    <TestimonialsSection />
    <BlogSection />
    <FreeDiagnosticSection />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "tarifs",
        element: <PricingPage />,
      },
      {
        path: "a-propos",
        element: <AboutPage />,
      },
      {
        path: "resultats",
        element: <ResultsPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogPostPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "mentions-legales",
        element: <LegalPage />,
      },
      {
        path: "politique-confidentialite",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "conditions-utilisation",
        element: <TermsPage />,
      },
      {
        path: "politique-cookies",
        element: <CookiePolicyPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "app",
        element: <ClientPortalPage />,
      },
      {
        path: "diagnostic",
        element: <DiagnosticPage />,
      },
      {
        path: "diagnostic/confirmation",
        element: <DiagnosticConfirmationPage />,
      },
      {
        path: "*",
        element: <div className="p-20 text-center">Page introuvable</div>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
