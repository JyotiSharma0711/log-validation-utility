const searchSchema = {
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
          action: { type: "string", enum: ["search"] },
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
        required: ["intent"],
        properties: {
          intent: {
            type: "object",
            required: ["category", "payment", "provider"],
            properties: {
              category: {
                type: "object",
                required: ["descriptor"],
                properties: {
                  descriptor: {
                    type: "object",
                    required: ["code"],
                    properties: {
                      code: { type: "string", enum: ["INVOICE_BASED_LOAN"] },
                    },
                  },
                },
              },
              payment: {
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
              provider: {
                type: "object",
                required: ["id", "items"],
                properties: {
                  id: { type: "string", enum: ["PROVIDER_ID"] },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["id", "xinput"],
                      properties: {
                        id: { type: "string", enum: ["ITEM_ID_INVOICE_LOAN"] },
                        xinput: {
                          type: "object",
                          required: ["form", "form_response"],
                          properties: {
                            form: {
                              type: "object",
                              required: ["id"],
                              properties: {
                                id: { type: "string", enum: ["F01"] },
                              },
                            },
                            form_response: {
                              type: "object",
                              required: ["status", "submission_id"],
                              properties: {
                                status: { type: "string", enum: ["APPROVED"] },
                                submission_id: { type: "string" },
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
  
  export default searchSchema;
  