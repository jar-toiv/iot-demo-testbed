# ADR-0002: Modbus RTU ja M-bus -orja

- **Tila:** Ehdotettu
- **Päivämäärä:** 2026-08-28
- **Liittyy:** -

## Konteksti

Tarvitaan Modbus RTU -orja ja M-Bus-orja (myöhemmin).
Mahdollisuudet oli  Modbus RTU: `Carlo Gavazzi EM111-DIN.AV8.1.X.S1.X ` tai `(Eastron SDM120-Modbus)`.
Carlo Gavazzin kaikki mallit oli saatavilla seuraavana päivänä ja on yleisesti käytettynä kiinteistöissä sähköauton lautausenergian kulutuksessa.

Mahdollisuudet Mbus: Tätä ei vielä hankita. `(Eastron SDM120)` tulee todennäiköisesti hankittua, koska se tarjooa erivalmistajan. Toki Gavazzilla on myös kyseinen malli `M1` tuotekoodissa kertoo sen.

## Vaihtoehdot

### A: Kaksi Eastronia (SDM120-Modbus + SDM120-MBus)
Yksi rekisterikartta, yksi datalehti, yksi konfigurointityökalu.
Halvin ja nopein.

### B: Carlo Gavazzi EM111 S1 (Modbus) + Eastron SDM120-MBus (M-Bus)
Kaksi valmistajaa, kaksi dokumentaatiokulttuuria, kaksi rekisterikarttaa.

## Päätös

Valittiin **B**.

Kaksi samanlaista laitetta ei todista ajurikerroksesta mitään. Abstraktio
joutuu koetukselle vasta kun toteutukset eroavat. Molempien
valmistajakohtaiset poikkeamat ovat jo tiedossa: Carlo Gavazzissa
funktiokoodit 03h ja 04h palauttavat saman tuloksen vaikka standardi
erottaa holding- ja input-rekisterit, ja Eastronilla on oma 32-bittisten
liukulukujen sanajärjestyksensä. Kentällä laitekanta on aina sekalainen.

## Seuraukset

**Hyvät**
- Ajurikerroksen abstraktio joutuu oikeasti todistamaan itsensä
- Kaksi aitoa "valmistajakohtaista kummallisuutta" demoon
- Vastaa todellista kenttätilannetta

**Huonot / hinta**
- Kaksi datalehteä opeteltavaksi, kaksi konfigurointityökalua
- Kaksi eri tilausta, kaksi rahtia
- Enemmän työtä ajurikerroksessa

**Mitä tämä sulkee pois**
- Ei voi olettaa yhteistä rekisterikarttaa missään koodissa

## Todennus

Onnistunut jos uuden valmistajan lisääminen vaatii vain uuden ajuriluokan
eikä muutoksia pipelineen. Epäonnistunut jos jompikumpi laite vaatii
erikoiskäsittelyä ajurikerroksen yläpuolella.
