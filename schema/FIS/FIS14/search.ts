export const searchSchema = {
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
          bap_uri: { type: 'string', minLength: 1, format: 'url' },
          transaction_id: { type: 'string', minLength: 1 },
          message_id: { type: 'string', minLength: 1 },
          version: { type: 'string', const: '2.0.0' },
          ttl: { type: 'string', format: 'duration' },
          action: { type: 'string', const: 'search' }
        },
        required: [
          'location', 'domain', 'timestamp', 'bap_id', 'bap_uri',
          'transaction_id', 'message_id', 'version', 'ttl', 'action'
        ]
      },
      message: {
        type: 'object',
        properties: {
          intent: {
            type: 'object',
            properties: {
              category: {
                type: 'object',
                properties: {
                  descriptor: {
                    type: 'object',
                    properties: {
                      code: { type: 'string', minLength: 1 }
                    },
                    required: ['code']
                  }
                },
                required: ['descriptor']
              },
              fulfillment: {
                type: 'object',
                properties: {
                  agent: {
                    type: 'object',
                    properties: {
                      organization: {
                        type: 'object',
                        properties: {
                          creds: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                id: { type: 'string', minLength: 1 },
                                type: { type: 'string', enum: ['ARN'] }
                              },
                              required: ['id', 'type']
                            }
                          }
                        },
                        required: ['creds']
                      }
                    },
                    required: ['organization']
                  }
                },
                required: ['agent']
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
                        name: { type: 'string', minLength: 1 },
                        code: { type: 'string', enum: ['BAP_TERMS'] }
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
                              name: { type: 'string', minLength: 1 },
                              code: {
                                type: 'string',
                                enum: ['STATIC_TERMS', 'OFFLINE_CONTRACT']
                              }
                            },
                            required: ['name', 'code']
                          },
                          value: { type: 'string', minLength: 1 }
                        },
                        required: ['descriptor', 'value']
                      }
                    }
                  },
                  required: ['display', 'descriptor', 'list']
                }
              }
            },
            required: ['category', 'fulfillment', 'tags']
          }
        },
        required: ['intent']
      }
    },
    required: ['context', 'message']
  };