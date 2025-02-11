# Zahlmeit

wohl bekommts! 🍴

**Kurzes Intro:** Du kannst mit jeder Programmiersprache eine Webanwendung entwickeln - man muss halt immer einen kleinen Webserver laufen lassen der dann passende HTML Seiten ausspuckt.

Damit man nicht jedes mal dafür alles händisch neu aufbauen muss gibt es Frameworks, die das Entwickeln sehr stark erleichtern, wenn man sich an bestimmte Vorgaben hält, z.B. dass Code der eh immer gleich ist weggelassen werden kann - und dann vom Framework automatisch an den richtigen Stellen ergänzt wird. Oder anstatt dass man jede Route (also jeden URL Pfad) einzeln angibt und was dort gerendert werden soll, wird einfach jede Datei in einem bestimmten Ordner als Route angesehen.

In den meisten Sprachen hat sich dabei ein klarer Gewinner entwickelt, den die Mehrheit an entwicklern nutzt. Nicht so bei JavaScript (das wird in diesem Projekt genutzt :D) - hier war die erste große Bibliothek für einer vereinfachte Erstellung von Web Apps Angular von Google. Später kamen dann noch weitere hinzu, wie Vue.js, Svelte und .... React von Facebook, das auch hier genutzt wird und sich auch zu einer der meistgenutzen JavaScript Libraries entwickelt hat.

<hr />

**Bemerkung:** Wir entwickeln hier mit TypeScript - einer Superklasse für JavaScript. Heißt: Alles JavaScript ist auch gültig, es gibt aber wie der Name fast verrät Types, mit denen Programmierfehler bereits bei der Entwicklung vermieden werden.

<hr />

Für jede dieser Libraries wurden dann mit der Zeit auch Frameworks entwickelt. Und das Framework für React das wir hier nutzen ist Next.js.

Ok, let's dive in... 🐠

## Was du brauchst

- [Git](https://git-scm.com/) für die Versionsverwaltung
- [GitHub Account](https://github.com/) (optional (glaub ich... egal mach einfach einen :D)) für Git
- Google Account für das Backend
- Runtime (**choose one**):

  - [Nodejs](https://nodejs.org/en): Die älteste und erste Runtime für JavaScript außerhalb des Browsers, sollte am stabilsten sein; im Terminal: `node` oder `npm` für den Packetmanager (ist bei bun auch `bun`)
  - [Deno](https://deno.com/): Vom gleichen Macher wie Nodejs aber viele Ecken verbessert; im Terminal: `deno`
  - [Bun](https://bun.sh/): Der neuste Shit: am schnellsten und vielversprechend für die Zukunft, kann glaube ich alle Befehle die Nodejs auch kann (nur halt mit bun anstatt node), nutze ich selbst am meisten; im Terminal: `bun`

  **Tipp:** Wenn du eine der Runtimes installiert hast kannst du `[npm|deno|bun] install -g pnpm` ausführen und dann von hier aus auch `pnpm` anstatt npm/deno/bun nutzen, was den Vorteil hat, dass nicht alle Bibliotheken neu installiert werden wenn du sie schonmal auf deinem PC installiert hast. Ist aber nicht so wichtig, da das hier ja wsl eh das erste Projekt ist :D

- Editor: [Visual Studio Code](https://code.visualstudio.com/); es geht auch jeder andere aber das ist basically der Goto Editor für Webentwicklung

## Start Guide

### Repository clonen

- Starte Terminal (wenn du es nicht hast cmd oder Powershell) an dem Ort wo du das Projekt liegen haben willst (Shift + Rechtsklick und dann "CMD hier öffnen" o.Ä. oder per `cd ../beispiel/Dokumente/` hinnavigieren)
- `git clone https://github.com/Peybro/zahlmeit.git`
- `cd ./zahlmeit`
- `[npm|deno|bun] install` um die externen Bibliotheken zu installieren

### VSC hier starten

- `code .`
- Die Kommandozeile kannst du jetzt wieder schließen

**oder** rechtsklick im Ordner oder auf den Ordner und "VSCode hier öffnen"

Schau dich einfach mal ein bisschen um in VSC. Mit `Strg + Shift + P` öffnest du die Befehlspalette worüber du eigentlich alles steuern kannst was du in VSC machen kannst. Z.B. "Dokument formatieren mit" (hierfür kannst du auch mal suchen ob die die Tastenkombination rausfindest weil man das auf jeden Fall öfter brauchen wird, vllt findest du dabei noch andere gute).

#### Extensions

In der ganz linken Icon-Spalte findest du unter anderem den Extension Tab. Ein paar mMn essentielle:

- German Language Pack
- Git Graph
- Github Copilot
- Prettier

#### Git

In der Spalte findest du auch 3 Punkte mit einer Weiche. Das ist die git Implementierung von VSC. Immer wenn du eine Datei änderst und speicherst, wird hier der kleine Counter erhöht und es werden die geänderten Dateien angezeigt. Du kannst von diesen geänderten Dateien einzelne mit dem + auswählen oder keine auswählen, dann wählst du alle aus - logo! Noch kurz eine Commit-Nachricht verfassen und schon kannst du deine Änderungen committen (und hochladen). Das ist nicht nur für Teamarbeiten wichtig, sondern du kannst auch jeden Commit einsehen und dein Projekt sogar auf jeden zurücksetzen. Mit Branches kann man auch parallel zu anderen Änderungen arbeiten aber das ist jetzt erstmal nicht so wichtig.

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

#### Für das Auge

- such mal die Datei gobals.scss und schau sie dir an. Hier kannst du alle möglichen CSS Styles speichern die dann in der ganzen Anwendung gelten. Ist aber erstmal gar nicht so wichtig, weil ich für ein schlichtes aber ansehnliches Design erstmal [picocss](https://picocss.com/) installiert habe und außerdem [tailwindcss](https://v3.tailwindcss.com/) läuft, mit dem Styles per classes den einzelnen HTML Tags zugewiesen werden.

#### Zum Weiterentwickeln

- Starte mal damit dir die Types in /src/types anzuschauen. Es ist wichtig diese Datenstrukturen auch beim Entwickeln anzuwenden und immer damit herum zu jonglieren bis das gewünschte Ergebnis rauskommt :D

- Jeder Ordner in /src/app entspricht einer Route die nach localhost aufrufbar ist, z.B. http://localhost:5173/rezepte - Die entsprechende Datei dafür findest du in `/src/app/rezepte/page.tsx`. Für Nextjs ist es wichtig dass jede Datei in einem "Routen-Ordner" `page.tsx` heißt.

##### JSX & React

JSX ist eine Mischung aus HTML und JavaScript: Du kannst Variablen einfach in {} in HTML packen. Das besondere dabei ist dass sie dann bei Veränderungen immer automatisch geupdatet werden. (Weil wir TypeScript nutzen enden die Dateinamen stattdessen mit tsx).

Bsp.:

```tsx
export default function BeispielComponente() {
  const [counter, setCounter] = useState<number>(0);

  function handleMinus() {
    setCounter((prev) => prev - 1);
  }

  return (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={() => handleMinus()}>-</button>
      <button onClick={handleMinus}>-</button>
      {/* Funktioniert nicht: */}
      {/* <button onClick={handleMinus()}>-</button> */}

      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>

      <ul>
        {Array(counter)
          .fill(0)
          .map((element, i) => {
            return <BeispielChild nr={i + 1} />;
          })}
      </ul>
    </>
  );
}
```

```tsx
export default function BeispielChild(props: { props: { nr: number } }) {
  return <li>{props.nr}</li>;
}
```

besser:

```tsx
type BeispielChildProps = {
  nr: number;
};

export default function BeispielChild({ nr }: BeispielChildProps) {
  return <li>{props.nr}</li>;
}
```

Puhh, ok also was sehen wir hier alles?

1. React Components sind Funktionen (früher waren es mal Klassen, aber ist in JavaScript eh alles ein Objekt :D) die immer gleich aufgebaut sind: `export default function ...` und haben immer ein return mit dem JSX zurückgegeben wird.
2. Jedes return returnt dabei nur **ein** Element, wenn du mehrere hast musst du sie im einem <div> Container oder einem React-Fragment <> wrappen
3. useState wird genutzt um den State einer Komponente zu halten - logo. Der erste Wert im Array ist dabei der Wert selbst und der zweit eine Funktion um den Wert zu updaten und du kannst direkt einen Type angeben, der wird aber meistens auch einfach aus dem InitialValue in Klammern abgeleitet.
4. Achte darauf bei Button Aufrufen nicht die Funktion einfach so aufzurufen sondern entweder nur mit ihrem Namen, ohne die (), oder mit einer vorhergehenden anonymen Funktion () => ...
5. Wenn du in React die Werte eines Arrays abbilden möchtest, nutzt du die map Funktion. Dabei ist auch hier die gängige Syntax eine anonyme Funktion zu nutzen, deren erster Wert das Element im Array ist und - optional - der zweite Wert ein mitlaufender Iterator. Wichtig dabei ist auch immer an das return zu denken (oder du kannst es weglassen wenn du auch die geschweifte Klammer weglässt, für One-Liner quasi, aber nur nebenbei).
6. Dann siehst du dass in der map Funktion kein HTML Tag aufgerufen wird sondern eine andere Komponente. Das ist das besondere an Komponenten - hab ich iwie noch nicht gesagt :D
7. Um einer Child Komponente Werte mitzugeben nutzt man die props wie im Beispiel. Props in Childs werden auch automatisch aktualisiert wenn die Originalwerte sich ändern - voll **react**ive eben ;)

   **Tipp:** Strg + Click auf Component öffnet sie

##### Gängige Types

- `string`: Text
- `number`: Zahl
- `boolean`: true/false
- `Record<K,V>`: Objekte aus Key-Value Paaren (auch Types), du kannst als Type aber auch das Objekt ausschreiben. Hier ist der Vorteil dann dass dass man die Keys genauer bestimmen kann. Muss man immer gucken was grad besser passt.

Arrays aus Types gibst du z.B. durch `number[]` an.

##### Ende

Werde erstmal ein bisschen vertraut mit JavaScript, schau dir das Projekt an und versuch zu verstehen wie alles zusammenhängt. Schau dir auch die Webseite von [PicoCSS](https://picocss.com/) mal an, hier siehst du an vielen Beipielen wie du deine Wunschkomponenten implementieren kannst.

Und dann, wenn du soweit bist, kannst du als nächsten Schritt die Rezepte selbst mal implementieren (Bilder-Upload reich ich nach, der ist etwas komplizierter).

Und dann kannst du auch den Filter für die Wochenauswahl probieren umzusetzen.

Oder du wirfst alles über Bord und fängst komplett neu an quasi (oder nutzt einfach [Mealie](https://mealie.io/), lernt man halt nur nicht so viel :D)

... Es gibt so viele Möglichkeiten :D Viel Spaß auf jeden Fall, hauste rein! Und meld dich wenn du nicht weiterkommst oder so (wobei KIs da auch sehr gut drin sind zu helfen ;D)!
