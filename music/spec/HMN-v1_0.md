# **Habbo Music Notation (HMN) v1.0**

- **Specification Status:** Draft
- **Date:** 2025-04-12
- **Available in:** English

<details><summary>Table of Contents</summary>
<div class="js-toc"></div>
</details>

## **1. Introduction**

### **1.1. Abstract**

**Habbo Music Notation (HMN)** is a standard for the text-based notation designed to represent music compositions in the **Traxmachine** system of Habbo Hotel. It encodes structured data for **music layers, sample references, and durations** as a single-line string. While HMN reflects how Habbo Hotel interprets music tracks, it is not an official format, and future updates may not be adopted by Sulake.

<div align=center><img src="../img/traxmachine.png"/></div>

### **1.2. Scope and Intent**

#### **1.2.1. This Document**

HMN was created by the community to formally document how Habbo Hotel processes **Traxmachine music encoding**. It is:

- **An unofficial specification**, meaning Sulake may not adopt updates.
- **Meant for documentation and interoperability**, allowing developers to parse, generate, and manipulate Traxmachine sequences outside the game.

HMN is **not a standard maintained by Sulake**, and its future extensions **MAY NOT** be reflected in the game's implementation.

#### **1.2.2. The Notation**

HMN is a textual representation of layered musical data designed for:

- **Ease of storing** music compositions as a **text string** in databases
- **Programmatic** parsing and generation.

### **1.3. Audience**

This specification is intended for developers, researchers, archivists, and enthusiasts involved in the Habbo Hotel community, particularly those working on tools for music playback, preservation, and analysis of Traxmachine compositions. It also serves as a common reference for understanding, implementing, and manipulating the Habbo Music Notation (HMN), which can be used for tasks such as developing interoperable software, emulators, and documentation for fan-driven projects. The audience also includes data scientists who may utilize this notation in music-related research or analysis. Familiarity with basic programming concepts, string manipulation, and digital audio representation is recommended but not required.

## **2. Status of This Document**

This document defines HMN v1.0, the oficial and original way of how Traxmachine stores music compositions. HMN is a **community-maintained** standard, and while efforts are made to ensure accuracy, there is **no guarantee that Sulake will adopt future revisions**.

Future updates may introduce **non-official extensions** that extend HMN beyond the game's native capabilities. Backward compatibility is not guaranteed.

## **3. Normative Language**

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

## **4. Conformance**

An implementation is considered HMN v1.0 compliant if it adheres to the syntax, processing rules, and constraints defined in this document. A conforming parser implementation:

- **MUST** support at least **four layers** and **sample IDs up to 648**
- **MUST** reject the entry if strings violates structural rules or value constraints.
- **MAY** extend functionality, but such extensions **MUST NOT** interfere with core compliance.

A valid HMN entry **MUST**:

1. Follow the **syntax definition** in Section 5.
2. Maintain **correct data formatting** (colons, semicolons, and numbers).
3. **Not exceed** the specified **sample ID range** (0-648).
4. Ensure that durations are **positive integers up to 150** and **multiples of its sample duration**.

---

## **5. Syntax Definition**

### **5.1. Overview**

An HMN string represents a sequence of musical layers, each comprising a list of samples defined by identifiers and durations.

### **5.2. Grammar**

An HMN file consists of **one or more layers**, each containing a sequence of **samples with durations**. The format is formally defined as follows:

```ebnf
<layerList> ::= <layer>+
<layer> ::= <layerId> ":" <sampleList> ":"
<layerId> ::= [1-4]
<sampleList> ::= <sample> (";" <sample>)*
<sample> ::= <sampleId> "," <duration>
<sampleId> ::= 0 | <posIntUpTo648>
<duration> ::= <posIntUpTo150>
```

### **5.3. Lexical Constraints**

| Field      | Type         | Range     | Description                                                   |
|------------|--------------|-----------|---------------------------------------------------------------|
| `layerId`  | Integer      | `1-4`     | Identifier for each musical layer                             |
| `sampleId` | Integer      | `0-648`   | Reference to global sound sample's identifier (0 = silence)   |
| `duration` | Integer      | `1-150`   | Time in units of 2 seconds                                    |

### **5.4. Regular Expression (Simplified)**

The following regular expression can be used to validate the general structure of an HMN entry:

```regex
/^(?:(\d+):(?:(\d+),(\d+))(;(?:(\d+),(\d+)))*:)+$/
```

---

## **6. Processing Model**

### **6.1. Layer Semantics**

- Layers **MUST** be interpreted independently.
- The order of layers **MUST NOT** affect playback.
- Each layer **MUST** include opening and closing colons.

### **6.2. Sample Handling**

- Each **sampleId** represents a **global index** (not tied to a specific pack).
- The identifier `0` (zero) **MUST** be treated as silence and ignored in audio playback.
- Consecutive identical samples **SHOULD** be merged to optimize interpretation.

### **6.3. Duration Constraints**

- Each duration unit **MUST** corresponds to **2 seconds**.
- Durations **MUST** be in the range 1 to 150.
- The duration **MUST** be a multiple of **(sample length ÷ 2)**.

---

## **7. Example Entries**

### **7.1. Basic Example**

The following is an example of a valid HMN string:

```txt
1:12,4;34,2;0,1;56,6:2:22,3;45,2;67,4:3:0,5;31,3;44,2:4:12,6;34,4:
```

Explanation:

- **Layer `1`**: `12,4` (sample ID `12`, duration `4`), `34,2` (sample ID `34`, duration `2`), `0,1` (silence for `1` unit), `56,6` (sample ID `56`, duration `6`).
- **Layer `2`**: `22,3`, `45,2`, `67,4`.
- **Layer `3`**: `0,5` (silence for `5` units), `31,3`, `44,2`.
- **Layer `4`**: `12,6`, `34,4`.

### **7.2. Example from "Habbowood" (Michael Bauble)**

This example is a more complex sequence from the music "Habbowood" by Michael Bauble:

```txt
1:280,4;265,4;264,4;263,8;0,16:2:262,4;263,8;266,4;267,4;264,12;262,4:3:0,4;268,8;269,4;270,4;268,8;282,4;285,4:4:0,20;74,4;75,3;81,3;0,6:
```

---

## **8. Error Handling**

| Error Code               | Description                                      |
|--------------------------|--------------------------------------------------|
| **ERR_SAMPLE_ID_RANGE**  | `sampleId` is outside the valid range `0-648`.   |
| **ERR_INVALID_DURATION** | `duration` is outside the valid range `1-150`.   |
| **ERR_FORMAT_SYNTAX**    | Missing or misplaced delimiters (`:`, `;`, `,`). |
| **ERR_EMPTY_LAYER**      | Layer is declared but contains no samples.       |

An HMN-compliant parser **MUST** reject invalid files and return an appropriate error.

---

## **9. Extensibility and Future Work**

The following extensions **MAY** be introduced in future versions:

1. **More than 4 layers** for enhanced complexity.
2. Expanded **sample ID ranges** for oficial songs or future releases
3. **A binary format (HMN-B)** for compact storage.

Future revisions will maintain backward compatibility wherever feasible, and such extensions will be versioned appropriately.

---

## **10. Security Considerations**

While HMN is **purely textual** and **does not involve code execution**, parsers MUST:

- Sanitize inputs to prevent **buffer overflows**, **injection attacks**, or unexpected recursion.
- Implement strict validation against the grammar and constraints before storage or execution.

> [!IMPORTANT]
> This notation **DOES NOT** have any user-specific information, so by itself it **DOES NOT** ensures that the user owns the sample pack that contains the sample that was used. It is meant to be this way so that the playback can use the same entry without exposing information about the song's author. It is important to understand this if you're saving user generated content, where the user is not meant to have access to all samples.

---

## **11. References**

- *[Musics Archive - Habbianos](https://github.com/Habbianos/Traxmachine/blob/main/components/musics-archive/README.md)*

---

### **Changelog**

- **v1.0.0 – 2025-02-06**
  - Initial draft of the HMN specification.
- **v1.0.1 – 2025-04-07**
  - Text revisions and final touches of the draft.
- **v1.0.2 – 2025-04-12**
  - Minor touches of the draft.
