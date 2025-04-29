# notations

<details><summary>Table of Contents</summary>
<div class="js-toc"></div>
</details>

## Areas Covered

This repository documents various notations and data structures used in Habbo Hotel, including:

- **[Avatar Figure](./avatar-figure/README.md)**: Details on how avatar figures are represented.
- **[Ball & Puck](./ball-puck/README.md)**: Details on how the behaviour of the balls and pucks are defined.
- **[Camera](./camera/README.md)**: How the elements in the room are captured and validated server-side.
- **[Firework Particles](./firework-particles/README.md)**: Details on how the firework furniture generate their particles.
- **[Group Badges](./group-badge/README.md)**: Information on the notation used for group badges.
- **[Music](./music/README.md)**: Documentation of the Habbo Music Notation (HMN) used in the Traxmachine.
- **[Pet Food](./pet-food/README.md)**: Details on how the pet food defines their values.
- **[Room Icon](./room-icon/README.md)**: Explanation of the notation for room icons.
- **[Totem Combinations](./totem-combinations/README.md)**: Details on how the 3-part totem can be combined to give effects.
- **[Wall Furni Location](./wall-furni-position/README.md)**: Details on how wall furniture locations are encoded.
- **Waterable Furni**: Details how the furniture interacts with water.

And many more to come: automatic closing gates (battle banzai pyramid), furni that change clothes (santa teleport, fotball gate, etc), freeze tile&block, bunny pole, skate rail, horse accessories, snowboard patch, hoppers, pet baby boxes, cannons, traps, etc!

Each section provides a comprehensive overview of the respective notations, including syntax definitions, examples, and processing models.

---

## Notations vs Data Structures

This project includes both **notations** and **data structures**, each serving different purposes and design philosophies:

- **Notations** are custom formats that define their own syntax and structure, often using delimiters or compact representations to encode information. They focus on *how* data is written and interpreted, without embedding metadata about what each element means.
  - They are **self-contained but context-dependent**: the meaning of each part must be known from external documentation or conventions.
- **Data Structures**, on the other hand, use standardized formats (like CSV, JSON, XML, or key/value tables) that carry *metadata* or structural context alongside the data. They are typically more explicit, readable, and self-descriptive.
  - They are **self-describing**: keys, column headers, or tags indicate what each value represents.

> [!NOTE]
> In simpler cases, such as a comma-separated list of parameters, the format may still be considered a data structure, even if it lacks explicit metadata, as long as it doesn’t define its own complex or symbolic syntax. The key distinction lies in whether the format invents a new encoding scheme, not merely in the presence of labels.

---

## Versioning

We follow a versioning strategy similar to [Semver](https://semver.org/), where a version is defined as `v[FORMAT].[EXTENSION].[REVISION]`. Changes are applied as follows:

- **FORMAT** version is incremented when the notation is redesigned in a completely different and incompatible way (e.g., a new structure or parsing logic where order or format changes significantly).
- **EXTENSION** version is incremented when new functionality is added to the notation in a backward-compatible manner (e.g., support for new part types or optional attributes).
- **REVISION** version is incremented when changes are made to the specification itself (e.g., clarifications, typo fixes, formatting) without modifying the notation's behavior or structure.

This means that for referencing a notation, using only the `v[FORMAT].[EXTENSION]` version number is enough. Additional suffixes may be appended to indicate context-specific adaptations of the specification (e.g., unofficial extensions or environment-specific versions).

---

## Lifecycle

Specifications evolve through several lifecycle stages, representing their maturity and readiness for implementation:

1. **Exploratory**: The initial phase where ideas are collected, the scope is investigated, and relevant references are gathered. The document may be incomplete or unstructured. No implementation or formal review is expected at this stage. **Purpose:** Define intent, explore feasibility, and shape the problem space.
2. **Draft**: A structured and developing version of the specification. The core features, syntax, and processing rules are being written and revised. Community feedback is encouraged, but the content is still subject to significant change. **Purpose:** Begin formalization of ideas into a working specification.
3. **Candidate**: A mature draft that is believed to be complete and internally consistent. It is now ready for experimental or real-world implementation and review. Only minor refinements are expected before finalization. **Purpose:** Encourage testing and validation before final release.
4. **Stable**: The specification is finalized, with confirmed implementations and no expected major changes. This is the recommended version for production use. **Purpose:** Mark the specification as reliable and complete.
5. **Obsolete**: The specification is no longer recommended for use. It may have been replaced by a newer version or deprecated due to lack of relevance. **Purpose:** Inform users that the document is outdated or superseded.

---

## Contributions

This project acknowledges contributors using the **[CRediT taxonomy](https://credit.niso.org/)**, a standardized system that defines specific roles in the development of scholarly and technical content. Each contributor's role may be described using one or more of the following categories:

- **Conceptualization**: Formulating the main ideas and goals behind the specification.
- **Data Curation**: Organizing and maintaining data sources, examples, and references.
- **Formal Analysis**: Applying logic, structure, or technical validation methods.
- **Funding Acquisition**: Securing financial or material support for the project (if applicable).
- **Investigation**: Performing background research, testing, or reverse engineering.
- **Methodology**: Designing the structure, syntax, or operational model of the notation.
- **Project Administration**: Managing planning, communications, and publication.
- **Resources**: Supplying tools, assets, or references used to build the specification.
- **Software**: Writing code, tooling, or validators used with the notations.
- **Supervision**: Providing oversight or leadership on the project direction.
- **Validation**: Verifying accuracy, syntax, and compliance of the model.
- **Visualization**: Creating illustrations, diagrams, or visual examples.
- **Writing (Original Draft)**: Writing the initial content or first complete version.
- **Writing (Review & Editing)**: Reviewing, refining, and improving the specification text.

### People Involved

- **[Alisson Nunes, "alynva"](https://alynva.com)**: Lead author and Project Administration
- **[Matheus, "ferrazmatheus"](https://x.com/ImFerraz_)**: Conceptualization and Investigation
- **["uzuki"](https://x.com/uzukies)**: Writing (Review & Editing)
- **[WiredSpast](https://github.com/WiredSpast)**: Investigation
