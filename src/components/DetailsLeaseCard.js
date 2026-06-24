import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function DetailsLeaseCard({
  leaseBedrag,
  setLeaseBedrag,
  leaseLooptijd,
  setLeaseLooptijd,
  isUitgeklapt: isUitgeklaptExtern,
  setIsUitgeklapt: setIsUitgeklaptExtern,
}) {
  // Standaard ingeklapt voor maximale rust
  const [interneIsUitgeklapt, setInterneIsUitgeklapt] = useState(false);
  const isUitgeklapt = isUitgeklaptExtern ?? interneIsUitgeklapt;
  const setIsUitgeklapt =
    setIsUitgeklaptExtern ?? setInterneIsUitgeklapt;

  // Zorg voor een veilige fallback als de prop vanuit App.js een lege callback is
  const handleLooptijdChange = (waarde) => {
    if (typeof setLeaseLooptijd === "function") {
      setLeaseLooptijd(waarde);
    }
  };

  return (
    <View style={styles.card}>
      {/* KLIKBARE HOOFDHEADER */}
      <TouchableOpacity
        style={styles.headerToggle}
        onPress={() => setIsUitgeklapt(!isUitgeklapt)}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>
          {isUitgeklapt ? "🔽 Details Lease" : "▶️ Toon Details Lease"}
        </Text>
      </TouchableOpacity>

      {/* INHOUD DIE IN- EN UITKLAPT */}
      {isUitgeklapt && (
        <View style={styles.mainContentContainer}>
          {/* LEASE MAANDBEDRAG SLIDER BLOK */}
          <View style={styles.leaseSfeerContainer}>
            <Text style={styles.leaseSfeerTitle}>
              📋 Lease (Operational / Private lease parameters)
            </Text>

            <View style={styles.sliderBlock}>
              <Text style={styles.subLabel}>
                Leasebedrag per maand:{" "}
                <Text style={styles.sliderValueText}>€{leaseBedrag}</Text>
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={200}
                maximumValue={1200}
                step={5}
                value={leaseBedrag}
                onValueChange={setLeaseBedrag}
                minimumTrackTintColor="#1d4ed8"
                maximumTrackTintColor="#cbd5e1"
                thumbTintColor="#1d4ed8"
              />
            </View>

            {/* LEASE LOOPTIJD SLIDER BLOK */}
            <View style={[styles.sliderBlock, { marginTop: 10 }]}>
              <Text style={styles.subLabel}>
                Lease looptijd:{" "}
                <Text style={styles.sliderValueText}>
                  {leaseLooptijd} maanden ({Math.round(leaseLooptijd / 12)}{" "}
                  jaar)
                </Text>
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={72}
                step={12}
                value={leaseLooptijd}
                onValueChange={handleLooptijdChange}
                minimumTrackTintColor="#1d4ed8"
                maximumTrackTintColor="#cbd5e1"
                thumbTintColor="#1d4ed8"
              />
            </View>
          </View>
        </View>
      )}
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
    borderLeftColor: "#1d4ed8",
  },
  headerToggle: {
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
  },
  mainContentContainer: {
    marginTop: 10,
  },
  leaseSfeerContainer: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  leaseSfeerTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    color: "#1e3a8a",
    fontWeight: "600",
    marginBottom: 2,
  },
  sliderValueText: {
    fontWeight: "700",
    color: "#1d4ed8",
  },
  slider: {
    width: "100%",
    height: 24,
  },
});
