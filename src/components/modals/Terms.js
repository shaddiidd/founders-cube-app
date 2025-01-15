import {
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

export default function Terms({ closeModal }) {
  return (
    <View style={styles.modalContent}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={closeModal}
          activeOpacity={0.7}
        >
          <Icon name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}
      >
        <Image
          style={styles.cube}
          source={require("../../../assets/cube-whitebg.png")}
        />
        <Text style={styles.title}>Terms & Conditions</Text>

        <Text style={styles.text}>
          This Entrepreneur Community Agreement (the "Agreement") is entered
          into by and between The Founders Cube (the "Administrator") and the
          members (the "Members") of the Entrepreneur Community (the
          "Entrepreneurial Community").
        </Text>

        <Text style={styles.heading}>1. Purpose of the Community</Text>
        <Text style={styles.text}>
          The Community aims to foster collaboration, networking, and potential
          business opportunities among its members. By joining, all Members
          agree to abide by the rules outlined herein.
        </Text>

        <Text style={styles.heading}>2. Membership Eligibility</Text>
        <Text style={styles.text}>
          To be eligible for membership, individuals must meet the following
          criteria:{"\n"}
          list here...
        </Text>

        <Text style={styles.heading}>3. Admission and Screening</Text>
        <Text style={styles.text}>
          The Administrator will make their best effort to screen potential
          members; however, they are not responsible for any subsequent business
          dealings between members outside the Community.
        </Text>

        <Text style={styles.heading}>4. Code of Conduct</Text>
        <Text style={styles.text}>
          All Members must adhere to a strict code of conduct:{"\n"}
          list here...
        </Text>

        <Text style={styles.heading}>5. Community Activities</Text>
        <Text style={styles.text}>
          Members may engage in activities such as networking events,
          knowledge-sharing, and collaboration. Any business deals that arise
          from these activities should be conducted fairly and ethically.
        </Text>

        <Text style={styles.heading}>6. Accountability</Text>
        <Text style={styles.text}>
          The Administrator reserves the right to remove members who violate
          this Agreement or engage in inappropriate conduct, without notice.
        </Text>

        <Text style={styles.heading}>7. Dispute Resolution</Text>
        <Text style={styles.text}>
          In case of disputes between members, the Community and its
          Administrator will not be held responsible. It is recommended that
          members attempt to resolve disputes amicably.
        </Text>

        <Text style={styles.heading}>8. Disclaimer</Text>
        <Text style={styles.text}>
          The Administrator and the Community do not endorse or vouch for the
          reliability or trustworthiness of any member. Members engage with each
          other at their own risk.
        </Text>

        <Text style={styles.heading}>9. Modification of Agreement</Text>
        <Text style={styles.text}>
          The Administrator may amend this Agreement as needed. Members will be
          notified of any changes.
        </Text>

        <Text style={styles.heading}>10. Termination</Text>
        <Text style={styles.text}>
          Members may voluntarily leave the Community at any time. The
          Administrator reserves the right to terminate membership for any
          reason, including violations of this Agreement.
        </Text>

        <Text style={styles.heading}>11. Final Acknowledgment</Text>
        <Text style={styles.text}>
          By joining the Entrepreneur Community, all Members acknowledge that
          they have read, understood, and agreed to abide by this Agreement.
        </Text>

        <Text style={styles.heading}>12. Contact Information</Text>
        <Text style={styles.text}>
          For any inquiries or concerns related to this Agreement, please
          contact the Administrator on +962790095454
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  header: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 10
  },
  cube: {
    width: 120,
    height: 70,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "rgb(67, 118, 137)",
    fontWeight: "bold",
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "rgb(67, 118, 137)",
    width: "90%",
  },
  text: {
    width: "90%",
    fontSize: 15,
  },
});
