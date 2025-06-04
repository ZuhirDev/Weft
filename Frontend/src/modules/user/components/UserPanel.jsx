import { Lock, Smartphone, User } from "lucide-react";
import UserUpdate from "./UserUpdate";
import UserSecurity from "./UserSecurity";
import UpdatePassword from "./passwords/UpdatePassword";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    id: "tab1",
    label: "User",
    icon: User,
    component: UserUpdate,
  },
  {
    id: "tab2",
    label: "2FA Authentication",
    icon: Smartphone,
    component: UserSecurity,
  },
  {
    id: "tab3",
    label: "Change Password",
    icon: Lock,
    component: UpdatePassword,
  },
];

const UserPanel = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const activeTabObj = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/8%)_0,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-5 py-2">
            <User className="w-4 h-4 mr-2 text-primary" />
            Account Settings
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            User{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Panel
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your personal information, security, and account preferences all in one place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="sticky top-6 bg-background/80 backdrop-blur-md border border-border shadow-sm">
                <CardContent className="p-6">
                  <nav className="space-y-2">
                    {tabs.map(({ id, label, icon: Icon }) => (
                      <Button
                        key={id}
                        variant={activeTab === id ? "default" : "ghost"}
                        onClick={() => setActiveTab(id)}
                        className={`w-full justify-start gap-3 rounded-full transition duration-200 ${
                          activeTab === id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{label}</span>
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-background/80 backdrop-blur-md border border-border shadow-sm">
                <CardContent className="p-8">
                  {activeTabObj?.component && React.createElement(activeTabObj.component)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;