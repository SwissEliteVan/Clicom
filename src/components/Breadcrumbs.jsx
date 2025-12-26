
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const Breadcrumbs = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-slate-500 mb-6", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-indigo-600 transition-colors"
            aria-label="Retour à l'accueil"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-slate-400" />
            {index === items.length - 1 ? (
              <span className="font-medium text-slate-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path} 
                className="hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
