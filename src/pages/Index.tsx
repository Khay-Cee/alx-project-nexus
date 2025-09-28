import { Navigate } from 'react-router-dom';

// Redirect to home page since we're using Home.tsx now
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
