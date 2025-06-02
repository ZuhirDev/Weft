import React from 'react'

const CardModal = () => {
  return (
<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Quantum Card Interface
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Card Preview */}
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className={`w-16 h-10 bg-gradient-to-r ${card.gradient} rounded-lg flex items-center justify-center`}>
              <span className="text-white text-xs font-mono">•••• {card.lastFourDigits}</span>
            </div>
            <div>
              <div className="text-white font-medium">{card.alias}</div>
              <div className="text-white/60 text-sm">{card.network}</div>
            </div>
            <div className="ml-auto">{getStatusBadge(card.status)}</div>
          </div>

          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/10">
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                <Shield className="h-4 w-4 mr-2" />🔐 Seguridad
              </TabsTrigger>
              <TabsTrigger
                value="personalization"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                <Palette className="h-4 w-4 mr-2" />📝 Personalización
              </TabsTrigger>
              <TabsTrigger
                value="limits"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                <TrendingUp className="h-4 w-4 mr-2" />💸 Límites
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
              >
                <Clock className="h-4 w-4 mr-2" />📜 Historial
              </TabsTrigger>
            </TabsList>

            {/* 🔐 SEGURIDAD TAB */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Control Principal */}
                <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Control de Seguridad
                  </h3>

                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-green-400">✅</div>
                      <Label className="text-white">Activar / Desactivar Tarjeta</Label>
                    </div>
                    <Switch defaultChecked={card.status === "active" || card.status === "quantum"} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-400">🧊</div>
                      <Label className="text-white">Congelar Temporalmente</Label>
                    </div>
                    <Switch defaultChecked={card.status === "frozen"} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-400">📍</div>
                      <Label className="text-white">Uso Internacional</Label>
                    </div>
                    <Switch defaultChecked={card.isInternationalEnabled} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
                      <div className="text-yellow-400">🔒</div>
                      <Label className="text-white">Cambiar PIN</Label>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-0">
                      <Lock className="h-4 w-4 mr-2" />
                      Establecer Nuevo PIN
                    </Button>
                  </div>
                </div>

                {/* Datos Sensibles */}
                <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Datos Sensibles
                  </h3>

                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-cyan-400">👁</div>
                      <Label className="text-white">Mostrar Datos Sensibles</Label>
                    </div>
                    <Switch checked={showSensitiveData} onCheckedChange={setShowSensitiveData} />
                  </div>

                  {showSensitiveData && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 rounded-lg border border-cyan-500/20">
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400">Número Completo:</span>
                          <span className="text-white">4532 1234 5678 {card.lastFourDigits}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400">CVV:</span>
                          <span className="text-white">123</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400">Expiración:</span>
                          <span className="text-white">{card.expirationDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400">Código Quantum:</span>
                          <span className="text-white">QX-{card.lastFourDigits}-NEURAL</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Nivel de Seguridad</span>
                      <span className="text-green-400 font-mono">{card.securityLevel}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${card.securityLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 📝 PERSONALIZACIÓN TAB */}
            <TabsContent value="personalization" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información Básica */}
                <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Información de la Tarjeta
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-blue-400">✏️</div>
                      <Label className="text-white">Alias / Nombre de la Tarjeta</Label>
                    </div>
                    <Input
                      defaultValue={card.alias}
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Ej: Tarjeta de gastos diarios"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-green-400">🧾</div>
                      <Label className="text-white">Nota de Uso</Label>
                    </div>
                    <Textarea
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Describe para qué usas esta tarjeta (ej: compras online, gastos de viaje, emergencias...)"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Personalización Visual */}
                <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-pink-400 mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Apariencia Visual
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-purple-400">🎨</div>
                      <Label className="text-white">Color / Gradiente</Label>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: "Cyber Blue", gradient: "from-cyan-400 via-blue-500 to-purple-600", emoji: "💙" },
                        { name: "Neural Pink", gradient: "from-pink-400 via-purple-500 to-indigo-600", emoji: "💜" },
                        { name: "Plasma Green", gradient: "from-green-400 via-emerald-500 to-teal-600", emoji: "💚" },
                        { name: "Solar Orange", gradient: "from-orange-400 via-red-500 to-pink-600", emoji: "🧡" },
                        { name: "Void Black", gradient: "from-gray-400 via-slate-500 to-black", emoji: "🖤" },
                        { name: "Quantum Gold", gradient: "from-yellow-400 via-orange-500 to-red-600", emoji: "💛" },
                      ].map((color, index) => (
                        <button
                          key={index}
                          className={`relative group p-3 bg-gradient-to-r ${color.gradient} rounded-lg border-2 ${
                            card.gradient.includes(color.gradient.split(" ")[0].replace("from-", ""))
                              ? "border-white"
                              : "border-white/20"
                          } hover:border-white/60 transition-all hover:scale-105`}
                        >
                          <div className="text-white text-center">
                            <div className="text-lg">{color.emoji}</div>
                            <div className="text-xs font-medium">{color.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-cyan-400">🔮</div>
                      <Label className="text-white">Icono de Tipo</Label>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["⚡", "🌟", "💎", "🔥", "❄️", "🌙", "☄️", "🌈"].map((icon, index) => (
                        <button
                          key={index}
                          className="p-3 bg-black/20 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/30 transition-all text-xl"
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 💸 LÍMITES TAB */}
            <TabsContent value="limits" className="space-y-6 mt-6">
              <div className="space-y-6">
                {/* Límites Principales */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />💰 Límites de Gasto
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-white">Límite Diario (€)</Label>
                      <div className="space-y-2">
                        <Slider defaultValue={[card.dailyLimit]} max={20000} step={100} className="w-full" />
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">€0</span>
                          <span className="text-cyan-400 font-mono">€{card.dailyLimit.toLocaleString()}</span>
                          <span className="text-white/60">€20,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Límite Mensual (€)</Label>
                      <div className="space-y-2">
                        <Slider defaultValue={[card.monthlyLimit]} max={100000} step={1000} className="w-full" />
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">€0</span>
                          <span className="text-purple-400 font-mono">€{card.monthlyLimit.toLocaleString()}</span>
                          <span className="text-white/60">€100,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Límites por Tipo de Operación */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />🌐 Límites por Tipo de Operación
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { type: "Online", icon: "💻", limit: 2000, color: "text-cyan-400" },
                      { type: "Presencial", icon: "🏪", limit: 5000, color: "text-green-400" },
                      { type: "Cajero", icon: "🏧", limit: 1000, color: "text-yellow-400" },
                    ].map((operation) => (
                      <div key={operation.type} className="space-y-3 p-3 bg-black/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{operation.icon}</span>
                          <Label className="text-white">{operation.type}</Label>
                        </div>
                        <Input
                          type="number"
                          defaultValue={operation.limit}
                          className="bg-black/20 border-white/10 text-white"
                        />
                        <div className={`text-sm font-mono ${operation.color}`}>
                          €{operation.limit.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloqueo de Comercios */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />⛔ Bloquear Tipos de Comercio
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Juegos y Apuestas", icon: "🎰", blocked: false },
                      { name: "Gasolineras", icon: "⛽", blocked: false },
                      { name: "Restaurantes", icon: "🍽️", blocked: false },
                      { name: "Entretenimiento", icon: "🎬", blocked: false },
                      { name: "Farmacias", icon: "💊", blocked: false },
                      { name: "Supermercados", icon: "🛒", blocked: false },
                      { name: "Transporte", icon: "🚗", blocked: false },
                      { name: "Hoteles", icon: "🏨", blocked: false },
                      { name: "Tecnología", icon: "📱", blocked: false },
                    ].map((merchant) => (
                      <div
                        key={merchant.name}
                        className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{merchant.icon}</span>
                          <span className="text-white text-sm">{merchant.name}</span>
                        </div>
                        <Switch defaultChecked={merchant.blocked} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 📜 HISTORIAL TAB */}
            <TabsContent value="history" className="space-y-6 mt-6">
              <div className="space-y-6">
                {/* Filtros de Búsqueda */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-pink-400 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />🔎 Filtros de Búsqueda
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Buscar Comercio</Label>
                      <Input
                        placeholder="Nombre del comercio..."
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Fecha Desde</Label>
                      <Input type="date" className="bg-black/20 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Fecha Hasta</Label>
                      <Input type="date" className="bg-black/20 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Tipo de Operación</Label>
                      <Select>
                        <SelectTrigger className="bg-black/20 border-white/10 text-white">
                          <SelectValue placeholder="Todos los tipos" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                          <SelectItem value="all" className="text-white hover:bg-white/10">
                            Todos
                          </SelectItem>
                          <SelectItem value="neural" className="text-white hover:bg-white/10">
                            💻 Neural (Online)
                          </SelectItem>
                          <SelectItem value="quantum" className="text-white hover:bg-white/10">
                            🏪 Quantum (Presencial)
                          </SelectItem>
                          <SelectItem value="plasma" className="text-white hover:bg-white/10">
                            🏧 Plasma (Cajero)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-white">Monto Mínimo (€)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Monto Máximo (€)</Label>
                      <Input
                        type="number"
                        placeholder="999999.99"
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Lista de Transacciones */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />🕓 Últimas Transacciones
                  </h3>

                  <div className="space-y-3">
                    {futuristicTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                transaction.status === "completed"
                                  ? "bg-green-400"
                                  : transaction.status === "processing"
                                    ? "bg-yellow-400 animate-pulse"
                                    : "bg-purple-400"
                              }`}
                            ></div>
                            <div className="text-xs text-white/40 mt-1">
                              {transaction.type === "neural" ? "💻" : transaction.type === "quantum" ? "🏪" : "🏧"}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-white font-medium">{transaction.merchant}</div>
                            <div className="text-white/60 text-sm flex items-center space-x-2">
                              <span>{transaction.location}</span>
                              <span>•</span>
                              <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                              <span>•</span>
                              <Badge
                                className={`text-xs ${
                                  transaction.status === "completed"
                                    ? "bg-green-500/20 text-green-400"
                                    : transaction.status === "processing"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-purple-500/20 text-purple-400"
                                }`}
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`font-mono text-lg ${
                              transaction.amount < 0 ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            {transaction.amount < 0 ? "-" : "+"}€{Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <div className="text-white/60 text-xs">
                            {new Date(transaction.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" className="bg-black/20 border-white/10 text-white hover:bg-white/10">
                      Cargar más transacciones
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>  )
}

export default CardModal
