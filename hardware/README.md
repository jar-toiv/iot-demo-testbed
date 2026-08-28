# Hardware records

One folder per physical device, holding what the device actually is, not
what it is supposed to be. Design decisions belong in `docs/adr/`.

## Why two states, not one

Standard as-found / as-left practice: **as-found** is what a device's
settings were before anyone here touched it, **as-left** is what they were
set to and when. A second-hand or previously-configured device may
carry settings from its last owner; without a record, a mismatch discovered
later is unexplainable.

## Confidence marks

Documentation research and reading the physical unit are not the same thing.
Every value carries one of:

- **[MODEL]** — documented for this exact model, with a source
- **[DEVICE]** — establishable only by reading the unit in front of you

## Layout

```
hardware/
  <device-slug>/
    device.md          identity, spec, factory defaults, as-found, as-left
    configuration.md   how to configure it, and which settings matter
    sources.md         every URL behind every claim
```

## Index

| Device | Slug | Related |
|---|---|---|
| Waveshare RS232/485/422 TO POE ETH (B), SKU 23626 | [waveshare-23626](waveshare-23626/device.md) | ADR-0010 |
| Carlo Gavazzi EM111-DIN.AV8.1.XS1.X | not created yet | ADR-0002 |
