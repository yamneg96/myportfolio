import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CMSLayout from './components/layout/CMSLayout';
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import ManageExperience from './pages/ManageExperience';
import ManageSkills from './pages/ManageSkills';
import ManageAbout from './pages/ManageAbout';
import Login from './pages/Login';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<CMSLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="about" element={<ManageAbout />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
