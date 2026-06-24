// App.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { berekenAutokosten } from "./src/utils/calculator";
import HeaderCard from "./src/components/HeaderCard";
import LiveComparisonCard from "./src/components/LiveComparisonCard";
import BasisGegevensCard from "./src/components/BasisGegevensCard";
import DetailsKoopCard from "./src/components/DetailsKoopCard";
import DetailsLeaseCard from "./src/components/DetailsLeaseCard";

export default function App() {
  // --- ALGEMENE INPUTS ---
  const [leeftijd, setLeeftijd] = useState(40);
  const [kilometers, setKilometers] = useState(20000);
  const [brandstof, setBrandstof] = useState("Benzine");
  const [beoogdeLooptijd, setBeoogdeLooptijd] = useState(4);
  const [schadevrijeJaren, setSchadevrijeJaren] = useState(5); // Standaard op 5
  const [autoWassenEnPoetsen, setAutoWassenEnPoetsen] = useState(false); // Standaard uit
  const [handmatigeWegenbelasting, setHandmatigeWegenbelasting] = useState(""); // Standaard leeg

  // --- BRANDSTOF INSTELLINGEN ---
  const [brandstofPrijs, setBrandstofPrijs] = useState(1.95);

  // --- KOOP AUTO CONFIGURATIE ---
  const [aanschafprijs, setAanschafprijs] = useState(25000);
  const [verwachteRestwaarde, setVerwachteRestwaarde] = useState(12000);
  const [autoLeeftijdKoop, setAutoLeeftijdKoop] = useState(3);
  const [verzekeringType, setVerzekeringType] = useState("WA+");
  const [provincie, setProvincie] = useState("Noord-Brabant");
  const [handmatigeOverigeKosten, setHandmatigeOverigeKosten] = useState("");
  // Voeg deze regel toe bij je andere useState hooks in App.js:
  const [gewichtsklasse, setGewichtsklasse] = useState("1051-1150 kg"); // Of je eigen standaard beginwaarde

  // --- LEASE CONFIGURATIE ---
  const [leaseBedrag, setLeaseBedrag] = useState(450);
  const [leaseLooptijd, setLeaseLooptijd] = useState(48); // in maanden
  const [leaseKmBundel, setLeaseKmBundel] = useState(20000);
  const [prijsExtraKm, setPrijsExtraKm] = useState(0.1);

  // --- STATE VOOR DE NIEUWE 5E INFORMATIE KAART ---
  const [infoUitgeklapt, setInfoUitgeklapt] = useState(false);
  const [onderhoudsRisico, setOnderhoudsRisico] = useState("Gemiddeld");
  const [restwaardeScenario, setRestwaardeScenario] = useState("Gemiddeld");
  const [basisUitgeklapt, setBasisUitgeklapt] = useState(true);
  const [specificatieUitgeklapt, setSpecificatieUitgeklapt] = useState(false);
  const [koopUitgeklapt, setKoopUitgeklapt] = useState(true);
  const [leaseUitgeklapt, setLeaseUitgeklapt] = useState(false);

  // Synchroniseer brandstofprijs als het type brandstof wijzigt (optioneel, als fallback)
  useEffect(() => {
    if (brandstof === "Benzine") setBrandstofPrijs(1.95);
    if (brandstof === "Diesel") setBrandstofPrijs(1.65);
    if (brandstof === "Elektrisch") setBrandstofPrijs(0.35);
  }, [brandstof]);

  const genormaliseerdeGewichtsklasse = ["licht", "midden", "zwaar"].includes(
    gewichtsklasse,
  )
    ? gewichtsklasse
    : "midden";
  const handmatigeOverigeKostenWaarde =
    handmatigeOverigeKosten !== ""
      ? parseFloat(handmatigeOverigeKosten)
      : null;

  // Verzamel alle parameters voor de calculator
  const inputs = {
    kilometers,
    leeftijd,
    beoogdeLooptijd,
    brandstof,
    brandstofPrijs,
    verbruikBenzine: 15,
    prijsBenzine: brandstofPrijs,
    verbruikDiesel: 18,
    prijsDiesel: brandstofPrijs,
    verbruikStroom: 18,
    prijsStroom: brandstofPrijs,
    aanschafprijs,
    verwachteRestwaarde,
    autoLeeftijdKoop,
    verzekeringType,
    provincie,
    gewichtsklasse: genormaliseerdeGewichtsklasse,
    schadevrijeJaren,
    autoWassenEnPoetsen,
    handmatigeOverigeKosten: Number.isNaN(handmatigeOverigeKostenWaarde)
      ? null
      : handmatigeOverigeKostenWaarde,
    leaseMaandbedrag: leaseBedrag,
    leaseLooptijd,
    leaseKmBundel,
    prijsExtraKm,
    leaseOnvoorzien: 25, // Vaste buffer of later uit te breiden
    onderhoudsRisico,
    restwaardeScenario,
    schadevrijeJaren,
    autoWassenEnPoetsen,
    handmatigeWegenbelasting:
      handmatigeWegenbelasting !== ""
        ? parseFloat(handmatigeWegenbelasting)
        : null,
  };

  // Voer de berekening live uit
  const r = berekenAutokosten(inputs);

  // Dynamische knoppenstyling voor de brandstofselectie
  const getKnoppenStijl = (type) => {
    return [
      styles.optionButton,
      brandstof === type && styles.activeOptionButton,
    ];
  };

  const openHeaderSectie = (sectie) => {
    if (sectie === "basis") setBasisUitgeklapt(true);
    if (sectie === "specificatie") setSpecificatieUitgeklapt(true);
    if (sectie === "koop") setKoopUitgeklapt(true);
    if (sectie === "lease") setLeaseUitgeklapt(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* STICKY HEADER SUMMARY BOVENIN (Altijd in beeld bij scrollen) */}
        <HeaderCard r={r} onOpenSection={openHeaderSectie} />

        {/* HOOFD SCROLL CONTAINER MET ALLE TRANSPARANTE EN INKLAPBARE KAARTEN */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* HIER IS HET REGELTJE DAT PRECIES IN MET MIDDEN UITGELIJND STAAT */}
          <Text style={styles.gecentreerdeSubHeader}>
            Vergelijk hieronder de reële netto maandlasten live
          </Text>

          {/* KAART 1: ALGEMENE BASISGEGEVENS (Sliders km, looptijd, leeftijd & brandstof) */}
          <BasisGegevensCard
            kilometers={kilometers}
            setKilometers={setKilometers}
            beoogdeLooptijd={beoogdeLooptijd}
            setBeoogdeLooptijd={setBeoogdeLooptijd}
            leeftijd={leeftijd}
            setLeeftijd={setLeeftijd}
            brandstof={brandstof}
            setBrandstof={setBrandstof}
            getKnoppenStijl={getKnoppenStijl}
            brandstofPrijs={brandstofPrijs}
            setBrandstofPrijs={setBrandstofPrijs}
            isUitgeklapt={basisUitgeklapt}
            setIsUitgeklapt={setBasisUitgeklapt}
          />

          {/* KAART 2: LIVE SPECIFICATIE PER MAAND (De tabel-breakdown) */}
          <LiveComparisonCard
            r={r}
            metLening={false}
            isZzpZakelijk={false}
            isUitgeklapt={specificatieUitgeklapt}
            setIsUitgeklapt={setSpecificatieUitgeklapt}
          />

          {/* KAART 3: DETAILS KOOPAUTO */}
          <DetailsKoopCard
            aanschafprijs={aanschafprijs}
            setAanschafprijs={setAanschafprijs}
            verwachteRestwaarde={verwachteRestwaarde}
            setVerwachteRestwaarde={setVerwachteRestwaarde}
            autoLeeftijdKoop={autoLeeftijdKoop}
            setAutoLeeftijdKoop={setAutoLeeftijdKoop}
            verzekeringType={verzekeringType}
            setVerzekeringType={setVerzekeringType}
            beoogdeLooptijd={beoogdeLooptijd}
            provincie={provincie}
            setProvincie={setProvincie}
            gewichtsklasse={gewichtsklasse}
            setGewichtsklasse={setGewichtsklasse}
            handmatigeOverigeKosten={handmatigeOverigeKosten}
            setHandmatigeOverigeKosten={setHandmatigeOverigeKosten}
            onderhoudsRisico={onderhoudsRisico}
            setOnderhoudsRisico={setOnderhoudsRisico}
            restwaardeScenario={restwaardeScenario}
            setRestwaardeScenario={setRestwaardeScenario}
            schadevrijeJaren={schadevrijeJaren}
            setSchadevrijeJaren={setSchadevrijeJaren}
            autoWassenEnPoetsen={autoWassenEnPoetsen}
            setAutoWassenEnPoetsen={setAutoWassenEnPoetsen}
            handmatigeWegenbelasting={handmatigeWegenbelasting}
            setHandmatigeWegenbelasting={setHandmatigeWegenbelasting}
            kaartUitgeklapt={koopUitgeklapt}
            setKaartUitgeklapt={setKoopUitgeklapt}
          />

          {/* KAART 4: DETAILS LEASEAUTO */}
          <DetailsLeaseCard
            leaseBedrag={leaseBedrag}
            setLeaseBedrag={setLeaseBedrag}
            leaseLooptijd={leaseLooptijd}
            setLeaseLooptijd={setLeaseLooptijd}
            leaseKmBundel={leaseKmBundel}
            setLeaseKmBundel={setLeaseKmBundel}
            prijsExtraKm={prijsExtraKm}
            setPrijsExtraKm={setPrijsExtraKm}
            isUitgeklapt={leaseUitgeklapt}
            setIsUitgeklapt={setLeaseUitgeklapt}
          />

          {/* KAART 5: VOLLEDIGE INFORMATIE & UITLEG KAART (Nu met álle eerdere info hersteld!) */}
          <View style={styles.infoCard}>
            <TouchableOpacity
              style={styles.infoToggle}
              onPress={() => setInfoUitgeklapt(!infoUitgeklapt)}
              activeOpacity={0.7}
            >
              <Text style={styles.infoCardTitle}>
                {infoUitgeklapt
                  ? "🔽 Verberg Informatie & Uitleg"
                  : "▶️ Toon Informatie & Uitleg"}
              </Text>
            </TouchableOpacity>

            {infoUitgeklapt && (
              <View style={styles.infoContent}>
                <Text style={styles.infoSubHeader}>
                  Hoe werkt deze vergelijking?
                </Text>
                <Text style={styles.infoText}>
                  Deze calculator rekent met de échte verborgen kosten van een
                  eigen auto, waardoor je een eerlijke 1-op-1 vergelijking
                  krijgt met een leasecontract.
                </Text>
                <Text style={styles.infoBullet}>
                  •{" "}
                  <Text style={{ fontWeight: "700" }}>
                    Afschrijving & Waardevermindering:
                  </Text>{" "}
                  Dit is vaak de grootste post bij koop. Dit wordt berekend op
                  basis van het verschil tussen je aanschafprijs en de verwachte
                  restwaarde over de gekozen looptijd.
                </Text>
                <Text style={styles.infoBullet}>
                  •{" "}
                  <Text style={{ fontWeight: "700" }}>
                    Misgelopen Rente (Opportunity Cost):
                  </Text>{" "}
                  Als je geld in een auto steekt, kun je het niet op een
                  spaarrekening zetten. De calculator neemt dit optioneel mee
                  als misgelopen rendement.
                </Text>
                <Text style={styles.infoBullet}>
                  •{" "}
                  <Text style={{ fontWeight: "700" }}>
                    Wegenbelasting & Verzekering:
                  </Text>{" "}
                  De MRB wordt automatisch ingeschat op basis van de
                  geselecteerde provincie en het brandstoftype. De verzekering
                  simuleert de premie voor jouw gekozen dekking (WA, WA+ of
                  All-Risk).
                </Text>
                <Text style={styles.infoBullet}>
                  •{" "}
                  <Text style={{ fontWeight: "700" }}>Lease Maandbedrag:</Text>{" "}
                  Bij Private of Operational Lease zijn verzekering,
                  wegenbelasting, onderhoud en pechhulp al inclusief. Daar
                  tellen we live alleen nog jouw brandstof- of laadkosten bij op
                  op basis van je jaarkilometrage.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // Fijne lichte achtergrond
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 310, // Ruimte gereserveerd voor de dashboardheader bovenin
    paddingBottom: 60, // Lekkere uitloop aan de onderkant
  },
  gecentreerdeSubHeader: {
    fontSize: 13,
    color: "#71717a",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 12,
    fontWeight: "500",
    fontStyle: "italic", // Maakt hem net even wat verfijnder als detail-regeltje
  },
  optionButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  activeOptionButton: {
    backgroundColor: "#f0f9ff",
    borderColor: "#0284c7",
  },
  // STYLING VOOR DE NIEUWE 5E INFO CARD
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b", // Oranje accent passend bij algemene secties
  },
  infoToggle: {
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
  },
  infoContent: {
    marginTop: 10,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
  },
  infoSubHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: "#27272a",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 18,
    marginBottom: 8,
  },
  infoBullet: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 18,
    marginBottom: 4,
    paddingLeft: 4,
  },
});
