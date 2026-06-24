import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";

const provinciesLijst = [
  "Gemiddeld",
  "Noord-Brabant",
  "Gelderland",
  "Zuid-Holland",
  "Noord-Holland",
  "Utrecht",
  "Overijssel",
  "Friesland",
  "Groningen",
  "Drenthe",
  "Flevoland",
  "Zeeland",
  "Limburg",
];

export default function DetailsKoopCard(props) {
  const {
    r,
    aanschafprijs,
    setAanschafprijs,
    verwachteRestwaarde,
    setVerwachteRestwaarde,
    autoLeeftijdKoop,
    setAutoLeeftijdKoop,
    verzekeringType,
    setVerzekeringType,
    beoogdeLooptijd,
    kilometers,

    // Nu correct opgevangen vanuit App.js:
    handmatigeWegenbelasting,
    setHandmatigeWegenbelasting,
    gewichtsklasse,
    setGewichtsklasse,
    provincie,
    setProvincie,
    schadevrijeJaren,
    setSchadevrijeJaren,
    autoWassenEnPoetsen,
    setAutoWassenEnPoetsen,

    // Gekoppeld aan de juiste namen uit de calculator
    handmatigeOverigeKosten,
    setHandmatigeOverigeKosten,
    kaartUitgeklapt: kaartUitgeklaptExtern,
    setKaartUitgeklapt: setKaartUitgeklaptExtern,
  } = props;

  // Staat standaard op true zodat je direct ziet dat hij werkt!
  const [interneKaartUitgeklapt, setInterneKaartUitgeklapt] = useState(true);
  const kaartUitgeklapt = kaartUitgeklaptExtern ?? interneKaartUitgeklapt;
  const setKaartUitgeklapt =
    setKaartUitgeklaptExtern ?? setInterneKaartUitgeklapt;
  const [meerOptiesOpen, setMeerOptiesOpen] = useState(false);
  const [infoModalZichtbaar, setInfoModalZichtbaar] = useState(false);
  const [modalType, setModalType] = useState("");

  const openInfoModal = (type) => {
    setModalType(type);
    setInfoModalZichtbaar(true);
  };

  const jaren = beoogdeLooptijd || 4;
  const geschatteRestwaarde = Math.max(
    0,
    aanschafprijs - aanschafprijs * (0.12 * jaren),
  );
  const getoondeRestwaardeText =
    verwachteRestwaarde > 0
      ? `Gebaseerd op jouw invoer: €${Math.round((aanschafprijs - verwachteRestwaarde) / (jaren * 12))} p/m afschrijving.`
      : `Leeg? Voorzichtige schatting: €${Math.round(geschatteRestwaarde)} restwaarde (~€${Math.round((aanschafprijs - geschatteRestwaarde) / (jaren * 12))} p/m).`;

  const kmJaar = kilometers || 20000;
  let basisSchattingOnderhoud =
    autoLeeftijdKoop === 0 ? 25 : autoLeeftijdKoop < 6 ? 60 : 95;
  if (kmJaar > 25000) basisSchattingOnderhoud += 25;

  const huidigeOverigeKosten =
    handmatigeOverigeKosten !== undefined &&
    handmatigeOverigeKosten !== null &&
    handmatigeOverigeKosten !== ""
      ? handmatigeOverigeKosten
      : basisSchattingOnderhoud;

  const getModalContent = () => {
    switch (modalType) {
      case "restwaarde":
        return {
          title: "📉 Hoe werkt de restwaarde?",
          body: `Afschrijving is vaak de grootste verborgen kostenpost van een auto. \n\n• Als je dit veld leeg laat, hanteert de app een voorzichtige standaard afschrijving van 12% per jaar over de aanschafwaarde.\n• Weet je al wat de auto ongeveer waard zal zijn na ${jaren} jaar? Vul dat bedrag dan zelf in voor een exacte berekening op maat.`,
        };
      case "onderhoud":
        return {
          title: "🔧 Wat valt onder overige kosten?",
          body: "Onderhoudskosten zijn vaak onvoorspelbaar. Deze schuifbalk dekt:\n\n• Regulier onderhoud: Kleine/grote beurten, APK en nieuwe banden.\n• Slijtage: Remmen, ruitenwissers en eventuele motorische onderdelen.\n• Cosmetisch: De autowasstraat en ruitenvloeistof.\n\nDe app maakt automatisch een schatting op basis van de autoleeftijd, maar pas de schuif gerust aan!",
        };
      case "wegenbelasting":
        return {
          title: "🛣️ Hoe wordt wegenbelasting berekend?",
          body: "Motorrijtuigenbelasting (MRB) is afhankelijk van drie hoofdcomponenten:\n\n1. Gewicht: Hoe zwaarder de auto, hoe hoger de basisbelasting.\n2. Provincie: Elke provincie heft eigen 'opcenten'. Noord-Brabant of Groningen kan dus net afwijken van het gemiddelde.\n3. Brandstof: Diesels betalen een flinke toeslag, terwijl volledig elektrische auto's momenteel nog korting krijgen.",
        };
      default:
        return { title: "", body: "" };
    }
  };

  const activeModal = getModalContent();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.headerToggle}
        onPress={() => setKaartUitgeklapt(!kaartUitgeklapt)}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>
          {kaartUitgeklapt ? "🔽 Details Koopauto" : "▶️ Toon Details Koopauto"}
        </Text>
      </TouchableOpacity>

      {kaartUitgeklapt && (
        <View style={styles.mainContentContainer}>
          {/* 1. AUTO BASISGEGEVENS */}
          <View style={styles.basisSfeerContainer}>
            <View style={styles.flexRowBetween}>
              <Text style={styles.basisSfeerTitle}>📊 Auto basisgegevens</Text>
              <TouchableOpacity
                style={styles.infoKnop}
                onPress={() => openInfoModal("restwaarde")}
              >
                <Text style={styles.infoKnopText}>i</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.compactGridRow}>
              <View style={styles.gridColumn}>
                <Text style={styles.basisLabel}>Aanschaf (€):</Text>
                <TextInput
                  style={styles.basisTextInput}
                  keyboardType="numeric"
                  value={String(aanschafprijs)}
                  onChangeText={(v) => setAanschafprijs(Number(v) || 0)}
                />
              </View>
              <View style={styles.gridColumn}>
                <Text style={styles.basisLabel}>Restwaarde (€):</Text>
                <TextInput
                  style={styles.basisTextInput}
                  placeholder="Optioneel"
                  keyboardType="numeric"
                  value={verwachteRestwaarde ? String(verwachteRestwaarde) : ""}
                  onChangeText={(v) => setVerwachteRestwaarde(Number(v) || 0)}
                />
              </View>
            </View>

            <Text style={styles.dynamischeHelperTekst}>
              {getoondeRestwaardeText}
            </Text>

            <View style={[styles.compactGridRow, { marginTop: 4 }]}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.basisLabel}>
                  Leeftijd bij aankoop (jaar):
                </Text>
              </View>
              <TextInput
                style={[styles.basisTextInput, { width: 70, marginBottom: 0 }]}
                keyboardType="numeric"
                value={String(autoLeeftijdKoop)}
                onChangeText={(v) => setAutoLeeftijdKoop(Number(v) || 0)}
              />
            </View>
          </View>

          {/* 2. ONDERHOUD & OVERIGE KOSTEN */}
          <View style={styles.onderhoudSfeerContainer}>
            <View style={styles.flexRowBetween}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Text style={styles.onderhoudSfeerTitle}>
                  🔧 Onderhoud & Overige kosten
                </Text>
                <TouchableOpacity
                  style={styles.infoKnop}
                  onPress={() => openInfoModal("onderhoud")}
                >
                  <Text style={styles.infoKnopText}>i</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.onderhoudBedragTekst}>
                €{Math.round(huidigeOverigeKosten)} p/m
              </Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={250}
              step={5}
              value={huidigeOverigeKosten}
              onValueChange={setHandmatigeOverigeKosten}
              minimumTrackTintColor="#b45309"
              maximumTrackTintColor="#cbd5e1"
              thumbTintColor="#b45309"
            />
          </View>

          {/* 3. AUTOVERZEKERING BLOK */}
          <View style={styles.verzekeringSfeerContainer}>
            <Text style={styles.verzekeringSfeerTitle}>
              🛡️ Autoverzekering instellen
            </Text>
            <Text style={styles.verzekeringLabel}>Type verzekering:</Text>
            <View style={styles.btnRow}>
              {["WA", "WA+", "All-Risk"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionButton,
                    verzekeringType === type && styles.activeVerzekeringBtn,
                  ]}
                  onPress={() => setVerzekeringType(type)}
                >
                  <Text
                    style={
                      verzekeringType === type
                        ? styles.activeBtnText
                        : styles.btnText
                    }
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Schadevrije Jaren Slider */}
            <View style={[styles.flexRowBetween, { marginTop: 8 }]}>
              <Text style={styles.basisLabel}>
                Schadevrije jaren: {schadevrijeJaren}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={15}
              step={1}
              value={schadevrijeJaren}
              onValueChange={setSchadevrijeJaren}
              minimumTrackTintColor="#166534"
              maximumTrackTintColor="#cbd5e1"
              thumbTintColor="#166534"
            />
          </View>

          {/* 4. EXTRA INSTELLINGEN (WEGENBELASTING) */}
          <View style={styles.meerOptiesContainer}>
            <View style={styles.flexRowBetween}>
              <TouchableOpacity
                style={styles.meerOptiesHeader}
                onPress={() => setMeerOptiesOpen(!meerOptiesOpen)}
              >
                <Text style={styles.meerOptiesTitle}>
                  {meerOptiesOpen
                    ? "🔽 Details verbergen"
                    : "🛠️ Extra: Wegenbelasting & Opties"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.infoKnop}
                onPress={() => openInfoModal("wegenbelasting")}
              >
                <Text style={styles.infoKnopText}>i</Text>
              </TouchableOpacity>
            </View>

            {meerOptiesOpen && (
              <View style={styles.meerOptiesContent}>
                <Text style={styles.subLabel}>Provincie:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.rowGrid}
                >
                  {provinciesLijst.map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.smallBadge,
                        provincie === p && styles.activeBadge,
                      ]}
                      onPress={() => setProvincie(p)}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          provincie === p && styles.activeBadgeText,
                        ]}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={[styles.subLabel, { marginTop: 8 }]}>
                  Gewichtsklasse:
                </Text>
                <View style={styles.btnRow}>
                  {["licht", "midden", "zwaar"].map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.optionButton,
                        gewichtsklasse === g && styles.activeVerzekeringBtn,
                      ]}
                      onPress={() => setGewichtsklasse(g)}
                    >
                      <Text
                        style={
                          gewichtsklasse === g
                            ? styles.activeBtnText
                            : styles.btnText
                        }
                      >
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={[styles.flexRowBetween, { marginTop: 8 }]}>
                  <Text style={styles.subLabel}>
                    Handmatige wegenbelasting p/m (€):
                  </Text>
                  <TextInput
                    style={[styles.basisTextInput, { width: 80 }]}
                    keyboardType="numeric"
                    placeholder="Auto"
                    // DIT IS DE NIEUWE VEILIGE REGEL:
                    value={
                      handmatigeWegenbelasting
                        ? String(handmatigeWegenbelasting)
                        : ""
                    }
                    onChangeText={setHandmatigeWegenbelasting}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    {
                      marginTop: 10,
                      backgroundColor: autoWassenEnPoetsen
                        ? "#fffbeb"
                        : "#ffffff",
                    },
                  ]}
                  onPress={() => setAutoWassenEnPoetsen(!autoWassenEnPoetsen)}
                >
                  <Text
                    style={
                      autoWassenEnPoetsen
                        ? styles.activeBtnText
                        : styles.btnText
                    }
                  >
                    {autoWassenEnPoetsen
                      ? "🧼 Wassen & Poetsen meegerekend (€15)"
                      : "🧽 Voeg wasstraatkosten toe"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {/* MODAL POPUP */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoModalZichtbaar}
        onRequestClose={() => setInfoModalZichtbaar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{activeModal.title}</Text>
            <Text style={styles.modalBody}>{activeModal.body}</Text>
            <TouchableOpacity
              style={styles.modalSluitKnop}
              onPress={() => setInfoModalZichtbaar(false)}
            >
              <Text style={styles.modalSluitKnopTekst}>Begrepen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderLeftWidth: 4,
    borderLeftColor: "#15803d",
  },
  headerToggle: {
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#18181b" },
  mainContentContainer: { marginTop: 10 },
  basisSfeerContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  basisSfeerTitle: { fontSize: 12, fontWeight: "700", color: "#1e293b" },
  compactGridRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 4,
  },
  gridColumn: { flex: 1 },
  basisLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 1,
  },
  basisTextInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 13,
    color: "#18181b",
  },
  dynamischeHelperTekst: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 4,
    marginBottom: 4,
  },
  onderhoudSfeerContainer: {
    backgroundColor: "#fff7ed",
    borderRadius: 12,
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ffedd5",
  },
  onderhoudSfeerTitle: { fontSize: 12, fontWeight: "700", color: "#9a3412" },
  onderhoudBedragTekst: { fontSize: 12, fontWeight: "700", color: "#b45309" },
  slider: { width: "100%", height: 24, marginTop: 2 },
  infoKnop: {
    backgroundColor: "#ffedd5",
    borderWidth: 1.5,
    borderColor: "#b45309",
    borderRadius: 11,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyBox: "center",
    justifyContent: "center",
  },
  infoKnopText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#b45309",
    textAlign: "center",
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    width: "100%",
    maxWidth: 320,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 12,
    color: "#3f3f46",
    lineHeight: 18,
    marginBottom: 14,
  },
  modalSluitKnop: {
    backgroundColor: "#b45309",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  modalSluitKnopTekst: { color: "#ffffff", fontSize: 13, fontWeight: "600" },
  verzekeringSfeerContainer: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  verzekeringSfeerTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 4,
  },
  verzekeringLabel: { fontSize: 11, fontWeight: "600", color: "#14532d" },
  btnRow: { flexDirection: "row", gap: 4, marginVertical: 2 },
  optionButton: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  activeVerzekeringBtn: { backgroundColor: "#fffbeb", borderColor: "#b45309" },
  btnText: { fontSize: 11, color: "#71717a" },
  activeBtnText: { fontSize: 11, color: "#b45309", fontWeight: "700" },
  meerOptiesContainer: {
    backgroundColor: "#fffbeb",
    borderRadius: 10,
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  meerOptiesHeader: { paddingVertical: 1 },
  meerOptiesTitle: { fontSize: 12, fontWeight: "700", color: "#b45309" },
  meerOptiesContent: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#fef3c7",
    paddingTop: 6,
  },
  rowGrid: { flexDirection: "row", marginBottom: 6, marginTop: 1 },
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  activeBadge: { backgroundColor: "#b45309", borderColor: "#b45309" },
  badgeText: { fontSize: 11, color: "#78350f" },
  activeBadgeText: { color: "#ffffff", fontWeight: "600" },
  flexRowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#78350f",
    marginBottom: 2,
  },
});
