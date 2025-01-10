const initSchema = {
    type: 'object',
    required: ['context', 'message'],
    properties: {
      context: {
        type: 'object',
        required: [
          'domain',
          'location',
          'version',
          'action',
          'bap_id',
          'bap_uri',
          'bpp_id',
          'bpp_uri',
          'transaction_id',
          'message_id',
          'timestamp',
          'ttl',
        ],
        properties: {
          domain: { type: 'string', enum: ['ONDC:FIS12'] },
          location: {
            type: 'object',
            required: ['country', 'city'],
            properties: {
              country: {
                type: 'object',
                required: ['code'],
                properties: {
                  code: { type: 'string' },
                },
              },
              city: {
                type: 'object',
                required: ['code'],
                properties: {
                  code: { type: 'string' },
                },
              },
            },
          },
          version: { type: 'string', enum: ['2.1.0'] },
          action: { type: 'string', enum: ['init'] },
          bap_id: { type: 'string' },
          bap_uri: { type: 'string', format: 'uri' },
          bpp_id: { type: 'string' },
          bpp_uri: { type: 'string', format: 'uri' },
          transaction_id: { type: 'string' },
          message_id: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          ttl: { type: 'string' },
        },
      },
      message: {
        type: 'object',
        required: ['order', 'payments'],
        properties: {
          order: {
            type: 'object',
            required: ['items'],
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['id', 'parent_item_id', 'xinput'],
                  properties: {
                    id: { type: 'string' },
                    parent_item_id: { type: 'string' },
                    xinput: {
                      type: 'object',
                      required: ['form', 'form_response'],
                      properties: {
                        form: {
                          type: 'object',
                          required: ['id'],
                          properties: {
                            id: { type: 'string' },
                          },
                        },
                        form_response: {
                          type: 'object',
                          required: ['status', 'submission_id'],
                          properties: {
                            status: { type: 'string', enum: ['SUCCESS'] },
                            submission_id: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
            },
          },
          payments: {
            type: 'array',
            items: {
              type: 'object',
              required: ['collected_by', 'id', 'params', 'status', 'tags', 'type'],
              properties: {
                collected_by: { type: 'string', enum: ['BPP'] },
                id: { type: 'string' },
                params: {
                  type: 'object',
                  required: ['bank_account_number', 'bank_code', 'virtual_payment_address'],
                  properties: {
                    bank_account_number: { type: 'string' },
                    bank_code: { type: 'string' },
                    virtual_payment_address: { type: 'string' },
                  },
                },
                status: { type: 'string', enum: ['NOT-PAID'] },
                tags: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['descriptor'],
                    properties: {
                      descriptor: {
                        type: 'object',
                        required: ['code'],
                        properties: {
                          code: { type: 'string' },
                        },
                      },
                      display: { type: 'boolean' },
                      list: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['descriptor'],
                          properties: {
                            descriptor: {
                              type: 'object',
                              required: ['code'],
                              properties: {
                                code: { type: 'string' },
                              },
                            },
                            value: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
                type: { type: 'string', enum: ['ON_ORDER'] },
              },
            },
          },
          provider: {
            type: 'object',
            required: ['id'],
            properties: {
              id: { type: 'string' },
            },
          },
        },
      },
    },
    additionalProperties: false,
  };
  
  export default initSchema;
  