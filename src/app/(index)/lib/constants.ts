import { Task } from "./store";

export type LLMModel =
  | "GPT3"
  | "GPT4_TURBO"
  | "GPT4_O"
  | "GPT4_O_MINI"
  | "CLAUDE_OPUS"
  | "CLAUDE_SONNET"
  | "MISTRAL_LARGE"
  | "MISTRAL_SMALL"
  | "MISTRAL_MIXTRAL_8x22B"
  | "GOOGLE_GEMINI_PRO"
  | "LLAMA_3_8B"
  | "LLAMA_3_70B";

export const LLM_MODELS: LLMModel[] = [
  "GPT3",
  "GPT4_TURBO",
  "GPT4_O",
  "GPT4_O_MINI",
  "CLAUDE_OPUS",
  "CLAUDE_SONNET",
  "MISTRAL_LARGE",
  "MISTRAL_SMALL",
  "MISTRAL_MIXTRAL_8x22B",
  "GOOGLE_GEMINI_PRO",
  // "LLAMA_3_8B",
  // "LLAMA_3_70B",
];

export const DEFAULT_SCHEMAS: Record<Task, string> = {
  query_category: JSON.stringify(
    {
      name: "entity_linking",
      description: "Extract fitting values for the filter from the query",
      parameters: {
        title: "Intent Category Linking",
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: [
              "stats",
              "dba",
              "askubuntu",
              "gaming",
              "travel",
              "apple",
              "electronics",
              "english",
              "security",
              "physics",
              "gis",
              "scifi",
              "worldbuilding",
              "diy",
            ],
          },
        },
        required: ["category"],
      },
    },
    null,
    2
  ),
  query_segmentation: JSON.stringify(
    {
      name: "query_segmentation",
      description: "Identify attribute-value pairs in the query",
      parameters: {
        title: "Query Segmentation",
        type: "object",
        properties: {
          segments: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "string",
                  description: "The attribute name",
                },
                value: {
                  type: "string",
                  description: "The value for the attribute",
                },
              },
              required: ["attribute", "value"],
            },
          },
        },
        required: ["segments"],
      },
    },
    null,
    2
  ),
  out_of_domain: JSON.stringify(
    {
      name: "out_of_domain_detection",
      description: "Detect if a query is outside of the supported domain",
      parameters: {
        title: "Out of Domain Detection",
        type: "object",
        properties: {
          is_out_of_domain: {
            type: "boolean",
            description: "Whether the query is outside the supported domain",
          },
          confidence: {
            type: "number",
            description: "Confidence score between 0 and 1",
            minimum: 0,
            maximum: 1,
          },
          reason: {
            type: "string",
            description:
              "Explanation for why the query is considered out of domain",
          },
        },
        required: ["is_out_of_domain"],
      },
    },
    null,
    2
  ),
  custom_schema: JSON.stringify(
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "Custom Schema",
      type: "object",
      properties: {},
      required: [],
    },
    null,
    2
  ),
};

// Additional schemas that can be selected for specific tasks
export const ALTERNATIVE_SCHEMAS = {
  query_segmentation: JSON.stringify(
    {
      name: "entity_linking",
      description: "Extrahiere die Werte für die Filter aus der Konversation",
      parameters: {
        type: "object",
        description: "Parameter für die Funktion",
        properties: {
          Kategorie: {
            type: "object",
            description: "Kategorie des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Kategorie die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "Fernseher",
                    "Mobiltelefone",
                    "Tablets",
                    "Computer",
                    "Monitor",
                    "Laptops",
                    "Andere",
                  ],
                },
              },
            },
          },
          Bildschirmgroesse: {
            type: "object",
            description: "Bildschirmgroesse des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Bildschirmgroesse die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "gr\u00f6\u00dfer als 34 Zoll",
                    "kleiner als 9 Zoll",
                    "9 Zoll",
                    "10 Zoll",
                    "11 Zoll",
                    "17 Zoll",
                    "24 Zoll",
                    "gr\u00f6\u00dfer als 19 Zoll",
                    "65 - 69 Zoll",
                    "gr\u00f6\u00dfer als 84 Zoll",
                    "75 - 79 Zoll",
                    "40 - 44 Zoll",
                    "12 Zoll",
                    "28 Zoll",
                    "34 Zoll",
                    "15 Zoll",
                    "kleiner als 12 Zoll",
                    "14 Zoll",
                    "16 Zoll",
                    "32 Zoll",
                    "30 - 34 Zoll",
                    "55 - 59 Zoll",
                    "13 Zoll",
                    "27 Zoll",
                    "50 - 54 Zoll",
                  ],
                },
              },
            },
          },
          Marke: {
            type: "object",
            description: "Marke des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Marke die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "Hisense",
                    "Lenovo",
                    "Sony",
                    "Philips",
                    "Huawei",
                    "Apple",
                    "AOC",
                    "Dell",
                    "Samsung",
                    "Acer",
                    "LG",
                    "Asus",
                    "Motorola",
                    "HP",
                    "Nokia",
                    "Xiaomi",
                  ],
                },
              },
            },
          },
          Displaytechnologie: {
            type: "object",
            description: "Displaytechnologie des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Displaytechnologie die genannt wurden",
                items: { type: "string", enum: ["QLED", "IPS", "OLED"] },
              },
            },
          },
          Ausstattung: {
            type: "object",
            description: "Ausstattung des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Ausstattung die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "kabelloses Laden",
                    "Smart-TV",
                    "Stifteingabe",
                    "SSD-Festplatte",
                    "Ambilight",
                    "2 in 1 Convertible",
                    "5G",
                    "mobiles Internet",
                    "Android TV",
                    "Touch Display",
                    "Tastatur",
                    "Wifi",
                    "GPS",
                  ],
                },
              },
            },
          },
          Aufloesung: {
            type: "object",
            description: "Aufloesung des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Aufloesung die genannt wurden",
                items: {
                  type: "string",
                  enum: ["Ultra-HD-8K", "Ultra-HD", "Ultra-HD-4K"],
                },
              },
            },
          },
          Farbe: {
            type: "object",
            description: "Farbe des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Farbe die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "silberfarben",
                    "wei\u00df",
                    "rosa",
                    "blau",
                    "goldfarben",
                    "schwarz",
                  ],
                },
              },
            },
          },
          Zubehoerfuer: {
            type: "object",
            description: "Zubehoerfuer des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Zubehoerfuer die genannt wurden",
                items: { type: "string", enum: ["Gaming"] },
              },
            },
          },
          Betriebssystem: {
            type: "object",
            description: "Betriebssystem des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Betriebssystem die genannt wurden",
                items: { type: "string", enum: ["Android", "Windows"] },
              },
            },
          },
          Prozessor: {
            type: "object",
            description: "Prozessor des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Prozessor die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "Intel Core i3",
                    "M3 Pro",
                    "Intel",
                    "Intel Core i7",
                    "Intel Core i5",
                    "M1",
                    "Intel Core i9",
                    "AMD Ryzen 7",
                    "AMD Ryzen 5",
                    "M2",
                    "M2 Pro",
                    "M2 Max",
                    "M3",
                    "M3 Max",
                  ],
                },
              },
            },
          },
          Arbeitsspeicher: {
            type: "object",
            description: "Arbeitsspeicher des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Arbeitsspeicher die genannt wurden",
                items: {
                  type: "string",
                  enum: ["32 GB", "64 GB", "16 GB", "8 GB", "256 GB"],
                },
              },
            },
          },
          Speicherkapazitaet: {
            type: "object",
            description: "Speicherkapazitaet des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Speicherkapazitaet die genannt wurden",
                items: {
                  type: "string",
                  enum: ["512 GB", "1 TB", "2 TB", "128 GB", "256 GB"],
                },
              },
            },
          },
          Modellreihe: {
            type: "object",
            description: "Modellreihe des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Modellreihe die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "Spin 3",
                    "MacBook Pro",
                    "iPad Air",
                    "Chromebook",
                    "iPhone 15",
                    "iPhone 14",
                    "Galaxy S24",
                    "Galaxy S23",
                    "iPad Pro",
                    "iPhone 12",
                    "iPhone 15 Pro",
                    "Galaxy S22",
                    "MacBook Air",
                    "MacBook",
                    "Galaxy",
                    "iPhone 13",
                    "A54",
                    "iPad",
                  ],
                },
              },
            },
          },
          Grafikkarte: {
            type: "object",
            description: "Grafikkarte des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Grafikkarte die genannt wurden",
                items: {
                  type: "string",
                  enum: [
                    "RTX 4060",
                    "RTX 4090",
                    "RTX 3070",
                    "GeForce RTX 4070",
                    "GeForce RTX 4090",
                  ],
                },
              },
            },
          },
          Bildwiederholungsfrequenz: {
            type: "object",
            description: "Bildwiederholungsfrequenz des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Bildwiederholungsfrequenz die genannt wurden",
                items: {
                  type: "string",
                  enum: ["144 Hz", "240 Hz", "165 Hz", "120 Hz"],
                },
              },
            },
          },
          Art: {
            type: "object",
            description: "Art des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Art die genannt wurden",
                items: { type: "string", enum: ["curved"] },
              },
            },
          },
          Reaktionszeit: {
            type: "object",
            description: "Reaktionszeit des gewünschten Produkts.",
            properties: {
              values: {
                type: "array",
                description: "Reaktionszeit die genannt wurden",
                items: { type: "string", enum: ["bis 1 ms"] },
              },
            },
          },
          Preis: {
            type: "object",
            description:
              "Preis des gewünschten Produkts. Preis ist angegegeben in Euro.",
            properties: {
              min: {
                type: "integer",
                description: "Mindest-Preis des gewünschten Produkts",
                minimum: 0,
              },
              max: {
                type: "integer",
                description: "Maximal-Preis des gewünschten Produkts",
                minimum: 0,
              },
              noSpecificUserPreference: {
                type: "boolean",
                description:
                  "True wenn der Kunde keine bestimmte Präferenz für den Preis hat, sonst False",
              },
            },
          },
        },
      },
    },
    null,
    4
  ),
  query_category: JSON.stringify({
    name: "entity_linking",
    description: "Extract fitting values for the filter from the query",
    parameters: {
      title: "Intent Category Linking",
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: [
            "elementor",
            "gantt-chart",
            "conditional-operator",
            "google-glass",
            "visual-c++-6",
            "uisearchbar",
            "table-valued-parameters",
            "directoryservices",
            "physics",
            "fuseki",
            "openapi",
            "branch",
            "qt-quick",
            "asymptotic-complexity",
            "mouseenter",
            "scifi",
            "ckeditor4.x",
            "eventkit",
            "scapy",
            "destructor",
            "mercurial",
            "google-play",
            "mingw",
            "gcc-warning",
            "vhosts",
            "uiactionsheet",
            "yelp",
            "glib",
            "retry-logic",
            "calabash",
            "config",
            "stdin",
            "azure-powershell",
            "english",
            "right-to-left",
            "electronics",
            "rasterio",
            "drawrect",
            "icmp",
            "diy",
            "absolute",
            "telegram-bot",
            "nginx-location",
            "big-o",
            "speech-synthesis",
            "facebook-prophet",
            "sparql",
            "apache-phoenix",
            "robots.txt",
            "worldbuilding",
            "teradata-sql-assistant",
            "video",
            "gif",
            "mdf",
            "digital-ocean",
            "quaternions",
            "askubuntu",
            "xcode5",
            "bridge",
            "corda",
            "datastax-java-driver",
            "backgroundworker",
            "odp.net",
            "itext7",
            "image-scaling",
            "opc-ua",
            "leveldb",
            "security",
            "google-maps-markers",
            "swift-protocols",
            "operating-system",
            "codeblocks",
            "admin-on-rest",
            "travel",
            "channel",
            "ractivejs",
            "git-config",
            "numpy-slicing",
            "self-join",
            "data-visualization",
            "openshift-origin",
            "openai-gym",
            "androiddesignsupport",
            "reindex",
            "stats",
            "nhibernate-mapping",
            "css-tables",
            "internet-explorer",
            "livecode",
            "alamofire",
            "nosql",
            "brightness",
            "android-snackbar",
            "sqlcmd",
            "f#",
            "codemirror",
            "typescript-typings",
            "google-docs",
            "redux-toolkit",
            "overriding",
            "pull-request",
            "nvd3.js",
            "joomla",
            "mailto",
            "preg-match",
            "xamarin.mac",
            "openiddict",
            "addressbook",
            "discord",
            "openapi-generator",
            "subscribe",
            "dba",
            "union",
            "postcss",
            "std-ranges",
            "ado.net-entity-data-model",
            "opl",
            "ruby-1.9.3",
            "unauthorized",
            "azure-devops-rest-api",
            "httpcookie",
            "gridsearchcv",
            "iterable",
            "fixtures",
            "web-component",
            "android-sharedpreferences",
            "avaudiorecorder",
            "windbg",
            "micronaut",
            "gaming",
            "angularjs-ng-click",
            "fill",
            "spinner",
            "laravel-artisan",
            "qlabel",
            "csrf",
            "mobilefirst-server",
            "bittorrent",
            "etcd",
            "words",
            "android-jetpack-navigation",
            "doctype",
            "bitmapdata",
            "case",
            "pause",
            "arm64",
            "gis",
            "calloc",
            "rollback",
            "contact-form-7",
            "filechooser",
            "systemctl",
            "javascriptserializer",
            "android-navigation",
            "autorotate",
            "asp.net",
            "x++",
            "sql-delete",
            "volume",
            "redis",
            "grepl",
            "x86-16",
            "apple",
            "cgrect",
          ],
        },
      },
      required: ["category"],
    },
  }),
};

export const DEFAULT_JSON_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
  },
  "required": [
  ]
}`;

export const ATTRIBUTE_COLORS = [
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
  "bg-red-100 text-red-800 border-red-200",
  "bg-teal-100 text-teal-800 border-teal-200",
];

export const MONACO_DEFAULT_OPTIONS = {
  minimap: { enabled: false },
  automaticLayout: true,
};
