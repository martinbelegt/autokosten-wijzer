// src/components/HeaderCard.js
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const hexToRgb = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b]
    .map((waarde) => Math.round(waarde).toString(16).padStart(2, "0"))
    .join("")}`;

const mixColor = (van, naar, stap) => ({
  r: van.r + (naar.r - van.r) * stap,
  g: van.g + (naar.g - van.g) * stap,
  b: van.b + (naar.b - van.b) * stap,
});

const maakGradientStops = (kleuren, stappenPerOvergang = 36) =>
  kleuren.flatMap((kleur, index) => {
    if (index === kleuren.length - 1) return [kleur];

    const van = hexToRgb(kleur);
    const naar = hexToRgb(kleuren[index + 1]);

    return Array.from({ length: stappenPerOvergang }, (_, stapIndex) =>
      rgbToHex(mixColor(van, naar, stapIndex / stappenPerOvergang)),
    );
  });

const gradientStops = maakGradientStops(["#15803d", "#f59e0b", "#0b5ee8"]);

function CarIndicator({ richting }) {
  return (
    <View
      style={[
        styles.carWrap,
        richting < 0 && { transform: [{ scaleX: -1 }] },
      ]}
    >
      <View style={styles.carCabin} />
      <View style={styles.carBody} />
      <View style={[styles.carWindow, styles.carWindowLeft]} />
      <View style={[styles.carWindow, styles.carWindowRight]} />
      <View style={[styles.carWheel, styles.carWheelLeft]} />
      <View style={[styles.carWheel, styles.carWheelRight]} />
      <View style={styles.carLight} />
    </View>
  );
}

export default function HeaderCard({ r, onOpenSection }) {
  const { width } = useWindowDimensions();
  const animatedAutoOffset = useRef(new Animated.Value(0)).current;
  const [menuZichtbaar, setMenuZichtbaar] = useState(false);
  const [disclaimerZichtbaar, setDisclaimerZichtbaar] = useState(false);
  const koopBedrag = r?.koop?.totaal || 0;
  const leaseBedrag = r?.lease?.totaal || 0;

  const koopIsGoedkoper = koopBedrag <= leaseBedrag;
  const verschil = Math.abs(Math.round(koopBedrag - leaseBedrag));
  const richting = koopBedrag === leaseBedrag ? 0 : koopIsGoedkoper ? -1 : 1;
  const trackWidth = Math.max(240, width - 56);
  const autoOffset = richting * Math.tanh(verschil / 120) * (trackWidth * 0.42);
  const voordeelLabel = verschil === 0 ? "Neutraal" : `€${verschil} p/m`;

  useEffect(() => {
    Animated.timing(animatedAutoOffset, {
      toValue: autoOffset,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [animatedAutoOffset, autoOffset]);

  const openSection = (section) => {
    setMenuZichtbaar(false);
    if (typeof onOpenSection === "function") {
      onOpenSection(section);
    }
  };

  return (
    <View style={styles.stickyResultCard}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.topIconButton}
          onPress={() => setMenuZichtbaar(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.topIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.mainAppTitle}>
          <Text style={{ color: "#15803d" }}>Kopen</Text>
          <Text style={{ color: "#f59e0b", fontWeight: "700" }}> of </Text>
          <Text style={{ color: "#1d4ed8" }}>Leasen</Text>
        </Text>
        <TouchableOpacity
          style={styles.infoCircle}
          onPress={() => setDisclaimerZichtbaar(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.infoText}>i</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.indicatiefText}>Uitkomst is indicatief</Text>

      <View style={styles.voordeelCard}>
        <View style={styles.trackArea}>
          <Text style={styles.neutraalLabel}>Neutraal</Text>
          <View style={styles.centerTick} />
          <View style={styles.gradientTrack}>
            {gradientStops.map((kleur, index) => (
              <View
                key={`${kleur}-${index}`}
                style={{
                  flex: 1,
                  marginLeft: index === 0 ? 0 : -0.5,
                  backgroundColor: kleur,
                }}
              />
            ))}
          </View>
          <Animated.View
            style={[
              styles.carMarker,
              {
                transform: [
                  { translateX: animatedAutoOffset },
                  { translateX: -52 },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.badge,
                {
                  borderColor:
                    verschil === 0
                      ? "#d4d4d8"
                      : koopIsGoedkoper
                        ? "#bbf7d0"
                        : "#bfdbfe",
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color:
                      verschil === 0
                        ? "#52525b"
                        : koopIsGoedkoper
                          ? "#15803d"
                          : "#1d4ed8",
                  },
                ]}
              >
                {voordeelLabel}
              </Text>
            </View>
            <View style={styles.badgePointer} />
            <CarIndicator richting={richting} />
          </Animated.View>
        </View>
      </View>

      <View style={styles.resultCardsRow}>
        <View style={[styles.resultCard, styles.koopCard]}>
          <Text style={styles.koopCardTitle}>KOPEN</Text>
          <Text style={styles.resultSubtitle}>Netto maandlasten</Text>
          <Text style={[styles.resultAmount, { color: "#15803d" }]}>
            € {Math.round(koopBedrag)}
          </Text>
          <Text style={styles.resultPerMonth}>per maand</Text>
        </View>

        <View style={[styles.resultCard, styles.leaseCard]}>
          <Text style={styles.leaseCardTitle}>LEASEN</Text>
          <Text style={styles.resultSubtitle}>Netto maandlasten</Text>
          <Text style={[styles.resultAmount, { color: "#1d4ed8" }]}>
            € {Math.round(leaseBedrag)}
          </Text>
          <Text style={styles.resultPerMonth}>per maand</Text>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuZichtbaar}
        onRequestClose={() => setMenuZichtbaar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuModal}>
            <Text style={styles.modalTitle}>Snel openen</Text>
            {[
              ["basis", "Algemene Basisgegevens"],
              ["specificatie", "Specificatie per maand"],
              ["koop", "Details Koopauto"],
              ["lease", "Details Lease"],
            ].map(([id, label]) => (
              <TouchableOpacity
                key={id}
                style={styles.menuButton}
                onPress={() => openSection(id)}
                activeOpacity={0.75}
              >
                <Text style={styles.menuButtonText}>{label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalSluitKnop}
              onPress={() => setMenuZichtbaar(false)}
              activeOpacity={0.75}
            >
              <Text style={styles.modalSluitTekst}>Sluiten</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={disclaimerZichtbaar}
        onRequestClose={() => setDisclaimerZichtbaar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.disclaimerModal}>
            <Text style={styles.modalTitle}>Disclaimer</Text>
            <Text style={styles.modalBody}>
              Deze vergelijking is indicatief. De bedragen zijn schattingen op
              basis van jouw invoer en vaste aannames voor onder andere
              brandstof, onderhoud, verzekering, wegenbelasting en restwaarde.
              Controleer altijd actuele tarieven en contractvoorwaarden voordat
              je een beslissing neemt.
            </Text>
            <TouchableOpacity
              style={styles.modalSluitKnop}
              onPress={() => setDisclaimerZichtbaar(false)}
              activeOpacity={0.75}
            >
              <Text style={styles.modalSluitTekst}>Begrepen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyResultCard: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8fff9",
    paddingTop: Platform.OS === "ios" ? 26 : 12,
    paddingBottom: 14,
    paddingHorizontal: 14,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "#dcfce7",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 5,
  },
  topRow: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  topIconButton: {
    width: 34,
    minHeight: 34,
    justifyContent: "center",
  },
  topIcon: {
    fontSize: 28,
    lineHeight: 32,
    color: "#111827",
  },
  mainAppTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0,
  },
  infoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "800",
    color: "#111827",
  },
  voordeelCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  neutraalLabel: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    fontSize: 14,
    lineHeight: 17,
    color: "#52525b",
    fontWeight: "600",
    textAlign: "center",
  },
  trackArea: {
    height: 62,
    justifyContent: "flex-end",
  },
  gradientTrack: {
    height: 16,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 8,
  },
  centerTick: {
    position: "absolute",
    left: "50%",
    top: 18,
    width: 1,
    height: 34,
    backgroundColor: "#a1a1aa",
  },
  carMarker: {
    position: "absolute",
    left: "50%",
    top: 4,
    width: 104,
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "800",
  },
  badgePointer: {
    width: 9,
    height: 9,
    marginTop: -4,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#ffffff",
    transform: [{ rotate: "45deg" }],
  },
  carWrap: {
    width: 86,
    height: 34,
    marginTop: -2,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 3,
  },
  carCabin: {
    position: "absolute",
    left: 28,
    top: 5,
    width: 34,
    height: 16,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 17,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#475569",
  },
  carBody: {
    position: "absolute",
    left: 7,
    top: 16,
    width: 72,
    height: 15,
    borderRadius: 13,
    backgroundColor: "#e5e7eb",
    borderWidth: 1,
    borderColor: "#475569",
  },
  carWindow: {
    position: "absolute",
    top: 8,
    width: 11,
    height: 8,
    borderRadius: 3,
    backgroundColor: "#dbeafe",
  },
  carWindowLeft: {
    left: 36,
  },
  carWindowRight: {
    left: 49,
  },
  carWheel: {
    position: "absolute",
    top: 26,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#334155",
    borderWidth: 2,
    borderColor: "#f8fafc",
  },
  carWheelLeft: {
    left: 18,
  },
  carWheelRight: {
    left: 61,
  },
  carLight: {
    position: "absolute",
    left: 72,
    top: 20,
    width: 5,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#f97316",
  },
  indicatiefText: {
    marginTop: 1,
    marginBottom: 8,
    fontSize: 12,
    lineHeight: 15,
    color: "#52525b",
    fontWeight: "500",
    textAlign: "center",
  },
  resultCardsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  resultCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 12,
    alignItems: "center",
    minHeight: 108,
  },
  koopCard: {
    backgroundColor: "#f7fee7",
    borderColor: "#d9f99d",
  },
  leaseCard: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  koopCardTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "800",
    color: "#15803d",
  },
  leaseCardTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "800",
    color: "#1d4ed8",
  },
  resultSubtitle: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 14,
    color: "#1f2937",
    fontWeight: "500",
    textAlign: "center",
  },
  resultAmount: {
    marginTop: 7,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: 0,
  },
  resultPerMonth: {
    fontSize: 11,
    lineHeight: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.28)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 96 : 72,
    paddingHorizontal: 18,
  },
  menuModal: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  disclaimerModal: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 13,
    lineHeight: 19,
    color: "#374151",
    marginBottom: 14,
  },
  menuButton: {
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 8,
  },
  menuButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: "#111827",
  },
  modalSluitKnop: {
    marginTop: 2,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f59e0b",
  },
  modalSluitTekst: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "800",
    color: "#ffffff",
  },
});
