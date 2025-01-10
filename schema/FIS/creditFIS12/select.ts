const SelectSchema = {
    type: 'object',
    required: ['context', 'message'],
    properties: {
      context: {
        type: 'object',
        required: [
          'domain',
          'location',
          'transaction_id',
          'message_id',
          'action',
          'timestamp',
          'version',
          'bap_uri',
          'bap_id',
          'ttl',
          'bpp_id',
          'bpp_uri',
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
                  code: { type: 'string', enum: ['IND'] },
                },
              },
              city: {
                type: 'object',
                required: ['code'],
                properties: {
                  code: { type: 'string', enum: ['*'] },
                },
              },
            },
          },
          transaction_id: { type: 'string' },
          message_id: { type: 'string' },
          action: { type: 'string', enum: ['select'] },
          timestamp: { type: 'string', format: 'date-time' },
          version: { type: 'string', enum: ['2.1.0'] },
          bap_uri: { type: 'string', format: 'uri' },
          bap_id: { type: 'string' },
          ttl: { type: 'string' },
          bpp_id: { type: 'string' },
          bpp_uri: { type: 'string', format: 'uri' },
        },
      },
      message: {
        type: 'object',
        required: ['order'],
        properties: {
          order: {
            type: 'object',
            required: ['provider', 'items'],
            properties: {
              provider: {
                type: 'object',
                required: ['id'],
                properties: {
                  id: { type: 'string' },
                },
              },
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
        },
      },
    },
    additionalProperties: false,
  };
  
  export default SelectSchema;
  