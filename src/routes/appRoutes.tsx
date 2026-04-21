import {Routes,Route} from "react-router-dom"
import Register from "../feature/Pilot/pages/register"
import Login from "../feature/Pilot/pages/login"
import RouterProtected from "./appProtected"
import Admin from "../feature/admin/pages/admin"
import Layout from "../feature/Pilot/layout/layout"
import Dashboard from "../feature/Pilot/pages/dashboard"
import Profile from "../feature/Pilot/pages/profile"
import MyGarage from "../feature/Pilot/pages/myGarage"
import Challenge from "../feature/Pilot/pages/challenge"
import EditUser from "../feature/Pilot/pages/editUser"
import DiscoverPilot from "../feature/Pilot/pages/discoverPilot"
import RankingPage from "../feature/admin/pages/rankingPage"
import PilotManagement from "../feature/admin/pages/pilotManagement"
import DisputesPage from "../feature/admin/pages/disputesPage"

 const AppRoutes = () => {
  return (
   <Routes>
    
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login/>} />

     <Route element={<RouterProtected/>}>
          <Route path="/admin" element={<Admin/>} />
     </Route>

          <Route element={<RouterProtected roles={["user"]}/>}>
             <Route element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/garage" element={<MyGarage />} />
                <Route path="/challenges" element={<Challenge/>}></Route>
                <Route path="/editUser" element={<EditUser/>}></Route>
                <Route path="/discoverPilot" element={<DiscoverPilot/>}></Route>
            </Route>

          </Route>



            <Route element={<RouterProtected roles={["admin"]} />}>
              <Route path="/disputedChallenges" element={<DisputesPage/>}></Route>
                <Route path="/rankingPage" element={<RankingPage/>}></Route>
               <Route path="/PilotManagement" element={<PilotManagement/>}></Route>
            </Route>
           
        
     
   </Routes>
  )
}

export default AppRoutes
