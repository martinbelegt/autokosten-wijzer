import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // --- PAGINERING STATE ---
  const [actieveTab, setActieveTab] = useState("cockpit");

  // --- ALGEMENE INPUTS ---
  const [leeftijd, setLeeftijd] = useState(40);
  const [kilometers, setKilometers] = useState(20000);
  const [brandstof, setBrandstof] = useState("Benzine");
  const [beoogdeLooptijd, setBeoogdeLooptijd] = useState(4);

  // --- BRANDSTOF INSTELLINGEN ---
  const [prijsBenzine, setPrijsBenzine] = useState(1.95);
  const [verbruikBenzine, setVerbruikBenzine] = useState(16);
  const [prijsDiesel, setPrijsDiesel] = useState(1.65);
  const [verbruikDiesel, setVerbruikDiesel] = useState(19);
  const [prijsStroom, setPrijsStroom] = useState(0.35);
  const [verbruikStroom, setVerbruikStroom] = useState(18);

  // --- KOOP AUTO INSTELLINGEN ---
  const [aanschafprijs, setAanschafprijs] = useState(25000);
  const [autoLeeftijdKoop, setAutoLeeftijdKoop] = useState(3);
  const [verzekeringType, setVerzekeringType] = useState("All-Risk");
  const [anwbStatus, setAnwbStatus] = useState("Goud");
  const [verwachteRestwaarde, setVerwachteRestwaarde] = useState(12000);

  // Financiering lening
  const [metLening, setMetLening] = useState(false);
  const [leenbedrag, setLeenbedrag] = useState(15000);
  const [rentePercentage, setRentePercentage] = useState(6.5);

  // --- PRIVATE LEASE INSTELLINGEN ---
  const [leaseMaandbedrag, setLeaseMaandbedrag] = useState(511);
  const [leaseKmBundel, setLeaseKmBundel] = useState(20000);
  const [prijsExtraKm, setPrijsExtraKm] = useState(0.08);
  const [leaseOnvoorzien, setLeaseOnvoorzien] = useState(15);

  // ZZP / Fiscale bijtelling opties
  const [isZzpZakelijk, setIsZzpZakelijk] = useState(false);
  const [cataloguswaarde, setCataloguswaarde] = useState(35000);
  const [bijtellingsPercentage, setBijtellingsPercentage] = useState(22);
  const [inkomstenbelastingDruk, setInkomstenbelastingDruk] = useState(37);

  // --- AUTOSAVE LOGICA ---
  // Data inladen bij opstarten
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
        }
      } catch (e) {
        console.error("Fout bij het laden van de gegevens", e);
      }
    };
    laadInstellingen();
  }, []);

  // Data opslaan wanneer er iets verandert
  useEffect(() => {
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
  ]);

  // --- BEREKENINGSFUNCTIE ---
  const berekenAlles = () => {
    const kmJaar = kilometers;
    const kmMaand = kmJaar / 12;
    const leeftBestuurder = leeftijd;
    const jaren = beoogdeLooptijd;
    const maanden = jaren * 12;

    let brandstofKostenPerMaand = 0;
    if (kmMaand > 0) {
      if (brandstof === "Benzine") {
        brandstofKostenPerMaand = (kmMaand / verbruikBenzine) * prijsBenzine;
      } else if (brandstof === "Diesel") {
        brandstofKostenPerMaand = (kmMaand / verbruikDiesel) * prijsDiesel;
      } else if (brandstof === "Elektrisch") {
        brandstofKostenPerMaand =
          (kmMaand / 100) * verbruikStroom * prijsStroom;
      }
    }

    let wegenbelasting = 0;
    if (brandstof === "Benzine") wegenbelasting = 50;
    if (brandstof === "Diesel") wegenbelasting = 115;
    if (brandstof === "Elektrisch") wegenbelasting = 25;

    const totaleAfschrijving = aanschafprijs - verwachteRestwaarde;
    const afschrijvingPerMaand =
      totaleAfschrijving > 0 ? totaleAfschrijving / maanden : 0;

    let basisOnderhoud =
      autoLeeftijdKoop === 0 ? 25 : autoLeeftijdKoop < 6 ? 60 : 95;
    if (kmJaar > 25000) basisOnderhoud += 25;
    if (anwbStatus === "Goud" || anwbStatus === "Platina") basisOnderhoud -= 3;
    const onderhoudPerMaand = basisOnderhoud;

    let basisVerzekeringTarief = 65;
    if (verzekeringType === "WA") basisVerzekeringTarief = 35;
    if (verzekeringType === "WA+") basisVerzekeringTarief = 48;
    if (leeftBestuurder > 0 && leeftBestuurder < 25) {
      basisVerzekeringTarief =
        verzekeringType === "All-Risk"
          ? 145
          : verzekeringType === "WA+"
            ? 95
            : 70;
    } else if (leeftBestuurder >= 65) {
      basisVerzekeringTarief += 10;
    }
    const verzekeringKoop = basisVerzekeringTarief;

    let pechhulpKosten = 12;
    if (anwbStatus === "Brons") pechhulpKosten = 10;
    if (anwbStatus === "Zilver") pechhulpKosten = 9;
    if (anwbStatus === "Goud") pechhulpKosten = 8;
    if (anwbStatus === "Platina") pechhulpKosten = 6;

    let maandelijkseRente = 0;
    if (metLening) {
      maandelijkseRente = (leenbedrag * (rentePercentage / 100)) / 12;
    }

    const totaalKoop =
      wegenbelasting +
      verzekeringKoop +
      afschrijvingPerMaand +
      onderhoudPerMaand +
      brandstofKostenPerMaand +
      pechhulpKosten +
      maandelijkseRente;
    const extraKmKostenPerMaand =
      kmJaar > leaseKmBundel
        ? ((kmJaar - leaseKmBundel) * prijsExtraKm) / 12
        : 0;

    let nettoBijtellingPerMaand = 0;
    if (isZzpZakelijk) {
      const brutoBijtellingPerJaar =
        cataloguswaarde * (bijtellingsPercentage / 100);
      nettoBijtellingPerMaand =
        (brutoBijtellingPerJaar * (inkomstenbelastingDruk / 100)) / 12;
    }

    const totaalLease =
      leaseMaandbedrag +
      brandstofKostenPerMaand +
      leaseOnvoorzien +
      extraKmKostenPerMaand +
      nettoBijtellingPerMaand;

    return {
      koop: {
        totaal: Math.round(totaalKoop),
        afschrijving: Math.round(afschrijvingPerMaand),
        verzekering: verzekeringKoop,
        wegenbelasting,
        onderhoud: onderhoudPerMaand,
        pechhulp: pechhulpKosten,
        rente: Math.round(maandelijkseRente),
        brandstof: Math.round(brandstofKostenPerMaand),
      },
      lease: {
        totaal: Math.round(totaalLease),
        leaseprijs: Math.round(leaseMaandbedrag),
        onvoorzien: Math.round(leaseOnvoorzien),
        extraKmKosten: Math.round(extraKmKostenPerMaand),
        bijtelling: Math.round(nettoBijtellingPerMaand),
        brandstof: Math.round(brandstofKostenPerMaand),
      },
      verschil: Math.abs(Math.round(totaalKoop) - Math.round(totaalLease)),
      koopIsGoedkoper: totaalKoop < totaalLease,
    };
  };

  const r = berekenAlles();

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* STICKY HEADER COCKPIT BANNER */}
        <View style={styles.stickyResultCard}>
          <View style={styles.stickyRow}>
            <View style={styles.stickyColumn}>
              <Text style={styles.stickyTitle}>🛒 MAANDLASTEN KOOP</Text>
              <Text style={[styles.stickyAmount, { color: "#b45309" }]}>
                €{r.koop.totaal}
              </Text>
            </View>
            <View style={styles.stickyDivider} />
            <View style={styles.stickyColumn}>
              <Text style={styles.stickyTitle}>📄 MAANDLASTEN LEASE</Text>
              <Text style={[styles.stickyAmount, { color: "#1d4ed8" }]}>
                €{r.lease.totaal}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.conclusieBanner,
              r.koopIsGoedkoper ? styles.conclusieKoop : styles.conclusieLease,
            ]}
          >
            <Text
              style={[
                styles.conclusieText,
                r.koopIsGoedkoper ? { color: "#92400e" } : { color: "#1e40af" },
              ]}
            >
              💡{" "}
              <Text style={{ fontWeight: "bold" }}>
                {r.koopIsGoedkoper ? "Koop" : "Lease"}
              </Text>{" "}
              is{" "}
              <Text style={{ fontWeight: "800" }}>
                €{r.verschil} p/m goedkoper
              </Text>
              .
            </Text>
          </View>

          {/* NAVBAR */}
          <View style={styles.navBar}>
            <TouchableOpacity
              style={[
                styles.navButton,
                actieveTab === "cockpit" && styles.navButtonActief,
              ]}
              onPress={() => setActieveTab("cockpit")}
            >
              <Text
                style={[
                  styles.navButtonText,
                  actieveTab === "cockpit" && styles.navButtonTextActief,
                ]}
              >
                🎮 Cockpit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                actieveTab === "info" && styles.navButtonActief,
              ]}
              onPress={() => setActieveTab("info")}
            >
              <Text
                style={[
                  styles.navButtonText,
                  actieveTab === "info" && styles.navButtonTextActief,
                ]}
              >
                📚 Info & Disclaimers
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PAGINA 1: COCKPIT */}
        {actieveTab === "cockpit" && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.header}>🎮 Autokosten Cockpit</Text>
            <Text style={styles.subHeader}>
              Verschuif de sliders en zie de resultaten live veranderen.
            </Text>

            {/* KOSTEN SPECIFICATIE */}
            <View style={[styles.card, styles.specificationCard]}>
              <Text style={styles.cardTitle}>
                📊 Live Vergelijking per maand
              </Text>
              <View style={styles.rowComparison}>
                <View style={styles.column}>
                  <Text style={[styles.specColumnTitle, { color: "#b45309" }]}>
                    Koopauto details
                  </Text>
                  <Text style={styles.breakdownText}>
                    📉 Afschrijving:{" "}
                    <Text style={styles.boldText}>€{r.koop.afschrijving}</Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    ⛽ Brandstof:{" "}
                    <Text style={styles.boldText}>€{r.koop.brandstof}</Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    🛡️ Verzekering:{" "}
                    <Text style={styles.boldText}>€{r.koop.verzekering}</Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    🛣️ Wegenbelasting:{" "}
                    <Text style={styles.boldText}>
                      €{r.koop.wegenbelasting}
                    </Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    🔧 Onderhoud/APK:{" "}
                    <Text style={styles.boldText}>€{r.koop.onderhoud}</Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    💛 Pechhulp:{" "}
                    <Text style={styles.boldText}>€{r.koop.pechhulp}</Text>
                  </Text>
                  {metLening && (
                    <Text style={styles.breakdownText}>
                      💸 Rentelasten:{" "}
                      <Text style={[styles.boldText, { color: "#dc2626" }]}>
                        €{r.koop.rente}
                      </Text>
                    </Text>
                  )}
                </View>
                <View style={styles.columnDivider} />
                <View style={styles.column}>
                  <Text style={[styles.specColumnTitle, { color: "#1d4ed8" }]}>
                    Leaseauto details
                  </Text>
                  <Text style={styles.breakdownText}>
                    📦 Leaseprijs:{" "}
                    <Text style={styles.boldText}>€{r.lease.leaseprijs}</Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    ⚡ Brandstof:{" "}
                    <Text style={styles.boldText}>€{r.lease.brandstof}</Text>
                  </Text>
                  <Text style={styles.breakdownText}>
                    ⚠️ Onvoorzien:{" "}
                    <Text style={styles.boldText}>€{r.lease.onvoorzien}</Text>
                  </Text>
                  {r.lease.extraKmKosten > 0 && (
                    <Text style={styles.breakdownText}>
                      🛣️ Km-te-veel:{" "}
                      <Text style={[styles.boldText, { color: "#dc2626" }]}>
                        €{r.lease.extraKmKosten}
                      </Text>
                    </Text>
                  )}
                  {isZzpZakelijk && (
                    <Text style={styles.breakdownText}>
                      💼 Netto Bijtelling:{" "}
                      <Text style={[styles.boldText, { color: "#dc2626" }]}>
                        €{r.lease.bijtelling}
                      </Text>
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* ALGEMENE GEGEVENS */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📋 Algemene Basisgegevens</Text>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Jaarkilometrage:{" "}
                  <Text style={styles.sliderValueText}>
                    {kilometers.toLocaleString("nl-NL")} km
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={5000}
                  maximumValue={50000}
                  step={500}
                  value={kilometers}
                  onValueChange={setKilometers}
                  minimumTrackTintColor="#10b981"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#10b981"
                />
              </View>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Beoogde Looptijd:{" "}
                  <Text style={styles.sliderValueText}>
                    {beoogdeLooptijd} jaar
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={6}
                  step={1}
                  value={beoogdeLooptijd}
                  onValueChange={setBeoogdeLooptijd}
                  minimumTrackTintColor="#10b981"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#10b981"
                />
              </View>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Leeftijd bestuurder:{" "}
                  <Text style={styles.sliderValueText}>{leeftijd} jaar</Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={18}
                  maximumValue={85}
                  step={1}
                  value={leeftijd}
                  onValueChange={setLeeftijd}
                  minimumTrackTintColor="#10b981"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#10b981"
                />
              </View>
              <Text style={[styles.subLabel, { marginTop: 4 }]}>
                Type brandstof
              </Text>
              <View style={styles.buttonGroup}>
                {["Benzine", "Diesel", "Elektrisch"].map((optie) => (
                  <TouchableOpacity
                    key={optie}
                    style={getKnoppenStijl(optie)}
                    onPress={() => setBrandstof(optie)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        brandstof === optie && styles.optionTextSelected,
                      ]}
                    >
                      {optie}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* BRANDSTOF CONFIGURATIE */}
            <View style={styles.card}>
              <Text style={styles.miniCardTitle}>
                ⚙️ Brandstof & Energieprijs afstemmen
              </Text>
              {brandstof === "Benzine" && (
                <View style={styles.sliderBlock}>
                  <Text style={styles.subLabel}>
                    Benzineprijs per liter:{" "}
                    <Text style={styles.sliderValueText}>
                      €{prijsBenzine.toFixed(2)}
                    </Text>
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1.5}
                    maximumValue={2.5}
                    step={0.01}
                    value={prijsBenzine}
                    onValueChange={setPrijsBenzine}
                    minimumTrackTintColor="#f59e0b"
                    maximumTrackTintColor="#e4e4e7"
                    thumbTintColor="#f59e0b"
                  />
                </View>
              )}
              {brandstof === "Diesel" && (
                <View style={styles.sliderBlock}>
                  <Text style={styles.subLabel}>
                    Dieselprijs per liter:{" "}
                    <Text style={styles.sliderValueText}>
                      €{prijsDiesel.toFixed(2)}
                    </Text>
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1.3}
                    maximumValue={2.2}
                    step={0.01}
                    value={prijsDiesel}
                    onValueChange={setPrijsDiesel}
                    minimumTrackTintColor="#64748b"
                    maximumTrackTintColor="#e4e4e7"
                    thumbTintColor="#64748b"
                  />
                </View>
              )}
              {brandstof === "Elektrisch" && (
                <View style={styles.sliderBlock}>
                  <Text style={styles.subLabel}>
                    Stroomprijs per kWh:{" "}
                    <Text style={styles.sliderValueText}>
                      €{prijsStroom.toFixed(2)}
                    </Text>
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0.2}
                    maximumValue={0.7}
                    step={0.01}
                    value={prijsStroom}
                    onValueChange={setPrijsStroom}
                    minimumTrackTintColor="#10b981"
                    maximumTrackTintColor="#e4e4e7"
                    thumbTintColor="#10b981"
                  />
                </View>
              )}
            </View>

            {/* DETAILS KOOP */}
            <View style={[styles.card, styles.koopCard]}>
              <Text style={[styles.cardTitle, { color: "#b45309" }]}>
                💰 Kopen (Eigen auto parameters)
              </Text>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Aanschafprijs:{" "}
                  <Text style={[styles.sliderValueText, { color: "#b45309" }]}>
                    €{aanschafprijs.toLocaleString("nl-NL")}
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={5000}
                  maximumValue={80000}
                  step={500}
                  value={aanschafprijs}
                  onValueChange={setAanschafprijs}
                  minimumTrackTintColor="#f59e0b"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#f59e0b"
                />
              </View>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Verwachte Restwaarde:{" "}
                  <Text style={[styles.sliderValueText, { color: "#b45309" }]}>
                    €{verwachteRestwaarde.toLocaleString("nl-NL")}
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={40000}
                  step={250}
                  value={verwachteRestwaarde}
                  onValueChange={setVerwachteRestwaarde}
                  minimumTrackTintColor="#f59e0b"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#f59e0b"
                />
              </View>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Huidige leeftijd auto:{" "}
                  <Text style={[styles.sliderValueText, { color: "#b45309" }]}>
                    {autoLeeftijdKoop} jaar oud
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={15}
                  step={1}
                  value={autoLeeftijdKoop}
                  onValueChange={setAutoLeeftijdKoop}
                  minimumTrackTintColor="#f59e0b"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#f59e0b"
                />
              </View>

              <Text style={[styles.subLabel, { marginTop: 4 }]}>
                Type Verzekering
              </Text>
              <View style={styles.insuranceGroup}>
                {["WA", "WA+", "All-Risk"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.insuranceButton,
                      verzekeringType === type &&
                        styles.insuranceButtonSelected,
                    ]}
                    onPress={() => setVerzekeringType(type)}
                  >
                    <Text
                      style={[
                        styles.insuranceText,
                        verzekeringType === type &&
                          styles.insuranceTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.subLabel, { marginTop: 8 }]}>
                ANWB Ledenstatus
              </Text>
              <View style={styles.anwbGroup}>
                {["Geen", "Brons", "Zilver", "Goud", "Platina"].map(
                  (status) => (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.anwbButton,
                        anwbStatus === status && styles.anwbStatusSelected,
                      ]}
                      onPress={() => setAnwbStatus(status)}
                    >
                      <Text
                        style={[
                          styles.anwbText,
                          anwbStatus === status && styles.anwbTextSelected,
                        ]}
                      >
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>

              <View style={styles.divider} />
              <View
                style={[
                  styles.row,
                  { alignItems: "center", marginVertical: 4 },
                ]}
              >
                <Text style={[styles.subLabel, { marginBottom: 0 }]}>
                  Auto aankopen met lening?
                </Text>
                <Switch
                  value={metLening}
                  onValueChange={setMetLening}
                  trackColor={{ false: "#71717a", true: "#f59e0b" }}
                />
              </View>
              {metLening && (
                <View style={styles.sliderBlock}>
                  <Text style={styles.subLabel}>
                    Leenbedrag:{" "}
                    <Text
                      style={[styles.sliderValueText, { color: "#b45309" }]}
                    >
                      €{leenbedrag.toLocaleString("nl-NL")}
                    </Text>
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1000}
                    maximumValue={50000}
                    step={500}
                    value={leenbedrag}
                    onValueChange={setLeenbedrag}
                    minimumTrackTintColor="#f59e0b"
                    maximumTrackTintColor="#e4e4e7"
                    thumbTintColor="#f59e0b"
                  />
                </View>
              )}
            </View>

            {/* DETAILS LEASE */}
            <View style={[styles.card, styles.leaseCard]}>
              <Text style={[styles.cardTitle, { color: "#1d4ed8" }]}>
                📄 Private Lease (Termijn & Bundels)
              </Text>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Leaseprijs per maand:{" "}
                  <Text style={[styles.sliderValueText, { color: "#1d4ed8" }]}>
                    €{leaseMaandbedrag}
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={200}
                  maximumValue={1200}
                  step={5}
                  value={leaseMaandbedrag}
                  onValueChange={setLeaseMaandbedrag}
                  minimumTrackTintColor="#3b82f6"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#3b82f6"
                />
              </View>
              <View style={styles.sliderBlock}>
                <Text style={styles.subLabel}>
                  Leasebundel jaarkilometers:{" "}
                  <Text style={[styles.sliderValueText, { color: "#1d4ed8" }]}>
                    {leaseKmBundel.toLocaleString("nl-NL")} km
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={5000}
                  maximumValue={40000}
                  step={2500}
                  value={leaseKmBundel}
                  onValueChange={setLeaseKmBundel}
                  minimumTrackTintColor="#3b82f6"
                  maximumTrackTintColor="#e4e4e7"
                  thumbTintColor="#3b82f6"
                />
              </View>

              <View style={styles.divider} />
              <View
                style={[
                  styles.row,
                  { alignItems: "center", marginVertical: 4 },
                ]}
              >
                <Text style={[styles.subLabel, { marginBottom: 0 }]}>
                  Boek je dit contract zakelijk als ZZP'er?
                </Text>
                <Switch
                  value={isZzpZakelijk}
                  onValueChange={setIsZzpZakelijk}
                  trackColor={{ false: "#71717a", true: "#3b82f6" }}
                />
              </View>
              {isZzpZakelijk && (
                <View style={styles.sliderBlock}>
                  <Text style={styles.subLabel}>
                    Fiscale Cataloguswaarde:{" "}
                    <Text
                      style={[styles.sliderValueText, { color: "#1d4ed8" }]}
                    >
                      €{cataloguswaarde.toLocaleString("nl-NL")}
                    </Text>
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={10000}
                    maximumValue={90000}
                    step={1000}
                    value={cataloguswaarde}
                    onValueChange={setCataloguswaarde}
                    minimumTrackTintColor="#3b82f6"
                    maximumTrackTintColor="#e4e4e7"
                    thumbTintColor="#3b82f6"
                  />
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {/* PAGINA 2: INFO & DISCLAIMERS */}
        {actieveTab === "info" && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.header}>
              📚 Belangrijke Disclaimers & Nuance
            </Text>
            <Text style={styles.subHeader}>
              Een leaseberekening vertelt nooit het héle verhaal. Let op de
              volgende risico's:
            </Text>

            {/* DISCLAIMER BANNER */}
            <View style={[styles.card, styles.infoDisclaimerCard]}>
              <Text style={styles.infoDisclaimerTitle}>
                ⚠️ Schijn bedriegt soms per maand
              </Text>
              <Text style={styles.infoDisclaimerText}>
                Lease lijkt op papier vaak een flink stuk duurder per maand,
                maar{" "}
                <Text style={{ fontWeight: "bold" }}>
                  kopen kan over een periode van 5 jaar ongemerkt flink duurder
                  uitvallen
                </Text>
                . Bij koop draag je zélf de volledige last van de werkelijke
                afschrijving, onverwacht groot onderhoud en marktrisico's.
              </Text>

              <Text
                style={[
                  styles.infoDisclaimerText,
                  { marginTop: 6, fontWeight: "bold" },
                ]}
              >
                Andersom geldt ook:
              </Text>
              <Text style={styles.infoDisclaimerText}>
                Lease kan juist een financiële valkuil worden als je onverwacht
                veel meer kilometers gaat rijden (dure meerkilometers) of als je
                het contract vroegtijdig wilt beëindigen. Dat laatste kost je
                vaak een forse afkoopboete.
              </Text>
            </View>

            {/* TABEL: VOOR- EN NADELEN */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                ⚖️ Directe vergelijking: Voor- en Nadelen
              </Text>

              <View style={styles.tableHeaderRow}>
                <View style={[styles.tableCellHeader, { flex: 1 }]}>
                  <Text style={styles.tableHeaderText}>Optie</Text>
                </View>
                <View
                  style={[
                    styles.tableCellHeader,
                    { flex: 2, borderLeftWidth: 1, borderColor: "#e4e4e7" },
                  ]}
                >
                  <Text style={styles.tableHeaderText}>🟢 Voordelen</Text>
                </View>
                <View
                  style={[
                    styles.tableCellHeader,
                    { flex: 2, borderLeftWidth: 1, borderColor: "#e4e4e7" },
                  ]}
                >
                  <Text style={styles.tableHeaderText}>🔴 Nadelen</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableCell,
                    { flex: 1, backgroundColor: "#fffbeb" },
                  ]}
                >
                  <Text
                    style={[styles.tableCellBoldText, { color: "#b45309" }]}
                  >
                    Kopen
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableCell,
                    { flex: 2, borderLeftWidth: 1, borderColor: "#e4e4e7" },
                  ]}
                >
                  <Text style={styles.tableBullet}>• Auto is je eigendom</Text>
                  <Text style={styles.tableBullet}>
                    • Geen kilometerbeperking
                  </Text>
                  <Text style={styles.tableBullet}>• Geen BKR-registratie</Text>
                  <Text style={styles.tableBullet}>
                    • Flexibel verkopen wanneer jij wilt
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableCell,
                    { flex: 2, borderLeftWidth: 1, borderColor: "#e4e4e7" },
                  ]}
                >
                  <Text style={styles.tableBullet}>
                    • Risico op dure reparaties
                  </Text>
                  <Text style={styles.tableBullet}>• Onzekere restwaarde</Text>
                  <Text style={styles.tableBullet}>
                    • Groot kapitaal zit vast in de auto
                  </Text>
                </View>
              </View>

              <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                <View
                  style={[
                    styles.tableCell,
                    { flex: 1, backgroundColor: "#eff6ff" },
                  ]}
                >
                  <Text
                    style={[styles.tableCellBoldText, { color: "#1d4ed8" }]}
                  >
                    Lease
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableCell,
                    { flex: 2, borderLeftWidth: 1, borderColor: "#e4e4e7" },
                  ]}
                >
                  <Text style={styles.tableBullet}>
                    • Vast maandbedrag (geen verrassingen)
                  </Text>
                  <Text style={styles.tableBullet}>
                    • Onderhoud en verzekering inclusief
                  </Text>
                  <Text style={styles.tableBullet}>
                    • Geen grote spaarpot nodig
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableCell,
                    { flex: 2, borderLeftWidth: 1, borderColor: "#e4e4e7" },
                  ]}
                >
                  <Text style={styles.tableBullet}>
                    • Forse BKR-impact op je hypotheek
                  </Text>
                  <Text style={styles.tableBullet}>
                    • Tussentijds opzeggen is erg duur
                  </Text>
                  <Text style={styles.tableBullet}>
                    • Duur bij overschrijden km-bundel
                  </Text>
                </View>
              </View>
            </View>

            {/* BKR IMPACT */}
            <View style={[styles.card, styles.bkrCard, { marginTop: 4 }]}>
              <Text style={styles.bkrTitle}>
                🛑 De BKR Hypotheek-waarschuwing
              </Text>
              <Text style={styles.bkrText}>
                Omdat private lease als een financiële verplichting wordt
                gezien, registreert de leasemaatschappij dit bij het BKR. Dit
                kan je maximale leencapaciteit voor een hypotheek met
                tienduizenden euro's verlagen. Houd hier serieus rekening mee
                als je binnenkort een woning wilt kopen.
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
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: "#18181b",
    marginTop: 10,
    letterSpacing: -0.5,
  },
  subHeader: { fontSize: 12, color: "#71717a", marginBottom: 10 },

  stickyResultCard: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 4 },
    }),
  },
  stickyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  stickyColumn: { flex: 0.48, alignItems: "center" },
  stickyDivider: { width: 1, backgroundColor: "#e4e4e7" },
  stickyTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#71717a",
    letterSpacing: 0.3,
  },
  stickyAmount: { fontSize: 26, fontWeight: "900", letterSpacing: -0.5 },

  conclusieBanner: {
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
    alignItems: "center",
  },
  conclusieKoop: { backgroundColor: "#fef3c7" },
  conclusieLease: { backgroundColor: "#dbeafe" },
  conclusieText: { fontSize: 13, textAlign: "center" },

  navBar: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    borderRadius: 8,
    padding: 3,
    marginTop: 8,
  },
  navButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 6,
  },
  navButtonActief: {
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
      },
      android: { elevation: 1 },
    }),
  },
  navButtonText: { fontSize: 12, fontWeight: "600", color: "#71717a" },
  navButtonTextActief: { color: "#18181b", fontWeight: "700" },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  specificationCard: { paddingVertical: 12 },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#18181b",
    marginBottom: 8,
  },
  miniCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#27272a",
    marginBottom: 6,
  },

  rowComparison: { flexDirection: "row", justifyContent: "space-between" },
  column: { flex: 0.48 },
  columnDivider: { width: 1, backgroundColor: "#f4f4f5" },
  specColumnTitle: { fontSize: 12, fontWeight: "700", marginBottom: 6 },
  breakdownText: { fontSize: 11, color: "#3f3f46", marginBottom: 3 },
  boldText: { fontWeight: "700", color: "#18181b" },

  sliderBlock: { marginBottom: 10 },
  subLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3f3f46",
    marginBottom: 2,
  },
  sliderValueText: { fontWeight: "700", color: "#111827" },
  slider: { width: "100%", height: 30 },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    borderRadius: 6,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  btnBenzine: { backgroundColor: "#fef3c7", borderColor: "#f59e0b" },
  btnDiesel: { backgroundColor: "#f1f5f9", borderColor: "#64748b" },
  btnElektrisch: { backgroundColor: "#ecfdf5", borderColor: "#10b981" },
  optionText: { fontSize: 12, fontWeight: "600", color: "#71717a" },
  optionTextSelected: { color: "#18181b", fontWeight: "700" },

  koopCard: { borderLeftWidth: 4, borderLeftColor: "#f59e0b" },
  leaseCard: { borderLeftWidth: 4, borderLeftColor: "#3b82f6" },

  insuranceGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  insuranceButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    borderRadius: 6,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  insuranceButtonSelected: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
  },
  insuranceText: { fontSize: 11, fontWeight: "600", color: "#71717a" },
  insuranceTextSelected: { color: "#b45309", fontWeight: "700" },

  anwbGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  anwbButton: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#f4f4f5",
    borderRadius: 6,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  anwbStatusSelected: { backgroundColor: "#fef3c7", borderColor: "#f59e0b" },
  anwbText: { fontSize: 10, fontWeight: "600", color: "#71717a" },
  anwbTextSelected: { color: "#b45309", fontWeight: "700" },

  divider: { height: 1, backgroundColor: "#e4e4e7", marginVertical: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },

  infoDisclaimerCard: { borderLeftWidth: 4, borderLeftColor: "#f59e0b" },
  infoDisclaimerTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#b45309",
    marginBottom: 4,
  },
  infoDisclaimerText: { fontSize: 11, color: "#3f3f46", lineHeight: 16 },

  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
  },
  tableCellHeader: { padding: 6, justifyContent: "center" },
  tableHeaderText: { fontSize: 11, fontWeight: "700", color: "#27272a" },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
  },
  tableCell: { padding: 6, justifyContent: "flex-start" },
  tableCellBoldText: { fontSize: 11, fontWeight: "700" },
  tableBullet: { fontSize: 10, color: "#3f3f46", marginBottom: 2 },

  bkrCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  bkrTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#b91c1c",
    marginBottom: 4,
  },
  bkrText: { fontSize: 11, color: "#991b1b", lineHeight: 16 },
});
