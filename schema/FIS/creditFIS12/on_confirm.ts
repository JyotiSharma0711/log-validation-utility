const OnConfirmSchema = {
  type: 'object',
  required: ['context', 'message'],
  additionalProperties: false,
  properties: {
    context: {
      type: 'object',
      required: ['domain', 'location', 'version', 'action', 'bap_uri', 'bap_id', 'bpp_id', 'bpp_uri', 'transaction_id', 'message_id', 'ttl', 'timestamp'],
      additionalProperties: false,
      properties: {
        domain: { type: 'string' },
        location: {
          type: 'object',
          required: ['country', 'city'],
          properties: {
            country: {
              type: 'object',
              required: ['code'],
              properties: {
                code: { type: 'string' }
              }
            },
            city: {
              type: 'object',
              required: ['code'],
              properties: {
                code: { type: 'string' }
              }
            }
          }
        },
        version: { type: 'string' },
        action: { type: 'string',enum: ['on_confirm'] },
        bap_uri: { type: 'string' },
        bap_id: { type: 'string' },
        bpp_id: { type: 'string' },
        bpp_uri: { type: 'string' },
        transaction_id: { type: 'string' },
        message_id: { type: 'string' },
        ttl: { type: 'string' },
        timestamp: { type: 'string' }
      }
    },
    message: {
      type: 'object',
      required: ['order'],
      additionalProperties: false,
      properties: {
        order: {
          type: 'object',
          required: ['id', 'provider', 'items', 'quote', 'fulfillments', 'payments', 'cancellation_terms', 'documents'],
          additionalProperties: false,
          properties: {
            id: { type: 'string' },
            provider: {
              type: 'object',
              required: ['id', 'descriptor'],
              properties: {
                id: { type: 'string' },
                descriptor: {
                  type: 'object',
                  required: ['images', 'name', 'short_desc', 'long_desc'],
                  properties: {
                    images: {
                      type: 'array',
                      items: {
                        type: 'object',
                        required: ['url', 'size_type'],
                        properties: {
                          url: { type: 'string' },
                          size_type: { type: 'string' }
                        }
                      }
                    },
                    name: { type: 'string' },
                    short_desc: { type: 'string' },
                    long_desc: { type: 'string' }
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
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'parent_item_id', 'descriptor', 'price', 'tags'],
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
                      currency: { type: 'string' },
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
              }
            },
            quote: {
              type: 'object',
              required: ['id', 'price', 'breakup', 'ttl'],
              properties: {
                id: { type: 'string' },
                price: {
                  type: 'object',
                  required: ['currency', 'value'],
                  properties: {
                    currency: { type: 'string' },
                    value: { type: 'string' }
                  }
                },
                breakup: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['title', 'price'],
                    properties: {
                      title: { type: 'string' },
                      price: {
                        type: 'object',
                        required: ['value', 'currency'],
                        properties: {
                          value: { type: 'string' },
                          currency: { type: 'string' }
                        }
                      }
                    }
                  }
                },
                ttl: { type: 'string' }
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
                        required: ['address', 'state', 'city', 'contact'],
                        properties: {
                          address: { type: 'string' },
                          state: {
                            type: 'object',
                            required: ['name'],
                            properties: {
                              name: { type: 'string' }
                            }
                          },
                          city: {
                            type: 'object',
                            required: ['name', 'code'],
                            properties: {
                              name: { type: 'string' },
                              code: { type: 'string' }
                            }
                          },
                          contact: {
                            type: 'object',
                            required: ['phone', 'email'],
                            properties: {
                              phone: { type: 'string' },
                              email: { type: 'string' }
                            }
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
                        required: ['code'],
                        properties: {
                          code: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            },
            payments: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'type', 'status', 'collected_by', 'tags'],
                properties: {
                  id: { type: 'string' },
                  type: { type: 'string' },
                  status: { type: 'string' },
                  collected_by: { type: 'string' },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['descriptor', 'list'],
                      properties: {
                        descriptor: {
                          type: 'object',
                          required: ['code'],
                          properties: {
                            code: { type: 'string' }
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
                                required: ['code'],
                                properties: {
                                  code: { type: 'string' }
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
              }
            },
            cancellation_terms: {
              type: 'array',
              items: {
                type: 'object',
                required: ['fulfillment_state', 'cancellation_fee'],
                properties: {
                  fulfillment_state: {
                    type: 'object',
                    required: ['descriptor'],
                    properties: {
                      descriptor: {
                        type: 'object',
                        required: ['code'],
                        properties: {
                          code: { type: 'string' }
                        }
                      }
                    }
                  },
                  cancellation_fee: {
                    type: 'object',
                    required: ['percentage'],
                    properties: {
                      percentage: { type: 'string' }
                    }
                  }
                }
              }
            },
            documents: {
              type: 'array',
              items: {
                type: 'object',
                required: ['descriptor', 'mime_type', 'url'],
                properties: {
                  descriptor: {
                    type: 'object',
                    required: ['code', 'name'],
                    properties: {
                      code: { type: 'string' },
                      name: { type: 'string' }
                    }
                  },
                  mime_type: { type: 'string' },
                  url: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default OnConfirmSchema;