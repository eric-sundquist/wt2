/**
 * Contains queries for retriving data from elasticsearch.
 *
 * @author Eric Sundqvist
 * @version 1.0.0
 */

export const elasticQueries = {
  allCitiesAQICategory: {
    aggs: {
      0: {
        terms: {
          field: 'aQICategory.keyword',
          order: {
            1: 'desc'
          },
          size: 5,
          shard_size: 25
        },
        aggs: {
          1: {
            value_count: {
              field: 'aQICategory.keyword'
            }
          }
        }
      }
    }
  },
  selectedCitiesAQvalues: {
    aggs: {
      0: {
        filters: {
          filters: {
            Kalmar: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Kalmar'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            Stockholm: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Stockholm'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            London: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'London'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            Paris: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Paris'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            Moscow: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Moscow'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            'New York': {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'New York'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            'Los Angeles': {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Los Angeles'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            Delhi: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Delhi'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            Beirut: {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Beirut'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            },
            'Buenos Aires': {
              bool: {
                must: [],
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          term: {
                            'city.keyword': {
                              value: 'Buenos Aires'
                            }
                          }
                        }
                      ],
                      minimum_should_match: 1
                    }
                  }
                ],
                should: [],
                must_not: []
              }
            }
          }
        },
        aggs: {
          1: {
            sum: {
              field: 'cOAQIValue'
            }
          },
          2: {
            sum: {
              field: 'nO2AQIValue'
            }
          },
          3: {
            sum: {
              field: 'ozoneAQIValue'
            }
          },
          4: {
            sum: {
              field: 'pM25AQIValue'
            }
          }
        }
      }
    }
  }
}
