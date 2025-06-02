import React, { useState } from "react"
import UpdatePassword from "@user/components/passwords/UpdatePassword"
import { Smartphone, Lock, User } from "lucide-react"
import UserSecurity from "./UserSecurity"
import UserUpdate from "./UserUpdate"

const tabs = [
  {
    id: "tab1",
    label: "Usuario",
    icon: User,
    component: UserUpdate,
  },
  {
    id: "tab2",
    label: "Autenticación 2FA",
    icon: Smartphone,
    component: UserSecurity,
  },
  {
    id: "tab3",
    label: "Cambiar Contraseña",
    icon: Lock,
    component: UpdatePassword,
  },
]

const UserPanel = () => {
  const [activeTab, setActiveTab] = useState("tab1")

  const activeTabObj = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="flex items-center justify-center p-10">
    <div className="flex w-[60vw] h-[600px] gap-4">
        <div className="flex flex-col min-w-[150px] border border-gray-300 rounded-l-lg bg-white p-4 gap-2 shadow">
        {tabs.map(({ id, label, icon: Icon }) => (
            <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-6 py-4 text-base font-medium rounded-md transition-colors duration-200
                ${
                activeTab === id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
            >
            <Icon className={`w-5 h-5 ${activeTab === id ? "text-white" : "text-gray-500"}`} />
            {label}
            </button>
        ))}
        </div>

        <div className="flex-1 border border-gray-300 rounded-r-lg bg-white p-10 shadow overflow-auto">
        {activeTabObj?.component && React.createElement(activeTabObj.component)}
        </div>
    </div>
    </div>
  )
}

export default UserPanel
