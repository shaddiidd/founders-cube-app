import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopPlaceholder from "../../components/inputs/TopPlaceholder";
import Context from "../../states/Context";
import { post } from "../../utils/fetch";
import { StyleSheet } from "react-native";
import { countriesArr } from "../../data/countries";
import { Icon } from "react-native-elements";
import TermsConditionsModal from "../../components/modals/TermsConditionsModal";

const ApplyScreen = () => {
  const [page, setPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const navigation = useNavigation();
  const { setLoading } = useContext(Context);
  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Jordan",
    url: "",
    yearsOfExperience: "",
    businessOutline: "",

    educationalBackground: "",
    professionalAffiliation: "",
    strengths: "",
    reasonsToJoin: "",

    referredBy: "",
  });

  useEffect(() => {
    if (agree) setTermsError(false);
  }, [agree]);

  useEffect(() => {
    const countryData = countriesArr.map((country) => country.name.common);
    setCountries(countryData.sort((a, b) => a.localeCompare(b)));
  }, []);

  const handleError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleValid = (field) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [page]);

  const back = () => {
    if (page === 1) {
      navigation.pop();
    } else {
      setPage(page - 1);
    }
  };

  function cleanURL(url) {
    return url.replace(/(^\w+:|^)\/\//, "");
  }

  const next = (event) => {
    event.preventDefault();
    if (page === 1) {
      if (
        data.name !== "" &&
        data.email !== "" &&
        data.phone !== "" &&
        data.country !== "" &&
        data.yearsOfExperience !== "" &&
        data.businessOutline.length >= 300 &&
        Object.keys(errors).length === 0
      ) {
        setPage(2);
      } else {
        Alert.alert(
          "All fields are required!",
          "Make sure you've filled all fields correctly."
        );
      }
    } else if (page === 2) {
      if (
        data.educationalBackground !== "" &&
        data.strengths.length >= 150 &&
        data.reasonsToJoin.length >= 150
      ) {
        setPage(3);
      } else {
        Alert.alert(
          "All fields are required!",
          "Make sure you've filled all fields correctly."
        );
      }
    } else {
      if (agree) {
        setLoading(true);
        post("application", {
          ...data,
          name: data.name.trim(),
          email: data.email.trim(),

          url: cleanURL(data.url),
        })
          .then(() => {
            setLoading(false);
            Alert.alert(
              "Success!",
              "Thank you for applying. Your application will be reviewd soon, you will recieve an email when you get accepted."
            );
            navigation.pop();
          })
          .catch((error) => {
            Alert.alert(
              "Sorry!",
              error?.response?.data?.error ||
                "There seems to be a problem. Please come back later."
            );
            setLoading(false);
          });
      } else {
        setTermsError(true);
        Alert.alert(
          "All fields are required!",
          "Make sure you've agreed to the terms & conditions"
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <ScrollView
        ref={scrollRef}
        style={{ backgroundColor: "#F6F7F7" }}
        contentContainerStyle={styles.container}
      >
        <Image
          style={styles.cube}
          source={require("../../../assets/cube-whitebg.png")}
        />

        {page === 1 && (
          <Image
            style={styles.pages}
            source={require("../../../assets/page1.png")}
          />
        )}
        {page === 2 && (
          <Image
            style={styles.pages}
            source={require("../../../assets/page2.png")}
          />
        )}
        {page === 3 && (
          <Image
            style={styles.pages}
            source={require("../../../assets/page3.png")}
          />
        )}

        {page === 1 && (
          <>
            <Text style={styles.section}>*Personal Information:</Text>
            <TopPlaceholder
              placeholder="Full name"
              longPlaceholder="Ahmad Alaa"
              autoCapitalize
              value={data.name}
              onChange={(value) => setData({ ...data, name: value })}
              onError={handleError}
              onValid={handleValid}
            />
            <TopPlaceholder
              placeholder="Email"
              type="email"
              longPlaceholder="your_email@example.com"
              value={data.email}
              onChange={(value) => setData({ ...data, email: value })}
              onError={handleError}
              onValid={handleValid}
            />
            <TopPlaceholder
              placeholder="Phone"
              type="phone"
              longPlaceholder="+962799999999"
              value={data.phone}
              onChange={(value) => setData({ ...data, phone: value })}
              onError={handleError}
              onValid={handleValid}
            />
            <TopPlaceholder
              placeholder="Country"
              value={data.country}
              onChange={(value) => setData({ ...data, country: value })}
              options={countries}
            />
            <TopPlaceholder
              placeholder="Website or Social Media"
              type="url"
              longPlaceholder="example.com"
              value={data.url}
              onChange={(value) => setData({ ...data, url: value })}
              onError={handleError}
              onValid={handleValid}
            />

            <Text style={styles.section}>*Entrepreneurial Background:</Text>
            <TopPlaceholder
              placeholder="Years of entrepreneurial experience"
              type="number"
              value={data.yearsOfExperience}
              onChange={(value) =>
                setData({ ...data, yearsOfExperience: value })
              }
              onError={handleError}
              onValid={handleValid}
            />
            <TopPlaceholder
              placeholder="Tell us more about your business"
              long
              value={data.businessOutline}
              onChange={(value) => setData({ ...data, businessOutline: value })}
              longPlaceholder="At least 300 characters"
              length={300}
              onError={handleError}
              onValid={handleValid}
            />
            {data.businessOutline.length && <Text
              style={[
                styles.taCount,
                { color: data.businessOutline.length >= 300 ? "green" : "red" },
              ]}
            >
              {data.businessOutline.length}/300
            </Text>}
          </>
        )}

        {page === 2 && (
          <>
            <Text style={styles.section}>
              *Qualifications and Achievements:
            </Text>
            <TopPlaceholder
              placeholder="Educational Background"
              value={data.educationalBackground}
              onChange={(value) =>
                setData({ ...data, educationalBackground: value })
              }
            />
            <TopPlaceholder
              placeholder="Professional Affiliations (Optional)"
              value={data.professionalAffiliation}
              onChange={(value) =>
                setData({ ...data, professionalAffiliation: value })
              }
              required={false}
            />
            <TopPlaceholder
              placeholder="Mention three strengths you have"
              long
              value={data.strengths}
              onChange={(value) => setData({ ...data, strengths: value })}
              length={150}
            />
            {data.strengths.length && <Text
              style={[
                styles.taCount,
                { color: data.strengths.length >= 150 ? "green" : "red" },
              ]}
            >
              {data.strengths.length}/150
            </Text>}
            <Text style={styles.section}>*Commitment to the Community:</Text>
            <TopPlaceholder
              placeholder="Why do you want to join?"
              long
              value={data.reasonsToJoin}
              onChange={(value) => setData({ ...data, reasonsToJoin: value })}
              length={150}
            />
            {data.reasonsToJoin.length && <Text
              style={[
                styles.taCount,
                { color: data.reasonsToJoin.length >= 150 ? "green" : "red" },
              ]}
            >
              {data.reasonsToJoin.length}/150
            </Text>}
          </>
        )}

        {page === 3 && (
          <>
            <Text style={styles.section}>Additional Information:</Text>
            <TopPlaceholder
              placeholder="Referral Code (Optional)"
              required={false}
              value={data.referredBy}
              onChange={(value) => setData({ ...data, referredBy: value })}
            />
            <Text style={{ marginTop: -10, marginBottom: 20, width: "90%" }}>
              If you have a friend who's already a member, obtain free months
              for you and them by asking them for the referral code found in
              their personal profile.
            </Text>
            <View style={styles.checkContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setAgree(!agree)}
                style={[styles.checkbox, agree && styles.checked]}
              >
                {agree && <Icon name="check" size={15} color="white" />}
              </TouchableOpacity>
              <Text style={[styles.label, { color: termsError ? "red" : "#000" }]}>I agree to the </Text>
              <TermsConditionsModal termsError={termsError} />
            </View>
          </>
        )}
        {page !== 3 ? (
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.btn, styles.btnOutlined]}
              onPress={back}
            >
              <Text style={[styles.btnText, { color: "#000" }]}>
                {page === 1 ? "Cancel" : "Back"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={next}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.btn, styles.btnOutlined]}
              onPress={back}
            >
              <Text style={[styles.btnText, { color: "#000" }]}>
                {page === 1 ? "Cancel" : "Back"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={next}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
  cube: {
    height: 70,
    width: 150,
  },
  pages: {
    width: "30%",
    resizeMode: "contain",
    marginVertical: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#818181",
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textarea: {
    width: "100%",
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
  section: {
    fontSize: 16,
    fontWeight: "500",
    color: "#437689",
    marginVertical: 10,
    width: "90%",
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 2,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  btn: {
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 50,
  },
  btnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  btnOutlined: {
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 1.5,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  label: {
    fontSize: 15,
  },
  taCount: {
    marginTop: -10,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "600",
    width: "90%",
    textAlign: "right",
  },
});

export default ApplyScreen;
