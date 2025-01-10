const on_searchSchema = {
    type: "object",
    required: ["context", "message"],
    properties: {
      context: {
        type: "object",
        required: [
          "action",
          "bap_id",
          "bap_uri",
          "bpp_id",
          "bpp_uri",
          "domain",
          "location",
          "message_id",
          "timestamp",
          "transaction_id",
          "ttl",
          "version",
        ],
        properties: {
          action: { type: "string", enum: ["on_search"] },
          bap_id: { type: "string" },
          bap_uri: { type: "string", format: "uri" },
          bpp_id: { type: "string" },
          bpp_uri: { type: "string", format: "uri" },
          domain: { type: "string", enum: ["ONDC:FIS12"] },
          location: {
            type: "object",
            required: ["city", "country"],
            properties: {
              city: {
                type: "object",
                required: ["code"],
                properties: {
                  code: { type: "string", enum: ["*"] },
                },
              },
              country: {
                type: "object",
                required: ["code"],
                properties: {
                  code: { type: "string", enum: ["IND"] },
                },
              },
            },
          },
          message_id: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
          transaction_id: { type: "string" },
          ttl: { type: "string", pattern: "^PT\\d+M$" }, // ISO8601 duration for minutes
          version: { type: "string", enum: ["2.1.0"] },
        },
      },
      message: {
        type: "object",
        required: ["catalog"],
        properties: {
          catalog: {
            type: "object",
            required: ["descriptor", "providers"],
            properties: {
              descriptor: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string" },
                },
              },
              providers: {
                type: "array",
                items: {
                  type: "object",
                  required: ["categories", "descriptor", "id", "items", "payments", "tags"],
                  properties: {
                    categories: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["descriptor", "id"],
                        properties: {
                          descriptor: {
                            type: "object",
                            required: ["code", "name"],
                            properties: {
                              code: { type: "string" },
                              name: { type: "string" },
                            },
                          },
                          id: { type: "string" },
                        },
                      },
                    },
                    descriptor: {
                      type: "object",
                      required: ["name", "short_desc", "long_desc", "images"],
                      properties: {
                        name: { type: "string" },
                        short_desc: { type: "string" },
                        long_desc: { type: "string" },
                        images: {
                          type: "array",
                          items: {
                            type: "object",
                            required: ["size_type", "url"],
                            properties: {
                              size_type: { type: "string", enum: ["sm"] },
                              url: { type: "string", format: "uri" },
                            },
                          },
                        },
                      },
                    },
                    id: { type: "string" },
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["category_ids", "descriptor", "id", "matched", "recommended", "tags", "xinput"],
                        properties: {
                          category_ids: {
                            type: "array",
                            items: { type: "string" },
                          },
                          descriptor: {
                            type: "object",
                            required: ["code", "name"],
                            properties: {
                              code: { type: "string" },
                              name: { type: "string" },
                            },
                          },
                          id: { type: "string" },
                          matched: { type: "boolean" },
                          recommended: { type: "boolean" },
                          tags: {
                            type: "array",
                            items: {
                              type: "object",
                              required: ["descriptor", "display", "list"],
                              properties: {
                                descriptor: {
                                  type: "object",
                                  required: ["code", "name"],
                                  properties: {
                                    code: { type: "string" },
                                    name: { type: "string" },
                                  },
                                },
                                display: { type: "boolean" },
                                list: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    required: ["descriptor", "value"],
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        required: ["code", "name", "short_desc"],
                                        properties: {
                                          code: { type: "string" },
                                          name: { type: "string" },
                                          short_desc: { type: "string" },
                                        },
                                      },
                                      value: { type: "string" },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          xinput: {
                            type: "object",
                            required: ["form", "head", "required"],
                            properties: {
                              form: {
                                type: "object",
                                required: ["id", "mime_type", "multiple_sumbissions", "resubmit", "url"],
                                properties: {
                                  id: { type: "string" },
                                  mime_type: { type: "string", enum: ["text/html"] },
                                  multiple_sumbissions: { type: "boolean" },
                                  resubmit: { type: "boolean" },
                                  url: { type: "string", format: "uri" },
                                },
                              },
                              head: {
                                type: "object",
                                required: ["descriptor", "headings", "index"],
                                properties: {
                                  descriptor: {
                                    type: "object",
                                    required: ["name"],
                                    properties: {
                                      name: { type: "string" },
                                    },
                                  },
                                  headings: {
                                    type: "array",
                                    items: { type: "string" },
                                  },
                                  index: {
                                    type: "object",
                                    required: ["cur", "max", "min"],
                                    properties: {
                                      cur: { type: "number" },
                                      max: { type: "number" },
                                      min: { type: "number" },
                                    },
                                  },
                                },
                              },
                              required: { type: "boolean" },
                            },
                          },
                        },
                      },
                    },
                    payments: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["collected_by", "tags"],
                        properties: {
                          collected_by: { type: "string", enum: ["BPP"] },
                          tags: {
                            type: "array",
                            items: {
                              type: "object",
                              required: ["descriptor", "display", "list"],
                              properties: {
                                descriptor: {
                                  type: "object",
                                  required: ["code"],
                                  properties: {
                                    code: { type: "string" },
                                  },
                                },
                                display: { type: "boolean" },
                                list: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    required: ["descriptor", "value"],
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        required: ["code"],
                                        properties: {
                                          code: { type: "string" },
                                        },
                                      },
                                      value: { type: "string" },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    tags: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["descriptor", "list"],
                        properties: {
                          descriptor: {
                            type: "object",
                            required: ["code", "name"],
                            properties: {
                              code: { type: "string" },
                              name: { type: "string" },
                            },
                          },
                          list: {
                            type: "array",
                            items: {
                              type: "object",
                              required: ["descriptor", "value"],
                              properties: {
                                descriptor: {
                                  type: "object",
                                  required: ["code", "name"],
                                  properties: {
                                    code: { type: "string" },
                                    name: { type: "string" },
                                  },
                                },
                                value: { type: "string" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    additionalProperties: false,
  };
  
  export default  on_searchSchema;
  