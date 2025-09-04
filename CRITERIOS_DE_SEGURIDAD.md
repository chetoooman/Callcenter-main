### 📋 Criterios de Cumplimiento de Seguridad — SELEG

Este documento define cuándo marcar como **✅ Cumplida** cada categoría de la checklist de seguridad por módulo.

---

#### ✅ 1. Planificación

* Se documentaron riesgos y amenazas del módulo.
* Se identificaron normativas aplicables (GDPR, PCI, etc.).
* Hay responsables asignados para su seguridad.

#### ✅ 2. Diseño Seguro

* Se aplica Zero Trust y mínimo privilegio.
* Arquitectura segmentada y control de acceso definidos.
* Se define cifrado de datos en tránsito y reposo.

#### ✅ 3. Desarrollo Seguro

* Prácticas OWASP aplicadas (sin `eval`, ni SQL crudo).
* Validación de entradas/salidas con librerías seguras.
* RBAC y autenticación segura (JWT, MFA si aplica).

#### ✅ 4. Pruebas de Seguridad

* Pruebas contra SQLi, XSS, CSRF, IDOR aplicadas.
* Análisis SAST (ej. ESLint, SonarQube).
* Pruebas DAST o pruebas funcionales de seguridad.

#### ✅ 5. Despliegue Seguro

* Pipeline CI/CD con validaciones de seguridad.
* Uso de entornos aislados (Docker, VMs).
* Secretos y variables gestionados fuera del código.

#### ✅ 6. Operación y Mantenimiento

* Parches de seguridad aplicados regularmente.
* Auditoría y mantenimiento planificados.
* Configuración de entorno versionada o revisada.

#### ✅ 7. Gestión de Dependencias

* Uso de npm, pip, yarn, etc.
* Escaneo de dependencias (Snyk, audit, etc.).
* No se usan librerías obsoletas o sin soporte.

#### ✅ 8. Frontend Seguro

* CSP aplicada o sin JS inline peligroso.
* HTTPS forzado y headers de seguridad.
* Protección contra clickjacking y XSS.

#### ✅ 9. Logging Seguro

* Logs sin datos sensibles (contraseñas, tokens).
* Rotación de logs activa y almacenamiento seguro.
* Eventos críticos registrados (logins, errores, accesos denegados).

#### ✅ 10. Manejo de Incidentes

* Procedimiento de reporte activo.
* Fallos documentados y comunicados.
* Simulacros o protocolos discutidos.

#### ✅ 11. Cumplimiento

* Todos los puntos anteriores verificados para el módulo.
* Terceros o integraciones externas cumplen la política.
* Evidencia documentada disponible (código, pruebas, auditorías).
