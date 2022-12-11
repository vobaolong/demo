module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-width: 814px)" },
      },
      width: {
        190: "190px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      color: {
        primaryBlue: "#3482E7",
      },
      borderColor: {
        primaryBlue: "#14cddb",
        secondaryDark: "#0e8f99",
        primaryDarkBlue: "#022f47",
        borderBlue: "#3482E7",
        borderGlowBlue: "hsl(188, 100%, 62%)",
      },
      textColor: {
        lightGray: "#F1EFEE",
        primaryBlue: "#14cddb",
        secondaryDark: "#0e8f99",
        mainColor: "#1A1B1F",
        primaryDarkBlue: "#021e34",
        secColor: "#efefef",
        navColor: "#BEBEBE",
      },
      backgroundColor: {
        secColor: "#efefef",
        mainColor: "#BEBEBE",
        // mainColor: "#1A1B1F",
        primaryBlue: "#022f47",
        primaryDarkBlue: "#021e34",
        secondaryColor: "#14cddb",
        secondaryDark: "#0e8f99",
        blackOverlay: "rgba(0, 0 ,0 ,0.7)",
      },
      shadow: {
        glow: "hsl(188, 100%, 62%)",
      },

      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
        },
        "slide-out": {
          "0%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
          "100%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
        },

        "slide-fwd": {
          "0%": {
            "-webkit-transform": "translateZ(0px)",
            transform: "translateZ(0px)",
          },
          "100%": {
            "-webkit-transform": "translateZ(160px)",
            transform: "translateZ(160px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-fwd":
          " slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      transitionProperty: {
        height: "height",
      },
    },
    cursor: {
      "zoom-in": "zoom-in",
      pointer: "pointer",
    },
  },

  variant: {
    extends: {
      lineClamp: ["hover"],
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
