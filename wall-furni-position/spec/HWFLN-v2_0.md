# **Habbo Wall Furni Location Notation (HWFLN) v2.0**

- **Specification Status:** Draft
- **Date:** 2025-04-19
- **Available in:** English

<details><summary>Table of Contents</summary>
<div class="js-toc"></div>
</details>

## **1. Introduction**

### **1.1. Abstract**

**Habbo Wall Furni Location Notation (HWFLN) v2** is a text-based notation designed to represent the placement of wall furniture items within a Habbo Hotel room. It encodes the grid location, pixel offsets relative to that grid point, and the wall side (left or right) as a single compact string.

While HWFLN v2 reflects the wall furni location definition, it is not an official format maintained by Sulake. Future updates or extensions may not be adopted by the company.

<div align="center">
  <img src="../img/" alt="Image">
</div>

### **1.2. Scope and Intent**

#### **1.2.1. This Document**

This specification exists to formalize and document how how Habbo Hotel processes **wall furni locations**. It:

- **An unofficial specification**, meaning Sulake may not adopt updates.
- **Meant for documentation and interoperability**, allowing developers to parse, generate, and manipulate wall furnies outside the game.

HWFLN is **not a standard maintained by Sulake**, and its future extensions **MAY NOT** be reflected in the game's implementation.

#### **1.2.2. The Notation**

HWFLN v2 is a textual representation of furni placement that enables:

1. **Specify a point** on the room grid
2. **Specify a pixel offset** from that point
3. **Specify the side** of the wall

### **1.3. Audience**

This document is intended for developers, modders, and researchers involved in room editing, automated layout tools, and other environments where a standardized, textual representation of wall furni placement is required.

---

## **2. Status of This Document**

HWFLN v2.0 defines the known structure for how wall furni locations stored, based on the original implementation in Habbo Hotel.

HWFLN is **community-maintained**. While efforts are made to ensure accuracy, Sulake may change the format at any time. Future extensions will aim to preserve backward compatibility whenever possible.

---

## **3. Normative Language**

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

---

## **4. Conformance**

An implementation is considered HWFLN v2.0 compliant if it adheres to the syntax, processing rules, and constraints defined in this document. A conforming parser implementation:

- **MUST** support wall furni location strings beginning with a colon and containing a point, offset, and side specifier.
- **MUST** reject location strings that violate structural rules or value constraints.
- **MAY** extend functionality through non-official extensions, provided they **DO NOT** interfere with the core compliance.

A valid HWFLN string **MUST**:

1. Follow the syntax definition in [Section 5](#5-syntax-definition).
2. Use correct data formatting (grid point, offset pair, and side indicator).
3. Ensure that the values for offset fall within valid ranges based on the room model, and the side is either `l` or `r`.

---

## **5. Syntax Definition**

### **5.1. Overview**

A HWFLN v2 string represents a complete wall furni location by concatenating multiple elements. The string is always ordered starting with the grid position, followed by the pixel offsets, and the side.

### **5.2. Grammar**

```ebnf
<wall_furni_location> ::= ":" <point_info> " " <offset_info> " " <side>
<point_info>          ::= "w=" <pos_x> "," <pos_y>
<pos_x>               ::= INTEGER
<pos_y>               ::= INTEGER
<offset_info>         ::= "l=" <offset_x> "," <offset_y>
<offset_x>            ::= INTEGER    ; see note below
<offset_y>            ::= INTEGER
<side>                ::= "l" | "r"
```

The valid range of `<offset_x>` depends on the original room model used to create the room. **Small** room models use the range `0..32`, while **big** room models use the range `0..16`. This is because, originally in the Shockwave era, small rooms had the default zoom, whereas all big rooms were zoomed out. As a result, the pixel resolution for big rooms was half of the default, and this peculiarity has been inherited ever since, causing wall furnies to jump pixels in some rooms. With the arrival of Wired Variables, a [small guide](https://discord.com/channels/978410780972159017/1241007896930816104) was published to explain this.

The `<offset_y>` value represents the altitude (vertical offset) down from the top of the wall. Therefore, increasing the wall height will move all wall items upward.

All fields except `<offset_x>` may use negative values, but the positioning coordinates exhibit non-linear and unexpected behavior.

### **5.3. Lexical Constraints**

| Field       | Type      | Format         | Description                                                              |
|-------------|-----------|----------------|--------------------------------------------------------------------------|
| `pos_x`     | Integer   | Digits         | Horizontal grid index (tile) on the wall.                                |
| `pos_y`     | Integer   | Digits         | Vertical grid index (tile) on the wall.                                  |
| `offset_x`  | Integer   | Digits         | Horizontal pixel offset from the grid point (range per room model).      |
| `offset_y`  | Integer   | Digits         | Vertical pixel offset (altitude) above the grid point.                   |
| `side`      | Character | `l` or `r`     | `l` = left wall, `r` = right wall.                                       |

### **5.4. Regular Expression (Simplified)**

The following regular expression can be used to validate the general structure of an HWFLN v2.0 string:

```regex
/^:w=-?\d+,-?\d+ l=-?\d+,-?\d+ [lr]$/
```

---

## **6. Processing Model**

### **6.1. Semantics**

1. **Parse** the grid position (`w=x,y`) to determine the tile.
2. **Apply** pixel offsets (`l=dx,dy`) relative to that tile's top-left corner.
3. **Render** the furni item on the specified wall side (`l` or `r`).

### **6.2. Error Handling**

| Error Code                   | Description                                                       |
|------------------------------|-------------------------------------------------------------------|
| **ERR_SYNTAX**               | General syntax violation (missing tokens or delimiters).          |
| **ERR_POS_FORMAT**           | `pos_x` or `pos_y` not valid integers.                            |
| **ERR_OFFSET_FORMAT**        | `offset_x` or `offset_y` not valid integers.                      |
| **ERR_OFFSET_X_RANGE_SMALL** | `<offset_x>` outside `0..32` for small room models.               |
| **ERR_OFFSET_X_RANGE_BIG**   | `<offset_x>` outside `0..16` for big room models.                 |
| **ERR_SIDE_INVALID**         | `<side>` character is not `l` or `r`.                             |

---

## **7. Examples**

### **7.1. Basic Example**

Consider the following example HWFLN v2.0 string:

```txt
:w=0,5 l=4,29 l
```

**Explanation:**

- `w=0,5` → Tile at the grid point (0, 5).
- `l=4,29` → Offset of 4px right, 29px down.
- `l` → Left side of the wall.

### **7.2. Other Examples**

```txt
:w=10,2 l=16,10 r
:w=0,13 l=25,110 l
:w=0,16 l=7,145 l
:w=0,13 l=7,278 r
```

---

## **8. Extensibility and Future Work**

Future enhancements **MAY** include:

- Support for **floating-point** offsets for sub-pixel precision.
- Wall plane identifiers, to support rooms with more than two walls.
- Room model binding, where the notation explicitly declares the model it’s compatible with.
- Anchoring options, such as pinning items relative to the center of a tile instead of the top-left corner, or from the bottom of the wall instead of the top.

---

## **9. Security Considerations**

Although HWFLN is a textual notation and does not execute code, implementations **MUST** sanitize and validate input strings rigorously to prevent issues such as:

- Buffer overflows
- Injection attacks
- Improper rendering due to malformed input

Strict adherence to the syntax and processing guidelines is required for safe implementation.

---

## **10. References**

- *[The Wired Faculty - Discord Server](https://discord.gg/habbowired)*
- *[G-BuildTools - G-Earth Extension](https://github.com/sirjonasxx/G-BuildTools)*

---

### **Changelog**

- **v2.0.0 - 2025-04-19**
  - Initial draft of the HWFLN specification.
- **v2.0.1 - 2025-04-29**
  - Migrated from `v1` to `v2` to let the `v1` be the older unknown implementation.
