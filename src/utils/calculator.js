// src/utils/calculator.js

export const berekenAutokosten = (inputs) => {
  const {
    kilometers,
    leeftijd,
    beoogdeLooptijd,
    brandstof,
    verbruikBenzine,
    prijsBenzine,
    verbruikDiesel,
    prijsDiesel,
    verbruikStroom,
    prijsStroom,
    aanschafprijs,
    verwachteRestwaarde,
    autoLeeftijdKoop,
    anwbStatus,
    verzekeringType,
    metLening,
    leenbedrag,
    rentePercentage,
    leaseKmBundel,
    prijsExtraKm,
    isZzpZakelijk,
    cataloguswaarde,
    bijtellingsPercentage,
    inkomstenbelastingDruk,
    leaseMaandbedrag,
    leaseOnvoorzien,
    onderhoudsRisico,
    restwaardeScenario,

    // MEER OPTIES INPUTS
    handmatigeWegenbelasting, // Overschrijft de automatische MRB berekening indien ingevuld
    gewichtsklasse, // 'licht', 'midden', 'zwaar'
    provincie, // 'Gemiddeld', 'Groningen', 'Noord-Brabant', etc.
    schadevrijeJaren, // Nummer van 0 tot 15+
    autoWassenEnPoetsen, // Boolean: rekent kleine extra kosten mee indien waar
  } = inputs;

  const kmJaar = kilometers || 0;
  const kmMaand = kmJaar / 12;
  const leeftBestuurder = Number(leeftijd) || 0;
  const jaren = beoogdeLooptijd || 4; // Standaard terugvalwaarde naar 4 jaar indien leeg
  const maanden = jaren * 12;

  // 1. BRANDSTOFKOSTEN
  let brandstofKostenPerMaand = 0;
  if (kmMaand > 0) {
    if (brandstof === "Benzine" && verbruikBenzine > 0) {
      brandstofKostenPerMaand = (kmMaand / verbruikBenzine) * prijsBenzine;
    } else if (brandstof === "Diesel" && verbruikDiesel > 0) {
      brandstofKostenPerMaand = (kmMaand / verbruikDiesel) * prijsDiesel;
    } else if (brandstof === "Elektrisch" && verbruikStroom > 0) {
      brandstofKostenPerMaand = (kmMaand / 100) * verbruikStroom * prijsStroom;
    }
  }

  // 2. WEGENBELASTING (MRB) MET PROVINCIALE OPCENTEN
  let wegenbelasting = 0;

  if (
    handmatigeWegenbelasting !== undefined &&
    handmatigeWegenbelasting !== null &&
    handmatigeWegenbelasting !== ""
  ) {
    wegenbelasting = parseFloat(handmatigeWegenbelasting);
  } else {
    const klasse = gewichtsklasse || "midden";
    let basisWegenbelasting = 0;

    // Basis MRB schatting op basis van brandstof en gewichtsklasse
    if (brandstof === "Benzine") {
      if (klasse === "licht") basisWegenbelasting = 33;
      else if (klasse === "midden") basisWegenbelasting = 58;
      else if (klasse === "zwaar") basisWegenbelasting = 88;
    } else if (brandstof === "Diesel") {
      if (klasse === "licht") basisWegenbelasting = 85;
      else if (klasse === "midden") basisWegenbelasting = 122;
      else if (klasse === "zwaar") basisWegenbelasting = 165;
    } else if (brandstof === "Elektrisch") {
      // Afbouw MRB-voordeel EV vanaf 2026 ingecalculeerd
      if (klasse === "licht") basisWegenbelasting = 25;
      else if (klasse === "midden") basisWegenbelasting = 45;
      else if (klasse === "zwaar") basisWegenbelasting = 70;
    }

    // Provincie factor bepalen aan de hand van provinciale opcenten
    let provincieFactor = 1.0; // Standaard / Gemiddeld NL

    if (provincie && provincie !== "Gemiddeld") {
      switch (provincie) {
        case "Groningen":
        case "Gelderland":
          provincieFactor = 1.05; // Duurste provincies (+5%)
          break;
        case "Drenthe":
        case "Overijssel":
        case "Friesland":
        case "Zuid-Holland":
        case "Limburg":
          provincieFactor = 1.01; // Iets boven gemiddeld (+1%)
          break;
        case "Noord-Brabant":
        case "Utrecht":
        case "Flevoland":
        case "Zeeland":
          provincieFactor = 0.98; // Iets onder gemiddeld (-2%)
          break;
        case "Noord-Holland":
          provincieFactor = 0.93; // Goedkoopste provincie (-7%)
          break;
        default:
          provincieFactor = 1.0;
      }
    }

    wegenbelasting = basisWegenbelasting * provincieFactor;
  }

  // 3. AFSCHRIJVING & RESTWAARDE INDICATIE
  let restwaardeInzet = parseFloat(verwachteRestwaarde);
  const aanschaf = parseFloat(aanschafprijs) || 0;

  // Als de restwaarde leeg is, maakt de app een slimme, voorzichtige indicatie (bijv. 12% afschrijving per jaar)
  if (isNaN(restwaardeInzet) || restwaardeInzet === 0) {
    const afschrijvingsPercentagePerJaar =
      restwaardeScenario === "Voorzichtig"
        ? 0.15
        : restwaardeScenario === "Optimistisch"
          ? 0.09
          : 0.12;
    const totaleAfschrijvingSchatting =
      aanschaf * (afschrijvingsPercentagePerJaar * jaren);
    restwaardeInzet = Math.max(0, aanschaf - totaleAfschrijvingSchatting);
  }

  const totaleAfschrijving = aanschaf - restwaardeInzet;
  const afschrijvingPerMaand =
    totaleAfschrijving > 0 ? totaleAfschrijving / maanden : 0;

  // 4. ONDERHOUD EN VERBORGEN KOSTEN (NU DYNAMISCH OF HANDMATIG VIA SLIDER)
  let onderhoudPerMaand = 0;

  if (
    inputs.handmatigeOverigeKosten !== undefined &&
    inputs.handmatigeOverigeKosten !== null &&
    inputs.handmatigeOverigeKosten !== ""
  ) {
    onderhoudPerMaand = parseFloat(inputs.handmatigeOverigeKosten);
  } else {
    // Valt terug op de automatische berekening als de slider niet wordt gebruikt
    let basisOnderhoud =
      autoLeeftijdKoop === 0 ? 25 : autoLeeftijdKoop < 6 ? 60 : 95;
    if (kmJaar > 25000) basisOnderhoud += 25;
    if (anwbStatus === "Goud" || anwbStatus === "Platina") basisOnderhoud -= 3;
    if (autoWassenEnPoetsen) basisOnderhoud += 15;
    const onderhoudsRisicoFactor =
      onderhoudsRisico === "Laag"
        ? 0.8
        : onderhoudsRisico === "Hoog"
          ? 1.35
          : 1;
    onderhoudPerMaand = basisOnderhoud * onderhoudsRisicoFactor;
  }

  // 5. VERZEKERING (INCLUSIEF SCHADEVRIJE JAREN BONUS & LEEFTIJDSRISICO)
  let basisVerzekeringTarief = 65;
  if (verzekeringType === "WA") basisVerzekeringTarief = 35;
  if (verzekeringType === "WA+") basisVerzekeringTarief = 48;

  // Leeftijdsrisico toepassen (Houdt ook rekening met regelmatige jonge/oudere bestuurders)
  if (leeftBestuurder > 0 && leeftBestuurder < 25) {
    basisVerzekeringTarief =
      verzekeringType === "All-Risk"
        ? 145
        : verzekeringType === "WA+"
          ? 95
          : 70;
  } else if (leeftBestuurder >= 65) {
    basisVerzekeringTarief += 12; // Seniortoeslag gecorrigeerd naar marktgemiddelde
  }

  // Schadevrije jaren kortingsladder toepassen (max 70% korting bij 10+ jaren)
  const jarenBonus = parseInt(schadevrijeJaren, 10) || 0;
  let kortingsPercentage = 0;
  if (jarenBonus > 0) {
    if (jarenBonus >= 10) {
      kortingsPercentage = 0.7;
    } else if (jarenBonus >= 5) {
      kortingsPercentage = 0.55;
    } else {
      const ladder = { 1: 0.1, 2: 0.2, 3: 0.3, 4: 0.45 };
      kortingsPercentage = ladder[jarenBonus] || 0;
    }
  }

  const verzekeringKoop = basisVerzekeringTarief * (1 - kortingsPercentage);

  // 6. PECHHULP
  let pechhulpKosten = 12;
  if (anwbStatus === "Brons") pechhulpKosten = 10;
  if (anwbStatus === "Zilver") pechhulpKosten = 9;
  if (anwbStatus === "Goud") pechhulpKosten = 8;
  if (anwbStatus === "Platina") pechhulpKosten = 6;

  // 7. FINANCIERING
  let maandelijkseRente = 0;
  if (metLening && leenbedrag > 0 && rentePercentage > 0) {
    maandelijkseRente = (leenbedrag * (rentePercentage / 100)) / 12;
  }

  // --- TOTAAL KOOP ---
  const totaalKoop =
    wegenbelasting +
    verzekeringKoop +
    afschrijvingPerMaand +
    onderhoudPerMaand +
    brandstofKostenPerMaand +
    pechhulpKosten +
    maandelijkseRente;

  // 8. LEASE EXTRA KILOMETERS
  const veiligeLeaseKmBundel = parseFloat(leaseKmBundel) || 20000;
  const veiligePrijsExtraKm = parseFloat(prijsExtraKm) || 0;
  const extraKmKostenPerMaand =
    kmJaar > veiligeLeaseKmBundel && veiligePrijsExtraKm > 0
      ? ((kmJaar - veiligeLeaseKmBundel) * veiligePrijsExtraKm) / 12
      : 0;

  // 9. ZZP FISCALE BIJTELLING
  let nettoBijtellingPerMaand = 0;
  if (isZzpZakelijk) {
    const brutoBijtellingPerJaar =
      cataloguswaarde * (bijtellingsPercentage / 100);
    nettoBijtellingPerMaand =
      (brutoBijtellingPerJaar * (inkomstenbelastingDruk / 100)) / 12;
  }

  // --- TOTAAL LEASE ---
  const totaalLease =
    (parseFloat(leaseMaandbedrag) || 0) +
    brandstofKostenPerMaand +
    (parseFloat(leaseOnvoorzien) || 0) +
    extraKmKostenPerMaand +
    nettoBijtellingPerMaand;

  return {
    koop: {
      totaal: Math.round(totaalKoop),
      afschrijving: Math.round(afschrijvingPerMaand),
      verzekering: Math.round(verzekeringKoop),
      wegenbelasting: Math.round(wegenbelasting),
      onderhoud: Math.round(onderhoudPerMaand),
      pechhulp: pechhulpKosten,
      rente: Math.round(maandelijkseRente),
      brandstof: Math.round(brandstofKostenPerMaand),
    },
    lease: {
      totaal: Math.round(totaalLease),
      leaseprijs: Math.round(leaseMaandbedrag) || 0,
      onvoorzien: Math.round(leaseOnvoorzien) || 0,
      extraKmKosten: Math.round(extraKmKostenPerMaand),
      bijtelling: Math.round(nettoBijtellingPerMaand),
      brandstof: Math.round(brandstofKostenPerMaand),
    },
    verschil: Math.abs(Math.round(totaalKoop) - Math.round(totaalLease)),
    koopIsGoedkoper: totaalKoop < totaalLease,
  };
};
