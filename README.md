# MCI-2 Sommersemester 2024
Material zur Vorlesung Mensch-Computer-Interaktion 2, Hochschule Esslingen


#### Scrcpy & ADB
Verbindung zum Smartphone

https://github.com/Genymobile/scrcpy


```
# alle verbundenen Geräte anzeigen
adb devices 


# Port forwarding
adb reverse tcp:3000 tcp:3000

# Port forwarding beenden
adb reverse --remove-all
```
