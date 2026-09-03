# Part 4 Creating a JSON from polled data

### Notes
* Import node util fs
* Void blocking the I/o stream by using Async / Await 
* Removed Object.entries as it did not server purpose 
* stderr still not utilized
* Added try catch for a good measure

>### What I learned / studied
>* Node has internal fs module to read and write files 
>* Read basic method "requirements" from info
>* Json formatting while stringifying object




### PSEUDO

```
IMPORT fs from 'fs'

FUNCTION DECODEINT32 
    ...
     SAVEASJSON(REGISTER)


FUNCTION SAVEASJASON ASYNC (REGISTER)
    CONST CONVERT = JSON.STRINGIFY (REGISTER)

    TRY
        AWAIT FS.WRITEFILE('VOLTAGEREGISTER.JSON', CONVERT, (ERR)
            IF ERR THROW ERR )
        CATCH ERR
```