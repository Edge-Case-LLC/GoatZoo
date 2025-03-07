import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../config";

export default function DocumentExtensionIcon({ extension, IconSize, styles }) {
  return (
    <>
      {extension == "pdf" ? (
        <FontAwesome5
          name={"file-pdf"}
          size={IconSize}
          color={Colors.red}
          style={styles}
        />
      ) : extension == "doc" || extension == "docx" ? (
        <FontAwesome5
          name={"file-word"}
          size={IconSize}
          color={Colors.blue}
          style={styles}
        />
      ) : extension == "xls" || extension == "xlsx" ? (
        <FontAwesome5
          name={"file-excel"}
          size={IconSize}
          color={Colors.green}
          style={styles}
        />
      ) : extension == "ppt" || extension == "pptx" ? (
        <FontAwesome5
          name={"file-powerpoint"}
          size={IconSize}
          color={Colors.yellow}
          style={styles}
        />
      ) : extension == "txt" || extension == 'text' ? (
        <FontAwesome
          name={"file-text"}
          size={IconSize}
          color={Colors.white}
          style={styles}
        />
      ) : null}
    </>
  );
}
