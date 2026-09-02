# Part 3 Handling a single register int32 RX calculus

### Notes
* Mbpoll returns back as string format so we cannot use javascript array buffer or dataview.
* We calculate 2 x 16 bit values (`2^16 = 65536`) with | **LSB** + ( **MSB** * 65536) / weight | Voltage (U) = (2300 + (0 * 65536) / 10) = 230 V

>### What I learned / studied
>* Calculating the Least significant bit **LSB** Most significant bit **MSB** operation by hand as EM111 required.
>* More clear param naming
>* MAP String as Number from object into an array

### PSEUDO

```
FUNKTION POLL


FUNCTION DECODEINT32 (REGISTER)
    CONST ARRAY <FIRSTINT16, SECONDINT16> = REGISTER...RAWDEV.MAP(NUMBER)
    CONST VALUE = FIRSTINT16 + SECONDINT16 * 2^16
    CONST VALUEDEC = VALUE >= 2^31 ? VALUE - 2^32 : VALUE
    CONST VOLTAGE = VALUEDEC / REGISTER.WEIGHT

    REGISTER.SUCCESS.VALUE = VOLTAGE
```
