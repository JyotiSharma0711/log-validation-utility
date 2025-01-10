const updateSchema = {
    type: 'object',
    required: ['context', 'message'],
    additionalProperties: false,
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
          'bpp_uri'
        ],
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
          transaction_id: { type: 'string' },
          message_id: { type: 'string' },
          action: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          version: { type: 'string' },
          bap_uri: { type: 'string', format: 'uri' },
          bap_id: { type: 'string' },
          ttl: { type: 'string' },
          bpp_id: { type: 'string' },
          bpp_uri: { type: 'string', format: 'uri' }
        }
      },
      message: {
        type: 'object',
        required: ['update_target', 'order'],
        additionalProperties: false,
        properties: {
          update_target: { type: 'string' },
          order: {
            type: 'object',
            required: ['id', 'payments'],
            additionalProperties: false,
            properties: {
              id: { type: 'string' },
              payments: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['time'],
                  additionalProperties: false,
                  properties: {
                    time: {
                      type: 'object',
                      required: ['label'],
                      properties: {
                        label: { type: 'string' }
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
  
  export default updateSchema;
  
//   const initSchema = {
//     type: 'object',
//     required: ['context', 'message'],
//     properties: {
//       context: {
//         type: 'object',
//         required: ['domain', 'location', 'transaction_id', 'message_id', 'action', 'timestamp', 'version', 'bap_uri', 'bap_id', 'ttl', 'bpp_id', 'bpp_uri'],
//         properties: {
//           domain: { type: 'string' },
//           location: {
//             type: 'object',
//             required: ['country', 'city'],
//             properties: {
//               country: {
//                 type: 'object',
//                 required: ['code'],
//                 properties: {
//                   code: { type: 'string' }
//                 }
//               },
//               city: {
//                 type: 'object',
//                 required: ['code'],
//                 properties: {
//                   code: { type: 'string' }
//                 }
//               }
//             }
//           },
//           transaction_id: { type: 'string' },
//           message_id: { type: 'string' },
//           action: { type: 'string' },
//           timestamp: { type: 'string', format: 'date-time' },
//           version: { type: 'string' },
//           bap_uri: { type: 'string', format: 'uri' },
//           bap_id: { type: 'string' },
//           ttl: { type: 'string' },
//           bpp_id: { type: 'string' },
//           bpp_uri: { type: 'string', format: 'uri' }
//         }
//       },
//       message: {
//         type: 'object',
//         required: ['update_target', 'order'],
//         properties: {
//           update_target: { type: 'string' },
//           order: {
//             type: 'object',
//             required: ['id', 'fulfillments'],
//             properties: {
//               id: { type: 'string' },
//               fulfillments: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   required: ['state'],
//                   properties: {
//                     state: {
//                       type: 'object',
//                       required: ['descriptor'],
//                       properties: {
//                         descriptor: {
//                           type: 'object',
//                           required: ['code'],
//                           properties: {
//                             code: { type: 'string' }
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     },
//     additionalProperties: false
//   };
  
//   export default initSchema;
  