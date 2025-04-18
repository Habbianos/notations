## Areas Covered

This repository documents various notations and data structures used in Habbo Hotel, including:

- **[Avatar Figure](./avatar-figure/README.md)**: Details on how avatar figures are represented.
- **[Group Badges](./group-badge/README.md)**: Information on the notation used for group badges.
- **[Music](./music/README.md)**: Documentation of the Habbo Music Notation (HMN) used in the Traxmachine.
- **Room Icon**: Explanation of the notation for room icons.
- **Wall Furni Position**: Details on how wall furniture positions are encoded.

Each section provides a comprehensive overview of the respective notations, including syntax definitions, examples, and processing models.

## Versioning

We follow a versioning strategy similar to [Semver](https://semver.org/), where a version is defined as `v[FORMAT].[EXTENSION].[REVISION]`. Changes are applied as follows:

- **FORMAT** version is incremented when the notation is redesigned in a completely different and incompatible way (e.g., a new structure or parsing logic where order or format changes significantly).
- **EXTENSION** version is incremented when new functionality is added to the notation in a backward-compatible manner (e.g., support for new part types or optional attributes).
- **REVISION** version is incremented when changes are made to the specification itself (e.g., clarifications, typo fixes, formatting) without modifying the notation's behavior or structure.

This means that for referencing a notation, using only the `v[FORMAT].[EXTENSION]` version number is enough. Additional suffixes may be appended to indicate context-specific adaptations of the specification (e.g., unofficial extensions or environment-specific versions).
