# **Habbo Avatar Figure Notation (HAFN) v1.0**

- **Specification Status:** Draft  
- **Date:** 2025-04-07

## **1. Introduction**

### **1.1. Abstract**

**Habbo Avatar Figure Notation (HAFN)** is a community-documented, text-based string notation designed to represent **Habbo avatar appearances** using compact, dot-separated codes. Each string encodes structured data that represents **figure parts, set IDs, and optional color IDs**, and it is based on the data exposed by the `figuredata` currently available.

While HAFN reflects how avatar figures are encoded in Habbo URLs and backend systems, it is **not an official Sulake notation**, and future changes may not be adopted by Sulake.

<div align=center><img src="./img/habbo_avatar.png"/></div>

### **1.2. Scope and Intent**

#### **1.2.1. This Document**

This specification exists to formalize and document how Habbo encodes avatar figure strings for rendering and customization purposes. It is:

- **An unofficial community-maintained specification**.
- Intended for developers and hobbyists building **tools, visualizers, renderers, and archives** for Habbo avatars.
- Based on **publicly available figuredata files**.

#### **1.2.2. The Notation**

HAFN is a textual representation of avatar configuration that enables:

- Compact **single-line storage** of figure appearance.
- Easy **parsing, generation, and validation** of figure strings.

### **1.3. Audience**

This document is aimed at developers, archivists, modders, and enthusiasts in the Habbo community working on avatar-related tools and experiences. Familiarity with string manipulation and XML parsing (for reading `figuredata`) is recommended.

---

## **2. Status of This Document**

HAFN v1.0 defines the current known structure of Habbo avatar strings, based on the parsing behavior seen in Habbo Hotel and documented through the `figuredata` file.

HAFN is **community-maintained**. While it matches current usage patterns, Sulake may change the format at any time. Future extensions will aim to preserve backward compatibility whenever possible.

---

## **3. Normative Language**

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

---

## **4. Conformance**

A system is **HAFN-compliant** if it:

- Properly parses and validates HAFN strings according to the structure in Section 5.
- Resolves part types, set IDs, and color IDs against a valid `figuredata` structure.
- Rejects invalid strings or identifiers not defined in the current figuredata.

---

## **5. Syntax Definition**

### **5.1. Overview**

An HAFN string encodes the **full appearance of a Habbo avatar**. It consists of multiple **figure parts**, separated by dots (`.`). Each part encodes a **type**, **set ID**, and up to **two color IDs**.

### **5.2. Grammar**

```ebnf
<figure> ::= <part> ("." <part>)*
<part> ::= <type> "-" <setId> [ "-" <colorId1> [ "-" <colorId2> ] ]
<type> ::= "hr" | "hd" | "ch" | "lg" | "sh" | "ea" | "cc" | ... ; (see figuredata)
<setId> ::= <positiveInteger>
<colorId1> ::= <positiveInteger>
<colorId2> ::= <positiveInteger>
```

### **5.3. Lexical Constraints**

| Field        | Type     | Description                                                                 |
|--------------|----------|-----------------------------------------------------------------------------|
| `type`       | String   | A valid **part type** as defined in `figuredata`                            |
| `setId`      | Integer  | A valid **set ID** belonging to the specified part type                     |
| `colorId1`   | Integer  | A valid **first color ID** (**MAY** be required depending on the part)      |
| `colorId2`   | Integer  | A valid **second color ID**, **OPTIONAL** (for parts with two color layers) |

Each part **MUST** match an existing `set` entry in the `figuredata` file under the corresponding `<settype type="...">`.

---

## **6. Processing Model**

### **6.1. Dot-separated Parts**

Each part is separated by a **dot (`.`)**. The parser **MUST**:

- Split on `.` to extract individual parts
- Split each part by `-` to determine its type, set ID, and optional colors
- Validate the part type and set ID using a current `figuredata` structure

### **6.2. Validation Rules**

- **Part types** **MUST** exist in `figuredata` under `<settype type="...">`
- **Set IDs** **MUST** be valid for the specified type
- **Color IDs** **MUST** be present in the `paletteid` referenced by that part's set definition

### **6.3. Optional Components**

- Some parts **MAY** omit color IDs entirely.
- Others **REQUIRE** one or two color IDs, depending on the set definition.
- Parts **MAY** appear in any order, though some systems might enforce or expect a typical order.

---

## **7. Example Entries**

### **7.1. Simple Avatar**

```txt
hr-802-40.hd-180-1.ch-3237-1408-1408.lg-3023-64.sh-3068-1408-64.ea-1403-1408.cc-3874-1428-110
```

**Explanation:**

- `hr-802-40` → Hair, set ID 802, color 40
- `hd-180-1` → Head, set ID 180, color 1
- `ch-3237-1408-1408` → Chest, set 3237, dual color 1408
- `lg-3023-64` → Legs, set 3023, color 64
- `sh-3068-1408-64` → Shoes, set 3068, primary color 1408, secondary 64
- `ea-1403-1408` → Ears, set 1403, color 1408
- `cc-3874-1428-110` → Carrying, set 3874, colors 1428 and 110

---

## **8. Error Handling**

| Error Code               | Description                                                    |
|--------------------------|----------------------------------------------------------------|
| **ERR_UNKNOWN_TYPE**     | `type` not found in current `figuredata`                       |
| **ERR_INVALID_SETID**    | Set ID not defined for given type                              |
| **ERR_INVALID_COLOR**    | Color ID not valid for palette used in set                     |
| **ERR_FORMAT_SYNTAX**    | Missing `-`, bad delimiter use, invalid part format            |
| **ERR_PART_INCOMPLETE**  | Missing required set ID or color ID                            |

---

## **9. Extensibility and Future Work**

Future versions MAY include:

- Support for **unknown part types** with fallback rendering
- **Named sets** or mapping helpers for user-friendly representations
- A **compressed or tokenized version** of the figure string for use in URLs

All changes will be versioned appropriately.

---

## **10. Security Considerations**

Though HAFN is purely textual, parsers **MUST**:

- Sanitize inputs
- Prevent malformed strings from causing **buffer overflows** or **injection**
- Validate part, set, and color IDs using **trusted copies** of `figuredata`

> [!IMPORTANT]  
> HAFN strings **do not verify clothes or color ownership**. They represent **appearance only** and should not be used to enforce access or ownership of figure parts.

---

## **11. References**

- [Habbo Figuredata XML](https://www.habbo.com/gamedata/figuredata/1)
- [Habbo Avatar Render Service](https://www.habbo.com/habbo-imaging/avatarimage)

---

### **Changelog**

- **v1.0.0 – 2025-04-07**
  - Initial draft of the Habbo Avatar Figure Notation (HAFN) specification.
