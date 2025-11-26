# Distribuirani računarski sistemi

Materijal za vežbe – 2025/2026

Ovaj projekat predstavlja osnovu za rad u okviru vežbi iz predmeta **Distribuirani računarski sistemi**.

---

## 🧪 Termin 02 – Uputstvo za pokretanje projekta

### Korak 1: Rekreirati virtuelno okruženje

Na osnovu _Pipfile_ i _Pipfile.lock_:

```bash
pipenv install
```

### Korak 2: Kreirati .env fajl

U root direktorijumu napraviti fajl:

```bash
.env
```

i popuniti ga podacima prema lokalnoj MySQL konfiguraciji.
Primer se nalazi u:

```bash
.env.example
```

### Korak 3: Pokrenuti projekat

```bash
pipenv shell

python run.py
```

### 🏡 Domaći zadatak – Izmena korisničkog profila

Proširiti projekat tako da ulogovani korisnik može da menja svoje korisničke informacije.

1️⃣ Proširenje User modela

U model User dodati nova polja:

    date_of_birth – datum rođenja

    address – ulica

    number - broj

    gender – pol

Izvršiti migraciju baze nakon izmene.

2️⃣ Forma za uređivanje profila

Napraviti stranicu i formu sa poljima:

    Datum rođenja

    Ulica i broj

    Pol (male/female/other)

    Trenutna lozinka — obavezna radi potvrde izmene

    Email se ne sme menjati.
    Email mora biti prikazan u formi, ali samo kao read-only.

3️⃣ Validacija i bezbednosni zahtevi

    Korisnik mora da unese svoju lozinku da bi potvrdio svaku izmenu.

    Ako je lozinka neispravna, izmena se odbija.

    Adresa ne sme biti prazna.

    Datum rođenja mora biti validan datum.

    Pol mora biti jedna od dozvoljenih vrednosti (male ili female).

4️⃣ Povratne informacije

Sistem treba da prikaže:

    poruku o uspešnoj izmeni,

    poruku o pogrešnoj lozinki,

    poruku o nevalidnim podacima.

## 🧪 Termin 03 – Uputstvo za pokretanje projekta

### Python Flask Web API

### Korak 1: Rekreirati virtuelno okruženje

Na osnovu _Pipfile_ i _Pipfile.lock_:

```bash
pipenv install
```

### Korak 2: Kreirati .env fajl

U root direktorijumu napraviti fajl:

```bash
.env
```

i popuniti ga podacima prema lokalnoj MongoDB konfiguraciji.
Primer se nalazi u:

```bash
.env.example
```

### Korak 3: Pokrenuti projekat

```bash
pipenv shell

python run.py
```

### React

### Korak 1: Instalacija zavisnosti

Na osnovu _package.json_ i _package-lock.json_:

```bash
npm install
```

### Korak 2: Kreirati .env fajl

U root direktorijumu napraviti fajl:

```bash
.env
```

i popuniti ga podacima prema lokalnoj konfiguraciji.
Primer se nalazi u:

```bash
.env.example
```

### Korak 3: Pokrenuti projekat

```bash
npm run dev
```
