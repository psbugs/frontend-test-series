import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { JSX } from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, token,role } = useSelector((state: RootState) => state.users);

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  const userRole = role?.toLowerCase();

  console.log('userRole',userRole);
  console.log('token',token);
  console.log('allowedRoles',allowedRoles)
  const isAllowed = allowedRoles.map(role => role.toLowerCase()).includes(userRole ?? '');
  console.log('isAllowed',isAllowed);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
