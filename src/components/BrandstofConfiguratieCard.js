import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";

export default function BrandstofConfiguratieCard({
  brandstof,
  prijsBenzine,
  setPrijsBenzine,
  prijsDiesel,
  setPrijsDiesel,
  prijsStroom,
  setPrijsStroom,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.miniCardTitle}>
        ⚙️ Brandstof & Energieprijs afstemmen
      </Text>

      {/* BENZINE SLIDER */}
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

      {/* DIESEL SLIDER */}
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

      {/* ELEKTRISCH SLIDER */}
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  miniCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: 12,
  },
  sliderBlock: {
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 13,
    color: "#4b5563",
    fontWeight: "500",
    marginBottom: 4,
  },
  sliderValueText: {
    fontWeight: "700",
    color: "#18181b",
  },
  slider: {
    width: "100%",
    height: 30,
  },
});
