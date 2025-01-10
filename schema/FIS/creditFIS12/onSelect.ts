const OnSelectSchema = {
    type: 'object',
    required: ['context', 'message'],
    properties: {
        context: {
            type: 'object',
            required: [
                'action', 'bap_id', 'bap_uri', 'bpp_id', 'bpp_uri',
                'domain', 'location', 'message_id', 'timestamp',
                'transaction_id', 'ttl', 'version'
            ],
            properties: {
                action: { type: 'string', enum: ['on_select'] },
                bap_id: { type: 'string' },
                bap_uri: { type: 'string', format: 'uri' },
                bpp_id: { type: 'string' },
                bpp_uri: { type: 'string', format: 'uri' },
                domain: { type: 'string', enum: ['ONDC:FIS12'] },
                location: {
                    type: 'object',
                    required: ['city', 'country'],
                    properties: {
                        city: { 
                            type: 'object',
                            required: ['code'],
                            properties: { code: { type: 'string' } }
                        },
                        country: { 
                            type: 'object',
                            required: ['code'],
                            properties: { code: { type: 'string' } }
                        }
                    }
                },
                message_id: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
                transaction_id: { type: 'string' },
                ttl: { type: 'string' },
                version: { type: 'string', enum: ['2.1.0'] }
            }
        },
        message: {
            type: 'object',
            required: ['order'],
            properties: {
                order: {
                    type: 'object',
                    required: ['items', 'provider', 'quote'],
                    properties: {
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['id', 'descriptor', 'price', 'tags', 'xinput'],
                                properties: {
                                    id: { type: 'string' },
                                    parent_item_id: { type: 'string' },
                                    descriptor: {
                                        type: 'object',
                                        required: ['code', 'name'],
                                        properties: {
                                            code: { type: 'string' },
                                            name: { type: 'string' }
                                        }
                                    },
                                    price: {
                                        type: 'object',
                                        required: ['currency', 'value'],
                                        properties: {
                                            currency: { type: 'string', enum: ['INR'] },
                                            value: { type: 'string' }
                                        }
                                    },
                                    tags: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: ['descriptor', 'list'],
                                            properties: {
                                                descriptor: {
                                                    type: 'object',
                                                    required: ['code', 'name'],
                                                    properties: {
                                                        code: { type: 'string' },
                                                        name: { type: 'string' }
                                                    }
                                                },
                                                list: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        required: ['descriptor', 'value'],
                                                        properties: {
                                                            descriptor: {
                                                                type: 'object',
                                                                required: ['code', 'name'],
                                                                properties: {
                                                                    code: { type: 'string' },
                                                                    name: { type: 'string' },
                                                                    short_desc: { type: 'string' }
                                                                }
                                                            },
                                                            value: { type: 'string' }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    xinput: {
                                        type: 'object',
                                        required: ['form', 'head', 'required'],
                                        properties: {
                                            form: {
                                                type: 'object',
                                                required: ['id', 'mime_type', 'url'],
                                                properties: {
                                                    id: { type: 'string' },
                                                    mime_type: { type: 'string' },
                                                    multiple_sumbissions: { type: 'boolean' },
                                                    resubmit: { type: 'boolean' },
                                                    url: { type: 'string', format: 'uri' }
                                                }
                                            },
                                            head: {
                                                type: 'object',
                                                required: ['descriptor', 'headings', 'index'],
                                                properties: {
                                                    descriptor: {
                                                        type: 'object',
                                                        required: ['name'],
                                                        properties: { name: { type: 'string' } }
                                                    },
                                                    headings: { type: 'array', items: { type: 'string' } },
                                                    index: {
                                                        type: 'object',
                                                        required: ['cur', 'max', 'min'],
                                                        properties: {
                                                            cur: { type: 'integer' },
                                                            max: { type: 'integer' },
                                                            min: { type: 'integer' }
                                                        }
                                                    }
                                                }
                                            },
                                            required: { type: 'boolean' }
                                        }
                                    }
                                }
                            }
                        },
                        provider: {
                            type: 'object',
                            required: ['id', 'descriptor', 'tags'],
                            properties: {
                                id: { type: 'string' },
                                descriptor: {
                                    type: 'object',
                                    required: ['name', 'short_desc', 'long_desc', 'images'],
                                    properties: {
                                        name: { type: 'string' },
                                        short_desc: { type: 'string' },
                                        long_desc: { type: 'string' },
                                        images: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                required: ['url', 'size_type'],
                                                properties: {
                                                    url: { type: 'string', format: 'uri' },
                                                    size_type: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                },
                                tags: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['descriptor', 'list'],
                                        properties: {
                                            descriptor: {
                                                type: 'object',
                                                required: ['code', 'name'],
                                                properties: {
                                                    code: { type: 'string' },
                                                    name: { type: 'string' }
                                                }
                                            },
                                            list: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    required: ['descriptor', 'value'],
                                                    properties: {
                                                        descriptor: {
                                                            type: 'object',
                                                            required: ['code', 'name'],
                                                            properties: {
                                                                code: { type: 'string' },
                                                                name: { type: 'string' }
                                                            }
                                                        },
                                                        value: { type: 'string' }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        quote: {
                            type: 'object',
                            required: ['id', 'price', 'ttl', 'breakup'],
                            properties: {
                                id: { type: 'string' },
                                price: {
                                    type: 'object',
                                    required: ['currency', 'value'],
                                    properties: {
                                        currency: { type: 'string', enum: ['INR'] },
                                        value: { type: 'string' }
                                    }
                                },
                                ttl: { type: 'string' },
                                breakup: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['title', 'price'],
                                        properties: {
                                            title: { type: 'string' },
                                            price: {
                                                type: 'object',
                                                required: ['currency', 'value'],
                                                properties: {
                                                    currency: { type: 'string', enum: ['INR'] },
                                                    value: { type: 'string' }
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
    },
    additionalProperties: false
};

export default OnSelectSchema;
