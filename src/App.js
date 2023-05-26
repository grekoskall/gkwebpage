import { Routes, Route } from 'react-router-dom' 
import Layout from './components/Layout'
import Main from './components/Main'
import Login from './features/auth/Login'
import DashBoard from './components/DashBoard'
import Intro from './features/auth/Intro'
import NamesList from './features/names/NamesList'
import NotesList from './features/notes/NotesList'
import ChangeName from './features/names/ChangeName'
import ChangeNote from './features/notes/ChangeNote'
import NewNameForm from './features/names/NewNameForm'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from './hooks/useTitle'

function App() {
  useTitle('GK Webpage')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth  allowedRoles={[...Object.values(ROLES)]}/>}>
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<DashBoard />}>
                <Route index element={<Intro />} />
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<ChangeNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                <Route element={<RequireAuth  allowedRoles={[ROLES.Admin, ROLES.Vip]}/>}>
                  <Route path="names">
                    <Route index element={<NamesList />} />
                    <Route element={<RequireAuth  allowedRoles={[ROLES.Admin]}/>}>
                    <Route path=":id" element={<ChangeName />} />
                    <Route path="new" element={<NewNameForm />} />
                    </Route>
                  </Route>
                </Route>
              </Route> {/* Dashboard */}
            </Route>
          </Route>
        </Route> {/* End */}
      
      </Route>
    </Routes>
  );
}

export default App;
