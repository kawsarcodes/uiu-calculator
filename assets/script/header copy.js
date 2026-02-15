class globalHeader extends HTMLElement {
  connectedCallback() {
    const themes = {
      
      default: {
        name: "Default",
        preview: "gradient", 
        dark: {
          background: "#000000",
          background2: "#141414",
          foreground: "#f8fafc",
          card: "#000000",
          cardHeader: "#141414",
          cardForeground: "#f8fafc",
          popover: "#000000",
          popoverForeground: "#f8fafc",
          primary: "#f8fafc",
          primaryForeground: "#0f172a",
          secondary: "#262626",
          secondaryForeground: "#f8fafc",
          muted: "#333333",
          mutedForeground: "#818181",
          accent: "#333333",
          accentForeground: "#f8fafc",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#333333",
          input: "#333333",
          ring: "#ff0000",
          themeColor: "#f37021",
          themeColorRgb: "243, 112, 33",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #ffd24c, #f37021, #b27cff)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f8fafc",
          txt: "#ffffff",
        },
        light: {
          background: "#fffbf7",
          background2: "#fff4eb",
          foreground: "#1c0a00",
          card: "#ffffff",
          cardHeader: "#fff7ed",
          cardForeground: "#1c0a00",
          popover: "#ffffff",
          popoverForeground: "#1c0a00",
          primary: "#ea580c",
          primaryForeground: "#ffffff",
          secondary: "#ffedd5",
          secondaryForeground: "#9a3412",
          muted: "#fed7aa",
          mutedForeground: "#c2410c",
          accent: "#fff7ed",
          accentForeground: "#9a3412",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#fdba74",
          input: "#fdba74",
          ring: "#ea580c",
          themeColor: "#ea580c",
          themeColorRgb: "234, 88, 12",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #ffd24c, #f37021, #ff6b35)",
          success: "#10b981",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#333333",
          txt: "#000000",
        },
      },

      orange: {
        name: "Orange",
        preview: "#f37021",
        dark: {
          background: "#000000",
          background2: "#141414",
          foreground: "#f8fafc",
          card: "#0a0a0a",
          cardHeader: "#1a1207",
          cardForeground: "#f8fafc",
          popover: "#0a0a0a",
          popoverForeground: "#f8fafc",
          primary: "#f37021",
          primaryForeground: "#ffffff",
          secondary: "#2a1a10",
          secondaryForeground: "#fed7aa",
          muted: "#1c1210",
          mutedForeground: "#fb923c",
          accent: "#2a1a10",
          accentForeground: "#fed7aa",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#3d2a1a",
          input: "#3d2a1a",
          ring: "#f37021",
          themeColor: "#f37021",
          themeColorRgb: "243, 112, 33",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #ffd24c, #f37021, #ff6b35)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f8fafc",
        },
        light: {
          background: "#fffbf7",
          background2: "#fff4eb",
          foreground: "#1c0a00",
          card: "#ffffff",
          cardHeader: "#fff7ed",
          cardForeground: "#1c0a00",
          popover: "#ffffff",
          popoverForeground: "#1c0a00",
          primary: "#ea580c",
          primaryForeground: "#ffffff",
          secondary: "#ffedd5",
          secondaryForeground: "#9a3412",
          muted: "#fed7aa",
          mutedForeground: "#c2410c",
          accent: "#fff7ed",
          accentForeground: "#9a3412",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#fdba74",
          input: "#fdba74",
          ring: "#ea580c",
          themeColor: "#ea580c",
          themeColorRgb: "234, 88, 12",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #ffd24c, #f37021, #ff6b35)",
          success: "#10b981",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#333333",
        },
      },

      blue: {
        name: "Blue",
        preview: "#3b82f6",
        dark: {
          background: "#000000",
          background2: "#0a1628",
          foreground: "#f0f9ff",
          card: "#0a0f1a",
          cardHeader: "#0c1929",
          cardForeground: "#f0f9ff",
          popover: "#0a0f1a",
          popoverForeground: "#f0f9ff",
          primary: "#3b82f6",
          primaryForeground: "#ffffff",
          secondary: "#1e3a5f",
          secondaryForeground: "#bfdbfe",
          muted: "#172135",
          mutedForeground: "#60a5fa",
          accent: "#1e3a5f",
          accentForeground: "#bfdbfe",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#1e3a5f",
          input: "#1e3a5f",
          ring: "#3b82f6",
          themeColor: "#3b82f6",
          themeColorRgb: "59, 130, 246",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #60a5fa, #3b82f6, #1d4ed8)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f0f9ff",
        },
        light: {
          background: "#f0f9ff",
          background2: "#e0f2fe",
          foreground: "#0c1929",
          card: "#ffffff",
          cardHeader: "#e0f2fe",
          cardForeground: "#0c1929",
          popover: "#ffffff",
          popoverForeground: "#0c1929",
          primary: "#2563eb",
          primaryForeground: "#ffffff",
          secondary: "#dbeafe",
          secondaryForeground: "#1e40af",
          muted: "#bfdbfe",
          mutedForeground: "#1d4ed8",
          accent: "#eff6ff",
          accentForeground: "#1e40af",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#93c5fd",
          input: "#93c5fd",
          ring: "#2563eb",
          themeColor: "#2563eb",
          themeColorRgb: "37, 99, 235",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #60a5fa, #3b82f6, #1d4ed8)",
          success: "#10b981",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#0c1929",
        },
      },

      green: {
        name: "Green",
        preview: "#22c55e",
        dark: {
          background: "#000000",
          background2: "#041a0d",
          foreground: "#f0fdf4",
          card: "#051a0a",
          cardHeader: "#0a2614",
          cardForeground: "#f0fdf4",
          popover: "#051a0a",
          popoverForeground: "#f0fdf4",
          primary: "#22c55e",
          primaryForeground: "#ffffff",
          secondary: "#14532d",
          secondaryForeground: "#bbf7d0",
          muted: "#0d2818",
          mutedForeground: "#4ade80",
          accent: "#14532d",
          accentForeground: "#bbf7d0",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#166534",
          input: "#166534",
          ring: "#22c55e",
          themeColor: "#22c55e",
          themeColorRgb: "34, 197, 94",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #4ade80, #22c55e, #16a34a)",
          success: "#22c55e",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f0fdf4",
        },
        light: {
          background: "#f0fdf4",
          background2: "#dcfce7",
          foreground: "#052e16",
          card: "#ffffff",
          cardHeader: "#dcfce7",
          cardForeground: "#052e16",
          popover: "#ffffff",
          popoverForeground: "#052e16",
          primary: "#16a34a",
          primaryForeground: "#ffffff",
          secondary: "#bbf7d0",
          secondaryForeground: "#166534",
          muted: "#86efac",
          mutedForeground: "#15803d",
          accent: "#f0fdf4",
          accentForeground: "#166534",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#4ade80",
          input: "#4ade80",
          ring: "#16a34a",
          themeColor: "#16a34a",
          themeColorRgb: "22, 163, 74",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #4ade80, #22c55e, #16a34a)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#052e16",
        },
      },

      purple: {
        name: "Purple",
        preview: "#a855f7",
        dark: {
          background: "#000000",
          background2: "#120a1c",
          foreground: "#faf5ff",
          card: "#0d0915",
          cardHeader: "#1a0f28",
          cardForeground: "#faf5ff",
          popover: "#0d0915",
          popoverForeground: "#faf5ff",
          primary: "#a855f7",
          primaryForeground: "#ffffff",
          secondary: "#3b0764",
          secondaryForeground: "#e9d5ff",
          muted: "#2a1245",
          mutedForeground: "#c084fc",
          accent: "#3b0764",
          accentForeground: "#e9d5ff",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#581c87",
          input: "#581c87",
          ring: "#a855f7",
          themeColor: "#a855f7",
          themeColorRgb: "168, 85, 247",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #c084fc, #a855f7, #7c3aed)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#faf5ff",
        },
        light: {
          background: "#faf5ff",
          background2: "#f3e8ff",
          foreground: "#1a0533",
          card: "#ffffff",
          cardHeader: "#f3e8ff",
          cardForeground: "#1a0533",
          popover: "#ffffff",
          popoverForeground: "#1a0533",
          primary: "#9333ea",
          primaryForeground: "#ffffff",
          secondary: "#e9d5ff",
          secondaryForeground: "#6b21a8",
          muted: "#d8b4fe",
          mutedForeground: "#7e22ce",
          accent: "#faf5ff",
          accentForeground: "#6b21a8",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#c084fc",
          input: "#c084fc",
          ring: "#9333ea",
          themeColor: "#9333ea",
          themeColorRgb: "147, 51, 234",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #c084fc, #a855f7, #7c3aed)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1a0533",
        },
      },

      red: {
        name: "Red",
        preview: "#ef4444",
        dark: {
          background: "#000000",
          background2: "#1a0a0a",
          foreground: "#fef2f2",
          card: "#0f0505",
          cardHeader: "#1f0a0a",
          cardForeground: "#fef2f2",
          popover: "#0f0505",
          popoverForeground: "#fef2f2",
          primary: "#ef4444",
          primaryForeground: "#ffffff",
          secondary: "#450a0a",
          secondaryForeground: "#fecaca",
          muted: "#2d1111",
          mutedForeground: "#f87171",
          accent: "#450a0a",
          accentForeground: "#fecaca",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#7f1d1d",
          input: "#7f1d1d",
          ring: "#ef4444",
          themeColor: "#ef4444",
          themeColorRgb: "239, 68, 68",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #f87171, #ef4444, #dc2626)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#fef2f2",
        },
        light: {
          background: "#fef2f2",
          background2: "#fee2e2",
          foreground: "#1f0a0a",
          card: "#ffffff",
          cardHeader: "#fee2e2",
          cardForeground: "#1f0a0a",
          popover: "#ffffff",
          popoverForeground: "#1f0a0a",
          primary: "#dc2626",
          primaryForeground: "#ffffff",
          secondary: "#fecaca",
          secondaryForeground: "#991b1b",
          muted: "#fca5a5",
          mutedForeground: "#b91c1c",
          accent: "#fef2f2",
          accentForeground: "#991b1b",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#f87171",
          input: "#f87171",
          ring: "#dc2626",
          themeColor: "#dc2626",
          themeColorRgb: "220, 38, 38",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #f87171, #ef4444, #dc2626)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1f0a0a",
        },
      },

      pink: {
        name: "Pink",
        preview: "#ec4899",
        dark: {
          background: "#000000",
          background2: "#1a0a12",
          foreground: "#fdf2f8",
          card: "#10050a",
          cardHeader: "#1f0a15",
          cardForeground: "#fdf2f8",
          popover: "#10050a",
          popoverForeground: "#fdf2f8",
          primary: "#ec4899",
          primaryForeground: "#ffffff",
          secondary: "#500724",
          secondaryForeground: "#fbcfe8",
          muted: "#331020",
          mutedForeground: "#f472b6",
          accent: "#500724",
          accentForeground: "#fbcfe8",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#831843",
          input: "#831843",
          ring: "#ec4899",
          themeColor: "#ec4899",
          themeColorRgb: "236, 72, 153",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #f472b6, #ec4899, #db2777)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#fdf2f8",
        },
        light: {
          background: "#fdf2f8",
          background2: "#fce7f3",
          foreground: "#1f0515",
          card: "#ffffff",
          cardHeader: "#fce7f3",
          cardForeground: "#1f0515",
          popover: "#ffffff",
          popoverForeground: "#1f0515",
          primary: "#db2777",
          primaryForeground: "#ffffff",
          secondary: "#fbcfe8",
          secondaryForeground: "#9d174d",
          muted: "#f9a8d4",
          mutedForeground: "#be185d",
          accent: "#fdf2f8",
          accentForeground: "#9d174d",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#f472b6",
          input: "#f472b6",
          ring: "#db2777",
          themeColor: "#db2777",
          themeColorRgb: "219, 39, 119",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #f472b6, #ec4899, #db2777)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1f0515",
        },
      },

      cyan: {
        name: "Cyan",
        preview: "#06b6d4",
        dark: {
          background: "#000000",
          background2: "#041a1e",
          foreground: "#ecfeff",
          card: "#031315",
          cardHeader: "#052e34",
          cardForeground: "#ecfeff",
          popover: "#031315",
          popoverForeground: "#ecfeff",
          primary: "#06b6d4",
          primaryForeground: "#ffffff",
          secondary: "#164e63",
          secondaryForeground: "#a5f3fc",
          muted: "#0e3740",
          mutedForeground: "#22d3ee",
          accent: "#164e63",
          accentForeground: "#a5f3fc",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#155e75",
          input: "#155e75",
          ring: "#06b6d4",
          themeColor: "#06b6d4",
          themeColorRgb: "6, 182, 212",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #22d3ee, #06b6d4, #0891b2)",
          success: "#10b981",
          info: "#06b6d4",
          warning: "#f1c40f",
          iconFill: "#ecfeff",
        },
        light: {
          background: "#ecfeff",
          background2: "#cffafe",
          foreground: "#052e34",
          card: "#ffffff",
          cardHeader: "#cffafe",
          cardForeground: "#052e34",
          popover: "#ffffff",
          popoverForeground: "#052e34",
          primary: "#0891b2",
          primaryForeground: "#ffffff",
          secondary: "#a5f3fc",
          secondaryForeground: "#155e75",
          muted: "#67e8f9",
          mutedForeground: "#0e7490",
          accent: "#ecfeff",
          accentForeground: "#155e75",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#22d3ee",
          input: "#22d3ee",
          ring: "#0891b2",
          themeColor: "#0891b2",
          themeColorRgb: "8, 145, 178",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #22d3ee, #06b6d4, #0891b2)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#052e34",
        },
      },

      yellow: {
        name: "Yellow",
        preview: "#eab308",
        dark: {
          background: "#000000",
          background2: "#1a1505",
          foreground: "#fefce8",
          card: "#0f0d03",
          cardHeader: "#1f1a07",
          cardForeground: "#fefce8",
          popover: "#0f0d03",
          popoverForeground: "#fefce8",
          primary: "#eab308",
          primaryForeground: "#000000",
          secondary: "#422006",
          secondaryForeground: "#fef08a",
          muted: "#2d1f0a",
          mutedForeground: "#facc15",
          accent: "#422006",
          accentForeground: "#fef08a",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#713f12",
          input: "#713f12",
          ring: "#eab308",
          themeColor: "#eab308",
          themeColorRgb: "234, 179, 8",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #fde047, #eab308, #ca8a04)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#eab308",
          iconFill: "#fefce8",
        },
        light: {
          background: "#fefce8",
          background2: "#fef9c3",
          foreground: "#1c1502",
          card: "#ffffff",
          cardHeader: "#fef9c3",
          cardForeground: "#1c1502",
          popover: "#ffffff",
          popoverForeground: "#1c1502",
          primary: "#ca8a04",
          primaryForeground: "#ffffff",
          secondary: "#fef08a",
          secondaryForeground: "#854d0e",
          muted: "#fde047",
          mutedForeground: "#a16207",
          accent: "#fefce8",
          accentForeground: "#854d0e",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#facc15",
          input: "#facc15",
          ring: "#ca8a04",
          themeColor: "#ca8a04",
          themeColorRgb: "202, 138, 4",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #fde047, #eab308, #ca8a04)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1c1502",
        },
      },

      teal: {
        name: "Teal",
        preview: "#14b8a6",
        dark: {
          background: "#000000",
          background2: "#021a17",
          foreground: "#f0fdfa",
          card: "#021210",
          cardHeader: "#032621",
          cardForeground: "#f0fdfa",
          popover: "#021210",
          popoverForeground: "#f0fdfa",
          primary: "#14b8a6",
          primaryForeground: "#ffffff",
          secondary: "#134e4a",
          secondaryForeground: "#99f6e4",
          muted: "#0d3330",
          mutedForeground: "#2dd4bf",
          accent: "#134e4a",
          accentForeground: "#99f6e4",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#115e59",
          input: "#115e59",
          ring: "#14b8a6",
          themeColor: "#14b8a6",
          themeColorRgb: "20, 184, 166",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #2dd4bf, #14b8a6, #0d9488)",
          success: "#14b8a6",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f0fdfa",
        },
        light: {
          background: "#f0fdfa",
          background2: "#ccfbf1",
          foreground: "#032621",
          card: "#ffffff",
          cardHeader: "#ccfbf1",
          cardForeground: "#032621",
          popover: "#ffffff",
          popoverForeground: "#032621",
          primary: "#0d9488",
          primaryForeground: "#ffffff",
          secondary: "#99f6e4",
          secondaryForeground: "#115e59",
          muted: "#5eead4",
          mutedForeground: "#0f766e",
          accent: "#f0fdfa",
          accentForeground: "#115e59",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#2dd4bf",
          input: "#2dd4bf",
          ring: "#0d9488",
          themeColor: "#0d9488",
          themeColorRgb: "13, 148, 136",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #2dd4bf, #14b8a6, #0d9488)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#032621",
        },
      },

      indigo: {
        name: "Indigo",
        preview: "#6366f1",
        dark: {
          background: "#000000",
          background2: "#0a0a1a",
          foreground: "#eef2ff",
          card: "#07071a",
          cardHeader: "#0e0e2a",
          cardForeground: "#eef2ff",
          popover: "#07071a",
          popoverForeground: "#eef2ff",
          primary: "#6366f1",
          primaryForeground: "#ffffff",
          secondary: "#312e81",
          secondaryForeground: "#c7d2fe",
          muted: "#1e1b4b",
          mutedForeground: "#818cf8",
          accent: "#312e81",
          accentForeground: "#c7d2fe",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#3730a3",
          input: "#3730a3",
          ring: "#6366f1",
          themeColor: "#6366f1",
          themeColorRgb: "99, 102, 241",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #818cf8, #6366f1, #4f46e5)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#eef2ff",
        },
        light: {
          background: "#eef2ff",
          background2: "#e0e7ff",
          foreground: "#1e1b4b",
          card: "#ffffff",
          cardHeader: "#e0e7ff",
          cardForeground: "#1e1b4b",
          popover: "#ffffff",
          popoverForeground: "#1e1b4b",
          primary: "#4f46e5",
          primaryForeground: "#ffffff",
          secondary: "#c7d2fe",
          secondaryForeground: "#3730a3",
          muted: "#a5b4fc",
          mutedForeground: "#4338ca",
          accent: "#eef2ff",
          accentForeground: "#3730a3",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#818cf8",
          input: "#818cf8",
          ring: "#4f46e5",
          themeColor: "#4f46e5",
          themeColorRgb: "79, 70, 229",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #818cf8, #6366f1, #4f46e5)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1e1b4b",
        },
      },

      rose: {
        name: "Rose",
        preview: "#f43f5e",
        dark: {
          background: "#000000",
          background2: "#1a0a10",
          foreground: "#fff1f2",
          card: "#10050a",
          cardHeader: "#1f0812",
          cardForeground: "#fff1f2",
          popover: "#10050a",
          popoverForeground: "#fff1f2",
          primary: "#f43f5e",
          primaryForeground: "#ffffff",
          secondary: "#4c0519",
          secondaryForeground: "#fecdd3",
          muted: "#320a14",
          mutedForeground: "#fb7185",
          accent: "#4c0519",
          accentForeground: "#fecdd3",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#881337",
          input: "#881337",
          ring: "#f43f5e",
          themeColor: "#f43f5e",
          themeColorRgb: "244, 63, 94",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #fb7185, #f43f5e, #e11d48)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#fff1f2",
        },
        light: {
          background: "#fff1f2",
          background2: "#ffe4e6",
          foreground: "#1f0812",
          card: "#ffffff",
          cardHeader: "#ffe4e6",
          cardForeground: "#1f0812",
          popover: "#ffffff",
          popoverForeground: "#1f0812",
          primary: "#e11d48",
          primaryForeground: "#ffffff",
          secondary: "#fecdd3",
          secondaryForeground: "#9f1239",
          muted: "#fda4af",
          mutedForeground: "#be123c",
          accent: "#fff1f2",
          accentForeground: "#9f1239",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#fb7185",
          input: "#fb7185",
          ring: "#e11d48",
          themeColor: "#e11d48",
          themeColorRgb: "225, 29, 72",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #fb7185, #f43f5e, #e11d48)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1f0812",
        },
      },

      amber: {
        name: "Amber",
        preview: "#f59e0b",
        dark: {
          background: "#000000",
          background2: "#171203",
          foreground: "#fffbeb",
          card: "#0b0a06",
          cardHeader: "#1a1405",
          cardForeground: "#fffbeb",
          popover: "#0b0a06",
          popoverForeground: "#fffbeb",
          primary: "#f59e0b",
          primaryForeground: "#111827",
          secondary: "#3a2a06",
          secondaryForeground: "#fde68a",
          muted: "#251c08",
          mutedForeground: "#fbbf24",
          accent: "#3a2a06",
          accentForeground: "#fde68a",
          destructive: "#b30000",
          destructiveForeground: "#fffbeb",
          border: "#5b3a0b",
          input: "#5b3a0b",
          ring: "#f59e0b",
          themeColor: "#f59e0b",
          themeColorRgb: "245, 158, 11",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #fcd34d, #f59e0b, #d97706)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f59e0b",
          iconFill: "#fffbeb",
        },
        light: {
          background: "#fffbeb",
          background2: "#fef3c7",
          foreground: "#1f2937",
          card: "#ffffff",
          cardHeader: "#fef3c7",
          cardForeground: "#1f2937",
          popover: "#ffffff",
          popoverForeground: "#1f2937",
          primary: "#d97706",
          primaryForeground: "#ffffff",
          secondary: "#fde68a",
          secondaryForeground: "#92400e",
          muted: "#fcd34d",
          mutedForeground: "#b45309",
          accent: "#fffbeb",
          accentForeground: "#92400e",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#fbbf24",
          input: "#fbbf24",
          ring: "#d97706",
          themeColor: "#d97706",
          themeColorRgb: "217, 119, 6",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #fcd34d, #f59e0b, #d97706)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#d97706",
          iconFill: "#1f2937",
        },
      },

      lime: {
        name: "Lime",
        preview: "#84cc16",
        dark: {
          background: "#000000",
          background2: "#0c1603",
          foreground: "#f7fee7",
          card: "#070f02",
          cardHeader: "#132505",
          cardForeground: "#f7fee7",
          popover: "#070f02",
          popoverForeground: "#f7fee7",
          primary: "#84cc16",
          primaryForeground: "#052e16",
          secondary: "#2f4a0b",
          secondaryForeground: "#d9f99d",
          muted: "#1e2f07",
          mutedForeground: "#a3e635",
          accent: "#2f4a0b",
          accentForeground: "#d9f99d",
          destructive: "#b30000",
          destructiveForeground: "#f7fee7",
          border: "#3f6212",
          input: "#3f6212",
          ring: "#84cc16",
          themeColor: "#84cc16",
          themeColorRgb: "132, 204, 22",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #bef264, #84cc16, #65a30d)",
          success: "#84cc16",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f7fee7",
        },
        light: {
          background: "#f7fee7",
          background2: "#ecfccb",
          foreground: "#1a2e05",
          card: "#ffffff",
          cardHeader: "#ecfccb",
          cardForeground: "#1a2e05",
          popover: "#ffffff",
          popoverForeground: "#1a2e05",
          primary: "#65a30d",
          primaryForeground: "#ffffff",
          secondary: "#d9f99d",
          secondaryForeground: "#3f6212",
          muted: "#bef264",
          mutedForeground: "#4d7c0f",
          accent: "#f7fee7",
          accentForeground: "#3f6212",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#a3e635",
          input: "#a3e635",
          ring: "#65a30d",
          themeColor: "#65a30d",
          themeColorRgb: "101, 163, 13",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #bef264, #84cc16, #65a30d)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#1a2e05",
        },
      },

      slate: {
        name: "Slate",
        preview: "#64748b",
        dark: {
          background: "#000000",
          background2: "#0b1220",
          foreground: "#f8fafc",
          card: "#0a0f1a",
          cardHeader: "#111827",
          cardForeground: "#f8fafc",
          popover: "#0a0f1a",
          popoverForeground: "#f8fafc",
          primary: "#64748b",
          primaryForeground: "#ffffff",
          secondary: "#1f2937",
          secondaryForeground: "#e2e8f0",
          muted: "#0f172a",
          mutedForeground: "#94a3b8",
          accent: "#1f2937",
          accentForeground: "#e2e8f0",
          destructive: "#b30000",
          destructiveForeground: "#f8fafc",
          border: "#334155",
          input: "#334155",
          ring: "#64748b",
          themeColor: "#94a3b8",
          themeColorRgb: "148, 163, 184",
          overlay: "rgba(0, 0, 0, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #94a3b8, #64748b, #475569)",
          success: "#10b981",
          info: "#03fff5",
          warning: "#f1c40f",
          iconFill: "#f8fafc",
        },
        light: {
          background: "#f8fafc",
          background2: "#f1f5f9",
          foreground: "#0f172a",
          card: "#ffffff",
          cardHeader: "#f1f5f9",
          cardForeground: "#0f172a",
          popover: "#ffffff",
          popoverForeground: "#0f172a",
          primary: "#475569",
          primaryForeground: "#ffffff",
          secondary: "#e2e8f0",
          secondaryForeground: "#0f172a",
          muted: "#e2e8f0",
          mutedForeground: "#475569",
          accent: "#f1f5f9",
          accentForeground: "#0f172a",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#cbd5e1",
          input: "#cbd5e1",
          ring: "#475569",
          themeColor: "#475569",
          themeColorRgb: "71, 85, 105",
          overlay: "rgba(255, 255, 255, 0.9)",
          gradientSecondary:
            "linear-gradient(270deg, #94a3b8, #64748b, #475569)",
          success: "#16a34a",
          info: "#0891b2",
          warning: "#ca8a04",
          iconFill: "#0f172a",
        },
      },
    };

    this.themes = themes;

    const colorGridHTML = Object.entries(themes)
      .map(([key, theme]) => {
        if (theme.preview === "gradient") {
          
          return `<button class="color-btn color-btn-gradient" data-theme="${key}" aria-label="${theme.name}"></button>`;
        }
        return `<button class="color-btn" data-theme="${key}" style="--bg-color: ${theme.preview}" aria-label="${theme.name}"></button>`;
      })
      .join("");

    this.innerHTML = `
<header>
  <a href="/index.html" class="logo">
    <img
      src="/assets/image/uiuCalculatorLogo.png"
      alt="UIU Calculator Logo"
      style="height: 40px"
    />
  </a>

  <nav
    class="header-links"
    style="display: flex; align-items: center; gap: 3px"
  >
    <div class="theme-wrapper">
      <button
        class="theme-btn"
        id="theme-toggle"
        aria-label="Toggle Theme Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="sun-icon"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="moon-icon"
        >
          <path
            d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
          ></path>
        </svg>
      </button>
      <div class="theme-menu" id="theme-menu">
        <div class="theme-section-title">Appearance</div>
        <div class="mode-list">
          <button class="mode-btn" data-mode="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mode-icon"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            Light
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="check-icon"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>

          <button class="mode-btn" data-mode="dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mode-icon"
            >
              <path
                d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
              ></path>
            </svg>
            Dark
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="check-icon"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>

          <button class="mode-btn" data-mode="system">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mode-icon"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            System
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="check-icon"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
        <div class="theme-divider"></div>
        <div class="theme-section-title">Theme Color</div>
        <div class="color-grid">${colorGridHTML}</div>
      </div>
    </div>

    <button
      class="account-btn"
      id="accountBtn"
      style="
        background: transparent;
        border: none;
        color: var(--foreground);
        font-size: 1.2rem;
        cursor: pointer;
      "
    >
      <i class="fas fa-user"></i>
    </button>
   
    <button
      class="hamburger-btn"
      id="hamburgerBtn"
      style="
        background: transparent;
        border: none;
        color: var(--foreground);
        font-size: 1.5rem;
        cursor: pointer;
      "
    >
      <i class="fas fa-bars"></i>
    </button>
  </nav>
</header>

<div class="off-canvas-menu" id="offCanvasMenu">
  <div class="menu-header">
    <div class="menu-title">Menu</div>
    <button
      class="close-btn"
      style="
        background: none;
        border: none;
        color: var(--foreground);
        font-size: 1.2rem;
      "
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="menu-content">
    <div class="menu-content">
          <a href="/calculator/cgpa/index.html" class="item" style="text-decoration: none; display: block; margin-bottom: 5px;">CGPA Calculator</a>
          <a href="/calculator/tuitionfee/index.html" class="item" style="text-decoration: none; display: block; margin-bottom: 5px;">Tuition Fee Calculator</a>
          <a href="/calculator/target-cgpa/index.html" class="item" style="text-decoration: none; display: block; margin-bottom: 5px;">Smart CGPA Planner</a>
        </div>
  </div>
  <div class="menu-footer">
    <div
      class="developer-info"
      style="display: flex; gap: 10px; align-items: center"
    >
      <div class="developer-avatar">
        <img
          src="/assets/image/img.dev.webp"
          alt="Developer"
          style="width: 40px; height: 40px;"
        />
      </div>
      <div class="developer-content">
        <div
          class="developer-name"
          style="font-weight: bold; color: var(--foreground)"
        >
          Kawsar Ahmed
        </div>
        <div class="social-links">
          <a
            href="https://youtube.com/@kawsarcodes"
            target="_blank"
            style="color: var(--muted-foreground); margin-right: 5px"
            ><i class="fab fa-youtube"></i
          ></a>
          <a
            href="https://github.com/kawsarcodes"
            target="_blank"
            style="color: var(--muted-foreground); margin-right: 5px"
            ><i class="fab fa-github"></i
          ></a>
          <a
            href="https://www.facebook.com/kawsarshaikat"
            target="_blank"
            style="color: var(--muted-foreground); margin-right: 5px"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a
            href="https://instagram.com/kawsarshaikat"
            target="_blank"
            style="color: var(--muted-foreground); margin-right: 5px"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
  <div
    class="menu-footer-f1"
    style="padding: 15px; border-top: 1px solid var(--border)"
  >
    <p
      style="display: flex; gap: 5px; flex-wrap: wrap; justify-content: center"
    >
      <a href="https://www.youtube.com/@kawsarcodes" target="_blank"
        ><img
          src="https://custom-icon-badges.demolab.com/youtube/channel/subscribers/UCaWmfSoM3C7Bsthzc0tCt0Q?color=%23E05D44&label=YouTube%20Subscribers&logo=video&logoColor=white&style=flat-square&labelColor=CE4630"
          alt="Subs"
      /></a>
      <a href="https://github.com/kawsarcodes" target="_blank"
        ><img
          src="https://custom-icon-badges.demolab.com/github/stars/kawsarcodes?color=55960c&style=flat-square&labelColor=488207&logo=star&label=GitHub%20Stars"
          alt="Stars"
      /></a>
    </p>
  </div>
</div>

<div class="off-canvas-menu" id="offCanvasAccount">
  <div class="menu-header">
    <div class="menu-title">Account</div>
    <button
      class="close-btn"
      style="
        background: none;
        border: none;
        color: var(--foreground);
        font-size: 1.2rem;
      "
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="menu-content">
    <div
      class="card"
      style="
        background: var(--card);
        border: 1px solid var(--border);
        margin-bottom: 10px;
      "
    >
      <div class="card-header padding2">
        <h3
          class="card-title flex itemsC gap1 text-base"
        >
          <i class="fas fa-user textA" style="margin-right: 3px"></i> Enter your
          name
        </h3>
      </div>
      <div class="card-content">
        <input
          type="text"
          id="usernameInput"
          placeholder="Enter your name"
          style="text-align: center"
        />
      
        
      </div>
    </div>
  </div>
</div>

    `;

    this.initThemeSystem();
    setTimeout(() => {
      this.initLegacyFeatures();
    }, 100);
  }

  initThemeSystem() {
    const toggleBtn = this.querySelector("#theme-toggle");
    const menu = this.querySelector("#theme-menu");
    const modeBtns = this.querySelectorAll(".mode-btn");
    const colorBtns = this.querySelectorAll(".color-btn");

    // Load Saved Preferences (default theme is "default")
    const savedMode = localStorage.getItem("themeMode") || "dark";
    const savedTheme = localStorage.getItem("themeName") || "default";

    this.applyFullTheme(savedTheme, savedMode, false);

    // Toggle Menu Logic
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
        void menu.offsetWidth;
        menu.classList.add("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        menu.classList.remove("active");
        menu.style.display = "none";
      }
    });

    // HANDLE MODE CHANGE
    modeBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const selectedMode = btn.dataset.mode;
        const currentTheme = localStorage.getItem("themeName") || "default";

        menu.classList.remove("active");
        menu.style.display = "none";
        void menu.offsetWidth;

        setTimeout(async () => {
          if (!document.startViewTransition) {
            this.applyFullTheme(currentTheme, selectedMode, true);
            return;
          }

          const rect = toggleBtn.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y),
          );

          const isGoingToLight =
            selectedMode === "light" ||
            (selectedMode === "system" &&
              window.matchMedia("(prefers-color-scheme: light)").matches);
          const isCurrentlyLight =
            document.documentElement.classList.contains("light");

          document.documentElement.classList.add("is-transitioning");

          if (isGoingToLight)
            document.documentElement.classList.add("expand-transition");
          else document.documentElement.classList.add("shrink-transition");

          const transition = document.startViewTransition(() => {
            this.applyFullTheme(currentTheme, selectedMode, true);
          });

          await transition.ready;

          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];

          let anim;
          if (isGoingToLight && !isCurrentlyLight) {
            anim = document.documentElement.animate(
              { clipPath: clipPath },
              {
                duration: 600,
                easing: "ease-in",
                pseudoElement: "::view-transition-new(root)",
              },
            );
          } else if (!isGoingToLight && isCurrentlyLight) {
            anim = document.documentElement.animate(
              { clipPath: clipPath.reverse() },
              {
                duration: 600,
                easing: "ease-out",
                pseudoElement: "::view-transition-old(root)",
              },
            );
          } else {
            anim = { finished: Promise.resolve() };
          }

          await (anim.finished || anim);

          document.documentElement.classList.remove(
            "expand-transition",
            "shrink-transition",
          );
          setTimeout(() => {
            document.documentElement.classList.remove("is-transitioning");
          }, 50);
        }, 10);
      });
    });

    colorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const themeName = btn.dataset.theme;
        const currentMode = localStorage.getItem("themeMode") || "dark";
        this.applyFullTheme(themeName, currentMode, true);
      });
    });
  }

  applyFullTheme(themeName, mode, save = true) {
    const theme = this.themes[themeName];
    if (!theme) return;

    let actualMode = mode;
    if (mode === "system") {
      actualMode = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }

    const palette = theme[actualMode];
    const root = document.documentElement;

  
    root.style.setProperty("--background", palette.background);
    root.style.setProperty("--background2", palette.background2);
    root.style.setProperty("--foreground", palette.foreground);
    root.style.setProperty("--card", palette.card);
    root.style.setProperty("--card-header", palette.cardHeader);
    root.style.setProperty("--card-foreground", palette.cardForeground);
    root.style.setProperty("--popover", palette.popover);
    root.style.setProperty("--popover-foreground", palette.popoverForeground);
    root.style.setProperty("--primary", palette.primary);
    root.style.setProperty("--primary-foreground", palette.primaryForeground);
    root.style.setProperty("--secondary", palette.secondary);
    root.style.setProperty(
      "--secondary-foreground",
      palette.secondaryForeground,
    );
    root.style.setProperty("--muted", palette.muted);
    root.style.setProperty("--muted-foreground", palette.mutedForeground);
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--accent-foreground", palette.accentForeground);
    root.style.setProperty("--destructive", palette.destructive);
    root.style.setProperty(
      "--destructive-foreground",
      palette.destructiveForeground,
    );
    root.style.setProperty("--border", palette.border);
    root.style.setProperty("--input", palette.input);
    root.style.setProperty("--ring", palette.ring);
    root.style.setProperty("--theme-color", palette.themeColor);
    root.style.setProperty("--theme-color-rgb", palette.themeColorRgb);
    root.style.setProperty("--overlay", palette.overlay);
    root.style.setProperty("--gradient-secondary", palette.gradientSecondary);
    root.style.setProperty("--success", palette.success);
    root.style.setProperty("--info", palette.info);
    root.style.setProperty("--warning", palette.warning);
    root.style.setProperty("--icon-fill", palette.iconFill);

    root.style.colorScheme = actualMode;

    if (actualMode === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }

  
    const modeBtns = this.querySelectorAll(".mode-btn");
    modeBtns.forEach((btn) => {
      if (btn.dataset.mode === mode) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    const colorBtns = this.querySelectorAll(".color-btn");
    colorBtns.forEach((btn) => {
      if (btn.dataset.theme === themeName) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    if (save) {
      localStorage.setItem("themeMode", mode);
      localStorage.setItem("themeName", themeName);
    }
  }

  initLegacyFeatures() {
  
    const setupOffCanvas = (triggerId, panelId) => {
      const triggerBtn = this.querySelector("#" + triggerId);
      const panel = this.querySelector("#" + panelId);

      if (!triggerBtn || !panel) return;

      const closeBtn = panel.querySelector(".close-btn");

      triggerBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        this.querySelectorAll(".off-canvas-menu").forEach((p) =>
          p.classList.remove("active"),
        );
        panel.classList.add("active");
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          panel.classList.remove("active");
        });
      }

   
      document.addEventListener("click", (e) => {
        if (
          panel.classList.contains("active") &&
          !panel.contains(e.target) &&
          !triggerBtn.contains(e.target)
        ) {
          panel.classList.remove("active");
        }
      });
    };

    setupOffCanvas("hamburgerBtn", "offCanvasMenu");
    setupOffCanvas("accountBtn", "offCanvasAccount");

  
    const usernameInput = this.querySelector("#usernameInput");
    const greetingEl = document.getElementById("greeting"); 
    const cardTitle = this.querySelector(".card-title"); 

    const updateGreeting = () => {
      const hour = new Date().getHours();
      let greeting = "Good Night";
      if (hour >= 5 && hour < 12) greeting = "Good Morning";
      else if (hour >= 12 && hour < 15) greeting = "Good Noon";
      else if (hour >= 15 && hour < 18) greeting = "Good Afternoon";
      else if (hour >= 18 && hour < 24) greeting = "Good Evening";

      const rawName = localStorage.getItem("username");
      const displayName = rawName ? rawName : "UIUian";

      
      if (greetingEl) {
        
        if (window.innerWidth >= 768) {
          greetingEl.textContent = `${greeting}, ${displayName} !! 🙌`;
        } else {
          greetingEl.innerHTML = `${greeting}, ${displayName} !! 🙌`;
        }
      }
    };

 
    if (usernameInput) {
      
      const savedName = localStorage.getItem("username");
      if (savedName) usernameInput.value = savedName;

     
      usernameInput.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.trim() !== "") {
          localStorage.setItem("username", val);
        } else {
          localStorage.removeItem("username"); 
        }
        updateGreeting(); 
      });
    }

    
    updateGreeting();
    
    setInterval(updateGreeting, 60000);
    window.addEventListener("resize", updateGreeting);

    
    let searchIndex = [];
    const searchBox = this.querySelector("#searchBox"); 
    const searchResultsDiv = this.querySelector("#search-results");

  
    if (searchBox && searchResultsDiv) {
      const highlight = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<mark>$1</mark>");
      };

      const renderSearchResults = (query = "") => {
        const q = query.toLowerCase().trim();
        searchResultsDiv.innerHTML = "";

        const results =
          q === ""
            ? searchIndex
            : searchIndex.filter(
                (item) =>
                  item.title.toLowerCase().includes(q) ||
                  item.topics.some((topic) => topic.toLowerCase().includes(q)),
              );

        if (results.length === 0) {
          searchResultsDiv.innerHTML = `
                <div style="background: var(--card); border: 1px solid var(--border); padding: 30px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <i class="fas fa-exclamation-triangle" style="margin-bottom: 15px; font-size: 25px; color: var(--theme-color)"></i>
                    <p style="margin: 0; font-size: 16px; color: var(--foreground)">No results found.</p>
                </div>`;
          return;
        }

        results.forEach((result) => {
          const el = document.createElement("div");
          el.classList.add("search-result");
          el.style.borderBottom = "1px solid var(--border)";
          el.style.padding = "10px";

          let badgesHtml = `<div class="badges" style="margin-top:5px;">`;
          result.topics.forEach((topic) => {
            badgesHtml += `<span style="background: var(--muted); color: var(--foreground); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; margin-right: 4px; display:inline-block; margin-bottom:2px;">${topic}</span>`;
          });
          badgesHtml += `</div>`;

          el.innerHTML = `<h3 style="margin:0;"><a href="${result.url}" style="color:var(--theme-color); text-decoration:none;">${highlight(result.title, q)}</a></h3>${badgesHtml}`;
          searchResultsDiv.appendChild(el);
        });
      };

      const loadSearchResults = async () => {
        try {
          const response = await fetch("/assets/script/question.json");
          searchIndex = await response.json();
          renderSearchResults();
        } catch (error) {
          searchResultsDiv.innerHTML =
            '<p style="color:var(--destructive);">Failed to load search results.</p>';
        }
      };

      loadSearchResults();
      searchBox.addEventListener("input", () => {
        renderSearchResults(searchBox.value);
      });
    }
  }
}

customElements.define("header-x", globalHeader);
