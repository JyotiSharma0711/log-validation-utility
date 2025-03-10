export const onSearchSchema = {
    type: 'object',
    properties: {
      context: {
        type: 'object',
        properties: {
          location: {
            type: 'object',
            properties: {
              country: {
                type: 'object',
                properties: {
                  code: { type: 'string', minLength: 1 }
                },
                required: ['code']
              },
              city: {
                type: 'object',
                properties: {
                  code: { type: 'string', minLength: 1 }
                },
                required: ['code']
              }
            },
            required: ['country', 'city']
          },
          domain: { type: 'string', minLength: 1 },
          timestamp: { type: 'string', format: 'rfc3339-date-time' },
          bap_id: { type: 'string', minLength: 1 },
          bap_uri: { type: 'string', format: 'url' },
          transaction_id: { type: 'string', minLength: 1 },
          message_id: { type: 'string', minLength: 1 },
          version: { type: 'string', minLength: 1 },
          ttl: { type: 'string', format: 'duration' },
          bpp_id: { type: 'string', minLength: 1 },
          bpp_uri: { type: 'string', format: 'url' },
          action: { type: 'string', const: 'on_search' }
        },
        required: [
          'location', 'domain', 'timestamp', 'bap_id', 'bap_uri', 'transaction_id', 
          'message_id', 'version', 'ttl', 'bpp_id', 'bpp_uri', 'action'
        ]
      },
      message: {
        type: 'object',
        properties: {
          catalog: {
            type: 'object',
            properties: {
              descriptor: {
                type: 'object',
                properties: {
                  name: { type: 'string' }
                },
                required: ['name']
              },
              providers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', minLength: 1 },
                    descriptor: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' }
                      },
                      required: ['name']
                    },
                    categories: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          descriptor: {
                            type: 'object',
                            properties: {
                              name: { type: 'string' },
                              code: { type: 'string' }
                            },
                            required: ['name', 'code']
                          },
                          parent_category_id: { type: 'string' }
                        },
                        required: ['id', 'descriptor']
                      }
                    },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          descriptor: {
                            type: 'object',
                            properties: {
                              name: { type: 'string' },
                              code: { type: 'string' }
                            },
                            required: ['name', 'code']
                          },
                          category_ids: {
                            type: 'array',
                            items: { type: 'string' }
                          },
                          matched: { type: 'boolean' },
                          parent_item_id: { type: 'string' },
                          fulfillment_ids: {
                            type: 'array',
                            items: { type: 'string' }
                          },
                          tags: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                display: { type: 'boolean' },
                                descriptor: {
                                  type: 'object',
                                  properties: {
                                    name: { type: 'string' },
                                    code: { type: 'string' }
                                  },
                                  required: ['name', 'code']
                                },
                                list: {
                                  type: 'array',
                                  items: {
                                    type: 'object',
                                    properties: {
                                      descriptor: {
                                        type: 'object',
                                        properties: {
                                          name: { type: 'string' },
                                          code: { type: 'string' }
                                        },
                                        required: ['name', 'code']
                                      },
                                      value: { type: 'string' }
                                    },
                                    required: ['descriptor', 'value']
                                  }
                                }
                              },
                              required: ['display', 'descriptor', 'list']
                            }
                          }
                        },
                        required: ['id', 'descriptor', 'category_ids', 'matched']
                      }
                    }
                  },
                  required: ['id', 'descriptor']
                }
              }
            },
            required: ['descriptor', 'providers']
          }
        },
        required: ['catalog']
      }
    },
    required: ['context', 'message']
  };
  