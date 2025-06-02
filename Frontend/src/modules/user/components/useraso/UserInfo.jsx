
import React from "react"
import { User, Mail, Phone, UploadCloud } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function UserInfo() {
  return (
    <form className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6" noValidate>
      <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
        <User className="w-8 h-8 text-blue-600" />
        Información del Usuario
      </h1>

      {/* Foto de perfil */}
      <div className="flex flex-col items-center space-y-3">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Foto de perfil" />
          <AvatarFallback className="text-4xl bg-gray-200 text-gray-500">J</AvatarFallback>
        </Avatar>
        <Button type="button" variant="outline" className="flex items-center gap-2" disabled>
          <UploadCloud className="w-5 h-5" />
          Cambiar foto
        </Button>
      </div>

      {/* Nombre completo */}
      <div>
        <Label htmlFor="nombre" className="flex items-center gap-2 mb-1">
          <User className="w-5 h-5 text-gray-400" /> Nombre completo
        </Label>
        <Input id="nombre" name="nombre" type="text" value="Juan Pérez" disabled />
      </div>

      {/* Correo electrónico */}
      <div>
        <Label htmlFor="email" className="flex items-center gap-2 mb-1">
          <Mail className="w-5 h-5 text-gray-400" /> Correo electrónico
        </Label>
        <Input id="email" name="email" type="email" value="juan.perez@example.com" disabled />
      </div>

      {/* Teléfono */}
      <div>
        <Label htmlFor="telefono" className="flex items-center gap-2 mb-1">
          <Phone className="w-5 h-5 text-gray-400" /> Teléfono
        </Label>
        <Input id="telefono" name="telefono" type="tel" value="+34 600 123 456" disabled />
      </div>
    </form>
  )
}
