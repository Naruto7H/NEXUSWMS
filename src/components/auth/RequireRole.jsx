import React from 'react';
import { Navigate } from 'react-router-dom';

// In a real app, this would come from a Redux store or AuthContext
const MOCK_USER = {
  name: 'Suhail Nizar',
  email: 'suhail.nizar@nexawms.com',
  role: 'Central Buyer' // Other roles: 'Warehouse Supervisor', 'Admin'
};

export default function RequireRole({ allowedRoles, children, fallback = null }) {
  const userRole = MOCK_USER.role;

  const hasAccess = allowedRoles.includes(userRole);

  // If used as a Route wrapper (redirects if unauthorized)
  if (!hasAccess && fallback === 'redirect') {
    return <Navigate to="/dashboard" replace />;
  }

  // If used as a UI wrapper (hides the button/div if unauthorized)
  if (!hasAccess) {
    return fallback !== 'redirect' ? fallback : null;
  }

  return children;
}