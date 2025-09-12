"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('empresa')
  
  const [configEmpresa, setConfigEmpresa] = useState({
    nombre: 'AutoLavado Premium',
    ruc: '80123456-7',
    timbrado: 'T-12345678',
    direccion: 'Av. España 1234, Asunción, Paraguay',
    telefono: '021-123456',
    celular: '0981-123456',
    email: 'contacto@autolavadopremium.com.py',
    website: 'www.autolavadopremium.com.py'
  })

  const [configSistema, setConfigSistema] = useState({
    moneda: 'PYG',
    formatoFactura: 'A4',
    impresora: 'HP LaserJet Pro',
    backupAutomatico: true,
    horarioBackup: '02:00',
    diasRetencionBackup: 30,
    usuario: 'admin',
    cambiarPassword: false,
    nuevaPassword: '',
    confirmarPassword: ''
  })

    const [configFacturacion, setConfigFacturacion] = useState({
    iva: 10,
    mensajeFactura: 'Gracias por preferirnos',
    terminosCondiciones: 'Servicio no reembolsable. Garantía por defectos del servicio por 24 horas.',
    numeracionInicial: 1,
    prefijoFactura: 'FAC-',
    mostrarLogo: true,
    incluirQR: false,
    // CONTROL DE TIMBRADO DGII
    timbradoNumero: 'T-12345678',
    timbradoFechaVencimiento: '2024-12-31',
    timbradoLimiteFacturas: 1000,
    timbradoFacturasUsadas: 234,
    timbradoAlertaDias: 30, // Días antes del vencimiento para alertar
    timbradoAlertaCantidad: 50 // Cantidad de facturas restantes para alertar
  })

  const [configTimbrado, setConfigTimbrado] = useState({
    numero: 'T-12345678',
    fechaInicio: '2024-01-01',
    fechaVencimiento: '2024-12-31',
    cantidadMaxima: 1000,
    cantidadUtilizada: 234,
    activo: true,
    alertaDias: 10,
    alertaCantidad: 50
  })

  const handleSaveEmpresa = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Guardando configuración empresa:', configEmpresa)
    alert('Configuración de empresa guardada exitosamente')
  }

  const handleSaveSistema = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (configSistema.cambiarPassword) {
      if (!configSistema.nuevaPassword || configSistema.nuevaPassword.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres')
        return
      }
      if (configSistema.nuevaPassword !== configSistema.confirmarPassword) {
        alert('Las contraseñas no coinciden')
        return
      }
    }
    
    console.log('Guardando configuración sistema:', configSistema)
    alert('Configuración del sistema guardada exitosamente')
  }

   const handleSaveFacturacion = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones específicas del timbrado
    if (!configFacturacion.timbradoNumero || !configFacturacion.timbradoFechaVencimiento) {
      alert('Por favor complete todos los campos obligatorios del timbrado DGII')
      return
    }

    const vencimiento = new Date(configFacturacion.timbradoFechaVencimiento)
    const hoy = new Date()
    
    if (vencimiento <= hoy) {
      if (!confirm('⚠️ ADVERTENCIA: La fecha de vencimiento del timbrado ya pasó o es hoy. ¿Desea continuar?')) {
        return
      }
    }

    if (configFacturacion.timbradoFacturasUsadas >= configFacturacion.timbradoLimiteFacturas) {
      if (!confirm('⚠️ ADVERTENCIA: Ya se alcanzó o superó el límite de facturas del timbrado. ¿Desea continuar?')) {
        return
      }
    }

    console.log('Guardando configuración facturación:', configFacturacion)
    alert('Configuración de facturación guardada exitosamente.\n\n⚠️ IMPORTANTE: Las alertas de timbrado se actualizarán automáticamente.')
  }

  const handleSaveTimbrado = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!configTimbrado.numero || !configTimbrado.fechaVencimiento) {
      alert('Por favor complete todos los campos obligatorios del timbrado')
      return
    }

    if (new Date(configTimbrado.fechaVencimiento) <= new Date()) {
      alert('La fecha de vencimiento debe ser futura')
      return
    }

    if (configTimbrado.cantidadUtilizada >= configTimbrado.cantidadMaxima) {
      alert('La cantidad utilizada no puede ser mayor o igual a la cantidad máxima')
      return
    }

    console.log('Guardando configuración timbrado:', configTimbrado)
    alert('Configuración de timbrado guardada exitosamente')
  }

  const realizarBackup = () => {
    const fecha = new Date().toISOString().split('T')[0]
    alert(`Realizando backup manual: 1SOLUTION_${fecha}.db\n(Funcionalidad completa en versión C# WPF)`)
  }

  const restaurarBackup = () => {
    alert('Seleccione archivo de backup para restaurar\n(Funcionalidad completa en versión C# WPF)')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">⚙️ Configuración del Sistema</h1>
              <p className="text-gray-600 mt-1">Ajustes generales y personalización</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('empresa')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'empresa'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Empresa
              </button>
              <button
                onClick={() => setActiveTab('facturacion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'facturacion'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Facturación
              </button>
              <button
                onClick={() => setActiveTab('timbrado')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'timbrado'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Control Timbrado
              </button>
              <button
                onClick={() => setActiveTab('sistema')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sistema'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sistema
              </button>
              <button
                onClick={() => setActiveTab('backup')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'backup'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Backup
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Configuración Empresa */}
            {activeTab === 'empresa' && (
              <form onSubmit={handleSaveEmpresa} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={configEmpresa.nombre}
                      onChange={(e) => setConfigEmpresa({...configEmpresa, nombre: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RUC *
                    </label>
                    <input
                      type="text"
                      required
                      value={configEmpresa.ruc}
                      onChange={(e) => setConfigEmpresa({...configEmpresa, ruc: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timbrado DGII *
                    </label>
                    <input
                      type="text"
                      required
                      value={configEmpresa.timbrado}
                      onChange={(e) => setConfigEmpresa({...configEmpresa, timbrado: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      value={configEmpresa.telefono}
                      onChange={(e) => setConfigEmpresa({...configEmpresa, telefono: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Celular
                    </label>
                    <input
                      type="text"
                      value={configEmpresa.celular}
                      onChange={(e) => setConfigEmpresa({...configEmpresa, celular: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={configEmpresa.email}
                      onChange={(e) => setConfigEmpresa({...configEmpresa, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección Completa *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={configEmpresa.direccion}
                    onChange={(e) => setConfigEmpresa({...configEmpresa, direccion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={configEmpresa.website}
                    onChange={(e) => setConfigEmpresa({...configEmpresa, website: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Guardar Configuración
                  </button>
                </div>
              </form>
            )}

             {/* Configuración Facturación */}
            {activeTab === 'facturacion' && (
              <form onSubmit={handleSaveFacturacion} className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="text-yellow-800 font-semibold mb-2">⚠️ Control de Timbrado DGII</h4>
                  <p className="text-yellow-700 text-sm">
                    Configure correctamente el timbrado para evitar problemas legales con la DGII de Paraguay.
                  </p>
                </div>

                {/* Información del Timbrado */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timbrado DGII</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Timbrado *
                      </label>
                      <input
                        type="text"
                        required
                        value={configFacturacion.timbradoNumero}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, timbradoNumero: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="T-12345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento *
                      </label>
                      <input
                        type="date"
                        required
                        value={configFacturacion.timbradoFechaVencimiento}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, timbradoFechaVencimiento: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Límite de Facturas *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="999999"
                        value={configFacturacion.timbradoLimiteFacturas}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, timbradoLimiteFacturas: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Cantidad máxima de facturas permitidas con este timbrado</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facturas Ya Utilizadas
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={configFacturacion.timbradoFacturasUsadas}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, timbradoFacturasUsadas: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Número actual de facturas emitidas</p>
                    </div>
                  </div>

                  {/* Estado actual */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Estado Actual del Timbrado</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Facturas Restantes:</span>
                        <span className="ml-2 font-bold text-blue-600">
                          {(configFacturacion.timbradoLimiteFacturas - configFacturacion.timbradoFacturasUsadas).toLocaleString('es-PY')}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Porcentaje Usado:</span>
                        <span className="ml-2 font-bold text-green-600">
                          {((configFacturacion.timbradoFacturasUsadas / configFacturacion.timbradoLimiteFacturas) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Días para Vencer:</span>
                        <span className="ml-2 font-bold text-yellow-600">
                          {Math.ceil((new Date(configFacturacion.timbradoFechaVencimiento).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} días
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuración de Alertas */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Alertas</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alerta por Fecha (días antes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={configFacturacion.timbradoAlertaDias}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, timbradoAlertaDias: parseInt(e.target.value) || 30})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Días antes del vencimiento para mostrar alerta</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alerta por Cantidad (facturas restantes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={configFacturacion.timbradoAlertaCantidad}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, timbradoAlertaCantidad: parseInt(e.target.value) || 50})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Cantidad de facturas restantes para mostrar alerta</p>
                    </div>
                  </div>
                </div>

                {/* Configuración General de Facturación */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración General</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IVA (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={configFacturacion.iva}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, iva: parseFloat(e.target.value) || 10})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prefijo de Factura
                      </label>
                      <input
                        type="text"
                        value={configFacturacion.prefijoFactura}
                        onChange={(e) => setConfigFacturacion({...configFacturacion, prefijoFactura: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="FAC-"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje en Factura
                    </label>
                    <textarea
                      rows={2}
                      value={configFacturacion.mensajeFactura}
                      onChange={(e) => setConfigFacturacion({...configFacturacion, mensajeFactura: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Gracias por preferirnos"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Guardar Configuración de Facturación
                  </button>
                </div>
              </form>
            )}

            {/* Configuración Sistema */}
            {activeTab === 'sistema' && (
              <form onSubmit={handleSaveSistema} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usuario Administrador
                    </label>
                    <input
                      type="text"
                      value={configSistema.usuario}
                      onChange={(e) => setConfigSistema({...configSistema, usuario: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Impresora Predeterminada
                    </label>
                    <input
                      type="text"
                      value={configSistema.impresora}
                      onChange={(e) => setConfigSistema({...configSistema, impresora: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cambiar-password"
                      checked={configSistema.cambiarPassword}
                      onChange={(e) => setConfigSistema({...configSistema, cambiarPassword: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="cambiar-password" className="ml-2 text-sm text-gray-700">
                      Cambiar contraseña
                    </label>
                  </div>

                  {configSistema.cambiarPassword && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          value={configSistema.nuevaPassword}
                          onChange={(e) => setConfigSistema({...configSistema, nuevaPassword: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmar Contraseña
                        </label>
                        <input
                          type="password"
                          value={configSistema.confirmarPassword}
                          onChange={(e) => setConfigSistema({...configSistema, confirmarPassword: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Guardar Configuración
                  </button>
                </div>
              </form>
            )}

            {/* Control de Timbrado */}
            {activeTab === 'timbrado' && (
              <form onSubmit={handleSaveTimbrado} className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Control de Timbrado DGII</h3>
                  <p className="text-yellow-700 text-sm">
                    El sistema monitoreará automáticamente la fecha de vencimiento y cantidad de facturas utilizadas, 
                    alertando cuando se aproximen los límites configurados.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Timbrado DGII *
                    </label>
                    <input
                      type="text"
                      required
                      value={configTimbrado.numero}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, numero: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="T-12345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      value={configTimbrado.fechaInicio}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, fechaInicio: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Vencimiento *
                    </label>
                    <input
                      type="date"
                      required
                      value={configTimbrado.fechaVencimiento}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, fechaVencimiento: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad Máxima de Facturas *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="999999"
                      value={configTimbrado.cantidadMaxima}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, cantidadMaxima: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad Ya Utilizada
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={configTimbrado.cantidadUtilizada}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, cantidadUtilizada: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Facturas restantes: {configTimbrado.cantidadMaxima - configTimbrado.cantidadUtilizada}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Días de Alerta (antes del vencimiento)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={configTimbrado.alertaDias}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, alertaDias: parseInt(e.target.value) || 10})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">El sistema alertará cuando falten estos días</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad de Alerta (facturas restantes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={configTimbrado.alertaCantidad}
                      onChange={(e) => setConfigTimbrado({...configTimbrado, alertaCantidad: parseInt(e.target.value) || 50})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Alertar cuando queden estas facturas</p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="timbrado-activo"
                        checked={configTimbrado.activo}
                        onChange={(e) => setConfigTimbrado({...configTimbrado, activo: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="timbrado-activo" className="ml-2 text-sm text-gray-700">
                        Timbrado activo (debe estar marcado para poder facturar)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Vista previa del estado actual */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Estado Actual del Timbrado</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-100 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Progreso</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {((configTimbrado.cantidadUtilizada / configTimbrado.cantidadMaxima) * 100).toFixed(1)}%
                      </p>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(configTimbrado.cantidadUtilizada / configTimbrado.cantidadMaxima) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-100 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Facturas Restantes</p>
                      <p className="text-2xl font-bold text-green-900">
                        {configTimbrado.cantidadMaxima - configTimbrado.cantidadUtilizada}
                      </p>
                      <p className="text-xs text-green-700">de {configTimbrado.cantidadMaxima} totales</p>
                    </div>
                    
                    <div className="text-center p-4 bg-yellow-100 rounded-lg">
                      <p className="text-sm text-yellow-600 font-medium">Días para Vencer</p>
                      <p className="text-2xl font-bold text-yellow-900">
                        {Math.ceil((new Date(configTimbrado.fechaVencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                      </p>
                      <p className="text-xs text-yellow-700">hasta {configTimbrado.fechaVencimiento}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Guardar Configuración de Timbrado
                  </button>
                </div>
              </form>
            )}

            {/* Backup */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">💾 Gestión de Backups</h3>
                  <p className="text-yellow-700 text-sm">
                    Los backups se guardan automáticamente cada noche en: C:\1SOLUTION\Backups\
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900">Backup Automático</h4>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="backup-auto"
                        checked={configSistema.backupAutomatico}
                        onChange={(e) => setConfigSistema({...configSistema, backupAutomatico: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="backup-auto" className="ml-2 text-sm text-gray-700">
                        Activar backup automático diario
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horario del Backup
                      </label>
                      <input
                        type="time"
                        value={configSistema.horarioBackup}
                        onChange={(e) => setConfigSistema({...configSistema, horarioBackup: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Días de retención
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={configSistema.diasRetencionBackup}
                        onChange={(e) => setConfigSistema({...configSistema, diasRetencionBackup: parseInt(e.target.value)})}
                        className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">días</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900">Acciones Manuales</h4>
                    
                    <div className="space-y-3">
                      <button
                        onClick={realizarBackup}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        📁 Realizar Backup Ahora
                      </button>
                      
                      <button
                        onClick={restaurarBackup}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        📂 Restaurar desde Backup
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Último Backup</h5>
                      <p className="text-sm text-gray-600">2024-01-15 02:00:00</p>
                      <p className="text-xs text-gray-500">1SOLUTION_2024-01-15.db (2.1 MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información del sistema */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ℹ️ Información del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Versión:</p>
              <p className="font-semibold text-gray-900">1SOLUTION v1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Base de Datos:</p>
              <p className="font-semibold text-gray-900">SQLite (Offline)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado:</p>
              <p className="font-semibold text-green-600">🟢 Operativo</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}