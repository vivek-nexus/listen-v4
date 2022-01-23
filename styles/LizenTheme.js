import { lighten, darken } from "polished";
// import { defaultColours } from "fictoan-react";
// import { Colors } from "./colors";
import styles from "../styles/Home.module.scss"

export const DarkTheme = {
  // BODY
  body: {
    bg: "black"
  },
  // TEXT
  text : {
    font : {
      sans : "Manrope"
    },
    paras: {
      font : "Manrope",
      color : "#FFFFFF99"
    },
    headings: {
      font: "Manrope",
      color: `${styles.primaryColor}`
    }
  },

  // BUTTONS
  button: {
    font: "Manrope",
    primary: {
      default: {
        bg: `${styles.primaryColor}`,
        border: `${styles.primaryColor}`,
        text: "black",
      },
      onHover: {
        bg: `${lighten(0.08, styles.primaryColor)}`,
        border: `${styles.primaryColor}`,
        text: "black",
      },
      onClick: {
        bg: `${darken(0.08, styles.primaryColor)}`,
        border: `${styles.primaryColor}`,
        text: "black",
      },
      isActive: {
        bg: `${darken(0.08, styles.primaryColor)}`,
        border: `${styles.primaryColor}`,
        text: "black",
      }
    },
    secondary: {
      default: {
        bg: `${styles.secondaryColor}`,
        border: `${styles.primaryColor}`,
        text: `${styles.primaryColor}`,
      },
      onHover: {
        bg: `${lighten(0.32, styles.secondaryColor)}`,
        border: `${styles.primaryColor}`,
        text: `${styles.primaryColor}`,
      },
      onClick: {
        bg: `${darken(0.16, styles.secondaryColor)}`,
        border: `${styles.primaryColor}`,
        text: `${styles.primaryColor}`,
      },
      isActive: {
        bg: `${darken(0.16, styles.secondaryColor)}`,
        border: `${styles.primaryColor}`,
        text: `${styles.primaryColor}`,
      }
    },
    tertiary: {
      default: {
        bg: 'transparent',
        border: 'transparent',
        text: `${styles.primaryColor}`,
      },
      onHover: {
        bg: 'transparent',
        border: 'transparent',
        text: `${styles.primaryColor}`,
      },
      onClick: {
        bg: 'transparent',
        border: 'transparent',
        text: `${styles.primaryColor}`,
      },
      isActive: {
        bg: 'transparent',
        border: 'transparent',
        text: `${styles.primaryColor}`,
      }
    },
  },

  // INPUT FIELD
  inputField : {
    default: {
      bg: `${styles.background1Color}`,
      text: "white",
      border: `${styles.borderColor}`,
      label: `${styles.primaryColor}`
    },
    onFocus: {
      bg: `${styles.background1Color}`,
      text: "white",
      border: `${styles.primaryColor}`,
      label: `${styles.primaryColor}`
    },
    isInvalid: {
      bg: "#2E2E2E",
      text: "white",
      border: `${styles.primaryColor}`,
      label: `${styles.primaryColor}`
    }
  },

  textArea : {
    default: {
      bg: `${styles.background1Color}`,
      text: "white",
      border: `${styles.borderColor}`,
      label: `${styles.primaryColor}`
    },
    onFocus: {
      bg: `${styles.background1Color}`,
      text: "white",
      border: `${styles.primaryColor}`,
      label: `${styles.primaryColor}`
    },
    isInvalid: {
      bg: "#2E2E2E",
      text: "white",
      border: `${styles.primaryColor}`,
      label: `${styles.primaryColor}`
    }
  },

  hr: {
    primary: {
        bg: `${styles.primaryColor}`,
        // height: string
    }
}
}