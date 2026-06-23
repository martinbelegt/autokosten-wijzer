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

  // --- BRANDSTOF INSTELLINGEN ---
  const [brandstofPrijs, setBrandstofPrijs] = useState(1.95);

  // --- KOOP AUTO CONFIGURATIE ---
  const [aanschafprijs, setAanschafprijs] = useState(25000);
  const [verwachteRestwaarde, setVerwachteRestwaarde] = useState(12000);
  const [autoLeeftijdKoop, setAutoLeeftijdKoop] = useState(3);
  const [verzekeringType, setVerzekeringType] = useState("WA+");
  const [provincie, setProvincie] = useState("Noord-Brabant");
  const [handmatigeOverigeKosten, setHandmatigeOverigeKosten] = useState("");

  // --- LEASE CONFIGURATIE ---
  const [leaseBedrag, setLeaseBedrag] = useState(450);
  const [leaseLooptijd, setLeaseLooptijd] = useState(48); // in maanden

  // --- STATE VOOR DE NIEUWE 5E INFORMATIE KAART ---
  const [infoUitgeklapt, setInfoUitgeklapt] = useState(false);

  // Synchroniseer brandstofprijs als het type brandstof wijzigt (optioneel, als fallback)
  useEffect(() => {
    if (brandstof === "Benzine" && brandstofPrijs === 1.65)
      setBrandstofPrijs(1.95);
    if (brandstof === "Diesel" && brandstofPrijs === 1.95)
      setBrandstofPrijs(1.65);
    if (brandstof === "Elektrisch") setBrandstofPrijs(0.35);
  }, [brandstof]);

  // Verzamel alle parameters voor de calculator
  const inputs = {
    kilometers,
    leeftijd,
    beoogdeLooptijd,
    brandstof,
    brandstofPrijs,
    aanschafprijs,
    verwachteRestwaarde,
    autoLeeftijdKoop,
    verzekeringType,
    provincie,
    handmatigeOverigeKosten: parseFloat(handmatigeOverigeKosten) || 0,
    leaseMaandbedrag: leaseBedrag,
    leaseLooptijd,
    leaseOnvoorzien: 25, // Vaste buffer of later uit te breiden
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* STICKY HEADER SUMMARY BOVENIN (Altijd in beeld bij scrollen) */}
        <HeaderCard r={r} />

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
          />

          {/* KAART 2: LIVE SPECIFICATIE PER MAAND (De tabel-breakdown) */}
          <LiveComparisonCard r={r} metLening={false} isZzpZakelijk={false} />

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
            handmatigeOverigeKosten={handmatigeOverigeKosten}
            setHandmatigeOverigeKosten={setHandmatigeOverigeKosten}
          />

          {/* KAART 4: DETAILS LEASEAUTO */}
          <DetailsLeaseCard
            leaseBedrag={leaseBedrag}
            setLeaseBedrag={setLeaseBedrag}
            leaseLooptijd={leaseLooptijd}
            setLeaseLooptijd={setLeaseLooptijd}
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
    paddingTop: 135, // Ruimte gereserveerd voor de compacte HeaderCard bovenin
    paddingBottom: 60, // Lekkere uitloop aan de onderkant
  },
  gecentreerdeSubHeader: {
    fontSize: 13,
    color: "#71717a",
    textAlign: "center",
    marginTop: 2,
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
    borderLeftColor: "#71717a", // Neutraal grijs haakje voor documentatie
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
