const OnInitSchema = {
    type: 'object',
    required: ['context', 'message'],
    properties: {
        context: {
            type: 'object',
            required: [
                'action',
                'bap_id',
                'bap_uri',
                'bpp_id',
                'bpp_uri',
                'domain',
                'location',
                'message_id',
                'timestamp',
                'transaction_id',
                'ttl',
                'version'
            ],
            properties: {
                action: { type: 'string', enum: ['on_init'] },
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
                            properties: { code: { type: 'string', enum: ['IND'] } } 
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
                    required: ['cancellation_terms', 'fulfillments', 'items', 'payments', 'provider', 'quote'],
                    properties: {
                        cancellation_terms: {
                            type: 'array',
                            items: {
                                type: 'object',
                                oneOf: [
                                    {
                                        type: 'object',
                                        required: ['cancellation_fee', 'fulfillment_state'],
                                        properties: {
                                            cancellation_fee: { 
                                                type: 'object', 
                                                required: ['percentage'], 
                                                properties: { percentage: { type: 'string' } } 
                                            },
                                            fulfillment_state: { 
                                                type: 'object', 
                                                required: ['descriptor'], 
                                                properties: {
                                                    descriptor: { 
                                                        type: 'object', 
                                                        required: ['code'], 
                                                        properties: { code: { type: 'string' } } 
                                                    }
                                                } 
                                            }
                                        }
                                    },
                                    {
                                        type: 'object',
                                        required: ['external_ref'],
                                        properties: {
                                            external_ref: { 
                                                type: 'object', 
                                                required: ['mimetype', 'url'], 
                                                properties: {
                                                    mimetype: { type: 'string', enum: ['text/html'] },
                                                    url: { type: 'string', format: 'uri' }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        fulfillments: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['customer', 'state'],
                                properties: {
                                    customer: {
                                        type: 'object',
                                        required: ['organization'],
                                        properties: {
                                            organization: {
                                                type: 'object',
                                                required: ['address', 'city', 'contact', 'state'],
                                                properties: {
                                                    address: { type: 'string' },
                                                    city: {
                                                        type: 'object',
                                                        required: ['code', 'name'],
                                                        properties: {
                                                            code: { type: 'string' },
                                                            name: { type: 'string' }
                                                        }
                                                    },
                                                    contact: {
                                                        type: 'object',
                                                        required: ['email', 'phone'],
                                                        properties: {
                                                            email: { type: 'string', format: 'email' },
                                                            phone: { type: 'string' }
                                                        }
                                                    },
                                                    state: {
                                                        type: 'object',
                                                        required: ['name'],
                                                        properties: { name: { type: 'string' } }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    state: {
                                        type: 'object',
                                        required: ['descriptor'],
                                        properties: {
                                            descriptor: {
                                                type: 'object',
                                                required: ['code', 'name'],
                                                properties: {
                                                    code: { type: 'string' },
                                                    name: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['descriptor', 'id', 'parent_item_id', 'price', 'tags', 'xinput'],
                                properties: {
                                    descriptor: {
                                        type: 'object',
                                        required: ['code', 'name'],
                                        properties: {
                                            code: { type: 'string' },
                                            name: { type: 'string' }
                                        }
                                    },
                                    id: { type: 'string' },
                                    parent_item_id: { type: 'string' },
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
                                            required: ['descriptor', 'display', 'list'],
                                            properties: {
                                                descriptor: {
                                                    type: 'object',
                                                    required: ['code', 'name'],
                                                    properties: {
                                                        code: { type: 'string' },
                                                        name: { type: 'string' }
                                                    }
                                                },
                                                display: { type: 'boolean' },
                                                list: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        required: ['descriptor', 'value'],
                                                        properties: {
                                                            descriptor: {
                                                                type: 'object',
                                                                required: ['code', 'name', 'short_desc'],
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
                                                required: ['id', 'mime_type', 'multiple_sumbissions', 'resubmit', 'url'],
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
                                                    headings: {
                                                        type: 'array',
                                                        items: { type: 'string' }
                                                    },
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
                        payments: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['collected_by', 'id', 'status', 'tags', 'type'],
                                properties: {
                                    collected_by: { type: 'string' },
                                    id: { type: 'string' },
                                    status: { type: 'string' },
                                    tags: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            required: ['descriptor', 'display', 'list'],
                                            properties: {
                                                descriptor: {
                                                    type: 'object',
                                                    required: ['code'],
                                                    properties: { code: { type: 'string' } }
                                                },
                                                display: { type: 'boolean' },
                                                list: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        required: ['descriptor', 'value'],
                                                        properties: {
                                                            descriptor: {
                                                                type: 'object',
                                                                required: ['code'],
                                                                properties: { code: { type: 'string' } }
                                                            },
                                                            value: { type: 'string' }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    type: { type: 'string' }
                                }
                            }
                        },
                        provider: {
                            type: 'object',
                            required: ['descriptor', 'id'],
                            properties: {
                                descriptor: {
                                    type: 'object',
                                    required: ['images', 'long_desc', 'name', 'short_desc'],
                                    properties: {
                                        images: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                required: ['size_type', 'url'],
                                                properties: {
                                                    size_type: { type: 'string' },
                                                    url: { type: 'string', format: 'uri' }
                                                }
                                            }
                                        },
                                        long_desc: { type: 'string' },
                                        name: { type: 'string' },
                                        short_desc: { type: 'string' }
                                    }
                                },
                                id: { type: 'string' }
                            }
                        },
                        quote: {
                            type: 'object',
                            required: ['breakup', 'id', 'price', 'ttl'],
                            properties: {
                                breakup: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['price', 'title'],
                                        properties: {
                                            price: {
                                                type: 'object',
                                                required: ['currency', 'value'],
                                                properties: {
                                                    currency: { type:

 'string', enum: ['INR'] },
                                                    value: { type: 'string' }
                                                }
                                            },
                                            title: { type: 'string' }
                                        }
                                    }
                                },
                                id: { type: 'string' },
                                price: {
                                    type: 'object',
                                    required: ['currency', 'value'],
                                    properties: {
                                        currency: { type: 'string', enum: ['INR'] },
                                        value: { type: 'string' }
                                    }
                                },
                                ttl: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default OnInitSchema;