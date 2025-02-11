# Mahlzeit

wohl bekommts! 🍴

## Was du brauchst

- [Git](https://git-scm.com/)
- [GitHub Account](https://github.com/) (optional (glaub ich... egal mach einfach einen :D))
- Google Account
- Runtime:
  - [Nodejs](https://nodejs.org/en): Die älteste und erste Runtime für JavaScript außerhalb des Browsers, sollte am stabilsten sein; im Terminal: `npm`
  - [Deno](https://deno.com/): Vom gleichen Macher wie Nodejs aber viele Ecken verbessert; im Terminal: `deno`
  - [Bun](https://bun.sh/): Der neuste Shit: am schnellsten und vielversprechend für die Zukunft, nutze ich selbst am meisten; im Terminal: `bun`
- Editor: [Visual Studio Code](https://code.visualstudio.com/)

## Start Guide

### Repository clonen

- Starte Terminal (wenn du es nicht hast cmd oder Powershell) an dem Ort wo du das Projekt liegen haben willst (Shift + Rechtsklick und dann "CMD hier öffnen" o.Ä. oder per `cd ../beispiel/Dokumente/` hinnavigieren)
- `git clone https://github.com/Peybro/mahlzeit.git`
- `cd ./mahlzeit`
- `[npm|deno|bun] install`

### VSC hier starten

- `code .`
- Die Kommandozeile kannst du jetzt wieder schließen

Schau dich einfach mal ein bisschen um in VSC. Mit `Strg + Shift + P` öffnest du die Befehlspalette worüber du eigentlich alles steuern kannst was du in VSC machen kannst. Z.B. "Dokument formatieren mit" (hierfür kannst du auch mal suchen ob die die Tastenkombination rausfindest weil man das auf jeden Fall öfter brauchen wird, vllt findest du dabei noch andere gute).

In der ganz linken Icon-Spalte findest du unter anderem den Extension Tab. Ein paar mMn essentielle:

- German Language Pack
- Git Graph
- Github Copilot
- Prettier

### Firebase Datenbank erstellen

- Gehe zu https://console.firebase.google.com/ und erstelle ein neues Projekt.
- Füge eine neue Web App hinzu, Hosting im nächsten Schritt brauchst du (noch) nicht
- Nach "App registrieren" bekommst du den Hinweis wie du Firebase per npm installierst (brauchen wir nicht) und die Konfiguration für die App. Einmal die ganze Konfiguration kopieren und in `/src/firebase.ts` einfügen. Achte darauf dass aber vor `const app = initializeApp(firebaseConfig);` noch ein `export` steht.
- So, jetzt solltest du eigentlich neue Rezepte erstellen können und vorhandene anschauen

### Programm starten

Die Datei `package.json` ist quasi die DNA von Nodejs Projekten. Hier stehen alle möglichen Infos zu dem Projekt, welche Bibliotheken gebraucht werden (daher hat `npm install` die Infos genommen) und du findest hier die ausführbaren Skripe.

Für uns am relevantesten ist `dev` (und später `build`) und `format`. Ein Skript wird mit run gestartet, also: `[npm|deno|bun] run dev`

Jetzt baut er das Projekt zusammen und spuckt dir dann eine lokale Adresse aus über die du die App nutzen kannst.

### Wat nu?

- Types anschauen
- App.tsx starten
- Strg + Click auf Component öffnet sie
- git push
- auf alte Version zurücksetzen
