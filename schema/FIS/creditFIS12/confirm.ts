const ConfirmSchema = {
    type: "object",
    required: ["context", "message"],
    properties: {
        context: {
            type: "object",
            required: [
                "domain",
                "location",
                "transaction_id",
                "message_id",
                "action",
                "timestamp",
                "version",
                "bap_uri",
                "bap_id",
                "bpp_id",
                "bpp_uri",
                "ttl"
            ],
            properties: {
                domain: { type: "string", enum: ["ONDC:FIS12"] },
                location: {
                    type: "object",
                    required: ["country", "city"],
                    properties: {
                        country: {
                            type: "object",
                            required: ["code"],
                            properties: { code: { type: "string", enum: ["IND"] } }
                        },
                        city: {
                            type: "object",
                            required: ["code"],
                            properties: { code: { type: "string" } }
                        }
                    }
                },
                transaction_id: { type: "string" },
                message_id: { type: "string" },
                action: { type: "string", enum: ["confirm"] },
                timestamp: { type: "string", format: "date-time" },
                version: { type: "string", enum: ["2.1.0"] },
                bap_uri: { type: "string", format: "uri" },
                bap_id: { type: "string" },
                bpp_id: { type: "string" },
                bpp_uri: { type: "string", format: "uri" },
                ttl: { type: "string" }
            }
        },
        message: {
            type: "object",
            required: ["order"],
            properties: {
                order: {
                    type: "object",
                    required: ["provider", "items", "payments"],
                    properties: {
                        provider: {
                            type: "object",
                            required: ["id"],
                            properties: { id: { type: "string" } }
                        },
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["id", "parent_item_id", "xinput"],
                                properties: {
                                    id: { type: "string" },
                                    parent_item_id: { type: "string" },
                                    xinput: {
                                        type: "object",
                                        required: ["form", "form_response"],
                                        properties: {
                                            form: {
                                                type: "object",
                                                required: ["id"],
                                                properties: { id: { type: "string" } }
                                            },
                                            form_response: {
                                                type: "object",
                                                required: ["status", "submission_id"],
                                                properties: {
                                                    status: { type: "string" },
                                                    submission_id: { type: "string" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        payments: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["id", "collected_by", "type", "params", "tags"],
                                properties: {
                                    id: { type: "string" },
                                    collected_by: { type: "string" },
                                    type: { type: "string" },
                                    params: {
                                        type: "object",
                                        required: ["bank_code", "bank_account_number", "virtual_payment_address"],
                                        properties: {
                                            bank_code: { type: "string" },
                                            bank_account_number: { type: "string" },
                                            virtual_payment_address: { type: "string" }
                                        }
                                    },
                                    tags: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["descriptor", "display", "list"],
                                            properties: {
                                                descriptor: {
                                                    type: "object",
                                                    required: ["code"],
                                                    properties: { code: { type: "string" } }
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
                                                                properties: { code: { type: "string" } }
                                                            },
                                                            value: { type: "string" }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default ConfirmSchema;