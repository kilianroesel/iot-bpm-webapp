import { Outlet } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"

export default function Root() {

  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  )
}
