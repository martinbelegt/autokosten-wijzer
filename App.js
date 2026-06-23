import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { berekenAutokosten } from "./src/utils/calculator";
import HeaderCard from "./src/components/HeaderCard";
import LiveComparisonCard from "./src/components/LiveComparisonCard";
import BasisGegevensCard from "./src/components/BasisGegevensCard";
import DetailsKoopCard from "./src/components/DetailsKoopCard";
import DetailsLeaseCard from "./src/components/DetailsLeaseCard";

export default function App() {
  const [actieveTab, setActieveTab] = useState("cockpit");

  // --- INPUT STATES ---
  const [leeftijd, setLeeftijd] = useState(40);
  const [kilometers, setKilometers] = useState(20000);
  const [brandstof, setBrandstof] = useState("Benzine");
  const [beoogdeLooptijd, setBeoogdeLooptijd] = useState(4);

  const [prijsBenzine, setPrijsBenzine] = useState(1.95);
  const [verbruikBenzine, setVerbruikBenzine] = useState(16);
  const [prijsDiesel, setPrijsDiesel] = useState(1.65);
  const [verbruikDiesel, setVerbruikDiesel] = useState(19);
  const [prijsStroom, setPrijsStroom] = useState(0.35);
  const [verbruikStroom, setVerbruikStroom] = useState(18);

  const [aanschafprijs, setAanschafprijs] = useState(25000);
  const [autoLeeftijdKoop, setAutoLeeftijdKoop] = useState(3);
  const [verzekeringType, setVerzekeringType] = useState("All-Risk");
  const [anwbStatus, setAnwbStatus] = useState("Goud");
  const [verwachteRestwaarde, setVerwachteRestwaarde] = useState(12000);
  const [handmatigeOverigeKosten, setHandmatigeOverigeKosten] = useState("");

  const [metLening, setMetLening] = useState(false);
  const [leenbedrag, setLeenbedrag] = useState(15000);
  const [rentePercentage, setRentePercentage] = useState(6.5);

  const [leaseMaandbedrag, setLeaseMaandbedrag] = useState(511);
  const [leaseKmBundel, setLeaseKmBundel] = useState(20000);
  const [prijsExtraKm, setPrijsExtraKm] = useState(0.08);
  const [leaseOnvoorzien, setLeaseOnvoorzien] = useState(15);

  const [isZzpZakelijk, setIsZzpZakelijk] = useState(false);
  const [cataloguswaarde, setCataloguswaarde] = useState(35000);
  const [bijtellingsPercentage, setBijtellingsPercentage] = useState(22);
  const [inkomstenbelastingDruk, setInkomstenbelastingDruk] = useState(37);

  const [handmatigeWegenbelasting, setHandmatigeWegenbelasting] = useState("");
  const [gewichtsklasse, setGewichtsklasse] = useState("midden");
  const [provincie, setProvincie] = useState("Gemiddeld");
  const [schadevrijeJaren, setSchadevrijeJaren] = useState(5);
  const [autoWassenEnPoetsen, setAutoWassenEnPoetsen] = useState(false);

  const [r, setR] = useState({
    koop: {
      totaal: 0,
      afschrijving: 0,
      wegenbelasting: 0,
      verzekering: 0,
      brandstof: 0,
      onderhoud: 0,
      pechhulp: 0,
      rente: 0,
    },
    lease: {
      totaal: 0,
      leaseprijs: 0,
      onvoorzien: 0,
      extraKmKosten: 0,
      bijtelling: 0,
      brandstof: 0,
    },
    verschil: 0,
    koopIsGoedkoper: true,
  });

  // --- ASYNC STORAGE: LADEN ---
  useEffect(() => {
    const laadInstellingen = async () => {
      try {
        const opgeslagenData = await AsyncStorage.getItem("autokosten_config");
        if (opgeslagenData !== null) {
          const parsed = JSON.parse(opgeslagenData);
          if (parsed.leeftijd !== undefined) setLeeftijd(parsed.leeftijd);
          if (parsed.kilometers !== undefined) setKilometers(parsed.kilometers);
          if (parsed.brandstof !== undefined) setBrandstof(parsed.brandstof);
          if (parsed.beoogdeLooptijd !== undefined)
            setBeoogdeLooptijd(parsed.beoogdeLooptijd);
          if (parsed.prijsBenzine !== undefined)
            setPrijsBenzine(parsed.prijsBenzine);
          if (parsed.verbruikBenzine !== undefined)
            setVerbruikBenzine(parsed.verbruikBenzine);
          if (parsed.prijsDiesel !== undefined)
            setPrijsDiesel(parsed.prijsDiesel);
          if (parsed.verbruikDiesel !== undefined)
            setVerbruikDiesel(parsed.verbruikDiesel);
          if (parsed.prijsStroom !== undefined)
            setPrijsStroom(parsed.prijsStroom);
          if (parsed.verbruikStroom !== undefined)
            setVerbruikStroom(parsed.verbruikStroom);
          if (parsed.aanschafprijs !== undefined)
            setAanschafprijs(parsed.aanschafprijs);
          if (parsed.autoLeeftijdKoop !== undefined)
            setAutoLeeftijdKoop(parsed.autoLeeftijdKoop);
          if (parsed.verzekeringType !== undefined)
            setVerzekeringType(parsed.verzekeringType);
          if (parsed.anwbStatus !== undefined) setAnwbStatus(parsed.anwbStatus);
          if (parsed.verwachteRestwaarde !== undefined)
            setVerwachteRestwaarde(parsed.verwachteRestwaarde);
          if (parsed.handmatigeOverigeKosten !== undefined)
            setHandmatigeOverigeKosten(parsed.handmatigeOverigeKosten);
          if (parsed.metLening !== undefined) setMetLening(parsed.metLening);
          if (parsed.leenbedrag !== undefined) setLeenbedrag(parsed.leenbedrag);
          if (parsed.rentePercentage !== undefined)
            setRentePercentage(parsed.rentePercentage);
          if (parsed.leaseMaandbedrag !== undefined)
            setLeaseMaandbedrag(parsed.leaseMaandbedrag);
          if (parsed.leaseKmBundel !== undefined)
            setLeaseKmBundel(parsed.leaseKmBundel);
          if (parsed.prijsExtraKm !== undefined)
            setPrijsExtraKm(parsed.prijsExtraKm);
          if (parsed.leaseOnvoorzien !== undefined)
            setLeaseOnvoorzien(parsed.leaseOnvoorzien);
          if (parsed.isZzpZakelijk !== undefined)
            setIsZzpZakelijk(parsed.isZzpZakelijk);
          if (parsed.cataloguswaarde !== undefined)
            setCataloguswaarde(parsed.cataloguswaarde);
          if (parsed.bijtellingsPercentage !== undefined)
            setBijtellingsPercentage(parsed.bijtellingsPercentage);
          if (parsed.inkomstenbelastingDruk !== undefined)
            setInkomstenbelastingDruk(parsed.inkomstenbelastingDruk);
          if (parsed.handmatigeWegenbelasting !== undefined)
            setHandmatigeWegenbelasting(parsed.handmatigeWegenbelasting);
          if (parsed.gewichtsklasse !== undefined)
            setGewichtsklasse(parsed.gewichtsklasse);
          if (parsed.provincie !== undefined) setProvincie(parsed.provincie);
          if (parsed.schadevrijeJaren !== undefined)
            setSchadevrijeJaren(parsed.schadevrijeJaren);
          if (parsed.autoWassenEnPoetsen !== undefined)
            setAutoWassenEnPoetsen(parsed.autoWassenEnPoetsen);
        }
      } catch (e) {
        console.error("Fout bij het laden van de gegevens", e);
      }
    };
    laadInstellingen();
  }, []);

  // --- LIVE BEREKENING & AUTOSAVE ---
  useEffect(() => {
    const result = berekenAutokosten({
      kilometers,
      brandstof,
      leeftijd,
      beoogdeLooptijd,
      verbruikBenzine,
      prijsBenzine,
      verbruikDiesel,
      prijsDiesel,
      verbruikStroom,
      prijsStroom,
      aanschafprijs,
      verwachteRestwaarde,
      autoLeeftijdKoop,
      verzekeringType,
      anwbStatus,
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
      handmatigeWegenbelasting,
      gewichtsklasse,
      provincie,
      schadevrijeJaren,
      autoWassenEnPoetsen,
      handmatigeOverigeKosten,
    });
    setR(result);

    const slaInstellingenOp = async () => {
      try {
        const config = {
          leeftijd,
          kilometers,
          brandstof,
          beoogdeLooptijd,
          prijsBenzine,
          verbruikBenzine,
          prijsDiesel,
          verbruikDiesel,
          prijsStroom,
          verbruikStroom,
          aanschafprijs,
          autoLeeftijdKoop,
          verzekeringType,
          anwbStatus,
          verwachteRestwaarde,
          handmatigeOverigeKosten,
          metLening,
          leenbedrag,
          rentePercentage,
          leaseMaandbedrag,
          leaseKmBundel,
          prijsExtraKm,
          leaseOnvoorzien,
          isZzpZakelijk,
          cataloguswaarde,
          bijtellingsPercentage,
          inkomstenbelastingDruk,
          handmatigeWegenbelasting,
          gewichtsklasse,
          provincie,
          schadevrijeJaren,
          autoWassenEnPoetsen,
        };
        await AsyncStorage.setItem("autokosten_config", JSON.stringify(config));
      } catch (e) {
        console.error("Fout bij het automatisch opslaan", e);
      }
    };
    slaInstellingenOp();
  }, [
    leeftijd,
    kilometers,
    brandstof,
    beoogdeLooptijd,
    prijsBenzine,
    verbruikBenzine,
    prijsDiesel,
    verbruikDiesel,
    prijsStroom,
    verbruikStroom,
    aanschafprijs,
    autoLeeftijdKoop,
    verzekeringType,
    anwbStatus,
    verwachteRestwaarde,
    handmatigeOverigeKosten,
    metLening,
    leenbedrag,
    rentePercentage,
    leaseMaandbedrag,
    leaseKmBundel,
    prijsExtraKm,
    leaseOnvoorzien,
    isZzpZakelijk,
    cataloguswaarde,
    bijtellingsPercentage,
    inkomstenbelastingDruk,
    handmatigeWegenbelasting,
    gewichtsklasse,
    provincie,
    schadevrijeJaren,
    autoWassenEnPoetsen,
  ]);

  const getKnoppenStijl = (optie) => {
    if (brandstof !== optie) return styles.optionButton;
    if (optie === "Benzine") return [styles.optionButton, styles.btnBenzine];
    if (optie === "Diesel") return [styles.optionButton, styles.btnDiesel];
    if (optie === "Elektrisch")
      return [styles.optionButton, styles.btnElektrisch];
    return styles.optionButton;
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCard r={r} actieveTab={actieveTab} setActieveTab={setActieveTab} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {actieveTab === "cockpit" && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.gecentreerdeSubHeader}>
              Verschuif de sliders en zie de resultaten live veranderen.
            </Text>

            <LiveComparisonCard
              r={r}
              metLening={metLening}
              isZzpZakelijk={isZzpZakelijk}
            />

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
              brandstofPrijs={
                brandstof === "Benzine"
                  ? prijsBenzine
                  : brandstof === "Diesel"
                    ? prijsDiesel
                    : prijsStroom
              }
              setBrandstofPrijs={
                brandstof === "Benzine"
                  ? setPrijsBenzine
                  : brandstof === "Diesel"
                    ? setPrijsDiesel
                    : setPrijsStroom
              }
            />

            <DetailsKoopCard
              r={r}
              aanschafprijs={aanschafprijs}
              setAanschafprijs={setAanschafprijs}
              verwachteRestwaarde={verwachteRestwaarde}
              setVerwachteRestwaarde={setVerwachteRestwaarde}
              autoLeeftijdKoop={autoLeeftijdKoop}
              setAutoLeeftijdKoop={setAutoLeeftijdKoop}
              verzekeringType={verzekeringType}
              setVerzekeringType={setVerzekeringType}
              anwbStatus={anwbStatus}
              setAnwbStatus={setAnwbStatus}
              metLening={metLening}
              setMetLening={setMetLening}
              leenbedrag={leenbedrag}
              setLeenbedrag={setLeenbedrag}
              rentePercentage={rentePercentage}
              setRentePercentage={setRentePercentage}
              handmatigeWegenbelasting={handmatigeWegenbelasting}
              setHandmatigeWegenbelasting={setHandmatigeWegenbelasting}
              gewichtsklasse={gewichtsklasse}
              setGewichtsklasse={setGewichtsklasse}
              provincie={provincie}
              setProvincie={setProvincie}
              schadevrijeJaren={schadevrijeJaren}
              setSchadevrijeJaren={setSchadevrijeJaren}
              autoWassenEnPoetsen={autoWassenEnPoetsen}
              setAutoWassenEnPoetsen={setAutoWassenEnPoetsen}
              handmatigeOverigeKosten={handmatigeOverigeKosten}
              setHandmatigeOverigeKosten={setHandmatigeOverigeKosten}
              beoogdeLooptijd={beoogdeLooptijd}
              kilometers={kilometers}
            />

            <DetailsLeaseCard
              r={r}
              leaseBedrag={leaseMaandbedrag}
              setLeaseBedrag={setLeaseMaandbedrag}
              leaseLooptijd={beoogdeLooptijd * 12}
              setLeaseLooptijd={() => {}}
            />
          </ScrollView>
        )}

        {actieveTab === "info" && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.header}>📚 Info & Disclaimers</Text>
            <Text style={styles.subHeader}>
              Belangrijke achtergrondinformatie en verborgen kosten.
            </Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                ℹ️ Hoe werkt de vergelijking?
              </Text>
              <Text style={styles.breakdownText}>
                Deze app zet de reële, integrale maandkosten van een{" "}
                <Text style={{ fontWeight: "700" }}>Koopauto</Text> af tegen een{" "}
                <Text style={{ fontWeight: "700" }}>Private Leasecontract</Text>
                .
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                📉 De verborgen kosten van Koop
              </Text>
              <Text style={styles.breakdownText}>
                • <Text style={{ fontWeight: "700" }}>Afschrijving:</Text> Dit
                is veruit je grootste maandelijkse kostenpost, ook al merk je er
                niks van tot je de auto verkoopt.{"\n"}•{" "}
                <Text style={{ fontWeight: "700" }}>Opportunity Costs:</Text>{" "}
                Als je €25.000 cash in een auto steekt, kun je dit geld niet
                ergens anders laten renderen of op een spaarrekening zetten.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                📄 Waar moet je op letten bij Lease?
              </Text>
              <Text style={styles.breakdownText}>
                • <Text style={{ fontWeight: "700" }}>BKR-Registratie:</Text>{" "}
                Een private leasecontract wordt geregistreerd bij het BKR. Dit
                kan je maximale hypotheek aanzienlijk verlagen.{"\n"}•{" "}
                <Text style={{ fontWeight: "700" }}>
                  Vroegtijdige opzegging:
                </Text>{" "}
                Het afbreken van een leasecontract voor het einde van de
                looptijd kan gepaard gaan met zeer hoge boetes.
              </Text>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f5" },
  scrollContainer: { padding: 16, paddingTop: 155, paddingBottom: 40 },
  header: {
    fontSize: 22,
    fontWeight: "800",
    color: "#18181b",
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    color: "#71717a",
    marginBottom: 14,
    fontWeight: "500",
  },
  gecentreerdeSubHeader: {
    fontSize: 13,
    color: "#71717a",
    textAlign: "center",
    marginTop: -4,
    marginBottom: 14,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
    marginBottom: 12,
  },
  breakdownText: { fontSize: 12, color: "#3f3f46", lineHeight: 18 },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#f4f4f5",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  btnBenzine: { backgroundColor: "#fef3c7", borderColor: "#f59e0b" },
  btnDiesel: { backgroundColor: "#f1f5f9", borderColor: "#64748b" },
  btnElektrisch: { backgroundColor: "#d1fae5", borderColor: "#10b981" },
});
