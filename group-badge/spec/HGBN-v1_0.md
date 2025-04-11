# **Habbo Group Badge Notation (HGBN) v1.0**

- **Specification Status:** Draft
- **Date:** 2025-04-10
- **Available in:** English

## **1. Introduction**

### **1.1. Abstract**

**Habbo Group Badge Notation (HGBN)** is a community-documented, text-based notation designed to represent group badges within the Habbo ecosystem. HGBN encodes structured badge data as a single string composed of multiple six-character segments. Each segment defines either a base image asset or a symbol overlay, including data about the asset id, tint color, and its placement on a 3×3 grid.

While HGBN reflects current badge design definition, it is not an official format maintained by Sulake. Future updates or extensions may not be adopted by the company.

<div align="center">
  <img src="https://www.habbo.com.br/habbo-imaging/badge/b24124s20017s20025s20023s20102b01bfc395d8c4be707922c3da5b3f561.gif" alt="Example Badge">
</div>

### **1.2. Scope and Intent**

#### **1.2.1. This Document**

HGBN was created by the community to formally document how Habbo Hotel processes **group badge components**. It is:

- **An unofficial specification**, meaning Sulake may not adopt updates.
- **Meant for documentation and interoperability**, allowing developers to parse, generate, and manipulate group badges outside the game.

HGBN is **not a standard maintained by Sulake**, and its future extensions **MAY NOT** be reflected in the game's implementation.

- Facilitating the **interoperability** of tools that render, manipulate, or analyze Habbo group badges

#### **1.2.2. The Notation**

HGBN is a textual representation of layered symbols designed for:

- **Storing badge configurations** as a compact text string
- **Programmatic parsing and generation** by developers and researchers

### **1.3. Audience**

This specification is intended for developers, researchers, archivists, and enthusiasts involved in the Habbo Hotel community, particularly those working on tools for Habbo group badges, preservation, and analysis of group badges. It also serves as a common reference for understanding, implementing, and manipulating the Habbo Group Badge Notation (HGBN), which can be used for tasks such as developing interoperable software, emulators, and documentation for fan-driven projects. The audience also includes data scientists who may utilize this notation in image-related research or analysis. Familiarity with basic programming concepts, string manipulation, and image manipulation is recommended but not required.

## **2. Status of This Document**

This document defines HGBN v1.0, the oficial and original way of how group badges design are stored. HGBN is a **community-maintained** standard, and while efforts are made to ensure accuracy, there is **no guarantee that Sulake will adopt future revisions**.

Future updates may introduce **non-official extensions** that extend HGBN beyond the game's native capabilities. Backward compatibility is not guaranteed.

## **3. Normative Language**

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

## **4. Conformance**

An implementation is considered HGBN v1.0 compliant if it adheres to the syntax, processing rules, and constraints defined in this document. A conforming parser implementation:

- **MUST** support at least one base segment followed by one or more symbol segments.
- **MUST** reject badge strings that violate structural rules or value constraints.
- **MAY** extend functionality through non-official extensions, provided they **DO NOT** interfere with the core compliance.

A valid HGBN string **MUST**:

1. Follow the syntax definition in Section 5.
2. Use correct data formatting (segment identifiers, fixed-length numbers, and position digits).
3. Ensure that the asset ids and color ids are exactly two digits each, and the position is a single digit representing a 3×3 grid value.

## **5. Syntax Definition**

### **5.1. Overview**

A HGBN string represents a complete badge by concatenating multiple six-character segments. The string always begins with a single **base segment** (identifier `b`), followed by one or more **symbol segments** (identifiers `s` or `t`).

> ![INFO]
> The trailing hash in the file name (e.g., `b01bfc395d8c4be707922c3da5b3f561`) is probably used for image caching and security and is **ignored in the notation specification**.

### **5.2. Grammar**

The following Extended Backus-Naur Form (EBNF) defines the syntax of HGBN:

```ebnf
<hgbn>           ::= <baseSegment><symbolSegment>+
<baseSegment>    ::= "b"<assetId><colorId><position>
<symbolSegment>  ::= <symbolType><assetId><colorId><position>
<symbolType>     ::= "s" | "t"
<assetId>        ::= <digit><digit>
<colorId>        ::= <digit><digit>
<position>       ::= <gridDigit>
<digit>          ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<gridDigit>      ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

### **5.3. Lexical Constraints**

| Field       | Type      | Format                    | Description                                                                              |
|-------------|-----------|---------------------------|------------------------------------------------------------------------------------------|
| `segmentId` | Character | `b`, `s`, or `t`          | `b` indicates a base segment; `s` or `t` indicates a symbol segment.                     |
| `assetId`   | Integer   | Two digits (00–99)        | Identifier for the image asset.                                                        |
| `colorId`   | Integer   | Two digits (00–99)        | Color tint identifier for the asset.                                                   |
| `position`  | Integer   | One digit (1–9)           | Position on a 3×3 grid where the element is placed.                                     |

### **5.4. Regular Expression (Simplified)**

The following regular expression can be used to validate the general structure of an HGBN string:

```regex
/^(b\d{2}\d{2}[1-9])((s|t)\d{2}\d{2}[1-9])+$/
```

## **6. Processing Model**

### **6.1. Badge Composition Semantics**

- The **base segment** is the foundation for the badge and **MUST** appear as the first segment.
- **Symbol segments** **MUST** be layered on top of the base in the order they appear in the string.
- The order of symbols affects rendering, with earlier symbols possibly appearing underneath later ones.

### **6.2. Rendering Considerations**

- The **assetId** corresponds to a specific image asset stored in the system.
- The **colorId** instructs how the asset image is tinted. Uncolorable portions of the asset remain unchanged.
- The **position** value, within a 3×3 grid (positions 1–9), determines where the asset is placed. Implementations **MUST** render the asset at the corresponding grid cell. The asset **MUST NOT** overflow the badge area.

### **6.3. Error Handling**

| Error Code                 | Description                                                |
|----------------------------|------------------------------------------------------------|
| **ERR_ASSET_ID_RANGE**     | `assetId` is not a two-digit number between 00 and 99.     |
| **ERR_COLOR_ID_RANGE**     | `colorId` is not a two-digit number between 00 and 99.     |
| **ERR_INVALID_POSITION**   | `position` is not a digit between 1 and 9.                 |
| **ERR_SYNTAX**             | The badge string is missing required segments or delimiters.|

An HGBN-compliant parser **MUST** reject invalid strings and report an appropriate error.

## **7. Example Entries**

### **7.1. Basic Example**

Consider the following example HGBN string (without the trailing hash):

```txt
b12035s35047s45029
```

Explanation:

- **Base Segment:**
  - `b12035` → Base with asset id `12`, color id `03`, at grid position `5`.
- **Symbol Segments:**
  - `s35047` → Symbol with asset id `35`, color id `04`, at grid position `7`.
  - `s45029` → Symbol with asset id `45`, color id `02`, at grid position `9`.

### **7.2. Complete Example**

A badge with both `s` and `t` symbol types could be specified as:

```txt
b24124t20017s20025s20023s20102
```

Explanation:

- **Base Segment:**
  - `b24124` → Base with asset id `24`, color id `12`, placed in grid position `4`.
- **Symbol Segments:**
  - `t20017` → Special symbol (type `t`) with asset id `20`, color id `01`, placed in grid position `7`.
  - `s20025` → Symbol with asset id `20`, color id `02`, placed in grid position `5`.
  - `s20023` → Symbol with asset id `20`, color id `02`, placed in grid position `3`.
  - `s20102` → Symbol with asset id `20`, color id `10`, placed in grid position `2`.

## **8. Extensibility and Future Work**

Possible future extensions of HGBN **MAY** include:

1. **Additional Segment Types:** More identifiers beyond `b`, `s`, and `t` to support new features.
2. **Expanded Ranges:** Extending the ranges of asset ids or color ids for upcoming visual designs.
3. **Positional Enhancements:** Defining more granular placements or layering priorities beyond the basic 3×3 grid.

Revisions to the specification **SHALL** be versioned appropriately, and backward compatibility **MAY** be maintained where possible.

## **9. Security Considerations**

Although HGBN is a textual notation and does not execute code, implementations **MUST** sanitize and validate input strings rigorously to prevent issues such as:

- Buffer overflows
- Injection attacks
- Improper rendering due to malformed input

Strict adherence to the syntax and processing guidelines is required for safe implementation.

---

## **10. Reference Tables for Group Badge Assets**

The following tables list the approved asset mappings. Implementers and developers can use these tables as a reference for rendering badge components.

### **10.1. Base Assets**

| Asset Id | Asset Name   | Asset Index | Has Multiple Parts?  | Images |
|----------|--------------|-------------|----------------------|--------|
|          | advanced_1   |             | No                   | ![advanced_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_1.png) |
|          | advanced_2   |             | No                   | ![advanced_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_2.png) |
|          | advanced_3   |             | No                   | ![advanced_3](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_3.png) |
|          | advanced_4   |             | No                   | ![advanced_4](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_4.png) |
|          | basic_1      |             | No                   | ![basic_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_1.png) |
|          | basic_2      |             | No                   | ![basic_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_2.png) |
|          | basic_3      |             | No                   | ![basic_3](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_3.png) |
|          | basic_4      |             | No                   | ![basic_4](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_4.png) |
|          | basic_5      |             | No                   | ![basic_5](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_5.png) |
|          | beams        |             | Yes                  | ![beams_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_beams_part1.png) ![beams_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_beams_part2.png) |
|          | book         |             | No                   | ![book](https://images.habbo.com/c_images/Badgeparts/badgepart_base_book.png) |
|          | circles_1    |             | No                   | ![circles_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_circles_1.png) |
|          | circles_2    |             | No                   | ![circles_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_circles_2.png) |
|          | egg          |             | No                   | ![egg](https://images.habbo.com/c_images/Badgeparts/badgepart_base_egg.png) |
|          | gold_1       |             | Yes                  | ![gold_1_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_1_part1.png) ![gold_1_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_1_part2.png) |
|          | gold_2       |             | Yes                  | ![gold_2_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_2_part1.png) ![gold_2_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_2_part2.png) |
|          | gradient_1   |             | No                   | ![gradient_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gradient_1.png) |
|          | gradient_2   |             | No                   | ![gradient_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gradient_2.png) |
|          | misc_1       |             | Yes                  | ![misc_1_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_misc_1_part1.png) ![misc_1_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_misc_1_part2.png) |
|          | misc_2       |             | No                   | ![misc_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_misc_2.png) |
|          | ornament     |             | No                   | ![ornament](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament.png) |
|          | ornament_1   |             | Yes                  | ![ornament_1_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_1_part1.png) ![ornament_1_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_1_part2.png) |
|          | ornament_2   |             | Yes                  | ![ornament_2_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_2_part1.png) ![ornament_2_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_2_part2.png) |
|          | pin          |             | Yes                  | ![pin_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_pin_part1.png) ![pin_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_pin_part2.png) |
|          | ring         |             | No                   | ![ring](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ring.png) |
|          | shield       |             | Yes                  | ![shield_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_shield_part1.png) ![shield_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_shield_part2.png) |
|          | simplestar   |             | Yes                  | ![simplestar_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_simplestar_part1.png) ![simplestar_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_simplestar_part2.png) |
|          | spiral       |             | No                   | ![spiral](https://images.habbo.com/c_images/Badgeparts/badgepart_base_spiral.png) |

### **10.2. Symbol Assets**

| Prefix | Asset Id | Asset Name | Asset Index | Has Multiple Parts? | Images |
|--------|----------|------------|--------------|----------------------|--------|
|        |          | 0     |              | No                 | ![badgepart_symbol_0.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_0.png) |
|        |          | 1     |              | No                 | ![badgepart_symbol_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_1.png) |
|        |          | 2     |              | No                 | ![badgepart_symbol_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_2.png) |
|        |          | 3     |              | No                 | ![badgepart_symbol_3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_3.png) |
|        |          | 4     |              | No                 | ![badgepart_symbol_4.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_4.png) |
|        |          | 5     |              | No                 | ![badgepart_symbol_5.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_5.png) |
|        |          | 6     |              | No                 | ![badgepart_symbol_6.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_6.png) |
|        |          | 7     |              | No                 | ![badgepart_symbol_7.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_7.png) |
|        |          | 8     |              | No                 | ![badgepart_symbol_8.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_8.png) |
|        |          | 9     |              | No                 | ![badgepart_symbol_9.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_9.png) |
|        |          | a     |              | No                 | ![badgepart_symbol_a.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_a.png) |
|        |          | alligator     |              | No                 | ![badgepart_symbol_alligator.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_alligator.png) |
|        |          | americanfootball     |              | Yes                 | ![badgepart_symbol_americanfootball_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_americanfootball_part1.png) ![badgepart_symbol_americanfootball_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_americanfootball_part2.png) |
|        |          | arrow_down     |              | No                 | ![badgepart_symbol_arrow_down.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_down.png) |
|        |          | arrow_left     |              | No                 | ![badgepart_symbol_arrow_left.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_left.png) |
|        |          | arrow_right     |              | No                 | ![badgepart_symbol_arrow_right.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_right.png) |
|        |          | arrow_up     |              | No                 | ![badgepart_symbol_arrow_up.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_up.png) |
|        |          | arrowbig_up     |              | No                 | ![badgepart_symbol_arrowbig_up.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrowbig_up.png) |
|        |          | award     |              | Yes                 | ![badgepart_symbol_award_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_award_part1.png) ![badgepart_symbol_award_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_award_part2.png) |
|        |          | axe     |              | Yes                 | ![badgepart_symbol_axe_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_axe_part1.png) ![badgepart_symbol_axe_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_axe_part2.png) |
|        |          | b     |              | No                 | ![badgepart_symbol_b.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_b.png) |
|        |          | background_1     |              | No                 | ![badgepart_symbol_background_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_1.png) |
|        |          | background_2     |              | No                 | ![badgepart_symbol_background_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_2.png) |
|        |          | background_3     |              | Yes                 | ![badgepart_symbol_background_3_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_3_part1.png) ![badgepart_symbol_background_3_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_3_part2.png) |
|        |          | ball_1     |              | Yes                 | ![badgepart_symbol_ball_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_1_part1.png) ![badgepart_symbol_ball_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_1_part2.png) |
|        |          | ball_2     |              | Yes                 | ![badgepart_symbol_ball_2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_2_part1.png) ![badgepart_symbol_ball_2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_2_part2.png) |
|        |          | bananapeel     |              | No                 | ![badgepart_symbol_bananapeel.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bananapeel.png) |
|        |          | battleball     |              | No                 | ![badgepart_symbol_battleball.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_battleball.png) |
|        |          | biohazard     |              | No                 | ![badgepart_symbol_biohazard.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_biohazard.png) |
|        |          | bird     |              | No                 | ![badgepart_symbol_bird.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bird.png) |
|        |          | bishop     |              | No                 | ![badgepart_symbol_bishop.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bishop.png) |
|        |          | bobba     |              | No                 | ![badgepart_symbol_bobba.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bobba.png) |
|        |          | bomb     |              | Yes                 | ![badgepart_symbol_bomb_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bomb_part1.png) ![badgepart_symbol_bomb_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bomb_part2.png) |
|        |          | bow     |              | No                 | ![badgepart_symbol_bow.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bow.png) |
|        |          | box_1     |              | No                 | ![badgepart_symbol_box_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_box_1.png) |
|        |          | box_2     |              | No                 | ![badgepart_symbol_box_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_box_2.png) |
|        |          | bug     |              | Yes                 | ![badgepart_symbol_bug_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bug_part1.png) ![badgepart_symbol_bug_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bug_part2.png) |
|        |          | bunting_1     |              | No                 | ![badgepart_symbol_bunting_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bunting_1.png) |
|        |          | bunting_2     |              | No                 | ![badgepart_symbol_bunting_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bunting_2.png) |
|        |          | butterfly     |              | Yes                 | ![badgepart_symbol_butterfly_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_butterfly_part1.png) ![badgepart_symbol_butterfly_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_butterfly_part2.png) |
|        |          | c     |              | No                 | ![badgepart_symbol_c.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_c.png) |
|        |          | capsbig     |              | Yes                 | ![badgepart_symbol_capsbig_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capsbig_part1.png) ![badgepart_symbol_capsbig_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capsbig_part2.png) |
|        |          | capssmall     |              | Yes                 | ![badgepart_symbol_capssmall_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capssmall_part1.png) ![badgepart_symbol_capssmall_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capssmall_part2.png) |
|        |          | cloud     |              | No                 | ![badgepart_symbol_cloud.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cloud.png) |
|        |          | coalion     |              | No                 | ![badgepart_symbol_coalion.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_coalion.png) |
|        |          | cocoamug     |              | No                 | ![badgepart_symbol_cocoamug.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cocoamug.png) |
|        |          | cowskull     |              | Yes                 | ![badgepart_symbol_cowskull_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cowskull_part1.png) ![badgepart_symbol_cowskull_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cowskull_part2.png) |
|        |          | credit     |              | Yes                 | ![badgepart_symbol_credit_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_credit_part1.png) ![badgepart_symbol_credit_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_credit_part2.png) |
|        |          | cross     |              | No                 | ![badgepart_symbol_cross.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cross.png) |
|        |          | crown     |              | Yes                 | ![badgepart_symbol_crown_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_crown_part1.png) ![badgepart_symbol_crown_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_crown_part2.png) |
|        |          | d     |              | No                 | ![badgepart_symbol_d.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_d.png) |
|        |          | dashflag     |              | No                 | ![badgepart_symbol_dashflag.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_dashflag.png) |
|        |          | diamond     |              | No                 | ![badgepart_symbol_diamond.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamond.png) |
|        |          | diamondring     |              | Yes                 | ![badgepart_symbol_diamondring_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamondring_part1.png) ![badgepart_symbol_diamondring_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamondring_part2.png) |
|        |          | diamsmall     |              | No                 | ![badgepart_symbol_diamsmall.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamsmall.png) |
|        |          | diamsmall2     |              | No                 | ![badgepart_symbol_diamsmall2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamsmall2.png) |
|        |          | diploma     |              | Yes                 | ![badgepart_symbol_diploma_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diploma_part1.png) ![badgepart_symbol_diploma_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diploma_part2.png) |
|        |          | discoball     |              | Yes                 | ![badgepart_symbol_discoball_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_discoball_part1.png) ![badgepart_symbol_discoball_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_discoball_part2.png) |
|        |          | dog     |              | No                 | ![badgepart_symbol_dog.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_dog.png) |
|        |          | drop     |              | No                 | ![badgepart_symbol_drop.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_drop.png) |
|        |          | e     |              | No                 | ![badgepart_symbol_e.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_e.png) |
|        |          | electricguitarh     |              | Yes                 | ![badgepart_symbol_electricguitarh_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarh_part1.png) ![badgepart_symbol_electricguitarh_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarh_part2.png) |
|        |          | electricguitarv     |              | Yes                 | ![badgepart_symbol_electricguitarv_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarv_part1.png) ![badgepart_symbol_electricguitarv_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarv_part2.png) |
|        |          | eyeball     |              | Yes                 | ![badgepart_symbol_eyeball_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_eyeball_part1.png) ![badgepart_symbol_eyeball_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_eyeball_part2.png) |
|        |          | f     |              | No                 | ![badgepart_symbol_f.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_f.png) |
|        |          | film     |              | No                 | ![badgepart_symbol_film.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_film.png) |
|        |          | fingersheavy     |              | No                 | ![badgepart_symbol_fingersheavy.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_fingersheavy.png) |
|        |          | fingersv     |              | No                 | ![badgepart_symbol_fingersv.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_fingersv.png) |
|        |          | fist     |              | No                 | ![badgepart_symbol_fist.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_fist.png) |
|        |          | flame_1     |              | No                 | ![badgepart_symbol_flame_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_1.png) |
|        |          | flame_2     |              | No                 | ![badgepart_symbol_flame_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_2.png) |
|        |          | flame     |              | Yes                 | ![badgepart_symbol_flame_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_part1.png) ![badgepart_symbol_flame_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_part2.png) |
|        |          | flash     |              | No                 | ![badgepart_symbol_flash.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flash.png) |
|        |          | flower_1     |              | Yes                 | ![badgepart_symbol_flower_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_1_part1.png) ![badgepart_symbol_flower_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_1_part2.png) |
|        |          | flower_2     |              | No                 | ![badgepart_symbol_flower_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_2.png) |
|        |          | flower_3     |              | No                 | ![badgepart_symbol_flower_3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_3.png) |
|        |          | flower_4     |              | No                 | ![badgepart_symbol_flower_4.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_4.png) |
|        |          | football     |              | No                 | ![badgepart_symbol_football.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_football.png) |
|        |          | g     |              | No                 | ![badgepart_symbol_g.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_g.png) |
|        |          | gamepad     |              | No                 | ![badgepart_symbol_gamepad.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gamepad.png) |
|        |          | gem1     |              | Yes                 | ![badgepart_symbol_gem1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem1_part1.png) ![badgepart_symbol_gem1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem1_part2.png) |
|        |          | gem2     |              | Yes                 | ![badgepart_symbol_gem2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem2_part1.png) ![badgepart_symbol_gem2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem2_part2.png) |
|        |          | gem3     |              | Yes                 | ![badgepart_symbol_gem3_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem3_part1.png) ![badgepart_symbol_gem3_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem3_part2.png) |
|        |          | gtr     |              | Yes                 | ![badgepart_symbol_gtr_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gtr_part1.png) ![badgepart_symbol_gtr_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gtr_part2.png) |
|        |          | h     |              | No                 | ![badgepart_symbol_h.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_h.png) |
|        |          | hat     |              | No                 | ![badgepart_symbol_hat.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hat.png) |
|        |          | hawk     |              | No                 | ![badgepart_symbol_hawk.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hawk.png) |
|        |          | hc     |              | Yes                 | ![badgepart_symbol_hc_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hc_part1.png) ![badgepart_symbol_hc_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hc_part2.png) |
|        |          | heart_1     |              | Yes                 | ![badgepart_symbol_heart_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_1_part1.png) ![badgepart_symbol_heart_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_1_part2.png) |
|        |          | heart_2     |              | Yes                 | ![badgepart_symbol_heart_2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_2_part1.png) ![badgepart_symbol_heart_2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_2_part2.png) |
|        |          | hearts_down     |              | No                 | ![badgepart_symbol_hearts_down.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hearts_down.png) |
|        |          | hearts_up     |              | No                 | ![badgepart_symbol_hearts_up.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hearts_up.png) |
|        |          | horseshoe     |              | No                 | ![badgepart_symbol_horseshoe.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_horseshoe.png) |
|        |          | i     |              | No                 | ![badgepart_symbol_i.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_i.png) |
|        |          | inksplatter     |              | No                 | ![badgepart_symbol_inksplatter.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_inksplatter.png) |
|        |          | j     |              | No                 | ![badgepart_symbol_j.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_j.png) |
|        |          | jingjang     |              | Yes                 | ![badgepart_symbol_jingjang_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_jingjang_part1.png) ![badgepart_symbol_jingjang_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_jingjang_part2.png) |
|        |          | k     |              | No                 | ![badgepart_symbol_k.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_k.png) |
|        |          | l     |              | No                 | ![badgepart_symbol_l.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_l.png) |
|        |          | leaf     |              | No                 | ![badgepart_symbol_leaf.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_leaf.png) |
|        |          | lips     |              | Yes                 | ![badgepart_symbol_lips_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_lips_part1.png) ![badgepart_symbol_lips_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_lips_part2.png) |
|        |          | m     |              | No                 | ![badgepart_symbol_m.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_m.png) |
|        |          | micstand     |              | No                 | ![badgepart_symbol_micstand.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_micstand.png) |
|        |          | mirror     |              | Yes                 | ![badgepart_symbol_mirror_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_mirror_part1.png) ![badgepart_symbol_mirror_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_mirror_part2.png) |
|        |          | monkeywrench     |              | No                 | ![badgepart_symbol_monkeywrench.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_monkeywrench.png) |
|        |          | n     |              | No                 | ![badgepart_symbol_n.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_n.png) |
|        |          | note     |              | No                 | ![badgepart_symbol_note.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note.png) |
|        |          | note1     |              | No                 | ![badgepart_symbol_note1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note1.png) |
|        |          | note2     |              | No                 | ![badgepart_symbol_note2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note2.png) |
|        |          | note3     |              | No                 | ![badgepart_symbol_note3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note3.png) |
|        |          | nursecross     |              | No                 | ![badgepart_symbol_nursecross.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_nursecross.png) |
|        |          | o     |              | No                 | ![badgepart_symbol_o.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_o.png) |
|        |          | oval     |              | Yes                 | ![badgepart_symbol_oval_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_oval_part1.png) ![badgepart_symbol_oval_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_oval_part2.png) |
|        |          | p     |              | No                 | ![badgepart_symbol_p.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_p.png) |
|        |          | pawprint     |              | No                 | ![badgepart_symbol_pawprint.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pawprint.png) |
|        |          | peace     |              | No                 | ![badgepart_symbol_peace.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_peace.png) |
|        |          | pencil     |              | Yes                 | ![badgepart_symbol_pencil_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pencil_part1.png) ![badgepart_symbol_pencil_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pencil_part2.png) |
|        |          | pixel     |              | Yes                 | ![badgepart_symbol_pixel_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pixel_part1.png) ![badgepart_symbol_pixel_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pixel_part2.png) |
|        |          | planet     |              | Yes                 | ![badgepart_symbol_planet_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_planet_part1.png) ![badgepart_symbol_planet_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_planet_part2.png) |
|        |          | q     |              | No                 | ![badgepart_symbol_q.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_q.png) |
|        |          | queen     |              | No                 | ![badgepart_symbol_queen.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_queen.png) |
|        |          | r     |              | No                 | ![badgepart_symbol_r.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_r.png) |
|        |          | rainbow     |              | Yes                 | ![badgepart_symbol_rainbow_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rainbow_part1.png) ![badgepart_symbol_rainbow_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rainbow_part2.png) |
|        |          | rock     |              | No                 | ![badgepart_symbol_rock.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rock.png) |
|        |          | rook     |              | No                 | ![badgepart_symbol_rook.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rook.png) |
|        |          | rosete     |              | No                 | ![badgepart_symbol_rosete.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rosete.png) |
|        |          | s     |              | No                 | ![badgepart_symbol_s.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_s.png) |
|        |          | screw     |              | No                 | ![badgepart_symbol_screw.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_screw.png) |
|        |          | shape     |              | No                 | ![badgepart_symbol_shape.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_shape.png) |
|        |          | skate     |              | No                 | ![badgepart_symbol_skate.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_skate.png) |
|        |          | smallring     |              | Yes                 | ![badgepart_symbol_smallring_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_smallring_part1.png) ![badgepart_symbol_smallring_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_smallring_part2.png) |
|        |          | snowstorm     |              | Yes                 | ![badgepart_symbol_snowstorm_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_snowstorm_part1.png) ![badgepart_symbol_snowstorm_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_snowstorm_part2.png) |
|        |          | sphere     |              | No                 | ![badgepart_symbol_sphere.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sphere.png) |
|        |          | spraycan     |              | Yes                 | ![badgepart_symbol_spraycan_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_spraycan_part1.png) ![badgepart_symbol_spraycan_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_spraycan_part2.png) |
|        |          | star_1     |              | No                 | ![badgepart_symbol_star_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_star_1.png) |
|        |          | star_2     |              | No                 | ![badgepart_symbol_star_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_star_2.png) |
|        |          | stars1     |              | No                 | ![badgepart_symbol_stars1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars1.png) |
|        |          | stars2     |              | No                 | ![badgepart_symbol_stars2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars2.png) |
|        |          | stars3     |              | No                 | ![badgepart_symbol_stars3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars3.png) |
|        |          | stars4     |              | No                 | ![badgepart_symbol_stars4.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars4.png) |
|        |          | stars5     |              | No                 | ![badgepart_symbol_stars5.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars5.png) |
|        |          | stickL     |              | Yes                 | ![badgepart_symbol_stickL_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickL_part1.png) ![badgepart_symbol_stickL_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickL_part2.png) |
|        |          | stickR     |              | Yes                 | ![badgepart_symbol_stickR_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickR_part1.png) ![badgepart_symbol_stickR_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickR_part2.png) |
|        |          | sword_1     |              | Yes                 | ![badgepart_symbol_sword_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_1_part1.png) ![badgepart_symbol_sword_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_1_part2.png) |
|        |          | sword_2     |              | Yes                 | ![badgepart_symbol_sword_2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_2_part1.png) ![badgepart_symbol_sword_2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_2_part2.png) |
|        |          | sword_3     |              | Yes                 | ![badgepart_symbol_sword_3_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_3_part1.png) ![badgepart_symbol_sword_3_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_3_part2.png) |
|        |          | t     |              | No                 | ![badgepart_symbol_t.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_t.png) |
|        |          | u     |              | No                 | ![badgepart_symbol_u.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_u.png) |
|        |          | v     |              | No                 | ![badgepart_symbol_v.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_v.png) |
|        |          | vip     |              | Yes                 | ![badgepart_symbol_vip_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_vip_part1.png) ![badgepart_symbol_vip_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_vip_part2.png) |
|        |          | w     |              | No                 | ![badgepart_symbol_w.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_w.png) |
|        |          | waterdrop     |              | Yes                 | ![badgepart_symbol_waterdrop_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_waterdrop_part1.png) ![badgepart_symbol_waterdrop_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_waterdrop_part2.png) |
|        |          | wings_1     |              | No                 | ![badgepart_symbol_wings_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_wings_1.png) |
|        |          | wings_2     |              | No                 | ![badgepart_symbol_wings_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_wings_2.png) |
|        |          | wolverine     |              | No                 | ![badgepart_symbol_wolverine.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_wolverine.png) |
|        |          | x     |              | No                 | ![badgepart_symbol_x.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_x.png) |
|        |          | y     |              | No                 | ![badgepart_symbol_y.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_y.png) |
|        |          | z     |              | No                 | ![badgepart_symbol_z.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_z.png) |

### **10.3. Color IDs and Tints**

> TODO

### **10.4. Grid Positions**

| **Position Digit** | **Grid Cell**  |
|--------------------|----------------|
| 1                  | Top-left       |
| 2                  | Top-center     |
| 3                  | Top-right      |
| 4                  | Middle-left    |
| 5                  | Center         |
| 6                  | Middle-right   |
| 7                  | Bottom-left    |
| 8                  | Bottom-center  |
| 9                  | Bottom-right   |

---

## **11. References**

> TODO

---

### **Changelog**

- **v1.0.0 – 2025-04-10**
  - Initial draft of the HGBN specification.
