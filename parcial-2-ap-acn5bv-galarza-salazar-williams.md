

**BugLog** es una aplicación web fullstack orientada a equipos de QA que trabajan en la industria de los videojuegos. Su propósito es centralizar el proceso de reporte y gestión de bugs, reemplazando métodos informales como planillas, correos o mensajes de texto por una herramienta estructurada, segura y accesible. El sistema contempla dos perfiles de usuario con acceso diferenciado: el *Tester*, que puede reportar bugs y gestionar sus propios registros, y el *Administrador*, que cuenta con control total sobre los reportes y la gestión de usuarios de la plataforma.

El presente documento describe la planificación y gestión del desarrollo de **BugLog**, aplicando conceptos de Administración de Proyectos y metodologías ágiles para organizar el trabajo del equipo y gestionar la evolución de los requerimientos a lo largo del proyecto.

# **Objetivo general del proyecto — OKR**

El objetivo general de BugLog fue definido utilizando **OKR**. A diferencia de SMART, que orienta la redacción de objetivos concretos, acotados y alcanzables dentro de un plazo determinado, OKR nos permite plantear una dirección más ambiciosa y nos da la posibilidad a que el proyecto pueda ser escalable a algo más amplio sin perder la coherencia del mismo. Para un producto de software como **BugLog**, donde los requerimientos pueden crecer, donde nuevas funcionalidades pueden sumarse OKR nos resultó más apropiado.

En términos de escalabilidad, esto marca una diferencia importante. BugLog hoy es una herramienta para equipos pequeños de QA, pero su arquitectura MVC, su sistema de roles y su base de datos relacional están pensados para crecer. Podrían sumarse en el futuro nuevas plataformas soportadas, notificaciones automáticas, reportes estadísticos o funcionalidades más ambiciosas durante su desarrollo, **OKR** permite que ese crecimiento sea parte natural del proyecto.

Lo que se quiere alcanzar con BugLog es que cualquier equipo de QA, sin importar su tamaño, pueda reemplazar sus métodos informales de reporte por una herramienta estructurada, segura y centralizada. Que un tester pueda registrar un bug en segundos con toda la información relevante, que un administrador tenga visibilidad total sobre el estado del testing y que el estudio pueda tomar decisiones de lanzamiento con datos reales en lugar de hilos de mensajes. A donde se quiere llegar es a que BugLog sea una herramienta lo suficientemente robusta y flexible como para adaptarse a distintos estudios, flujos de trabajo y escalas de equipo, sin perder la simplicidad de su uso.

| \# | Key Result | Validación |
| :---- | :---- | :---- |
| KR1 | Implementar autenticación JWT con roles diferenciados | Sistema funcional con roles Admin y Tester verificados por \`authMiddleware.js\` y \`verifyTokenAndAdmin\` |
| KR2 | Lograr cobertura del 100% de operaciones CRUD en bugs  | Endpoints GET, POST, PUT y DELETE en \`/api/bugs\` con validaciones via \`express-validator\` |
| KR3 | Proveer panel de administración de usuarios completamente funcional  | CRUD completo en \`/api/users\` restringido a rol admin, con interfaz en \`AdminUsers.jsx\` |
| KR4 | Asegurar persistencia de datos con base de datos relacional | SQLite con FOREIGN KEY, UNIQUE constraints, CHECK de roles e índices optimizados |
| KR5 | Diseño responsive funcional para desktop, tablet y móvil | CSS modular por componente, grid de 3 columnas responsive, tema oscuro inspirado en Steam |

