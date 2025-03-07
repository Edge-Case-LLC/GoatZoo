import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors, size } from "../../config";
import Modal from "react-native-modal";
import Icons from "../../assets/Icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const PolicyModal = ({
  agreementModal,
  setAgreementModal,
  isTermsAgreementAccepted,
  setIsTermsAgreementAccepted,
  policyError,
  setPolicyError,
  isPolicyAccepted,
  setIsPolicyAccepted,
  agreementError,
  setAgreementError,
  onModalClose = () => {},
  loginHandler = () => {},
}) => {
  const Accepthandler = () => {
    if (!isTermsAgreementAccepted) {
      setAgreementError(true);
      return;
    } else if (!isPolicyAccepted) {
      setPolicyError(true);
      return;
    } else {
      onModalClose();
      loginHandler();
    }
  };

  return (
    <Modal
      isVisible={agreementModal}
      statusBarTranslucent={false}
      backdropOpacity={0.7}
      onBackButtonPress={() => onModalClose()}
      onBackdropPress={() => onModalClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalAgreementHeader}>
          <Text style={styles.agreementHeading}>AGREEMENT</Text>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.agreementSubHeading}>
            I have read and agreed with
          </Text>
          <View style={styles.agreementButton}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.tickBox}
              onPress={() => {
                setIsTermsAgreementAccepted(!isTermsAgreementAccepted),
                  setAgreementError(false);
              }}
            >
              <Image
                source={
                  isTermsAgreementAccepted ? Icons.CheckMark : Icons.EmptyBox
                }
                style={styles.acceptImage}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>Terms and Conditions</Text>
          </View>
          <View style={styles.agreementButton}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.tickBox}
              onPress={() => {
                setIsPolicyAccepted(!isPolicyAccepted);
                setPolicyError(false);
              }}
            >
              <Image
                source={isPolicyAccepted ? Icons.CheckMark : Icons.EmptyBox}
                style={styles.acceptImage}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>Privacy Policy</Text>
          </View>
        </View>
        {agreementError && (
          <Text style={styles.modalErrorMessages}>
            Please accept terms and conditions
          </Text>
        )}
        {policyError && (
          <Text style={styles.modalErrorMessages}>
            Please accept privacy policy
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.modalButton, styles.acceptButton]}
            onPress={() => {
              setAgreementModal(!agreementModal),
                setIsPolicyAccepted(false),
                setIsTermsAgreementAccepted(false);
            }}
          >
            <Text style={styles.modalButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.modalButton, styles.declineButton]}
            onPress={() => {
              Accepthandler();
            }}
          >
            <Text style={[styles.modalButtonText, styles.textBlack]}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PolicyModal;

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    backgroundColor: Colors.darkBlue,
    overflow: "hidden",
  },
  modalAgreementHeader: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
    paddingTop: 26,
  },
  agreementHeading: {
    color: Colors.white,
    fontSize: size.large,
    fontWeight: "bold",
  },
  agreementSubHeading: {
    fontSize: size.small,
    textAlign: "center",
    color: Colors.white,
  },
  policyContainer: {
    marginHorizontal: 25,
    marginVertical: 20,
    paddingBottom: 8,
  },
  agreementButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  tickBox: {
    justifyContent: "center",
    marginRight: 20,
  },
  acceptImage: {
    alignSelf: "center",
    width: 22,
    height: 22,
    resizeMode: "contain",
    borderRadius: 4,
  },
  termsText: {
    fontSize: size.small,
    color: Colors.white,
  },
  buttonContainer: {
    marginTop: 30,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
  },
  acceptButton: {
    backgroundColor: Colors.white,
  },
  declineButton: {
    backgroundColor: Colors.orange,
  },
  modalButtonText: {
    fontSize: size.small,
    color: Colors.black,
    fontWeight: "600",
  },
  textBlack: {
    color: Colors.white,
    fontSize: size.small,
    fontWeight: "600",
  },
  modalErrorMessages: {
    alignSelf: "center",
    color: Colors.white,
  },
});
