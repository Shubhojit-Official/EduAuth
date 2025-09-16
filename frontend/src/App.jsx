import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar"

export default function App() {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home"  />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard"  />
          <SidebarItem icon={<StickyNote size={20} />} text="Upload" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
        </Sidebar>
      </div>
    </>
  );
}
