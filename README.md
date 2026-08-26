# [Iot Demo Testbed] — Teollisen IoT:n moniprotokollainen demoympäristö

> Yhden lauseen pitch: mitä tämä on ja kenelle.
> Esim: "Kotiin ja etäkohteeseen rakennettu IIoT-datapipeline, joka
> kokoaa dataa kuudesta eri teollisuusprotokollasta InfluxDB/MongoDB-kantaan
> asti — mukaan lukien tietoinen, dokumentoitu vikaruiskutus."

![status](https://img.shields.io/badge/status-rakenteilla-yellow)
![license](https://img.shields.io/badge/license-MIT-blue)

## Miksi tämä on olemassa

Kaksi tai kolme lausetta. Esim: portfolioprojekti lead-/senior-tason
kehittäjän rooliin, jossa datan liikuttaminen mittarista kantaan on
suoritustyötä — arvo syntyy siitä, että jokainen valinta on perusteltu
ja jokainen vika on tunnistettu, mitattu ja dokumentoitu.

Tausta: sähköalan tausta, IoT/pilvipuoli opeteltavana.

## Mitä tässä on erilaista

Useimmat harrasteprojektit demoavat toimivaa polkua. Tämä demoaa myös
**epäonnistuvaa** polkua tarkoituksella:

- Fyysinen vikaruiskutuspaneeli (kytkinrima: A/B ristiin, päätevastus
  irti, yhteinen maa poikki...)
- Ohjelmallinen verkkovikojen simulointi (`tc netem`) ja ristiintestaus
  oikeaa mobiiliverkkoa vasten
- Jokainen mittaus kantaa OPC UA -tyylistä laatukenttää
  (`GOOD` / `UNCERTAIN` / `BAD` + substatus), ei vain arvoa
- Jokainen arkkitehtuuripäätös on kirjattu ADR:ksi hylättyine
  vaihtoehtoineen — ei vain lopputulos, vaan miksi

## Arkkitehtuuri

```
Kenttä                    Reuna                   Pilvi
──────                    ─────                   ─────
Modbus-mittari ──RS485──┐
Modbus-anturi ──────────┤
                        └─► Waveshare ──Eth──┐
                                             ├─► Pi 4B ──4G──► broker + kanta
ESP32 (CN105) ──┐                           │   Mosquitto
ESP32 (analogia)┴──WiFi (Pi:n oma AP)───────┘   InfluxDB, MongoDB
                                                 store-and-forward
```

Kerrokset: **ajuri → normalisointi → laatuportti → puskuri → julkaisu.**
Vain ajurikerros tietää protokollasta mitään — ks. [ADR-0004](docs/adr/0004-reading-envelope-quality.md).

## Katetut protokollat

| Protokolla | Rooli tässä projektissa | Tila |
|---|---|---|
| Modbus RTU | Energiamittari, RS-485-anturi | 🟢 |
| Modbus TCP | Waveshare-yhdyskäytävä | 🟢 |
| M-Bus | Erillinen mittari, oma parseri | 🟡 |
| wM-Bus | 868 MHz, vain omat mittarit | 🟡 |
| CN105 (takaisinmallinnettu) | Ilmalämpöpumpun tilan luku | 🟡 |
| 1-Wire | Lämpötilavahti | ⚪ |
| Analogia | Virtapihti | ⚪ |
| S0-pulssi | Varareitti | ⚪ |
| LoRa (P2P) | Radio-osoitus | ⚪ |
| MQTT | Koko sisäinen viestiväylä | 🟢 |

🟢 toteutettu · 🟡 osittain / testattavana · ⚪ suunniteltu

## Rakenne

```
docs/
  PROJEKTIN-TILA.md   ← lähtökohta uuteen työhön, avoimet kysymykset
  adr/                ← arkkitehtuuripäätökset, yksi tiedosto per päätös
  vikaluettelo.md     ← havaitut ja ruiskutetut viat, mittarit
src/                  ← ajurit, pipeline (TypeScript)
hardware/             ← kytkentäkaaviot, hankintalista
```

## Arkkitehtuuripäätökset

Jokainen merkittävä valinta — ja hylätty vaihtoehto — on kirjattu ADR:ksi:
konteksti, vaihtoehdot, päätös, seuraukset, todennus.

→ [`docs/adr/`](docs/adr/README.md) — hakemisto ja kaikki päätökset

Muutamia keskeisiä:
- [0004](docs/adr/0004-reading-envelope-quality.md) — normalisoitu
  mittausenvelooppi ja laatukenttä
- [0005](docs/adr/0005-fyysinen-vikaruiskutus.md) — fyysinen vikaruiskutus
- [0016](docs/adr/0016-hiljainen-yhteyden-kuolema.md) — hiljainen
  yhteyden kuolema ensiluokkaisena vikana

## Vikaluettelo

Havaitut kenttäviat, ruiskutetut viat ja niiden vasteajat:
→ [`docs/vikaluettelo.md`](docs/vikaluettelo.md)

## Tila ja tiekartta

- [x] Suunnittelu ja laitevalinnat, ADR-0001…0018
- [ ] Modbus-ketju pöydällä (mittari → Waveshare → kanta)
- [ ] Kotelointi ja vikaruiskutuspaneeli
- [ ] CN105-luku ilmalämpöpumpusta (vain luku)
- [ ] Etäkohteen käyttöönotto
- [ ] Toistotila demoa varten

Yksityiskohtainen tila: [`docs/PROJEKTIN-TILA.md`](docs/PROJEKTIN-TILA.md)

## Tekijä

[Nimi] — sähköasennustausta, opettelee IoT/pilvipuolta tämän
projektin kautta. [LinkedIn] · [yhteystieto]

## Lisenssi

MIT — ks. [`LICENSE`](LICENSE)
