import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logout from "@/modules/auth/components/Logout";
import { Settings, UserIcon } from "lucide-react";
import React from 'react';
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/avatars/shadcn.jpg",
    balance: "5,240.50",
  }

const getInitials = (name, lastName) => {
  const firstInitial = name ? name.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return firstInitial + lastInitial;
};



const UserMenu = () => {

    const { user } = useUser();

    const initials = getInitials(user?.name, user?.last_name);

    if(!user) return '';

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>{ initials }</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name} {user.last_name}</p>
                            </div>
                        </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                    <Link to="/user" className="flex items-center">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                    </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Logout className="w-full cursor-pointer" />
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default UserMenu;
