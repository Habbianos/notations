# **Habbo Avatar Figure Notation (HAFN) v2.0**

- **Estado de la Especificación:** Borrador  
- **Fecha:** 2025-04-17
- **Disponible en:** [Inglés (original)](./HAFN-v2_0.md) | [Portugués](./HAFN-v2_0-br.md) | Español

<details><summary>Índice</summary>
<div class="js-toc"></div>
</details>

## **1. Introducción**

### **1.1. Resumen**

**Habbo Avatar Figure Notation (HAFN) v2** es un estándar para la notación de cadenas de texto diseñado para representar **apariencias de avatares de Habbo** usando códigos compactos separados por puntos. Cada cadena codifica datos estructurados que representan **partes de la figura, identificadores de conjunto (set IDs) e identificadores de color opcionales (color IDs)**, y se basa en los datos expuestos por el archivo `figuredata` disponible.

Aunque HAFN v2 refleja cómo se codifican las figuras de avatar en las URLs de Habbo y en los sistemas backend, **no es una notación oficial de Sulake**, y futuros cambios podrían no ser adoptados por Sulake.

<div align="center"><img src="../img/wardrobe.png"/></div>

### **1.2. Alcance y Objetivo**

#### **1.2.1. Este Documento**

Esta especificación existe para formalizar y documentar cómo Habbo codifica **cadenas de figura de avatar** para propósitos de renderizado y personalización. Está dirigida a:

- **Una especificación mantenida por la comunidad, no oficial**.
- Desarrolladores y entusiastas que construyen **herramientas, visualizadores, renderizadores y repositorios** de avatares de Habbo.
- Basado en **archivos `figuredata` disponibles públicamente**.

#### **1.2.2. La Notación**

HAFN v2 es una representación textual de la configuración del avatar que permite:

- **Almacenamiento compacto de una sola línea** de la apariencia del avatar.
- **Fácil análisis, generación y validación** de las cadenas de figura.

NO incluye elementos adicionales como acciones del avatar y efectos visuales, tal como se describe en la [Sección 8](#8-elementos-adicionales).

### **1.3. Audiencia**

Este documento está dirigido a desarrolladores, archiveros, modders y entusiastas de la comunidad Habbo que trabajan en herramientas y experiencias relacionadas con avatares. Se recomienda familiaridad con manipulación de cadenas y análisis de XML (para leer `figuredata`).

---

## **2. Estado de este Documento**

HAFN v2.0 define la estructura actualmente conocida de las cadenas de avatar de Habbo, basándose en el comportamiento de análisis observado en Habbo Hotel y personalizable mediante el archivo `figuredata`.

HAFN es **mantenido por la comunidad**. Aunque coincide con los patrones de uso actuales, Sulake puede cambiar el formato en cualquier momento. Futuras extensiones intentarán preservar la compatibilidad hacia atrás siempre que sea posible.

---

## **3. Lenguaje Normativo**

Las palabras clave "DEBE", "NO DEBE", "OBLIGATORIO", "DEBERÁ", "NO DEBERÁ", "RECOMENDADO", "PUEDE" y "OPCIONAL" en este documento deben interpretarse según lo descrito en [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

---

## **4. Conformidad**

Una implementación se considera conforme con HAFN v2.0 si sigue la sintaxis, la lógica de validación y las reglas de resolución definidas en este documento. Un analizador (parser) conforme:

- **DEBE** resolver tipos de parte, IDs de conjunto e IDs de color utilizando una estructura `figuredata` válida.
- **DEBE** rechazar cualquier cadena o identificador no presente en el `figuredata` actual.
- **PUEDE** extender la funcionalidad con extensiones no oficiales, siempre que **NO INTERFIERAN** con la conformidad central.

Una cadena válida de HAFN v2.0 **DEBE**:

1. Seguir la definición de sintaxis en la [Sección 5](#5-definición-de-sintaxis).
2. Referenciar únicamente tipos de parte, IDs de conjunto e IDs de color conocidos definidos en `figuredata`.
3. Validarse completamente antes de procesarse para evitar configuraciones de avatar indefinidas o malformadas.

---

## **5. Definición de Sintaxis**

### **5.1. Visión General**

Una cadena HAFN v2 codifica la **apariencia completa de un avatar de Habbo**. Consiste en múltiples **partes de figura**, separadas por puntos (`.`). Cada parte codifica un **tipo**, un **ID de conjunto** y hasta **dos IDs de color**.

### **5.2. Gramática**

La Forma de Backus-Naur Extendida (EBNF) que sigue define la sintaxis de HAFN v2.0:

```ebnf
<figure>    ::= <part> ("." <part>)*
<part>      ::= <type> "-" <setId> [ "-" <colorId1> [ "-" <colorId2> ] ]
<type>      ::= "hr" | "hd" | "ch" | "lg" | "sh" | "ea" | "cc" | ... ; (ver figuredata)
<setId>     ::= <positiveInteger>
<colorId1>  ::= <positiveInteger>
<colorId2>  ::= <positiveInteger>
```

### **5.3. Restricciones Léxicas**

| Campo         | Tipo      | Descripción                                                               |
|---------------|-----------|---------------------------------------------------------------------------|
| `type`        | Cadena    | Un **tipo de parte** válido según `figuredata`                           |
| `setId`       | Entero    | Un **ID de conjunto** válido para el tipo de parte especificado          |
| `colorId1`    | Entero    | Un **ID de color primario** (**PUEDE** ser obligatorio según la parte)    |
| `colorId2`    | Entero    | Un **ID de color secundario**, **OPCIONAL** (para partes con dos capas)   |

Cada parte **DEBE** corresponder a una entrada `set` existente en `figuredata` bajo `<settype type="...">`.

### **5.4. Expresión Regular (Simplificada)**

La siguiente expresión regular puede usarse para validar la estructura general de una cadena HAFN v2.0:

```regex
(?:[a-z]{2}-\d+(?:-\d+(?:-\d+)?)?)(?:\.(?:[a-z]{2}-\d+(?:-\d+(?:-\d+)?)?))*
```

---

## **6. Modelo de Procesamiento**

### **6.1. Partes Separadas por Punto**

Cada parte se separa con un **punto (`.`)**. El parser **DEBE**:

- Dividir en `.` para extraer partes individuales
- Dividir cada parte por `-` para identificar tipo, ID de conjunto y colores opcionales
- Validar el tipo de parte y el ID de conjunto usando una estructura `figuredata` actualizada

### **6.2. Reglas de Validación**

- Los **tipos de parte** **DEBEN** existir en `figuredata` bajo `<settype type="...">`
- Los **IDs de conjunto** **DEBEN** ser válidos para el tipo especificado
- Los **IDs de color** **DEBEN** estar presentes en la paleta (`paletteid`) referenciada por la definición del conjunto

### **6.3. Componentes Opcionales**

- Algunas partes **PUEDEN** omitir completamente los IDs de color.
- Otras **REQUIEREN** uno o dos IDs de color, según la definición del conjunto.
- Las partes **PUEDEN** aparecer en cualquier orden, aunque algunos sistemas pueden imponer un orden típico.

### **6.4. Manejo de Errores**

| Código de Error           | Descripción                                                     |
|---------------------------|-----------------------------------------------------------------|
| **ERR_UNKNOWN_TYPE**      | `type` no encontrado en el `figuredata` actual                  |
| **ERR_INVALID_SETID**     | ID de conjunto no definido para el tipo especificado           |
| **ERR_INVALID_COLOR**     | ID de color no válido para la paleta usada en el conjunto      |
| **ERR_FORMAT_SYNTAX**     | Falta `-`, uso incorrecto de delimitadores                     |
| **ERR_PART_INCOMPLETE**   | Falta ID de conjunto o ID de color obligatorio                 |

Un parser conforme con HAFN **DEBE** rechazar cadenas inválidas y reportar el error apropiado.

---

## **7. Ejemplos**

### **7.1. Ejemplo Básico**

Considere la siguiente cadena HAFN v2.0:

```txt
hr-890-45.hd-600-10.ch-665-1408.lg-716-1408-1408
```

![Avatar de `alynva` en `hhus`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-890-45.hd-600-10.ch-665-1408.lg-716-1408-1408)

**Explicación:**

- `hr-890-45` → Cabello, conjunto 890, color 45  
- `hd-600-10` → Cabeza, conjunto 600, color 10  
- `ch-665-1408` → Camisa (pecho), conjunto 665, color 1408  
- `lg-716-1408-1408` → Pantalones (piernas), conjunto 716, color primario y secundario 1408  

### **7.2. Ejemplo Completo**

El avatar puede tener muchas más partes definidas:

```txt
hr-802-37.hd-180-1.ch-3030-1408.lg-3023-64.sh-3068-1408-64.ea-1403-1408.cc-3280-64-1408.cp-3284-64
```

![Avatar de `alynva` en `hhus`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-802-37.hd-180-1.ch-3030-1408.lg-3023-64.sh-3068-1408-64.ea-1403-1408.cc-3280-64-1408.cp-3284-64)

**Explicación:**

- `hr-802-37` → Cabello, conjunto 802, color 37  
- `hd-180-1` → Cabeza, conjunto 180, color 1  
- `ch-3030-1408` → Camisa, conjunto 3030, color 1408  
- `lg-3023-64` → Pantalones, conjunto 3023, color 64  
- `sh-3068-1408-64` → Zapatos, conjunto 3068, color primario 1408, secundario 64  
- `ea-1403-1408` → Gafas, conjunto 1403, color 1408  
- `cc-3280-64-1408` → Abrigo, conjunto 3280, color primario 64, secundario 1408  
- `cp-3284-64` → Estampado, conjunto 3284, color 64  

### **7.3. Otros Ejemplos**

![Avatar de `alynva` en `hhbr`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-802-40.hd-180-1.ch-3030-1408.lg-3023-64.sh-4159-64-1408.ha-3843-1408-64.ea-3484.cc-4184-64-1408.cp-3284-64) ![Avatar de `SweetLiah` en `hhbr`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-4182-45-45.hd-627-10.ch-3836-73-73.lg-3216-64.ha-3843-73-64.cc-6077) ![Avatar de `GuReiPanda` en `hhbr`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-5556-61-45.hd-3997-1.ch-3669-110-110.lg-3058-110.sh-725-110.ea-3577.fa-3344-110.ca-5934-92.cc-5942-110.cp-3311-110) ![Avatar de `sirjonasxxx`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-3436-61-40.hd-180-1390.ch-3077-110-92.lg-280-110.sh-295-92.ha-3242-110-92.he-1608.ea-5007.fa-1206-110) ![Avatar de `matheusferraz`](https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-3163-39.hd-3091-8.ch-5201.lg-3058-1426.sh-5639.ha-5417.he-5828.ea-1406.ca-5571-96.cc-5611-96)

---

## **8. Elementos Adicionales**

Existen otros aspectos relacionados con la figura del avatar que **no** cubre esta especificación, como prendas que usan múltiples partes, acciones del avatar (por ejemplo, tumbarse, sentarse, saludar, bailar) y efectos visuales. Estos elementos no forman parte de la notación en sí y deben considerarse **puramente informativos**; **no** definen ni modifican la notación.

A continuación, enlaces a fuentes de datos relevantes usadas para calcular o renderizar estos elementos. Puede generarse documentación adicional para detallarlos:

- [`figuremap.xml`](https://images.habbo.com/gordon/flash-assets-PRODUCTION-202502041750-974842909/figuremap.xml)
- [`HabboAvatarActions.xml`](https://images.habbo.com/gordon/flash-assets-PRODUCTION-202502041750-974842909/HabboAvatarActions.xml)
- [`effectmap.xml`](https://images.habbo.com/gordon/flash-assets-PRODUCTION-202502041750-974842909/effectmap.xml)

---

## **9. Extensibilidad y Trabajos Futuros**

Futuras versiones **PUEDEN** incluir:

1. Soporte para **tipos de parte desconocidos** con renderizado de reserva
2. **Conjuntos nombrados** o mapeadores para representaciones más amigables
3. Una versión **comprimida o tokenizada** de la cadena de figura para uso en URLs

Las revisiones de la especificación **DEBERÁN** versionarse adecuadamente, y la compatibilidad hacia atrás **PUEDEN** mantenerse cuando sea posible.

---

## **10. Consideraciones de Seguridad**

Aunque HAFN v2 es una notación de texto y **no ejecuta código**, las implementaciones **DEBEN** sanitizar y validar rigurosamente las cadenas de entrada para prevenir:

- Desbordamientos de búfer
- Ataques de inyección
- Renderizados incorrectos por entradas malformadas

> [!IMPORTANTE]
> Las cadenas HAFN v2 **no verifican la propiedad** de prendas ni colores. Representan **solo apariencia** y no deben usarse para imponer acceso o propiedad de partes de la figura.

La adhesión estricta a la sintaxis y a las directrices de procesamiento es necesaria para una implementación segura.

---

## **11. Referencias**

- *[XML `figuredata` de Habbo](https://www.habbo.com/gamedata/figuredata/1)*
- *[Servicio de Renderizado de Avatar de Habbo](https://www.habbo.com.br/habbo-imaging/avatarimage?user=alynva&direction=2&head_direction=3&gesture=sml&action=wlk,crr=1&size=b)*
- *[Habbo Imager por el sitio de fans "Pixels Emotions"](https://pixelsemotion.tumblr.com/habbo-imager)*
- *[Editor de Figuras por el sitio de fans "Habbo News"](https://www.habbonews.net/p/habbo-visuais.html)*

---

### **Registro de Cambios**

- **v2.0.0 – 2025-04-07**
  - Borrador inicial de la especificación Habbo Avatar Figure Notation (HAFN).
- **v2.0.1 – 2025-04-08**
  - Borrador inicial de la sección de elementos adicionales.
- **v2.0.2 – 2025-04-12**
  - Ajustes menores en el borrador.
- **v2.0.3 – 2025-04-13**
  - Migración de `v1` a `v2` para permitir que `v1` sea la notación basada en números.
- **v2.0.4 – 2025-04-14**
  - Se añadió la imagen del armario.
  - Se completó la sección de ejemplos.
  - Ajustes menores en el borrador.
- **v2.0.5 – 2025-04-17**
  - Estandarización de la estructura de la especificación.
  - Finalización de la sección de conformidad.
  - Adición de la sección de "Expresión Regular".
  - Movimiento de la sección de Manejo de Errores dentro del Modelo de Procesamiento.
  - Ajustes menores en el borrador.
