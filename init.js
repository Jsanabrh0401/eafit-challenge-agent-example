
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/v1/agent": {
        "get": {
          "description": "Returns the core configuration and status of this VS Agent instance, including the user-facing label, available endpoints, initialization state, and public DID (if set).",
          "operationId": "VsAgentController_getAgentInfo_v1",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Agent information retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VsAgentInfoDto"
                  }
                }
              }
            }
          },
          "summary": "Get vs-agent information",
          "tags": [
            "agent"
          ]
        }
      },
      "/v1/connections": {
        "get": {
          "description": "Retrieve all connection records, optionally filtered by query parameters.",
          "operationId": "ConnectionController_getAllConnections_v1",
          "parameters": [
            {
              "name": "outOfBandId",
              "required": false,
              "in": "query",
              "description": "Filter by Out-of-band ID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "state",
              "required": false,
              "in": "query",
              "description": "Filter by connection state",
              "schema": {
                "enum": [
                  "start",
                  "invitation-sent",
                  "invitation-received",
                  "request-sent",
                  "request-received",
                  "response-sent",
                  "response-received",
                  "abandoned",
                  "completed"
                ],
                "type": "string"
              }
            },
            {
              "name": "did",
              "required": false,
              "in": "query",
              "description": "Filter by my DID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "theirDid",
              "required": false,
              "in": "query",
              "description": "Filter by their DID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "threadId",
              "required": false,
              "in": "query",
              "description": "Filter by thread ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Array of connection records",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ConnectionDto"
                    }
                  }
                }
              }
            }
          },
          "summary": "List all connections",
          "tags": [
            "connections"
          ]
        }
      },
      "/v1/connections/{connectionId}": {
        "get": {
          "description": "Retrieve a single connection record by its unique identifier.",
          "operationId": "ConnectionController_getConnectionById_v1",
          "parameters": [
            {
              "name": "connectionId",
              "required": true,
              "in": "path",
              "description": "UUID of the connection",
              "schema": {
                "example": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Connection record",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ConnectionDto"
                  }
                }
              }
            },
            "404": {
              "description": "Connection not found"
            }
          },
          "summary": "Get a connection by ID",
          "tags": [
            "connections"
          ]
        },
        "delete": {
          "description": "Deletes a connection record by its unique identifier.",
          "operationId": "ConnectionController_deleteConnection_v1",
          "parameters": [
            {
              "name": "connectionId",
              "required": true,
              "in": "path",
              "description": "UUID of the connection to delete",
              "schema": {
                "example": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Connection deleted successfully"
            },
            "404": {
              "description": "Connection not found"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "summary": "Delete a connection",
          "tags": [
            "connections"
          ]
        }
      },
      "/v1/credential-types": {
        "get": {
          "operationId": "CredentialTypesController_getAllCredentialTypes_v1",
          "parameters": [],
          "responses": {
            "200": {
              "description": "An array of credential type results",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/CreateCredentialTypeDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "credential-types"
          ]
        },
        "post": {
          "operationId": "CredentialTypesController_createCredentialType_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Payload to create a new AnonCreds credential definition",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCredentialTypeDto"
                },
                "examples": {
                  "phoneNumber": {
                    "summary": "Phone Number VC",
                    "value": {
                      "name": "phoneNumber",
                      "version": "1.0",
                      "attributes": [
                        "phoneNumber"
                      ],
                      "supportRevocation": true
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Created credential type info",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateCredentialTypeDto"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request payload"
            }
          },
          "summary": "Create a new credential type",
          "tags": [
            "credential-types"
          ]
        }
      },
      "/v1/credential-types/{credentialTypeId}": {
        "delete": {
          "operationId": "CredentialTypesController_deleteCredentialTypeById_v1",
          "parameters": [
            {
              "name": "credentialTypeId",
              "required": true,
              "in": "query",
              "description": "Identifier of the credential definition to delete",
              "schema": {
                "example": "VcDef:issuer:1234:TAG:1",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Credential type deleted successfully (204 No Content)"
            },
            "400": {
              "description": "Invalid credentialTypeId"
            }
          },
          "summary": "Delete a credential type and all its crypto data",
          "tags": [
            "credential-types"
          ]
        }
      },
      "/v1/credential-types/export/{credentialTypeId}": {
        "get": {
          "operationId": "CredentialTypesController_exportCredentialTypeById_v1",
          "parameters": [
            {
              "name": "credentialTypeId",
              "required": true,
              "in": "path",
              "description": "Identifier of the credential definition to export",
              "schema": {
                "example": "VcDef:issuer:1234:TAG:1",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Exported credential type package",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            }
          },
          "summary": "Export a credential type for import elsewhere",
          "tags": [
            "credential-types"
          ]
        }
      },
      "/v1/credential-types/import": {
        "post": {
          "operationId": "CredentialTypesController_importCredentialType_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Credential definition package for import",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCredentialTypeDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Imported credential type info",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateCredentialTypeDto"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid import package"
            }
          },
          "summary": "Import a credential type package",
          "tags": [
            "credential-types"
          ]
        }
      },
      "/v1/credential-types/revocationRegistry": {
        "post": {
          "operationId": "CredentialTypesController_createRevocationRegistry_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Options to create a revocation registry",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRevocationRegistryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Revocation registry definition identifier",
              "content": {
                "application/json": {
                  "schema": {
                    "example": "RevRegDef:issuer:1234:TAG:default"
                  }
                }
              }
            }
          },
          "summary": "Create a new revocation registry definition",
          "tags": [
            "credential-types"
          ]
        },
        "get": {
          "operationId": "CredentialTypesController_getRevocationDefinitions_v1",
          "parameters": [
            {
              "name": "credentialDefinitionId",
              "required": false,
              "in": "query",
              "description": "Filter registries for a specific credential definition",
              "schema": {
                "example": "VcDef:issuer:1234:TAG:1",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Array of revocation registry definition IDs",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "example": [
                      "RevRegDef:issuer:1234:TAG:default"
                    ]
                  }
                }
              }
            }
          },
          "summary": "List revocation registry definitions",
          "tags": [
            "credential-types"
          ]
        }
      },
      "/v1/health": {
        "get": {
          "operationId": "HealthController_getHealth_v1",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Health"
          ]
        }
      },
      "/v1/message": {
        "post": {
          "operationId": "MessageController_sendMessage_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "## Messaging\n\nMessages are submitted in a JSON format, whose base is as follows:\n\n```json\n{\n    \"connectionId\": UUID\n    \"id\": UUID,\n    \"timestamp\": NumericDate,\n    \"threadId\": UUID,\n    \"type\": MessageType,\n}\n```\n\n### Messaging to/from other agents\n\nTo message other agents, a single endpoint is used (`/message`), which receives by POST a JSON body containing the message.\n\nResponse from VS-A will generally result in a 200 HTTP response code and include a JSON object with the details of the submission.\n\n```json\n{\n  \"message\": string (optional, in case of error)\n  \"id\": UUID (submitted message id)\n}\n```",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/BaseMessageDto"
                    }
                  ],
                  "$ref": "#/components/schemas/BaseMessageDto"
                },
                "examples": {
                  "callAccept": {
                    "summary": "Call Accept",
                    "description": "#### Call Accept\n\nAccept a call offer from a third party to initiate a WebRTC call. This message will return a `threadId`, which can be used to track the subsequent status of the call. Additional parameters related to the `wsUrl` of the WebRTC server connection are expected to notify the other party.",
                    "value": {
                      "type": "call-accept",
                      "parameters": {
                        "key": "value"
                      }
                    }
                  },
                  "callReject": {
                    "summary": "Call Reject",
                    "description": "#### Call Reject\n\nReject a call offer from a third party to initiate a WebRTC call. This message will return a `threadId`, which can be used to identify which offer has been terminated.",
                    "value": {
                      "type": "call-reject"
                    }
                  },
                  "callEnd": {
                    "summary": "Call End",
                    "description": "#### Call End\n\nEnd a call offer from a third party to initiate a WebRTC call. This message will return a `threadId`, which can be used to identify which offer has been terminated.",
                    "value": {
                      "type": "call-end"
                    }
                  },
                  "callOffer": {
                    "summary": "Call Offer",
                    "description": "#### Call Offer\n\nCreate a call offer from a service to initiate a WebRTC call and notify the other party of the created request. This message will return a `threadId`, which can be used to track the subsequent status of the call. Additional parameters related to the `wsUrl` of the WebRTC server connection are expected to notify the other party.",
                    "value": {
                      "type": "call-offer",
                      "parameters": {
                        "key": "value"
                      }
                    }
                  },
                  "contextualMenuRequest": {
                    "summary": "Contextual Menu Request",
                    "description": "#### Contextual Menu Request\n\nRequests a destination agent context menu root (if any). The other side should always respond with a [Context Menu Update](#contextual-menu-update) even if no context menu is available (in such case, an empty payload will be sent).",
                    "value": {
                      "type": "contextual-menu-request"
                    }
                  },
                  "contextualMenuSelect": {
                    "summary": "Contextual Menu Select",
                    "description": "#### Contextual Menu Select\n\nSubmits the selected item of context menu.",
                    "value": {
                      "type": "contextual-menu-select",
                      "selectionId": "string"
                    }
                  },
                  "contextualMenuUpdate": {
                    "summary": "Contextual Menu Update",
                    "description": "#### Contextual Menu Update\n\nSends or updates the contents for the contextual menu to destination agent.",
                    "value": {
                      "type": "contextual-menu-update",
                      "payload": {
                        "title": "string",
                        "description": "string",
                        "options": [
                          {
                            "id": "string",
                            "title": "string",
                            "description": "string"
                          }
                        ]
                      }
                    }
                  },
                  "credentialIssuance": {
                    "summary": "Credential Issuance",
                    "description": "#### Credential Issuance\n\nBy sending this message, a Verifiable Credential is effectively issued and sent to the destination connection.\n\nThis message could be sent as a response to a Credential Request. In such case, `threadId` is used to identify credential details. But it can also start a new Credential Issuance flow, and specify\n\nParameters:\n\n- (optional) Credential Definition ID\n- (optional) Credential Schema ID\n- (optional) Revocation Definition ID\n- (optional) Revocation Index\n- (optional) Claims\n\n**Note:** When using revocation parameters (`revocationRegistryDefinitionId` and `revocationRegistryIndex`), it is crucial to preserve both values as they were originally generated with the credential. Each revocation registry has a finite capacity for credentials (default is 1000), and the `revocationRegistryIndex` uniquely identifies the specific credential within the registry. Failing to maintain these parameters correctly may lead to issues during the credential revocation process.\n\nAnother configuration mode is available when a `credentialSchemaId` is provided instead of a `credentialDefinitionId`. This option can only be used if the credential was initially issued through the VS Agent, and it is required when offering credentials to DIDComm connections that do not involve any chatbot.",
                    "value": {
                      "type": "credential-issuance",
                      "credentialDefinitionId": "id",
                      "revocationRegistryDefinitionId": "id",
                      "revocationRegistryIndex": 1,
                      "claims": [
                        {
                          "name": "claim-name",
                          "mimeType": "mime-type",
                          "value": "claim-value"
                        }
                      ]
                    }
                  },
                  "credentialRevocation": {
                    "summary": "Credential Revocation",
                    "description": "#### Credential Revocation\n\nBy sending this message, a Verifiable Credential is effectively revoked and a notification is sent to the DIDComm connection it has been issued to.\n\nIn this context, `threadId` is used to identify the details of the credential",
                    "value": {
                      "type": "credential-revocation"
                    }
                  },
                  "credentialReception": {
                    "summary": "Credential Reception",
                    "description": "#### Credential Reception\n\nBy sending this message, a recipient acknowledges the reception of a Verifiable Credential (or informs they declined it).\n\nThis message is sent as a response to a Credential Issue. `threadId` is used to identify credential details.\n\nThe state can be one of 'done', 'declined' or 'abandoned', depending on how the flow went.\n\nParameters:\n\n- State: final state of the flow. 'done' in case that the recipient accepted and stored the credential, and 'declined' if they refused to receive it. 'abandoned' may be thrown in case of an error",
                    "value": {
                      "type": "credential-reception",
                      "state": "done"
                    }
                  },
                  "credentialRequest": {
                    "summary": "Credential Request",
                    "description": "#### Credential Request\n\nThis message starts a Credential Issuance flow. The requested credential type is defined by its `credentialDefinitionId`, which must be known beforehand by the requester. Optionally, requester can define some claims about themselves (if not defined, the issuer will get them from other messages (e.g. by requesting proofs or asking through text messages).\n\nParameters:\n\n- Credential Definition ID\n- (optional) Claims (name, phoneNumber, subscriptionId, etc) if needed",
                    "value": {
                      "type": "credential-request",
                      "credentialDefinitionId": "id",
                      "claims": [
                        {
                          "name": "claim-name",
                          "mimeType": "mime-type",
                          "value": "claim-value"
                        }
                      ]
                    }
                  },
                  "emrtdDataRequest": {
                    "summary": "eMRTD Data Request",
                    "description": "#### eMRTD Data Request\n\nRequest the other party to read and provide eMRTD (Electronic Machine Readable Travel Document) data from a compatible electronic document.",
                    "value": {
                      "type": "emrtd-data-request"
                    }
                  },
                  "emrtdDataSubmit": {
                    "summary": "eMRTD Data Submit",
                    "description": "#### eMRTD Data Submit\n\nSubmit data retrieved from an electronic Machine Readable Travel Document. This message may be sent either individually or as a response to an eMRTD Data Request.\n\nThe state can be one of 'submitted', 'declined', 'timeout' or 'error', depending on how the flow went. The latter is used for unspecified errors (e.g. User Agent not capable of handling the request).",
                    "value": {
                      "type": "emrtd-data-submit",
                      "state": "MrtdSubmitState",
                      "dataGroups": "EMrtdData"
                    }
                  },
                  "identityProofRequest": {
                    "summary": "Identity Proof Request",
                    "description": "#### Identity Proof Request\n\nStarts an Identity Verification flow, requesting a certain number of identity proofing items. It is usually sent by an issuer to a potential holder before the credential is actually issued.",
                    "value": {
                      "type": "identity-proof-request",
                      "requestedProofItems": [
                        {
                          "id": "UUID",
                          "type": "RequestedProofItemType",
                          "specific-field": "SpecificFieldType"
                        }
                      ]
                    }
                  },
                  "identityProofResult": {
                    "summary": "Identity Proof Result",
                    "description": "#### Identity Proof Result\n\nThis message is used to inform about the result of the processing of a certain identity proof item.",
                    "value": {
                      "type": "identity-proof-result",
                      "proofItemResults": [
                        {
                          "id": "UUID",
                          "type": "SubmittedProofItemType",
                          "specific-field": "SpecificFieldType"
                        }
                      ]
                    }
                  },
                  "identityProofSubmit": {
                    "summary": "Identity Proof Submit",
                    "description": "#### Identity Proof Submit\n\nThis message is used to inform about the submission of a certain proof identity proof item.",
                    "value": {
                      "type": "identity-proof-submit",
                      "submittedProofItems": [
                        {
                          "id": "UUID",
                          "type": "SubmittedProofItemType",
                          "specific-field": "SpecificFieldType"
                        }
                      ]
                    }
                  },
                  "invitation": {
                    "summary": "Invitation",
                    "description": "#### Invitation\n\nCreates an Out of Band invitation message and sends it through an already established DIDComm channel. This is used mostly to generate sub-connections, but can also be used to forward an invitation to a public resolvable DID (passed optionally as a parameter).\n\nIf no `did` specified, a new pairwise connection will be created. The newly created connection will be related to the one where it has been sent (this concept is referred to as `sub-connections`.\n\n`label` and `imageUrl` are optional but recommended. URL is given as a Data URL (it can be either a link or base64-encoded).\n\nThe generated message Id will be used as invitationId un subsequent Connection State Update events. This can be used to correlate connections.",
                    "value": {
                      "type": "invitation",
                      "label": "string",
                      "imageUrl": "string",
                      "did": "string"
                    }
                  },
                  "media": {
                    "summary": "Media",
                    "description": "#### Media\n\nShares media files to a destination. They might be previously encrypted and stored in an URL reachable by the destination agent.",
                    "value": {
                      "type": "media",
                      "description": "string",
                      "items": [
                        {
                          "mimeType": "string",
                          "filename": "string",
                          "description": "string",
                          "byteCount": "number",
                          "uri": "string",
                          "ciphering": {
                            "algorithm": "string"
                          },
                          "preview": "string",
                          "width": "number",
                          "height": "number",
                          "duration": "number",
                          "title": "string",
                          "icon": "string",
                          "openingMode": "string",
                          "screenOrientaton": "string"
                        }
                      ]
                    }
                  },
                  "mrzDataRequest": {
                    "summary": "MRZ Data Request",
                    "description": "#### MRZ Data Request\n\nRequest the other party to provide the Machine Readable Zone string from a valid ID document.",
                    "value": {
                      "type": "mrz-data-request"
                    }
                  },
                  "mrzDataSubmit": {
                    "summary": "MRZ Data Submit",
                    "description": "\n#### MRZ Data Submit\n\nSubmit Machine Readable Zone data. This message may be sent either individually or as a response to a MRZ Data Request.\n\nThe state can be one of `submitted`, `declined`, `timeout` or `error`, depending on how the flow went. The latter is used for unspecified errors (e.g. User Agent not capable of handling the request).\n\n`MrzData` is a JSON object with two basic fields:\n\n- `raw`: contains the raw data as sent by the other party (either an array of lines or a single string containing all lines, separated by \\n).\n- `parsed`: interprets the contents and classifies the document in a format from ICAO 9303 document (TD1, TD2, TD3, etc.).\n\nExample:\n\n```json\n{\n  \"raw\": [\n    \"I<UTOD23145890<1233<<<<<<<<<<<\",\n    \"7408122F1204159UTO<<<<<<<<<<<6\",\n    \"ERIKSSON<<ANNA<MARIA<<<<<<<<<<\"\n  ],\n  \"parsed\": {\n    \"valid\": false,\n    \"fields\": {\n      \"documentCode\": \"I\",\n      \"issuingState\": null,\n      \"documentNumber\": \"D23145890123\",\n      \"documentNumberCheckDigit\": \"3\",\n      \"optional1\": \"1233\",\n      \"birthDate\": \"740812\",\n      \"birthDateCheckDigit\": \"2\",\n      \"sex\": \"female\",\n      \"expirationDate\": \"120415\",\n      \"expirationDateCheckDigit\": \"9\",\n      \"nationality\": null,\n      \"optional2\": \"\",\n      \"compositeCheckDigit\": null,\n      \"lastName\": \"ERIKSSON\",\n      \"firstName\": \"ANNA MARIA\"\n    },\n    \"format\": \"TD1\"\n  }\n}\n```\n\nMore info about the meaning of each field (and validity) can be found in [MRZ](https://github.com/cheminfo/mrz), the underlying library we are using for MRZ parsing.\n  ",
                    "value": {
                      "type": "mrz-data-submit",
                      "state": "MrtdSubmitState",
                      "mrzData": "MrzData"
                    }
                  },
                  "menuDisplay": {
                    "summary": "Menu Display",
                    "description": "Menu Display\n\nAuto-generated example .",
                    "value": {
                      "type": "menu-display",
                      "connectionId": "REPLACE_WITH_CONNECTION_ID",
                      "timestamp": "2025-08-19T16:17:08.871Z"
                    }
                  },
                  "menuSelect": {
                    "summary": "Menu Select",
                    "description": "#### Menu Select\n\nSubmits the selected item of a presented menu, defined in `threadId` field.",
                    "value": {
                      "type": "menu-select",
                      "menuItems": [
                        {
                          "id": "string"
                        }
                      ],
                      "content": "string"
                    }
                  },
                  "profile": {
                    "summary": "Profile",
                    "description": "#### Profile\n\nSends User Profile to a particular connection. An Agent may have its default profile settings, but also override them and send any arbitrary value to each connection. All items are optional.\n\n> **Notes**:\n\n- Display Image and Contextual Menu Image are sent as a Data URL or regular URL\n- A null value means to delete any existing one. A missing value means to keep the previous one.",
                    "value": {
                      "type": "profile",
                      "displayName": "string",
                      "displayImageUrl": "string",
                      "displayIconUrl": "string"
                    }
                  },
                  "receipts": {
                    "summary": "Receipts",
                    "description": "#### Receipts\n\nSends message updates for a number of messages.",
                    "value": {
                      "type": "receipts",
                      "receipts": [
                        {
                          "messageId": "string",
                          "state": "MessageState",
                          "timestamp": "Date"
                        }
                      ]
                    }
                  },
                  "terminateConnection": {
                    "summary": "Terminate Connection",
                    "description": "#### Terminate Connection\n\nTerminates a particular connection, notifying the other party through a 'Hangup' message. No further messages will be allowed after this action.",
                    "value": {
                      "type": "terminate-connection"
                    }
                  },
                  "text": {
                    "summary": "Text",
                    "description": "#### Text\n\nSends a simple text to a destination",
                    "value": {
                      "type": "text",
                      "content": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Message sent successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "id": "550e8400-e29b-41d4-a716-446655440000"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 500,
                      "error": "something went wrong: Error message here"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "message"
          ]
        }
      },
      "/v1/presentations": {
        "get": {
          "description": "## Presentations\n\nIt is possible to query all presentation flows created by VS Agent through the endpoint `/presentations`, which will respond with records using the following format:\n\n- proofExchangeId: flow identifier (the same as the one used in events and other responses)\n- state: current state of the presentation flow (e.g. `request-sent` when it was just started, `done` when finished)\n- claims: array containing the claims received within the presentation\n- verified: boolean stating if the presentation is valid (only meaningful when state is `done`)\n- threadId: DIDComm thread id (shared with the other party)\n- updatedAt: last time activity was recorded for this flow\n\nIt is possible to query for a single presentation by executing a GET to `/presentations/<proofExchangeId>`.",
          "operationId": "PresentationsController_getAllPresentations_v1",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Array of presentation data",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/PresentationDataDto"
                    }
                  }
                }
              }
            }
          },
          "summary": "List all presentations",
          "tags": [
            "presentations"
          ]
        }
      },
      "/v1/presentations/{proofExchangeId}": {
        "delete": {
          "operationId": "PresentationsController_deleteProofExchangeById_v1",
          "parameters": [
            {
              "name": "proofExchangeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Presentation exchange deleted"
            },
            "400": {
              "description": "Invalid proofExchangeId"
            },
            "404": {
              "description": "Presentation exchange not found"
            }
          },
          "summary": "Delete a presentation exchange record",
          "tags": [
            "presentations"
          ]
        },
        "get": {
          "operationId": "PresentationsController_getPresentationById_v1",
          "parameters": [
            {
              "name": "proofExchangeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Presentation data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PresentationDataDto"
                  }
                }
              }
            }
          },
          "summary": "Get presentation by proofExchangeId",
          "tags": [
            "presentations"
          ]
        }
      },
      "/v1/invitation": {
        "get": {
          "description": "### Connection Invitation\n\nIt's a GET request to `/invitation`. It does not receive any parameter.\n\nResponse from VS Agent is a JSON object containing an URL-encoded invitation, ready to be rendered in a QR code or sent as a link for processing of an Aries-compatible DIDComm agent:\n\n```json\n{\n  \"url\": \"string containing long form URL-encoded invitation\"\n}\n```",
          "operationId": "InvitationController_getInvitation_v1",
          "parameters": [
            {
              "name": "legacy",
              "required": false,
              "in": "query",
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Out-of-band invitation payload",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "url": "https://hologram.zone/?oob=eyJ0eXAiOiJKV1QiLCJhbGci..."
                    }
                  }
                }
              }
            }
          },
          "summary": "Connection Invitation",
          "tags": [
            "invitation"
          ]
        }
      },
      "/v1/invitation/presentation-request": {
        "post": {
          "description": "### Presentation Request\n\nPresentation Request invitation codes are created by specifying details of the credentials required.\n\nThis means that a single presentation request can ask for a number of attributes present in a credential a holder might possess.\nAt the moment, credential requirements are only filtered by their `credentialDefinitionId`. If no `attributes` are specified,\nthen VS Agent will ask for all attributes in the credential.\n\nIt's a POST to `/invitation/presentation-request` which receives a JSON object in the body\n\n```json\n{\n  \"callbackUrl\": \"https://myhost.com/presentation_callback \",\n  \"ref\": \"1234-5678\",\n  \"requestedCredentials\": [\n    {\n      \"credentialDefinitionId\": \"full credential definition identifier\",\n      \"attributes\": [\"attribute-1\", \"attribute-2\"]\n    }\n  ]\n}\n```\n\n#### Presentation Callback API\n\nWhen the presentation flow is completed (either successfully or not), VS Agent calls its `callbackUrl` as an HTTP POST with the following body:\n\n```json\n{\n  \"ref\": \"1234-5678\",\n  \"presentationRequestId\": \"unique identifier for the flow\",\n  \"status\": \"PresentationStatus\",\n  \"claims\": [\n    { \"name\": \"attribute-1\", \"value\": \"value-1\" },\n    { \"name\": \"attribute-2\", \"value\": \"value-2\" }\n  ]\n}\n```",
          "operationId": "InvitationController_createPresentationRequest_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePresentationRequestDto"
                },
                "examples": {
                  "example": {
                    "summary": "Create Presentation Request",
                    "value": {
                      "ref": "1234-5678",
                      "callbackUrl": "https://myhost/mycallbackurl",
                      "requestedCredentials": [
                        {
                          "credentialDefinitionId": "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/8TsGLaSPVKPVMXK8APzBRcXZryxutvQuZnnTcDmbqd9p",
                          "attributes": [
                            "phoneNumber"
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Presentation request invitation",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "proofExchangeId": "123e4567-e89b-12d3-a456-426614174000",
                      "url": "didcomm://example.com/...",
                      "shortUrl": "https://mydomain.com/s?id=abcd1234"
                    }
                  }
                }
              }
            }
          },
          "summary": "Presentation Request",
          "tags": [
            "invitation"
          ]
        }
      },
      "/v1/invitation/credential-offer": {
        "post": {
          "description": "### Credential Offer\n\nCredential offer invitation codes include a preview of the offered credential, meaning by that its `credentialDefinitionId` and claims.\n\nIt's a POST to `/invitation/credential-offer` which receives a JSON object in the body",
          "operationId": "InvitationController_createCredentialOffer_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCredentialOfferDto"
                },
                "examples": {
                  "example": {
                    "summary": "Phone Number",
                    "value": {
                      "credentialDefinitionId": "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/8TsGLaSPVKPVMXK8APzBRcXZryxutvQuZnnTcDmbqd9p",
                      "claims": [
                        {
                          "name": "phoneNumber",
                          "value": "+57128348520"
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Credential offer invitation",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "credentialExchangeId": "abcd1234-5678efgh-9012ijkl-3456mnop",
                      "url": "didcomm://example.com/offer/...",
                      "shortUrl": "https://mydomain.com/s?id=wxyz7890"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid offer payload"
            }
          },
          "summary": "Credential Offer",
          "tags": [
            "invitation"
          ]
        }
      },
      "/v1/qr": {
        "get": {
          "operationId": "QrController_getQrCode_v1",
          "parameters": [
            {
              "name": "size",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "padding",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "level",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "bcolor",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "fcolor",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "legacy",
              "required": false,
              "in": "query",
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "qr"
          ]
        }
      },
      "/v1/vt/issue-credential": {
        "post": {
          "operationId": "TrustController_issueCredential_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/IssueCredentialRequestDto"
                },
                "examples": {
                  "jsonld": {
                    "summary": "W3c Json LD Credential Example",
                    "value": {
                      "format": "jsonld",
                      "did": "did:web:example.com",
                      "jsonSchemaCredentialId": "https://example.org/vt/schemas-example-org-jsc.json",
                      "claims": {
                        "id": "https://example.org/org/123",
                        "name": "OpenAI Research",
                        "logo": "data:image/png;base64,iVBORw0KGgoAAAANSU...",
                        "registryId": "REG-123",
                        "registryUri": "https://registry.example.org",
                        "address": "123 Main St, San Francisco, CA",
                        "countryCode": "US"
                      }
                    }
                  },
                  "anoncreds": {
                    "summary": "Anoncreds Credential Example",
                    "value": {
                      "type": "anoncreds",
                      "jsonSchemaCredentialId": "https://example.org/vt/schemas-example-org-jsc.json",
                      "claims": {
                        "id": "https://example.org/org/123",
                        "name": "OpenAI Research",
                        "logo": "data:image/png;base64,iVBORw0KGgoAAAANSU...",
                        "registryId": "REG-123",
                        "registryUri": "https://registry.example.org",
                        "address": "123 Main St, San Francisco, CA",
                        "countryCode": "US"
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The response includes either the JSON-LD W3C Credential contents, directly to transmit to the recipient, or the DIDComm Invitation and Credential Exchange ID associated in case of AnonCreds for further tracking through events interface."
            }
          },
          "summary": "Issue a Verifiable Trust Credential, based on a JSON Schema Credential. It can be either an AnonCreds or a JSON-LD W3C credential.",
          "tags": [
            "Verifiable Trust"
          ]
        }
      },
      "/v1/vt/revoke-credential": {
        "post": {
          "operationId": "TrustController_revokeCredential_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": "cred-1"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Credential revoked"
            }
          },
          "summary": "Revoke a verifiable credential",
          "tags": [
            "Verifiable Trust"
          ]
        }
      },
      "/v1/vt/linked-credentials": {
        "get": {
          "description": "Retrieves a Verifiable Trust Credential (VTC) based on the provided credential schema ID. The schema defines the structure and semantics of the verifiable credential. This endpoint follows the [Verifiable Trust Specification](https://verana-labs.github.io/verifiable-trust-spec/#vt-linked-vp-verifiable-trust-credential-linked-vp).",
          "operationId": "TrustController_getVerifiableTrustCredential_v1",
          "parameters": [
            {
              "name": "schemaId",
              "required": false,
              "in": "query",
              "description": "The identifier of the stored credential schema. This ID specifies which Verifiable Credential schema should be used to generate or retrieve the corresponding Verifiable Trust Credential (VTC).",
              "examples": {
                "verifiableTrustCredential": {
                  "summary": "Verifiable Trust Credential example",
                  "description": "A full URL to the Verifiable Trust Credential.",
                  "value": "https://p2801.ovpndev.mobiera.io/vt/ecs-service-c-vp.json"
                }
              },
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page (default: 10)",
              "schema": {
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (default: 1)",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns one or all Verifiable Trust Credentials with pagination if applicable."
            }
          },
          "summary": "Retrieve one or all Verifiable Trust Credentials (VTC) linked to this Agent",
          "tags": [
            "Verifiable Trust"
          ]
        },
        "delete": {
          "description": "Deletes a stored Verifiable Trust Credential (VTC) associated with the specified JSON Schema credential. This operation removes the credential definition or cached data linked to the provided schema. The operation aligns with the [Verifiable Trust Specification](https://verana-labs.github.io/verifiable-trust-spec/#vt-linked-vp-verifiable-trust-credential-linked-vp).",
          "operationId": "TrustController_removeVerifiableTrustCredential_v1",
          "parameters": [
            {
              "name": "schemaId",
              "required": true,
              "in": "query",
              "description": "The URL of the Verifiable Trust Credential (VTC) to be deleted. This identifier must match an existing stored credential schema.",
              "examples": {
                "verifiableTrustCredential": {
                  "summary": "JSON Schema Credential example",
                  "description": "A full URL identifying the Verifiable Trust Credential to be deleted.",
                  "value": "https://p2801.ovpndev.mobiera.io/vt/ecs-service-c-vp.json"
                }
              },
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The Verifiable Trust Credential (VTC) was successfully deleted for the given schema ID."
            },
            "404": {
              "description": "No Verifiable Trust Credential (VTC) was found for the provided schema ID."
            }
          },
          "summary": "Delete a Verifiable Trust Credential (VTC)",
          "tags": [
            "Verifiable Trust"
          ]
        },
        "post": {
          "description": "The `schemaBaseId` defines the base name used to construct the resulting credential schema URL. This operation supports creating credentials for both organizations and services following the Verifiable Trust model.",
          "operationId": "TrustController_createVtc_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Defines the Verifiable Credential (VTC) to be created. The `schemaBaseId` determines the schema URL structure, and the `credential` field contains the W3C Verifiable Credential data.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/W3cCredentialDto"
                },
                "examples": {
                  "organization": {
                    "summary": "Organization Credential Example",
                    "description": "Creates a Verifiable Trust Credential (VTC) for an organization. The `schemaBaseId` is used to generate the schema URL (e.g., `https://p2801.ovpndev.mobiera.io/vt/schemas-organization-c-vp.json`).",
                    "value": {
                      "schemaBaseId": "organization",
                      "credential": {
                        "@context": [
                          "https://www.w3.org/2018/credentials/v1"
                        ],
                        "id": "https://example.org/credentials/123",
                        "type": [
                          "VerifiableCredential",
                          "EcsOrgCredential"
                        ],
                        "issuer": "did:example:issuer123",
                        "issuanceDate": "2025-10-13T12:00:00Z",
                        "credentialSubject": {
                          "id": "did:example:org123",
                          "name": "OpenAI Research",
                          "logo": "data:image/png;base64,iVBORw0KGgoAAAANSU...",
                          "registryId": "REG-123",
                          "registryUri": "https://registry.example.org",
                          "address": "123 Main St, San Francisco, CA",
                          "countryCode": "US"
                        },
                        "proof": {
                          "type": "Ed25519Signature2018",
                          "created": "2025-10-13T12:00:00Z",
                          "proofPurpose": "assertionMethod",
                          "verificationMethod": "did:example:issuer123#key-1",
                          "jws": "eyJhbGciOiJFZERTQSJ9..."
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The Verifiable Trust Credential (VTC) was successfully created and stored. The resulting schema URL is derived from the provided `schemaBaseId`."
            },
            "400": {
              "description": "Invalid credential format or missing required fields."
            }
          },
          "summary": "Create a new Verifiable Trust Credential (VTC)",
          "tags": [
            "Verifiable Trust"
          ]
        }
      },
      "/v1/vt/json-schema-credentials": {
        "get": {
          "description": "Retrieves a Verifiable Trust Json Schema Credential (VTJSC) associated with the given schema identifier (`schemaId`). A JSON Schema Credential defines the structure, types, and validation rules for a corresponding Verifiable Trust Credential (VTC). This endpoint follows the [Verifiable Trust Specification](https://verana-labs.github.io/verifiable-trust-spec/#json-schema-credentials).",
          "operationId": "TrustController_getJsonSchemaCredential_v1",
          "parameters": [
            {
              "name": "schemaId",
              "required": false,
              "in": "query",
              "description": "The identifier or URL of the Verifiable Trust Json Schema Credential (VTJSC) to retrieve. This schema describes the structure of the Verifiable Trust Credential (VTC) it governs.",
              "examples": {
                "jsonSchemaCredentialId": {
                  "summary": "JSON Schema Credential example",
                  "description": "A full URL referencing the JSON Schema Credential to be retrieved.",
                  "value": "https://ecosystem/shemas-example-jsc.json"
                }
              },
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page (default: 10)",
              "schema": {
                "example": 10,
                "type": "number"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (default: 1)",
              "schema": {
                "example": 1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns one or all Verifiable Trust Credentials with pagination if applicable."
            }
          },
          "summary": "Retrieve one or multiple Verifiable Trust Json Schema Credential (VTJSC).",
          "tags": [
            "Verifiable Trust"
          ]
        },
        "delete": {
          "description": "Deletes a stored Verifiable Trust Json Schema Credential (VTJSC) associated with the specified schema identifier (`schemaId`). A JSON Schema Credential defines the structure and validation rules for a Verifiable Trust Credential (VTC). Removing a JSC also invalidates any Verifiable Trust Credentials that rely on it. This operation follows the [Verifiable Trust Specification](https://verana-labs.github.io/verifiable-trust-spec/#json-schema-credentials).",
          "operationId": "TrustController_removeJsonSchemaCredential_v1",
          "parameters": [
            {
              "name": "schemaId",
              "required": true,
              "in": "query",
              "description": "The identifier or URL of the Verifiable Trust Json Schema Credential (VTJSC) to delete. This must correspond to an existing stored schema definition.",
              "examples": {
                "jsonSchemaCredentialId": {
                  "summary": "JSON Schema Credential example",
                  "description": "A full URL identifying the Verifiable Trust Json Schema Credential (VTJSC) to be deleted.",
                  "value": "https://ecosystem/shemas-example-jsc.json"
                }
              },
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The Verifiable Trust Json Schema Credential (VTJSC) was successfully deleted for the given schema ID."
            },
            "404": {
              "description": "No Verifiable Trust Json Schema Credential (VTJSC) was found for the provided schema ID."
            }
          },
          "summary": "Delete a a Verifiable Trust Json Schema Credential (VTJSC)",
          "tags": [
            "Verifiable Trust"
          ]
        },
        "post": {
          "description": "\n  Creates or updates a **Verifiable Trust Json Schema Credential (VTJSC)**, used by **Trust Registries** to cryptographically sign and attest to **Credential Schemas** they have created in the Verana ledger.\n\n  A VTJSC binds a CredentialSchema entry in the VPR to the **Ecosystem DID** that governs the Trust Registry.\n  - schemaBaseId: the name you want to show in the url path of the create vtjsc. Example: organizationtest will create the VTJSC with the id: https:///vt/schemas-organizationtest-jsc.json\n  - jsonSchemaRef: the URI of your schema in the Verana ledger.\n  \n  The **issuer DID** of the VTJSC MUST be the **same DID** as the Ecosystem DID of the Trust Registry that created the referenced CredentialSchema in the ledger.\n\n  VTJSCs issued by any other DID will be be considered invalid by trust resolvers.\n  ",
          "operationId": "TrustController_createJsc_v1",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Defines the base schema identifier and the JSON Schema reference used to create or update the Verifiable Trust Json Schema Credential (VTJSC).",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonSchemaCredentialDto"
                },
                "examples": {
                  "service": {
                    "summary": "JSON Schema Credential Example",
                    "description": "Creates a Verifiable Trust Json Schema Credential (VTJSC) for an organization or service. The `schemaBaseId` determines the base schema name, and the `jsonSchemaRef` provides the reference to the JSON Schema definition.",
                    "value": {
                      "schemaBaseId": "organization",
                      "jsonSchemaRef": "vpr:verana:vna-testnet-1/cs/v1/js/12345678"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The Verifiable Trust Json Schema Credential (VTJSC) was successfully created or updated."
            },
            "400": {
              "description": "Invalid schema input or missing required parameters."
            }
          },
          "summary": "Create or update a Verifiable Trust Json Schema Credential (VTJSC)",
          "tags": [
            "Verifiable Trust"
          ]
        }
      }
    },
    "info": {
      "title": "API Documentation",
      "description": "API Documentation",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "VsAgentInfoDto": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string",
              "description": "Human-readable name of the agent",
              "example": "My Agent"
            },
            "endpoints": {
              "description": "List of service endpoints for this agent",
              "example": [
                "https://agent.example.com/comm"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "isInitialized": {
              "type": "boolean",
              "description": "Indicates whether the agent has completed its setup",
              "example": true
            },
            "publicDid": {
              "type": "string",
              "description": "Public DID if one is assigned",
              "example": "did:web:agent.example.com",
              "nullable": true
            },
            "version": {
              "type": "string",
              "description": "Application version",
              "example": "1.8.1"
            }
          },
          "required": [
            "label",
            "endpoints",
            "isInitialized",
            "version"
          ]
        },
        "ConnectionDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Unique connection identifier",
              "example": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "When the connection was created",
              "example": "2025-07-10T15:30:00Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "When the connection was last updated",
              "example": "2025-07-12T11:20:00Z"
            },
            "did": {
              "type": "string",
              "description": "My DID for this connection",
              "example": "did:web:example.com"
            },
            "theirDid": {
              "type": "string",
              "description": "Their DID for this connection",
              "example": "did:web:other.com"
            },
            "theirLabel": {
              "type": "string",
              "description": "Their human-readable label",
              "example": "Alice"
            },
            "state": {
              "type": "string",
              "enum": [
                "start",
                "invitation-sent",
                "invitation-received",
                "request-sent",
                "request-received",
                "response-sent",
                "response-received",
                "abandoned",
                "completed"
              ],
              "description": "Current state of the DID exchange",
              "example": "completed"
            },
            "role": {
              "type": "string",
              "description": "Role in the DID exchange",
              "example": "invitee"
            },
            "alias": {
              "type": "string",
              "description": "Optional alias for this connection",
              "example": "Work Chat"
            },
            "threadId": {
              "type": "string",
              "description": "Thread identifier for this connection",
              "example": "thread-abc-123"
            },
            "imageUrl": {
              "type": "string",
              "description": "Optional URL to display an avatar for this connection",
              "example": "https://example.com/avatar.png"
            },
            "outOfBandId": {
              "type": "string",
              "description": "Out-of-band identifier if invitation was OOB",
              "example": "oob-xyz-789"
            },
            "invitationDid": {
              "type": "string",
              "description": "DID of the invitation if forwarded",
              "example": "did:web:forwarded.example.com"
            }
          },
          "required": [
            "id",
            "createdAt",
            "updatedAt",
            "did",
            "theirDid",
            "theirLabel",
            "state",
            "role",
            "alias",
            "threadId",
            "imageUrl",
            "outOfBandId",
            "invitationDid"
          ]
        },
        "CreateCredentialTypeDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name. Used together with version to identify the credential type. Must be unique across all credential types.",
              "example": "myCredentialType"
            },
            "version": {
              "type": "string",
              "description": "Version. Used together with name to identify the credential type. Must be unique across all credential types.",
              "example": "1.0"
            },
            "attributes": {
              "description": "Schema attributes. Only in case you want to create a new schema without providing a relatedJsonSchemaCredentialId",
              "example": "['name', 'age']",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "schemaId": {
              "type": "string",
              "description": "Base AnonCreds schema id in case you want to. Note: Deprecated, will be removed in next releases",
              "example": "did:web:issuer#anoncreds?relativeRef=/schema/1234"
            },
            "relatedJsonSchemaCredentialId": {
              "type": "string",
              "description": "Base Verifiable Trust JSON Schema Credential the credential type is based on.",
              "example": "https://example.2060.io/vt/schemas-example-service-jsc.json"
            },
            "issuerId": {
              "type": "string",
              "description": "New issuer id in case you want to. Deprecated, will be removed in next releases",
              "example": "did:web:issuer"
            },
            "supportRevocation": {
              "type": "boolean",
              "description": "Indicates whether to enable credential revocation support. If enabled, it allows revocation of issued credentials.",
              "example": true,
              "default": false
            }
          },
          "required": [
            "name",
            "version",
            "attributes",
            "schemaId",
            "relatedJsonSchemaCredentialId",
            "issuerId",
            "supportRevocation"
          ]
        },
        "CreateRevocationRegistryDto": {
          "type": "object",
          "properties": {
            "credentialDefinitionId": {
              "type": "string",
              "description": "credentialDefinitionId",
              "example": "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/8TsGLaSPVKPVMXK8APzBRcXZryxutvQuZnnTcDmbqd9p"
            },
            "maximumCredentialNumber": {
              "type": "number",
              "description": "maximumCredentialNumber",
              "default": 1000,
              "example": 1000
            }
          },
          "required": [
            "credentialDefinitionId",
            "maximumCredentialNumber"
          ]
        },
        "BaseMessageDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "call-accept",
                "call-reject",
                "call-end",
                "call-offer",
                "contextual-menu-request",
                "contextual-menu-select",
                "contextual-menu-update",
                "credential-issuance",
                "credential-revocation",
                "credential-reception",
                "credential-request",
                "emrtd-data-request",
                "emrtd-data-submit",
                "identity-proof-request",
                "identity-proof-result",
                "identity-proof-submit",
                "invitation",
                "media",
                "mrz-data-request",
                "mrz-data-submit",
                "menu-display",
                "menu-select",
                "profile",
                "receipts",
                "terminate-connection",
                "text"
              ],
              "description": "Type of message",
              "example": "text"
            },
            "connectionId": {
              "type": "string",
              "description": "Connection ID",
              "example": "2ab2e45e-d896-40bb-9d03-1f79e6083c33"
            },
            "id": {
              "type": "string",
              "description": "Message ID (generated if not provided)",
              "example": "a1b2c3d4"
            },
            "threadId": {
              "type": "string",
              "description": "Thread ID within the connection",
              "example": "thread-xyz"
            },
            "timestamp": {
              "type": "string",
              "description": "Timestamp in ISO-8601 format",
              "example": "2025-07-08T12:00:00Z"
            },
            "content": {
              "type": "string",
              "description": "Text content of a text message",
              "example": "Hello, world!"
            },
            "label": {
              "type": "string",
              "description": "Label for invitation messages",
              "example": "My Service"
            },
            "imageUrl": {
              "type": "string",
              "description": "Avatar or image URL for invitation messages",
              "example": "https://aservice.com/avatar.png"
            },
            "did": {
              "type": "string",
              "description": "DID for invitation messages",
              "example": "did:web:aservice.com"
            }
          },
          "required": [
            "type",
            "connectionId"
          ]
        },
        "PresentationDataDto": {
          "type": "object",
          "properties": {
            "requestedCredentials": {
              "description": "List of requested credentials, with their definition IDs and attributes",
              "example": [
                {
                  "credentialDefinitionId": "did:web:issuer…/credDef/123",
                  "attributes": [
                    "firstName",
                    "age"
                  ]
                }
              ],
              "type": "array",
              "items": {
                "type": "object"
              }
            },
            "claims": {
              "description": "List of revealed claims from the presentation",
              "example": [
                {
                  "name": "firstName",
                  "value": "Alice"
                },
                {
                  "name": "age",
                  "value": "30"
                }
              ],
              "type": "array",
              "items": {
                "type": "object"
              }
            },
            "verified": {
              "type": "boolean",
              "description": "Whether the presentation was cryptographically verified",
              "example": true
            },
            "state": {
              "type": "string",
              "description": "Current proof-exchange state",
              "example": "done"
            },
            "proofExchangeId": {
              "type": "string",
              "description": "Identifier of the proof exchange",
              "example": "proof-1234-5678"
            },
            "threadId": {
              "type": "string",
              "description": "DIDComm thread identifier",
              "example": "thread-8765-4321"
            },
            "updatedAt": {
              "type": "string",
              "description": "Timestamp of last update",
              "example": "2025-07-15T12:34:56.000Z",
              "format": "date-time"
            }
          },
          "required": [
            "requestedCredentials",
            "claims",
            "verified",
            "state",
            "proofExchangeId",
            "threadId",
            "updatedAt"
          ]
        },
        "CreatePresentationRequestDto": {
          "type": "object",
          "properties": {
            "ref": {
              "type": "string",
              "description": "Optional reference",
              "example": "1234-5678"
            },
            "callbackUrl": {
              "type": "string",
              "description": "URL to be called when flow ends",
              "example": "https://myhost.com/mycallback"
            },
            "requestedCredentials": {
              "description": "Requested credentials",
              "example": "[{ credentialDefinitionId: \"myCredentialDefinition\", attributes: [\"name\",\"age\"] }]",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "useLegacyDid": {
              "type": "boolean",
              "description": "Use legacy did:web in case of did:webvh",
              "example": "true"
            }
          },
          "required": [
            "ref",
            "callbackUrl",
            "requestedCredentials",
            "useLegacyDid"
          ]
        },
        "CreateCredentialOfferDto": {
          "type": "object",
          "properties": {
            "credentialDefinitionId": {
              "type": "string",
              "description": "Credential Definition Id of the credential type",
              "example": "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/8TsGLaSPVKPVMXK8APzBRcXZryxutvQuZnnTcDmbqd9p"
            },
            "claims": {
              "description": "Claims in name-value pairs",
              "example": "[{ \"name\": \"firstName\", \"value:\" \"John\" }, { \"name: \"age\", \"value: \"18\" }]",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "useLegacyDid": {
              "type": "boolean",
              "description": "Use legacy did:web in case of did:webvh",
              "example": "true"
            }
          },
          "required": [
            "credentialDefinitionId",
            "claims",
            "useLegacyDid"
          ]
        },
        "IssueCredentialRequestDto": {
          "type": "object",
          "properties": {
            "format": {
              "type": "string",
              "description": "Format of credential to issue: json-ld (for public entities) or \"anoncreds\" (for best privacy, usually for end-users)",
              "example": "jsonld",
              "enum": [
                "jsonld",
                "anoncreds"
              ]
            },
            "did": {
              "type": "string",
              "description": "DID of the credential subject (the holder)",
              "example": "did:example:holder123"
            },
            "jsonSchemaCredentialId": {
              "type": "string",
              "description": "URL of the JSON Credential Schema that defines the credential structure",
              "example": "https://example.org/schemas/example-service.json"
            },
            "claims": {
              "type": "object",
              "description": "Credential claims represented as flat key-value pairs",
              "example": {
                "serviceName": "Example Service",
                "serviceRole": "Verifier",
                "active": true
              }
            }
          },
          "required": [
            "format",
            "did",
            "jsonSchemaCredentialId",
            "claims"
          ]
        },
        "W3cCredentialDto": {
          "type": "object",
          "properties": {
            "schemaBaseId": {
              "type": "string",
              "description": "The short identifier of the credential schema (used to build the full schema URL). Do not include the base URL or file extension.",
              "example": "example-service"
            }
          },
          "required": [
            "schemaBaseId"
          ]
        },
        "JsonSchemaCredentialDto": {
          "type": "object",
          "properties": {
            "schemaBaseId": {
              "type": "string",
              "description": "The short identifier of the credential schema (used to build the full schema URL). Do not include the base URL or file extension.",
              "example": "example-service"
            },
            "jsonSchemaRef": {
              "type": "string",
              "description": "URL to the JSON Schema definition. If omitted, it will be treated as a self essential schema (`schemas-example-service.json`).",
              "example": "vpr:verana:vna-testnet-1/cs/v1/js/12345678"
            }
          },
          "required": [
            "schemaBaseId",
            "jsonSchemaRef"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
