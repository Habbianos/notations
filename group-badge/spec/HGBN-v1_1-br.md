# **Habbo Group Badge Notation (HGBN) v1.1**

- **Status da Especificação:** Candidato
- **Data:** 2025-05-02
- **Disponível em:** [Inglês (original)](./HGBN-v1_1.md) • Português • [Espanhol](./HGBN-v1_1-es.md)

> [!NOTE]
> Este documento é uma tradução [do original](./HGBN-v1_1.md). Caso observe inconsistências em relação ao conteúdo do jogo neste idioma, por favor, [nos avise](https://github.com/Habbianos/notations/issues/new/choose) para que possamos corrigir a localização.

<details><summary>Sumário</summary>
<div class="js-toc"></div>
</details>

## **1. Introdução**

### **1.1. Resumo**

**Habbo Group Badge Notation (HGBN) v1** é um padrão para notação baseada em texto projetado para representar **emblemas de grupos dentro do ecossistema Habbo**. O HGBN codifica dados estruturados de emblemas como uma única string composta por múltiplos segmentos de seis caracteres. Cada segmento define uma imagem base ou um símbolo sobreposto, incluindo dados sobre o ID do recurso, cor de tonalidade e sua posição em uma grade 3×3.

Embora o HGBN v1 reflita a definição atual de design de emblemas, ele **não é um formato oficial mantido pela Sulake**, e atualizações ou extensões futuras podem não ser adotadas pela empresa.

<div align="center">
  <img src="../img/editor-new.png" alt="Emblema de exemplo">
</div>

### **1.2. Escopo e Objetivo**

#### **1.2.1. Este Documento**

Esta especificação existe para formalizar e documentar como o Habbo Hotel processa **componentes de emblemas de grupo**. Ela é:

- **Uma especificação não oficial**, ou seja, a Sulake pode não adotar atualizações.
- **Voltada para documentação e interoperabilidade**, permitindo que desenvolvedores analisem, gerem e manipulem emblemas de grupo fora do jogo.

O HGBN **não é um padrão mantido pela Sulake**, e suas extensões futuras **PODEM NÃO** ser refletidas na implementação do jogo.

#### **1.2.2. A Notação**

O HGBN v1 é uma representação textual de símbolos em camadas projetada para:

- **Armazenar configurações de emblemas** como uma string de texto compacta
- **Análise e geração programática** por desenvolvedores e pesquisadores
- Facilitar a **interoperabilidade** de ferramentas que renderizam, manipulam ou analisam emblemas de grupo do Habbo

### **1.3. Público-alvo**

Este documento é destinado a desenvolvedores, pesquisadores, arquivistas e entusiastas envolvidos na comunidade do Habbo Hotel, especialmente aqueles que trabalham com ferramentas para emblemas de grupo do Habbo. Também serve como uma referência comum para compreender, implementar e manipular a notação Habbo Group Badge Notation (HGBN), podendo ser usada em tarefas como desenvolvimento de softwares interoperáveis, emuladores e documentação para projetos criados por fãs. O público-alvo também inclui cientistas de dados que possam utilizar essa notação em pesquisas ou análises relacionadas a imagens. Familiaridade com conceitos básicos de programação, manipulação de strings e manipulação de imagens é recomendada, mas não obrigatória.

---

## **2. Estado deste Documento**

O HGBN v1.1 define a estrutura atualmente conhecida de como os designs de emblemas de grupo são armazenados, com base na implementação original no Habbo Hotel.

O HGBN é **mantido pela comunidade**. Embora sejam feitos esforços para garantir a precisão, a Sulake pode alterar o formato a qualquer momento. Extensões futuras buscarão preservar a compatibilidade retroativa sempre que possível.

---

## **3. Linguagem Normativa**

As palavras-chave "DEVE", "NÃO DEVE", "OBRIGATÓRIO", "DEVERÁ", "DEVERÁ NÃO", "RECOMENDADO", "PODE" e "OPCIONAL" neste documento devem ser interpretadas conforme descrito em [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

---

## **4. Conformidade**

Uma implementação é considerada compatível com o HGBN v1.1 se aderir à sintaxe, regras de processamento e restrições definidas neste documento. Uma implementação de parser em conformidade:

- **DEVE** suportar ao menos um segmento base seguido por um ou mais segmentos de símbolo.
- **DEVE** rejeitar strings de emblema que violem regras estruturais ou restrições de valor.
- **PODE** estender a funcionalidade através de extensões não oficiais, desde que **NÃO INTERFIRAM** na conformidade central.

Uma string HGBN válida **DEVE**:

1. Seguir a definição de sintaxe na [Seção 5](#5-definicao-de-sintaxe).
2. Utilizar formatação correta dos dados (identificadores de segmento, números de comprimento fixo e dígitos de posição).
3. Garantir que os IDs de recurso e os IDs de cor tenham exatamente dois dígitos cada, e que a posição seja um único dígito representando um valor em grade 3×3.

---

## **5. Definição de Sintaxe**

### **5.1. Visão Geral**

Uma string HGBN v1 representa um emblema completo concatenando múltiplos segmentos de seis caracteres. A string sempre começa pelo recurso base (identificado por `b`), seguido pelos símbolos sobrepostos (identificados por `s` ou `t`).

> [!NOTE]
> O hash final no nome do arquivo (por exemplo, `b01bfc395d8c4be707922c3da5b3f561`) provavelmente é usado para cache de imagem e segurança e **é ignorado na especificação da notação**.

### **5.2. Gramática**

A Forma de Backus‑Naur Estendida (EBNF) a seguir define a sintaxe do HGBN v1.1:

```ebnf
<hgbn>           ::= <baseSegment><symbolSegment>+
<baseSegment>    ::= "b"<assetId><colorId><position>
<symbolSegment>  ::= <symbolType><assetId><colorId><position>
<symbolType>     ::= "s" | "t"
<assetId>        ::= <digit><digit>
<colorId>        ::= <digit><digit>
<position>       ::= <gridDigit>
<digit>          ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<gridDigit>      ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
```

### **5.3. Restrições Lexicais**

| Campo       | Tipo      | Formato              | Descrição                                                        |
|-------------|-----------|----------------------|------------------------------------------------------------------|
| `segmentId` | Caractere | `b`, `s` ou `t`      | `b` indica segmento base; `s` ou `t` indica segmento de símbolo. |
| `assetId`   | Inteiro   | Dois dígitos (00–99) | Identificador do recurso de imagem.                              |
| `colorId`   | Inteiro   | Dois dígitos (00–99) | Identificador de tonalidade de cor para o recurso.               |
| `position`  | Inteiro   | Um dígito (0–8)      | Posição em uma grade 3×3 onde o elemento é colocado.             |

### **5.4. Expressão Regular (Simplificada)**

A expressão regular a seguir pode ser usada para validar a estrutura geral de uma string HGBN v1.1:

```regex
/^(b\d{2}\d{2}[0-8])((s|t)\d{2}\d{2}[0-8]){0,4}$/
```

---

## **6. Modelo de Processamento**

### **6.1. Semântica de Composição de Emblemas**

- O **segmento base** é a base do emblema e **DEVE** aparecer como o primeiro segmento.
- **Segmentos de símbolo** **DEVEM** ser sobrepostos ao segmento base na ordem em que aparecem na string.
- A ordem dos símbolos afeta a renderização, com símbolos anteriores possivelmente aparecendo abaixo dos posteriores.

### **6.2. Considerações de Renderização**

- O **assetId** corresponde a um recurso de imagem específico armazenado no sistema.
- O **colorId** indica como a imagem do recurso deve ser tingida. Partes não coloríveis (máscara) do recurso permanecem inalteradas.
- O valor de **posição**, dentro de uma grade 3×3 (posições 0–8), determina onde o recurso é colocado. Implementações **DEVEM** renderizar o recurso na célula correspondente da grade. O recurso **NÃO DEVE** exceder a área do emblema.

### **6.3. Tratamento de Erros**

| Código de Erro           | Descrição                                                     |
|--------------------------|---------------------------------------------------------------|
| **ERR_ASSET_ID_RANGE**   | `assetId` não está entre 00 e 99 (dois dígitos).              |
| **ERR_COLOR_ID_RANGE**   | `colorId` não está entre 00 e 99 (dois dígitos).              |
| **ERR_INVALID_POSITION** | `position` não é um dígito entre 0 e 8.                       |
| **ERR_SYNTAX**           | A string do emblema está faltando segmentos ou delimitadores. |

Um parser compatível com HGBN **DEVE** rejeitar strings inválidas e relatar o erro apropriado.

---

## **7. Exemplos**

### **7.1. Exemplo Básico**

Considere a seguinte string HGBN v1.1 (sem o hash final):

```txt
b12134s47114s46114s48114s45114
```

[![Emblema de Brinquedoteca Academia Wired em hhbr](https://www.habbo.com.br/habbo-imaging/badge/b12134s47114s46114s48114s45114f6bbe1ccfa2e8dd23d17c70895929672.png)](https://www.habbo.com.br/api/public/groups/g-hhbr-d5c67dd48b87d8b62f5a6a14ebbf4d8d)

**Explicação:**

- `b12134` → Base com asset id `12`, color id `13`, posição na grade `4`.
- `s47114` → Símbolo com asset id `47`, color id `11`, posição na grade `4`.
- `s46114` → Símbolo com asset id `46`, color id `11`, posição na grade `4`.
- `s48114` → Símbolo com asset id `48`, color id `11`, posição na grade `4`.
- `s45114` → Símbolo com asset id `45`, color id `11`, posição na grade `4`.

### **7.2. Exemplo Completo**

Um emblema com tipos de símbolo `s` e `t` pode ser especificado como:

```txt
b12063s78110t00118t27114
```

[![Emblema de Central Academia Wired em hhbr](https://www.habbo.com.br/habbo-imaging/badge/b12063s78110t00118t27114b28267b614ceae7f67b62007c901dbe2.png)](https://www.habbo.com.br/api/public/groups/g-hhbr-77d66c05a0d7373a02f17f0cd937115c)

**Explicação:**

- `b12063` → Base com asset id `12`, color id `06`, posição na grade `3`.
- `s78110` → Símbolo com asset id `78`, color id `11`, posição na grade `0`.
- `t00118` → Símbolo (tipo `t`) com asset id `00`, color id `11`, posição na grade `8`.
- `t27114` → Símbolo (tipo `t`) com asset id `27`, color id `11`, posição na grade `4`.

### **7.3. Outros Exemplos**

![`Ajudantes Habbo Oficiais`](https://www.habbo.com.br/habbo-imaging/badge/b27124s02113s85094fff2f2c95774f5852db11d2d05c57edc.png) ![`— Toque Piano —`](https://www.habbo.com.br/habbo-imaging/badge/b01114t36137t38130t371388462b6475c5fd8bcdf24285423b9a3f1.png) ![`A Viagem de Chihiro`](https://www.habbo.com.br/habbo-imaging/badge/b01164t21027t21034t21071cd17bc78d5559983bd4c8acbc69bd619.png) ![`LAR REGRADO`](https://www.habbo.com.br/habbo-imaging/badge/b01014s86137s861316812278842b21c2572744276d186bf11.png) ![`.`](https://www.habbo.com.br/habbo-imaging/badge/b22104t15101d8ae27b79156fa62889bc0f0639b51f2.png) ![`FlyFood Game`](https://www.habbo.com.br/habbo-imaging/badge/b22134s63117s83104t07013s65025ce89139b78df89a96522084130c161ce.png) ![`Gartic - Desenhe palavras`](https://www.habbo.com.br/habbo-imaging/badge/b20244t40112s05108s05017s0506646909025237657d2cb74b1ce2139b664.png)

---

## **8. Extensibilidade e Trabalhos Futuros**

Possíveis extensões futuras do HGBN **PODEM** incluir:

1. **Tipos de Segmento Adicionais:** Mais identificadores além de `b`, `s` e `t` para suportar novos recursos.
2. **Intervalos Expandido:** Extensão dos intervalos de assetIds ou colorIds para futuros designs visuais.
3. **Aprimoramentos Posicionais:** Definição de posicionamentos mais granulares ou prioridades de sobreposição além da grade básica 3×3.

Revisões da especificação **DEVERÃO** ser versionadas adequadamente, e a compatibilidade retroativa **PODE** ser mantida quando possível.

---

## **9. Considerações de Segurança**

Embora o HGBN seja uma notação textual e **não execute código**, as implementações **DEVEM** sanitizar e validar rigorosamente as strings de entrada para evitar problemas como:

- Buffer overflows
- Ataques de injeção
- Renderização incorreta devido a entrada malformada

A adesão estrita à sintaxe e às diretrizes de processamento é necessária para uma implementação segura.

---

## **10. Referências**

- [1] *API de Grupos do Habbo*, Habbo.com.br. Disponível em: [https://www.habbo.com.br/api/public/groups/g-hhbr-d5c67dd48b87d8b62f5a6a14ebbf4d8d](https://www.habbo.com.br/api/public/groups/g-hhbr-d5c67dd48b87d8b62f5a6a14ebbf4d8d)
- [2] *Serviço de Renderização de Emblemas de Grupo do Habbo*, Habbo.com.br. Disponível em: [https://www.habbo.com.br/habbo-imaging/badge/b12134s47114s46114s48114s45114f6bbe1ccfa2e8dd23d17c70895929672.png](https://www.habbo.com.br/habbo-imaging/badge/b12134s47114s46114s48114s45114f6bbe1ccfa2e8dd23d17c70895929672.png) (também disponível no formato `.gif` e pela variante `badge-fill` para fundo opaco)

---

## **11. Contribuidores**

Este documento foi desenvolvido com contribuições de:

- **[Alisson Nunes, "alynva"](https://alynva.com)**: Autor principal
- **[Matheus, "ferrazmatheus"](https://x.com/ImFerraz_)**: Investigação

---

## **12. Registro de Mudanças**

- **v1.1.0 – 2025‑04‑12**
  - Atualização a partir da `v1.0` com base em novas informações encontradas.
  - Preenchimento das tabelas de referência.
  - Correção dos IDs de posição com índice zero.
  - Ajustes menores no rascunho.
- **v1.1.1 – 2025‑04‑17**
  - Padronização da estrutura da especificação.
  - Ajustes menores no rascunho.
- **v1.1.2 – 2025‑04‑18**
  - Ajustes gramaticais menores.
- **v1.1.3 - 2025-05-02**
  - Correção da tag Alerta de Markdown.
  - Seção de Colaboradores Adicionada.
  - Reorganização das últimas seções e renomeação da Tabela de Referência para Apêndices.

---

## **13. Apêndices**

As tabelas a seguir listam os mapeamentos aprovados de ativos. Implementadores e desenvolvedores podem usar estas tabelas como referência para renderizar componentes de emblema. As tabelas estão ordenadas pelo nome do ativo; o “índice” indica a posição na lista do jogo, seguido de `linha × coluna` para facilitar a navegação.

### **13.1. Apêndice A. Emblema de Grupo Ativos Base**

| Prefixo de Notação | ID de Notação | ID do Recurso | Nome do Recurso ▲ | Índice do Recurso | Possui Máscara? | Imagem Colorível                                                                                      | Imagem de Máscara                                                                                     |
|--------------------|---------------|---------------|-------------------|-------------------|-----------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `b`                | `06`          | 6             | advanced_1        | 6º (2x2)          | Não             | ![advanced_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_1.png)             |                                                                                                       |
| `b`                | `07`          | 7             | advanced_2        | 7º (2x3)          | Não             | ![advanced_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_2.png)             |                                                                                                       |
| `b`                | `08`          | 8             | advanced_3        | 8º (2x4)          | Não             | ![advanced_3](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_3.png)             |                                                                                                       |
| `b`                | `09`          | 9             | advanced_4        | 9º (2x5)          | Não             | ![advanced_4](https://images.habbo.com/c_images/Badgeparts/badgepart_base_advanced_4.png)             |                                                                                                       |
| `b`                | `01`          | 1             | basic_1           | 1º (1x2)          | Não             | ![basic_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_1.png)                   |                                                                                                       |
| `b`                | `02`          | 2             | basic_2           | 2º (1x3)          | Não             | ![basic_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_2.png)                   |                                                                                                       |
| `b`                | `03`          | 3             | basic_3           | 3º (1x4)          | Não             | ![basic_3](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_3.png)                   |                                                                                                       |
| `b`                | `04`          | 4             | basic_4           | 4º (1x5)          | Não             | ![basic_4](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_4.png)                   |                                                                                                       |
| `b`                | `05`          | 5             | basic_5           | 5º (2x1)          | Não             | ![basic_5](https://images.habbo.com/c_images/Badgeparts/badgepart_base_basic_5.png)                   |                                                                                                       |
| `b`                | `21`          | 65            | beams             | 21º (5x2)         | Sim             | ![beams_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_beams_part2.png)           | ![beams_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_beams_part1.png)           |
| `b`                | `25`          | 118           | book              | 25º (6x1)         | Não             | ![book](https://images.habbo.com/c_images/Badgeparts/badgepart_base_book.png)                         |                                                                                                       |
| `b`                | `15`          | 15            | circles_1         | 15º (4x1)         | Não             | ![circles_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_circles_1.png)               |                                                                                                       |
| `b`                | `16`          | 16            | circles_2         | 16º (4x2)         | Não             | ![circles_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_circles_2.png)               |                                                                                                       |
| `b`                | `26`          | 119           | egg               | 26º (6x2)         | Não             | ![egg](https://images.habbo.com/c_images/Badgeparts/badgepart_base_egg.png)                           |                                                                                                       |
| `b`                | `10`          | 10            | gold_1            | 10º (3x1)         | Sim             | ![gold_1_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_1_part2.png)         | ![gold_1_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_1_part1.png)         |
| `b`                | `11`          | 11            | gold_2            | 11º (3x2)         | Sim             | ![gold_2_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_2_part2.png)         | ![gold_2_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gold_2_part1.png)         |
| `b`                | `13`          | 13            | gradient_1        | 13º (3x4)         | Não             | ![gradient_1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gradient_1.png)             |                                                                                                       |
| `b`                | `14`          | 14            | gradient_2        | 14º (3x5)         | Não             | ![gradient_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_gradient_2.png)             |                                                                                                       |
| `b`                | `19`          | 19            | misc_1            | 19º (4x5)         | Sim             | ![misc_1_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_misc_1_part2.png)         | ![misc_1_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_misc_1_part1.png)         |
| `b`                | `20`          | 20            | misc_2            | 20º (5x1)         | Não             | ![misc_2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_misc_2.png)                     |                                                                                                       |
| `b`                | `27`          | 120           | ornament          | 27º (6x3)         | Não             | ![ornament](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament.png)                 |                                                                                                       |
| `b`                | `17`          | 17            | ornament_1        | 17º (4x3)         | Sim             | ![ornament_1_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_1_part2.png) | ![ornament_1_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_1_part1.png) |
| `b`                | `18`          | 18            | ornament_2        | 18º (4x4)         | Sim             | ![ornament_2_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_2_part2.png) | ![ornament_2_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ornament_2_part1.png) |
| `b`                | `12`          | 12            | pin               | 12º (3x3)         | Sim             | ![pin_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_pin_part2.png)               | ![pin_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_pin_part1.png)               |
| `b`                | `22`          | 66            | ring              | 22º (5x3)         | Não             | ![ring](https://images.habbo.com/c_images/Badgeparts/badgepart_base_ring.png)                         |                                                                                                       |
| `b`                | `28`          | 121           | shield            | 28º (6x4)         | Sim             | ![shield_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_shield_part2.png)         | ![shield_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_shield_part1.png)         |
| `b`                | `23`          | 67            | simplestar        | 23º (5x4)         | Sim             | ![simplestar_part2](https://images.habbo.com/c_images/Badgeparts/badgepart_base_simplestar_part2.png) | ![simplestar_part1](https://images.habbo.com/c_images/Badgeparts/badgepart_base_simplestar_part1.png) |
| `b`                | `24`          | 68            | spiral            | 24º (5x5)         | Não             | ![spiral](https://images.habbo.com/c_images/Badgeparts/badgepart_base_spiral.png)                     |                                                                                                       |

### **13.2. Apêndice B. Emblema de Grupo Ativos de Símbolo**

| Prefixo de Notação | ID de Notação | ID do Recurso | Nome do Recurso ▲ | Índice do Recurso | Possui Máscara? | Imagem Colorível                                                                                                                         | Imagem de Máscara                                                                                                                        |
|--------------------|---------------|---------------|-------------------|-------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `s`                | `68`          | 173           | 0                 | 119º (24x5)       | Não             | ![badgepart_symbol_0.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_0.png)                                           |                                                                                                                                          |
| `s`                | `69`          | 174           | 1                 | 120º (25x1)       | Não             | ![badgepart_symbol_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_1.png)                                           |                                                                                                                                          |
| `s`                | `70`          | 175           | 2                 | 121º (25x2)       | Não             | ![badgepart_symbol_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_2.png)                                           |                                                                                                                                          |
| `s`                | `71`          | 176           | 3                 | 122º (25x3)       | Não             | ![badgepart_symbol_3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_3.png)                                           |                                                                                                                                          |
| `s`                | `72`          | 177           | 4                 | 123º (25x4)       | Não             | ![badgepart_symbol_4.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_4.png)                                           |                                                                                                                                          |
| `s`                | `73`          | 178           | 5                 | 124º (25x5)       | Não             | ![badgepart_symbol_5.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_5.png)                                           |                                                                                                                                          |
| `s`                | `74`          | 179           | 6                 | 125º (26x1)       | Não             | ![badgepart_symbol_6.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_6.png)                                           |                                                                                                                                          |
| `s`                | `75`          | 180           | 7                 | 126º (26x2)       | Não             | ![badgepart_symbol_7.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_7.png)                                           |                                                                                                                                          |
| `s`                | `76`          | 181           | 8                 | 127º (26x3)       | Não             | ![badgepart_symbol_8.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_8.png)                                           |                                                                                                                                          |
| `s`                | `77`          | 182           | 9                 | 128º (26x4)       | Não             | ![badgepart_symbol_9.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_9.png)                                           |                                                                                                                                          |
| `s`                | `78`          | 183           | a                 | 129º (26x5)       | Não             | ![badgepart_symbol_a.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_a.png)                                           |                                                                                                                                          |
| `t`                | `04`          | 122           | alligator         | 68º (14x4)        | Não             | ![badgepart_symbol_alligator.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_alligator.png)                           |                                                                                                                                          |
| `t`                | `05`          | 123           | americanfootball  | 69º (14x5)        | Sim             | ![badgepart_symbol_americanfootball_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_americanfootball_part2.png) | ![badgepart_symbol_americanfootball_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_americanfootball_part1.png) |
| `s`                | `45`          | 69            | arrow_down        | 45º (10x1)        | Não             | ![badgepart_symbol_arrow_down.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_down.png)                         |                                                                                                                                          |
| `s`                | `46`          | 70            | arrow_left        | 46º (10x2)        | Não             | ![badgepart_symbol_arrow_left.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_left.png)                         |                                                                                                                                          |
| `s`                | `47`          | 71            | arrow_right       | 47º (10x3)        | Não             | ![badgepart_symbol_arrow_right.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_right.png)                       |                                                                                                                                          |
| `s`                | `48`          | 72            | arrow_up          | 48º (10x4)        | Não             | ![badgepart_symbol_arrow_up.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrow_up.png)                             |                                                                                                                                          |
| `s`                | `49`          | 73            | arrowbig_up       | 49º (10x5)        | Não             | ![badgepart_symbol_arrowbig_up.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_arrowbig_up.png)                       |                                                                                                                                          |
| `t`                | `06`          | 124           | award             | 70º (15x1)        | Sim             | ![badgepart_symbol_award_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_award_part2.png)                       | ![badgepart_symbol_award_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_award_part1.png)                       |
| `s`                | `50`          | 74            | axe               | 50º (11x1)        | Sim             | ![badgepart_symbol_axe_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_axe_part2.png)                           | ![badgepart_symbol_axe_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_axe_part1.png)                           |
| `s`                | `79`          | 184           | b                 | 130º (27x1)       | Não             | ![badgepart_symbol_b.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_b.png)                                           |                                                                                                                                          |
| `s`                | `01`          | 21            | background_1      | 1º (1x2)          | Não             | ![badgepart_symbol_background_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_1.png)                     |                                                                                                                                          |
| `s`                | `02`          | 22            | background_2      | 2º (1x3)          | Não             | ![badgepart_symbol_background_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_2.png)                     |                                                                                                                                          |
| `s`                | `03`          | 23            | background_3      | 3º (1x4)          | Sim             | ![badgepart_symbol_background_3_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_3_part2.png)         | ![badgepart_symbol_background_3_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_background_3_part1.png)         |
| `s`                | `04`          | 24            | ball_1            | 4º (1x5)          | Sim             | ![badgepart_symbol_ball_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_1_part2.png)                     | ![badgepart_symbol_ball_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_1_part1.png)                     |
| `s`                | `05`          | 25            | ball_2            | 5º (2x1)          | Sim             | ![badgepart_symbol_ball_2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_2_part2.png)                     | ![badgepart_symbol_ball_2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_ball_2_part1.png)                     |
| `t`                | `07`          | 125           | bananapeel        | 71º (15x2)        | Não             | ![badgepart_symbol_bananapeel.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bananapeel.png)                         |                                                                                                                                          |
| `t`                | `08`          | 126           | battleball        | 72º (15x3)        | Não             | ![badgepart_symbol_battleball.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_battleball.png)                         |                                                                                                                                          |
| `t`                | `09`          | 127           | biohazard         | 73º (15x4)        | Não             | ![badgepart_symbol_biohazard.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_biohazard.png)                           |                                                                                                                                          |
| `t`                | `10`          | 128           | bird              | 74º (15x5)        | Não             | ![badgepart_symbol_bird.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bird.png)                                     |                                                                                                                                          |
| `t`                | `11`          | 129           | bishop            | 75º (16x1)        | Não             | ![badgepart_symbol_bishop.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bishop.png)                                 |                                                                                                                                          |
| `s`                | `06`          | 26            | bobba             | 6º (2x2)          | Não             | ![badgepart_symbol_bobba.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bobba.png)                                   |                                                                                                                                          |
| `s`                | `07`          | 27            | bomb              | 7º (2x3)          | Sim             | ![badgepart_symbol_bomb_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bomb_part2.png)                         | ![badgepart_symbol_bomb_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bomb_part1.png)                         |
| `s`                | `08`          | 28            | bow               | 8º (2x4)          | Não             | ![badgepart_symbol_bow.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bow.png)                                       |                                                                                                                                          |
| `s`                | `09`          | 29            | box_1             | 9º (2x5)          | Não             | ![badgepart_symbol_box_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_box_1.png)                                   |                                                                                                                                          |
| `s`                | `10`          | 30            | box_2             | 10º (3x1)         | Não             | ![badgepart_symbol_box_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_box_2.png)                                   |                                                                                                                                          |
| `s`                | `51`          | 75            | bug               | 51º (11x2)        | Sim             | ![badgepart_symbol_bug_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bug_part2.png)                           | ![badgepart_symbol_bug_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bug_part1.png)                           |
| `s`                | `11`          | 31            | bunting_1         | 11º (3x2)         | Não             | ![badgepart_symbol_bunting_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bunting_1.png)                           |                                                                                                                                          |
| `s`                | `12`          | 32            | bunting_2         | 12º (3x3)         | Não             | ![badgepart_symbol_bunting_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_bunting_2.png)                           |                                                                                                                                          |
| `s`                | `13`          | 33            | butterfly         | 13º (3x4)         | Sim             | ![badgepart_symbol_butterfly_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_butterfly_part2.png)               | ![badgepart_symbol_butterfly_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_butterfly_part1.png)               |
| `s`                | `80`          | 185           | c                 | 131º (27x2)       | Não             | ![badgepart_symbol_c.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_c.png)                                           |                                                                                                                                          |
| `s`                | `52`          | 76            | capsbig           | 52º (11x3)        | Sim             | ![badgepart_symbol_capsbig_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capsbig_part2.png)                   | ![badgepart_symbol_capsbig_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capsbig_part1.png)                   |
| `s`                | `53`          | 77            | capssmall         | 53º (11x4)        | Sim             | ![badgepart_symbol_capssmall_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capssmall_part2.png)               | ![badgepart_symbol_capssmall_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_capssmall_part1.png)               |
| `s`                | `54`          | 78            | cloud             | 54º (11x5)        | Não             | ![badgepart_symbol_cloud.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cloud.png)                                   |                                                                                                                                          |
| `t`                | `12`          | 130           | coalion           | 76º (16x2)        | Não             | ![badgepart_symbol_coalion.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_coalion.png)                               |                                                                                                                                          |
| `t`                | `13`          | 131           | cocoamug          | 77º (16x3)        | Não             | ![badgepart_symbol_cocoamug.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cocoamug.png)                             |                                                                                                                                          |
| `s`                | `14`          | 34            | cowskull          | 14º (3x5)         | Sim             | ![badgepart_symbol_cowskull_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cowskull_part2.png)                 | ![badgepart_symbol_cowskull_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cowskull_part1.png)                 |
| `t`                | `14`          | 210           | credit            | 156º (32x2)       | Sim             | ![badgepart_symbol_credit_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_credit_part2.png)                     | ![badgepart_symbol_credit_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_credit_part1.png)                     |
| `s`                | `15`          | 35            | cross             | 15º (4x1)         | Não             | ![badgepart_symbol_cross.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_cross.png)                                   |                                                                                                                                          |
| `s`                | `55`          | 79            | crown             | 55º (12x1)        | Sim             | ![badgepart_symbol_crown_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_crown_part2.png)                       | ![badgepart_symbol_crown_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_crown_part1.png)                       |
| `s`                | `81`          | 186           | d                 | 132º (27x3)       | Não             | ![badgepart_symbol_d.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_d.png)                                           |                                                                                                                                          |
| `t`                | `15`          | 132           | dashflag          | 78º (16x4)        | Não             | ![badgepart_symbol_dashflag.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_dashflag.png)                             |                                                                                                                                          |
| `s`                | `16`          | 36            | diamond           | 16º (4x2)         | Não             | ![badgepart_symbol_diamond.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamond.png)                               |                                                                                                                                          |
| `t`                | `16`          | 133           | diamondring       | 79º (16x5)        | Sim             | ![badgepart_symbol_diamondring_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamondring_part2.png)           | ![badgepart_symbol_diamondring_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamondring_part1.png)           |
| `s`                | `57`          | 81            | diamsmall         | 57º (12x3)        | Não             | ![badgepart_symbol_diamsmall.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamsmall.png)                           |                                                                                                                                          |
| `s`                | `56`          | 80            | diamsmall2        | 56º (12x2)        | Não             | ![badgepart_symbol_diamsmall2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diamsmall2.png)                         |                                                                                                                                          |
| `s`                | `17`          | 37            | diploma           | 17º (4x3)         | Sim             | ![badgepart_symbol_diploma_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diploma_part2.png)                   | ![badgepart_symbol_diploma_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_diploma_part1.png)                   |
| `t`                | `17`          | 134           | discoball         | 80º (17x1)        | Sim             | ![badgepart_symbol_discoball_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_discoball_part2.png)               | ![badgepart_symbol_discoball_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_discoball_part1.png)               |
| `t`                | `18`          | 135           | dog               | 81º (17x2)        | Não             | ![badgepart_symbol_dog.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_dog.png)                                       |                                                                                                                                          |
| `s`                | `58`          | 82            | drop              | 58º (12x4)        | Não             | ![badgepart_symbol_drop.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_drop.png)                                     |                                                                                                                                          |
| `s`                | `82`          | 187           | e                 | 133º (27x4)       | Não             | ![badgepart_symbol_e.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_e.png)                                           |                                                                                                                                          |
| `t`                | `19`          | 136           | electricguitarh   | 82º (17x3)        | Sim             | ![badgepart_symbol_electricguitarh_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarh_part2.png)   | ![badgepart_symbol_electricguitarh_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarh_part1.png)   |
| `t`                | `20`          | 137           | electricguitarv   | 83º (17x4)        | Sim             | ![badgepart_symbol_electricguitarv_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarv_part2.png)   | ![badgepart_symbol_electricguitarv_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_electricguitarv_part1.png)   |
| `s`                | `18`          | 38            | eyeball           | 18º (4x4)         | Sim             | ![badgepart_symbol_eyeball_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_eyeball_part2.png)                   | ![badgepart_symbol_eyeball_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_eyeball_part1.png)                   |
| `s`                | `83`          | 188           | f                 | 134º (27x5)       | Não             | ![badgepart_symbol_f.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_f.png)                                           |                                                                                                                                          |
| `t`                | `21`          | 138           | film              | 84º (17x5)        | Não             | ![badgepart_symbol_film.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_film.png)                                     |                                                                                                                                          |
| `s`                | `59`          | 83            | fingersheavy      | 59º (12x5)        | Não             | ![badgepart_symbol_fingersheavy.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_fingersheavy.png)                     |                                                                                                                                          |
| `s`                | `60`          | 84            | fingersv          | 60º (13x1)        | Não             | ![badgepart_symbol_fingersv.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_fingersv.png)                             |                                                                                                                                          |
| `s`                | `19`          | 39            | fist              | 19º (4x5)         | Não             | ![badgepart_symbol_fist.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_fist.png)                                     |                                                                                                                                          |
| `s`                | `20`          | 40            | flame_1           | 20º (5x1)         | Não             | ![badgepart_symbol_flame_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_1.png)                               |                                                                                                                                          |
| `s`                | `21`          | 41            | flame_2           | 21º (5x2)         | Não             | ![badgepart_symbol_flame_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_2.png)                               |                                                                                                                                          |
| `t`                | `22`          | 139           | flame             | 85º (18x1)        | Sim             | ![badgepart_symbol_flame_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_part2.png)                       | ![badgepart_symbol_flame_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flame_part1.png)                       |
| `s`                | `22`          | 42            | flash             | 22º (5x3)         | Não             | ![badgepart_symbol_flash.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flash.png)                                   |                                                                                                                                          |
| `s`                | `23`          | 43            | flower_1          | 23º (5x4)         | Sim             | ![badgepart_symbol_flower_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_1_part2.png)                 | ![badgepart_symbol_flower_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_1_part1.png)                 |
| `s`                | `24`          | 44            | flower_2          | 24º (5x5)         | Não             | ![badgepart_symbol_flower_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_2.png)                             |                                                                                                                                          |
| `s`                | `25`          | 45            | flower_3          | 25º (6x1)         | Não             | ![badgepart_symbol_flower_3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_3.png)                             |                                                                                                                                          |
| `s`                | `26`          | 46            | flower_4          | 26º (6x2)         | Não             | ![badgepart_symbol_flower_4.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_flower_4.png)                             |                                                                                                                                          |
| `s`                | `27`          | 47            | football          | 27º (6x3)         | Não             | ![badgepart_symbol_football.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_football.png)                             |                                                                                                                                          |
| `s`                | `84`          | 189           | g                 | 135º (28x1)       | Não             | ![badgepart_symbol_g.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_g.png)                                           |                                                                                                                                          |
| `t`                | `23`          | 140           | gamepad           | 86º (18x2)        | Não             | ![badgepart_symbol_gamepad.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gamepad.png)                               |                                                                                                                                          |
| `t`                | `24`          | 141           | gem1              | 87º (18x3)        | Sim             | ![badgepart_symbol_gem1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem1_part2.png)                         | ![badgepart_symbol_gem1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem1_part1.png)                         |
| `t`                | `25`          | 142           | gem2              | 88º (18x4)        | Sim             | ![badgepart_symbol_gem2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem2_part2.png)                         | ![badgepart_symbol_gem2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem2_part1.png)                         |
| `t`                | `26`          | 143           | gem3              | 89º (18x5)        | Sim             | ![badgepart_symbol_gem3_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem3_part2.png)                         | ![badgepart_symbol_gem3_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gem3_part1.png)                         |
| `s`                | `61`          | 85            | gtr               | 61º (13x2)        | Sim             | ![badgepart_symbol_gtr_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gtr_part2.png)                           | ![badgepart_symbol_gtr_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_gtr_part1.png)                           |
| `s`                | `85`          | 190           | h                 | 136º (28x2)       | Não             | ![badgepart_symbol_h.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_h.png)                                           |                                                                                                                                          |
| `s`                | `62`          | 86            | hat               | 62º (13x3)        | Não             | ![badgepart_symbol_hat.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hat.png)                                       |                                                                                                                                          |
| `t`                | `27`          | 144           | hawk              | 90º (19x1)        | Não             | ![badgepart_symbol_hawk.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hawk.png)                                     |                                                                                                                                          |
| `t`                | `58`          | 211           | hc                | 157º (32x3)       | Sim             | ![badgepart_symbol_hc_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hc_part2.png)                             | ![badgepart_symbol_hc_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hc_part1.png)                             |
| `s`                | `28`          | 48            | heart_1           | 28º (6x4)         | Sim             | ![badgepart_symbol_heart_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_1_part2.png)                   | ![badgepart_symbol_heart_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_1_part1.png)                   |
| `s`                | `29`          | 49            | heart_2           | 29º (6x5)         | Sim             | ![badgepart_symbol_heart_2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_2_part2.png)                   | ![badgepart_symbol_heart_2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_heart_2_part1.png)                   |
| `t`                | `28`          | 145           | hearts_down       | 91º (19x2)        | Não             | ![badgepart_symbol_hearts_down.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hearts_down.png)                       |                                                                                                                                          |
| `t`                | `29`          | 146           | hearts_up         | 92º (19x3)        | Não             | ![badgepart_symbol_hearts_up.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_hearts_up.png)                           |                                                                                                                                          |
| `t`                | `30`          | 147           | horseshoe         | 93º (19x4)        | Não             | ![badgepart_symbol_horseshoe.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_horseshoe.png)                           |                                                                                                                                          |
| `s`                | `86`          | 191           | i                 | 137º (28x3)       | Não             | ![badgepart_symbol_i.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_i.png)                                           |                                                                                                                                          |
| `t`                | `31`          | 148           | inksplatter       | 94º (19x5)        | Não             | ![badgepart_symbol_inksplatter.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_inksplatter.png)                       |                                                                                                                                          |
| `s`                | `87`          | 192           | j                 | 138º (28x4)       | Não             | ![badgepart_symbol_j.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_j.png)                                           |                                                                                                                                          |
| `s`                | `30`          | 50            | jingjang          | 30º (7x1)         | Sim             | ![badgepart_symbol_jingjang_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_jingjang_part2.png)                 | ![badgepart_symbol_jingjang_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_jingjang_part1.png)                 |
| `s`                | `88`          | 193           | k                 | 139º (28x5)       | Não             | ![badgepart_symbol_k.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_k.png)                                           |                                                                                                                                          |
| `s`                | `89`          | 194           | l                 | 140º (29x1)       | Não             | ![badgepart_symbol_l.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_l.png)                                           |                                                                                                                                          |
| `t`                | `32`          | 149           | leaf              | 95º (20x1)        | Não             | ![badgepart_symbol_leaf.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_leaf.png)                                     |                                                                                                                                          |
| `s`                | `31`          | 51            | lips              | 31º (7x2)         | Sim             | ![badgepart_symbol_lips_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_lips_part2.png)                         | ![badgepart_symbol_lips_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_lips_part1.png)                         |
| `s`                | `90`          | 195           | m                 | 141º (29x2)       | Não             | ![badgepart_symbol_m.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_m.png)                                           |                                                                                                                                          |
| `t`                | `33`          | 150           | micstand          | 96º (20x2)        | Não             | ![badgepart_symbol_micstand.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_micstand.png)                             |                                                                                                                                          |
| `t`                | `34`          | 151           | mirror            | 97º (20x3)        | Sim             | ![badgepart_symbol_mirror_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_mirror_part2.png)                     | ![badgepart_symbol_mirror_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_mirror_part1.png)                     |
| `t`                | `35`          | 152           | monkeywrench      | 98º (20x4)        | Não             | ![badgepart_symbol_monkeywrench.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_monkeywrench.png)                     |                                                                                                                                          |
| `s`                | `91`          | 196           | n                 | 142º (29x3)       | Não             | ![badgepart_symbol_n.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_n.png)                                           |                                                                                                                                          |
| `s`                | `32`          | 52            | note              | 32º (7x3)         | Não             | ![badgepart_symbol_note.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note.png)                                     |                                                                                                                                          |
| `t`                | `36`          | 153           | note1             | 99º (20x5)        | Não             | ![badgepart_symbol_note1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note1.png)                                   |                                                                                                                                          |
| `t`                | `37`          | 154           | note2             | 100º (21x1)       | Não             | ![badgepart_symbol_note2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note2.png)                                   |                                                                                                                                          |
| `t`                | `38`          | 155           | note3             | 101º (21x2)       | Não             | ![badgepart_symbol_note3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_note3.png)                                   |                                                                                                                                          |
| `t`                | `39`          | 156           | nursecross        | 102º (21x3)       | Não             | ![badgepart_symbol_nursecross.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_nursecross.png)                         |                                                                                                                                          |
| `s`                | `92`          | 197           | o                 | 143º (29x4)       | Não             | ![badgepart_symbol_o.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_o.png)                                           |                                                                                                                                          |
| `s`                | `63`          | 87            | oval              | 63º (13x4)        | Sim             | ![badgepart_symbol_oval_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_oval_part2.png)                         | ![badgepart_symbol_oval_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_oval_part1.png)                         |
| `s`                | `93`          | 198           | p                 | 144º (29x5)       | Não             | ![badgepart_symbol_p.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_p.png)                                           |                                                                                                                                          |
| `s`                | `64`          | 88            | pawprint          | 64º (13x5)        | Não             | ![badgepart_symbol_pawprint.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pawprint.png)                             |                                                                                                                                          |
| `s`                | `33`          | 53            | peace             | 33º (7x4)         | Não             | ![badgepart_symbol_peace.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_peace.png)                                   |                                                                                                                                          |
| `t`                | `40`          | 157           | pencil            | 103º (21x4)       | Sim             | ![badgepart_symbol_pencil_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pencil_part2.png)                     | ![badgepart_symbol_pencil_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pencil_part1.png)                     |
| `t`                | `41`          | 209           | pixel             | 155º (32x1)       | Sim             | ![badgepart_symbol_pixel_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pixel_part2.png)                       | ![badgepart_symbol_pixel_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_pixel_part1.png)                       |
| `s`                | `34`          | 54            | planet            | 34º (7x5)         | Sim             | ![badgepart_symbol_planet_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_planet_part2.png)                     | ![badgepart_symbol_planet_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_planet_part1.png)                     |
| `s`                | `94`          | 199           | q                 | 145º (30x1)       | Não             | ![badgepart_symbol_q.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_q.png)                                           |                                                                                                                                          |
| `t`                | `42`          | 158           | queen             | 104º (21x5)       | Não             | ![badgepart_symbol_queen.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_queen.png)                                   |                                                                                                                                          |
| `s`                | `95`          | 200           | r                 | 146º (30x2)       | Não             | ![badgepart_symbol_r.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_r.png)                                           |                                                                                                                                          |
| `s`                | `35`          | 55            | rainbow           | 35º (8x1)         | Sim             | ![badgepart_symbol_rainbow_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rainbow_part2.png)                   | ![badgepart_symbol_rainbow_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rainbow_part1.png)                   |
| `t`                | `43`          | 159           | rock              | 105º (22x1)       | Não             | ![badgepart_symbol_rock.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rock.png)                                     |                                                                                                                                          |
| `t`                | `44`          | 160           | rook              | 106º (22x2)       | Não             | ![badgepart_symbol_rook.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rook.png)                                     |                                                                                                                                          |
| `s`                | `36`          | 56            | rosete            | 36º (8x2)         | Não             | ![badgepart_symbol_rosete.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_rosete.png)                                 |                                                                                                                                          |
| `s`                | `96`          | 201           | s                 | 147º (30x3)       | Não             | ![badgepart_symbol_s.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_s.png)                                           |                                                                                                                                          |
| `s`                | `65`          | 89            | screw             | 65º (14x1)        | Não             | ![badgepart_symbol_screw.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_screw.png)                                   |                                                                                                                                          |
| `s`                | `37`          | 57            | shape             | 37º (8x3)         | Não             | ![badgepart_symbol_shape.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_shape.png)                                   |                                                                                                                                          |
| `t`                | `45`          | 161           | skate             | 107º (22x3)       | Não             | ![badgepart_symbol_skate.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_skate.png)                                   |                                                                                                                                          |
| `t`                | `46`          | 162           | smallring         | 108º (22x4)       | Sim             | ![badgepart_symbol_smallring_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_smallring_part2.png)               | ![badgepart_symbol_smallring_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_smallring_part1.png)               |
| `t`                | `47`          | 163           | snowstorm         | 109º (22x5)       | Sim             | ![badgepart_symbol_snowstorm_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_snowstorm_part2.png)               | ![badgepart_symbol_snowstorm_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_snowstorm_part1.png)               |
| `t`                | `48`          | 164           | sphere            | 110º (23x1)       | Não             | ![badgepart_symbol_sphere.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sphere.png)                                 |                                                                                                                                          |
| `t`                | `49`          | 165           | spraycan          | 111º (23x2)       | Sim             | ![badgepart_symbol_spraycan_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_spraycan_part2.png)                 | ![badgepart_symbol_spraycan_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_spraycan_part1.png)                 |
| `s`                | `38`          | 58            | star_1            | 38º (8x4)         | Não             | ![badgepart_symbol_star_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_star_1.png)                                 |                                                                                                                                          |
| `s`                | `39`          | 59            | star_2            | 39º (8x5)         | Não             | ![badgepart_symbol_star_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_star_2.png)                                 |                                                                                                                                          |
| `t`                | `50`          | 166           | stars1            | 112º (23x3)       | Não             | ![badgepart_symbol_stars1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars1.png)                                 |                                                                                                                                          |
| `t`                | `51`          | 167           | stars2            | 113º (23x4)       | Não             | ![badgepart_symbol_stars2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars2.png)                                 |                                                                                                                                          |
| `t`                | `52`          | 168           | stars3            | 114º (23x5)       | Não             | ![badgepart_symbol_stars3.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars3.png)                                 |                                                                                                                                          |
| `t`                | `53`          | 169           | stars4            | 115º (24x1)       | Não             | ![badgepart_symbol_stars4.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars4.png)                                 |                                                                                                                                          |
| `t`                | `54`          | 170           | stars5            | 116º (24x2)       | Não             | ![badgepart_symbol_stars5.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stars5.png)                                 |                                                                                                                                          |
| `s`                | `66`          | 90            | stickL            | 66º (14x2)        | Sim             | ![badgepart_symbol_stickL_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickL_part2.png)                     | ![badgepart_symbol_stickL_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickL_part1.png)                     |
| `s`                | `67`          | 91            | stickR            | 67º (14x3)        | Sim             | ![badgepart_symbol_stickR_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickR_part2.png)                     | ![badgepart_symbol_stickR_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_stickR_part1.png)                     |
| `s`                | `40`          | 60            | sword_1           | 40º (9x1)         | Sim             | ![badgepart_symbol_sword_1_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_1_part2.png)                   | ![badgepart_symbol_sword_1_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_1_part1.png)                   |
| `s`                | `41`          | 61            | sword_2           | 41º (9x2)         | Sim             | ![badgepart_symbol_sword_2_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_2_part2.png)                   | ![badgepart_symbol_sword_2_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_2_part1.png)                   |
| `s`                | `42`          | 62            | sword_3           | 42º (9x3)         | Sim             | ![badgepart_symbol_sword_3_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_3_part2.png)                   | ![badgepart_symbol_sword_3_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_sword_3_part1.png)                   |
| `s`                | `97`          | 202           | t                 | 148º (30x4)       | Não             | ![badgepart_symbol_t.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_t.png)                                           |                                                                                                                                          |
| `s`                | `98`          | 203           | u                 | 149º (30x5)       | Não             | ![badgepart_symbol_u.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_u.png)                                           |                                                                                                                                          |
| `s`                | `99`          | 204           | v                 | 150º (31x1)       | Não             | ![badgepart_symbol_v.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_v.png)                                           |                                                                                                                                          |
| `t`                | `55`          | 212           | vip               | 158º (32x4)       | Sim             | ![badgepart_symbol_vip_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_vip_part2.png)                           | ![badgepart_symbol_vip_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_vip_part1.png)                           |
| `t`                | `00`          | 205           | w                 | 151º (31x2)       | Não             | ![badgepart_symbol_w.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_w.png)                                           |                                                                                                                                          |
| `t`                | `56`          | 171           | waterdrop         | 117º (24x3)       | Sim             | ![badgepart_symbol_waterdrop_part2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_waterdrop_part2.png)               | ![badgepart_symbol_waterdrop_part1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_waterdrop_part1.png)               |
| `s`                | `43`          | 63            | wings_1           | 43º (9x4)         | Não             | ![badgepart_symbol_wings_1.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_wings_1.png)                               |                                                                                                                                          |
| `s`                | `44`          | 64            | wings_2           | 44º (9x5)         | Não             | ![badgepart_symbol_wings_2.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_wings_2.png)                               |                                                                                                                                          |
| `t`                | `57`          | 172           | wolverine         | 118º (24x4)       | Não             | ![badgepart_symbol_wolverine.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_wolverine.png)                           |                                                                                                                                          |
| `t`                | `01`          | 206           | x                 | 152º (31x3)       | Não             | ![badgepart_symbol_x.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_x.png)                                           |                                                                                                                                          |
| `t`                | `02`          | 207           | y                 | 153º (31x4)       | Não             | ![badgepart_symbol_y.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_y.png)                                           |                                                                                                                                          |
| `t`                | `03`          | 208           | z                 | 154º (31x5)       | Não             | ![badgepart_symbol_z.png](https://images.habbo.com/c_images/Badgeparts/badgepart_symbol_z.png)                                           |                                                                                                                                          |

### **13.3. Apêndice C. Emblema de Grupo IDs de Cor e Tonalidades**

| ID   | Índice de Cor | Cor Hex   | Visualização                                              |
|------|---------------|-----------|-----------------------------------------------------------|
| `01` | 1º (1x1)      | `#ffd601` | ![Preview](https://singlecolorimage.com/get/ffd601/10x10) |
| `11` | 2º (1x2)      | `#ffffff` | ![Preview](https://singlecolorimage.com/get/ffffff/10x10) |
| `02` | 3º (1x3)      | `#ec7600` | ![Preview](https://singlecolorimage.com/get/ec7600/10x10) |
| `03` | 4º (1x4)      | `#84de00` | ![Preview](https://singlecolorimage.com/get/84de00/10x10) |
| `04` | 5º (1x5)      | `#589a00` | ![Preview](https://singlecolorimage.com/get/589a00/10x10) |
| `18` | 6º (1x6)      | `#aaff7d` | ![Preview](https://singlecolorimage.com/get/aaff7d/10x10) |
| `05` | 7º (1x7)      | `#50c1fb` | ![Preview](https://singlecolorimage.com/get/50c1fb/10x10) |
| `19` | 8º (1x8)      | `#87e6c8` | ![Preview](https://singlecolorimage.com/get/87e6c8/10x10) |
| `06` | 9º (2x1)      | `#006fcf` | ![Preview](https://singlecolorimage.com/get/006fcf/10x10) |
| `16` | 10º (2x2)     | `#c2eaff` | ![Preview](https://singlecolorimage.com/get/c2eaff/10x10) |
| `07` | 11º (2x3)     | `#ff98e3` | ![Preview](https://singlecolorimage.com/get/ff98e3/10x10) |
| `08` | 12º (2x4)     | `#f334bf` | ![Preview](https://singlecolorimage.com/get/f334bf/10x10) |
| `09` | 13º (2x5)     | `#ff2d2d` | ![Preview](https://singlecolorimage.com/get/ff2d2d/10x10) |
| `20` | 14º (2x6)     | `#9844e7` | ![Preview](https://singlecolorimage.com/get/9844e7/10x10) |
| `21` | 15º (2x7)     | `#dea9ff` | ![Preview](https://singlecolorimage.com/get/dea9ff/10x10) |
| `10` | 16º (2x8)     | `#af0a0a` | ![Preview](https://singlecolorimage.com/get/af0a0a/10x10) |
| `22` | 17º (3x1)     | `#ffb579` | ![Preview](https://singlecolorimage.com/get/ffb579/10x10) |
| `17` | 18º (3x2)     | `#fff165` | ![Preview](https://singlecolorimage.com/get/fff165/10x10) |
| `14` | 19º (3x3)     | `#fbe7ac` | ![Preview](https://singlecolorimage.com/get/fbe7ac/10x10) |
| `23` | 20º (3x4)     | `#c3aa6e` | ![Preview](https://singlecolorimage.com/get/c3aa6e/10x10) |
| `15` | 21º (3x5)     | `#977641` | ![Preview](https://singlecolorimage.com/get/977641/10x10) |
| `12` | 22º (3x6)     | `#c0c0c0` | ![Preview](https://singlecolorimage.com/get/c0c0c0/10x10) |
| `24` | 23º (3x7)     | `#7a7a7a` | ![Preview](https://singlecolorimage.com/get/7a7a7a/10x10) |
| `13` | 24º (3x8)     | `#373737` | ![Preview](https://singlecolorimage.com/get/373737/10x10) |

### **13.4. Apêndice D. Emblema de Grupo Posições na Grade**

| ID de Posição | Célula da Grade   |
|---------------|-------------------|
| 0             | Superior-esquerda |
| 1             | Superior-centro   |
| 2             | Superior-direita  |
| 3             | Meio-esquerda     |
| 4             | Centro            |
| 5             | Meio-direita      |
| 6             | Inferior-esquerda |
| 7             | Inferior-centro   |
| 8             | Inferior-direita  |
