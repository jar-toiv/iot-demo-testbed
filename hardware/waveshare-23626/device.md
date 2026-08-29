# Waveshare RS232/485/422 TO POE ETH (B)

- **SKU:** WS-23626
- **Role:** Modbus RTU to Modbus TCP gateway between the EM111 on RS-485 and the Pi
- **Related:** ADR-0010, `docs/bringup-modbus-bench.md`, `configuration.md`

## Confidence levels used below

| Mark | Meaning |
|---|---|
| **[MODEL]** | Documented for this exact model. Sourced, see `sources.md` |
| **[DEVICE]** | Can only be established by reading this physical unit |

Where a value comes from a sibling product instead of this SKU's own docs,
that is noted inline and marked **[DEVICE]** as an unverified hypothesis.

## Identity

| Field | Value | Source |
|---|---|---|
| Serial number | | **[DEVICE]** type plate |
| Firmware version | | **[DEVICE]** Vircom or web UI |
| Hardware revision | | **[DEVICE]** type plate |

## Electrical

| Field | Value | Confidence |
|---|---|---|
| Supply voltage | 6–36 V DC, screw terminal or DC jack | **[MODEL]** |
| PoE | IEEE 802.3af | **[MODEL]** |
| Serial baud range | 1200–115200 bps | **[MODEL]** |
| Data bits | 5–9 | **[MODEL]** |
| Parity | none / odd / even / mark / space | **[MODEL]** |

### Terminal labels

| Terminal | Function |
|---|---|
| `RA` | RS485 A / RS422 TX+ |
| `RB` | RS485 B / RS422 TX− |
| `TA` | RS422 RX− |
| `TB` | RS422 RX+ |
| `GND` | Signal ground |
| `VCC` | Power input |

`PROJEKTIN-TILA.md` specifies the bench wiring as A→A, B→B with G left open
and no termination resistors. On this device that is **`RA`→A, `RB`→B**.

## Factory defaults

| Field | Value | Confidence |
|---|---|---|
| TCP port | `4196` | **[MODEL]** |
| TCP port with Modbus TCP↔RTU enabled | `502`, changes automatically | **[MODEL]** |
| Serial↔network behaviour | Transparent transmission | **[MODEL]** |
| Web login password | None set at factory | **[MODEL]** |
| Factory reset | Hold reset pin 5 seconds | **[MODEL]** |
| Work modes available | TCP server, TCP client, UDP, UDP multicast | **[MODEL]** |
| **Modbus gateway type** | **Storing (storage-type)** | **[MODEL]** |
| IP address | `192.168.1.200`, or `192.168.1.254` after a factory reset, sources conflict | **[DEVICE]** |
| Baud rate | `9600 bps` (this unit's factory-shipped value, confirmed in As-found below) | **[DEVICE]** |

### Two defaults that matter more than the rest

**The Modbus gateway defaults to storage mode.** The Spotpear guide for this
exact SKU (`sources.md`) states the default Modbus mode is "storage", which
"will automatically train the query commands", sent multiple times. Storage
mode answers from cache after the bus has already died, exactly the
`STALE` condition ADR-0004 exists to catch. **If nobody changes it, the
silent-failure mode is active.** Confirm on the unit before trusting any
reading.

**The baud rate is now established.** `PROJEKTIN-TILA.md` stated "Wavesharen
oletus 57600" with no source, and no documentation found supported that
figure. This unit's actual factory-shipped baud rate was read directly,
before any setting was changed: 9600 bps, matching the meter's own default.
`PROJEKTIN-TILA.md` should be corrected.

## As-found


| Field | As-found value | Verified how | Date |
|---|---|---|---|
| IP address | `192.168.50.46` (DHCP from router, not the factory static default) | Vircom Auto Search, confirmed reachable at `http://192.168.50.46/ip_en.html` | 2026-08-29 |
| Baud / parity / stop bits | 9600 bps, 8 data bits, no parity, 2 stop bits, no flow control | Vircom / web UI | 2026-08-29 |
| TCP port | `502` | Vircom / web UI | 2026-08-29 |
| Work mode | TCP server | Vircom / web UI | 2026-08-29 |
| Modbus gateway type | `auto query storage type` (current setting, one of 5 options, see `configuration.md`) | Vircom, Advanced Settings → More Advanced Settings | 2026-08-29 |
| Firmware version | `V1.452` | Vircom / web UI | 2026-08-29 |

## As-left

| Field | Set to | Reason | Date |
|---|---|---|---|
| Stop bits | `1` (was `2`) | Match meter's U3 (`bringup-modbus-bench.md`) | 2026-08-29 |
| Modbus gateway type | `Simple modbus tcp to rtu` (was `Auto query storage type`) | Non-storage for now so bus faults surface as `TIMEOUT` instead of stale cached reads. | 2026-08-29 |
| Web login password | Set (value not recorded in git, see password manager) | Was unset at factory, open access risk | 2026-08-30 |

## Quirks

**Full web UI snapshot, 2026-08-29:**

| Field | Value |
|---|---|
| Device Name | `WSDEV0001` |
| Device MAC | `28-6D-FC-27-2A-4C` |
| Subnet Mask | `255.255.255.0` |
| Gateway | `192.168.50.1` |
| Destination IP/DNS | `192.168.1.3` |
| Destination Port | `4196` |
| Protocol (Multi-Host Settings section) | `Modbus TCP to RTU` |
| Enable Multi-host | `Yes` |
| Instruction Time out | `256 ms` |
| No-Data-Restart | `Disable` |

**Destination IP/DNS and Destination Port look inactive.** They hold
`192.168.1.3` / `4196`, neither matching this network (`192.168.50.0/24`)
nor the current TCP port (`502`). Work Mode is `TCP Server`, and
destination fields are normally only used in TCP Client/UDP modes.
