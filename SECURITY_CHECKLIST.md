### ✅ Checklist de Desarrollo Seguro — SELEG

#### 1. Planificación y Requisitos

* [ ] Requisitos normativos identificados (ISO 27001, PCI DSS, GDPR).
* [ ] Threat Modeling realizado.
* [ ] Roles y responsabilidades de seguridad definidos.

#### 2. Diseño Seguro

* [ ] Principios de Zero Trust aplicados.
* [ ] Privilegios mínimos aplicados.
* [ ] Arquitectura segmentada con control de acceso.
* [ ] Cifrado de datos en reposo y en tránsito.

#### 3. Desarrollo Seguro

* [ ] Prácticas OWASP aplicadas (inyecciones, XSS, CSRF, etc.).
* [ ] Autenticación robusta implementada (ej. MFA, JWT seguros).
* [ ] RBAC (control de acceso por rol) implementado.
* [ ] Validación de entrada/salida en formularios y APIs.
* [ ] Librerías y frameworks actualizados y seguros.

#### 4. Pruebas de Seguridad

* [ ] Análisis de código estático (SAST).
* [ ] Análisis dinámico en ejecución (DAST).
* [ ] Pruebas de penetración realizadas en staging/dev.
* [ ] Pruebas específicas en autenticación y autorización.

#### 5. Despliegue Seguro

* [ ] Pipeline CI/CD con validaciones de seguridad.
* [ ] Uso de contenedores (Docker) o entornos aislados.
* [ ] Logging y monitoreo en tiempo real activos.

#### 6. Operación y Mantenimiento

* [ ] Parches y actualizaciones de seguridad aplicadas regularmente.
* [ ] Auditorías internas o externas realizadas.

#### 7. Gestión de Dependencias

* [ ] Dependencias gestionadas con sistemas formales (npm, pip, etc.).
* [ ] Escaneos de vulnerabilidades automatizados (ej. Snyk, Dependabot).
* [ ] No se usan librerías sin soporte o abandonadas.

#### 8. Seguridad en Frontend

* [ ] Content Security Policy (CSP) aplicada.
* [ ] HTTPS forzado.
* [ ] Protección contra clickjacking (X-Frame-Options, etc.).

#### 9. Logging Seguro

* [ ] Logs no contienen datos sensibles.
* [ ] Logs con rotación y almacenamiento seguro.

#### 10. Manejo de Incidentes

* [ ] Procedimiento para detección y reporte de incidentes definido.
* [ ] Vulnerabilidades reportadas por el equipo de desarrollo.

#### 11. Capacitación y Concientización

* [ ] El equipo de desarrollo ha recibido capacitación en seguridad.
* [ ] Revisión periódica de nuevas amenazas y actualizaciones.

#### 12. Cumplimiento

* [ ] Todos los roles cumplen esta política.
* [ ] Proveedores externos comprometidos contractualmente con estas medidas.
