# ADR-0019: Pi tarjoaa etäkohteelle oman WiFi-tukiaseman, kohteen infraa ei oleteta

- **Tila:** Ehdotettu
- **Päivämäärä:** 2026-08-28
- **Liittyy:** ADR-0007

## Konteksti

Etäkohteessa ei oleteta olevan valmista verkkoinfraa. Raspberry Pi toimii
sekä tukiasemana (AP) paikallisille ESP32-antureille, että 4G-uplinkinä
ulospäin. Eli kaksi roolia samalla laitteella. Budjetissa ei ollut tilaa
Teltonikan laitteelle.

## Vaihtoehdot

### A: Raspberry Pi 4
Jo omistuksessa (0 €), tuttu Linux-ympäristö. `hostapd` tai vastaava
tarjoaa oman 2,4 GHz WiFi-verkon, johon etäkohteen ESP32-anturit
liittyvät riippumatta siitä, onko kohteessa muuta verkkoa. Raspberry on
passiivi jäähdytteisessä metallikotelossa. Ei DIN-kiskoa,
ei teollista sertifiointia.

### B: Teltonika
Vanha malli (RUT240) olisi ollut "halvalla", mutta Teltonika lopettaa
sen tuen.

## Päätös

Valittiin **A**.

Raspberry Pi 4 valittiin, koska se oli jo hyllyssä ja sen saa
access point moodiin.

## Seuraukset

**Hyvät**
- Kulujen kurissapito ja hyvä verkkomateriaali

**Huonot / hinta**
- Raspberry on kotiprojekteihin tarkoitettu, Teltonika ns. industrial
  standard 4G-verkkoreititin (80–160 €, ks. ADR-0007). Sen edut
  (DIN-kisko, tuki, sertifiointi) jäävät saamatta.

**Mitä tämä sulkee pois myöhemmin**
- Simulointi saattaa kärsiä, koska käytetään Raspberry Pi:tä eikä
  teollisuuteen tarkoitettua laitetta.

## Todennus

Arvioidaan raspin käyttövarmuutta ja ohjelmoitavuutta, kun saadaan
pipeline toimimaan energiamittarin ja tietokannan välillä.
