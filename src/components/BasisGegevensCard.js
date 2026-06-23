import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function BasisGegevensCard({
  kilometers,
  setKilometers,
  beoogdeLooptijd,
  setBeoogdeLooptijd,
  leeftijd,
  setLeeftijd,
  brandstof,
  setBrandstof,
  getKnoppenStijl,
  brandstofPrijs,
  setBrandstofPrijs,
}) {
  const [isUitgeklapt, setIsUitgeklapt] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.headerToggle}
        onPress={() => setIsUitgeklapt(!isUitgeklapt)}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>
          {isUitgeklapt
            ? "🔽 Algemene Basisgegevens"
            : "▶️ Toon Algemene Basisgegevens"}
        </Text>
      </TouchableOpacity>

      {isUitgeklapt && (
        <View style={styles.contentContainer}>
          {/* PERSOONLIJKE INSTELLINGEN SLIDERS */}
          <View style={styles.SfeerBlokSliders}>
            <View style={styles.sliderBlock}>
              <Text style={styles.subLabel}>
                Aantal kilometers per jaar:{" "}
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
                maximumTrackTintColor="#cbd5e1"
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
                maximumTrackTintColor="#cbd5e1"
                thumbTintColor="#10b981"
              />
            </View>

            <View style={styles.sliderBlock_last}>
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
                maximumTrackTintColor="#cbd5e1"
                thumbTintColor="#10b981"
              />
            </View>
          </View>

          {/* BRANDSTOF & ENERGIE SELECTIE */}
          <View style={styles.SfeerBlokBrandstof}>
            <Text style={styles.subLabelBrandstof}>Type brandstof</Text>
            <View style={styles.buttonGroup}>
              {["Benzine", "Diesel", "Elektrisch"].map((optie) => {
                const isActive = brandstof === optie;
                return (
                  <TouchableOpacity
                    key={optie}
                    style={[
                      getKnoppenStijl(optie),
                      isActive && {
                        borderColor: "#0284c7",
                        borderWidth: 1.5,
                        transform: [{ scale: 1.02 }],
                      },
                    ]}
                    onPress={() => setBrandstof(optie)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isActive && styles.optionTextSelected,
                      ]}
                    >
                      {optie}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* DYNAMISCHE BRANDSTOFPRIJS SLIDER */}
            <View style={styles.prijsSliderBlock}>
              <Text style={styles.subLabelBrandstof}>
                {brandstof === "Elektrisch"
                  ? "Stroomprijs per kWh:"
                  : `${brandstof}prijs per liter:`}{" "}
                <Text style={styles.sliderValueText}>
                  €{(brandstofPrijs || 1.65).toFixed(2)}
                </Text>
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={brandstof === "Elektrisch" ? 0.2 : 1.2}
                maximumValue={brandstof === "Elektrisch" ? 0.9 : 2.5}
                step={0.01}
                value={brandstofPrijs || 1.65}
                onValueChange={setBrandstofPrijs}
                minimumTrackTintColor="#0284c7"
                maximumTrackTintColor="#cbd5e1"
                thumbTintColor="#0284c7"
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
    borderLeftColor: "#10b981", // Groen accent passend bij algemene basisgegevens
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
  contentContainer: {
    marginTop: 10,
  },
  SfeerBlokSliders: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 8,
  },
  sliderBlock: {
    marginBottom: 8,
  },
  sliderBlock_last: {
    marginBottom: 2,
  },
  subLabel: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
    marginBottom: 1,
  },
  sliderValueText: {
    fontWeight: "700",
    color: "#0f172a",
  },
  slider: {
    width: "100%",
    height: 24,
  },
  SfeerBlokBrandstof: {
    backgroundColor: "#ecfeff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cffafe",
  },
  subLabelBrandstof: {
    fontSize: 12,
    color: "#083344",
    fontWeight: "600",
    marginBottom: 2,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#083344",
  },
  optionTextSelected: {
    color: "#0369a1",
    fontWeight: "700",
  },
  prijsSliderBlock: {
    marginTop: 2,
  },
});
