beforeEach(function() {
    window.fixtures = {};

    $.extend(window.fixtures, {
        currentId: 1,
        nextId: function() {
            return this.currentId++;
        },

        notifications: {
            "BE_MEMBER": function(overrides) {
                return new chorus.models.Notification(_.extend({
                    author: fixtures.authorJson(),
                    id: "10000",
                    timestamp: "2012-02-28 11:51:42.14",
                    type: "BE_MEMBER",
                    workspace: rspecFixtures.workspaceJson()
                }, overrides));
            }
        },

        activitySet: function() {
            var models = [this.activities.NOTE_ON_CHORUS_VIEW(), this.activities.NOTE_ON_CHORUS_VIEW()]
            var set = new chorus.collections.ActivitySet([])
            set.reset(models);
            return set;
        },

        activities: {
            "SUB_COMMENT": function(overrides) {
                var attrs = _.extend({
                    artifacts: [],
                    author: fixtures.authorJson(),
                    id: "10109",
                    isDeleted: false,
                    isInsight: false,
                    text: "This is a comment on a comment",
                    timestamp: "2012-04-02 14:24:23",
                    type: "SUB_COMMENT"
                }, overrides);
                return new chorus.models.Activity(attrs);
            },

            "MEMBERS_ADDED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "MEMBERS_ADDED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    user: [
                        {
                            id: 101,
                            name: "Rhino Hunter"
                        },
                        {
                            id: 102,
                            name: "Method Man"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "MEMBERS_DELETED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "MEMBERS_DELETED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    user: [
                        {
                            id: 101,
                            name: "Rhino Hunter"
                        },
                        {
                            id: 102,
                            name: "Method Man"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_DELETED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_DELETED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_CREATED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_CREATED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_MAKE_PRIVATE": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_MAKE_PRIVATE",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_MAKE_PUBLIC": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_MAKE_PUBLIC",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_ADD_TABLE": function(overrides) {
                var workspace = rspecFixtures.workspaceJson()
                var attrs = _.extend({
                    type: "WORKSPACE_ADD_TABLE",
                    author: fixtures.authorJson(),
                    comments: [ fixtures.commentJson() ],
                    id: "10082",
                    databaseObject: {
                        id: '"10000"|"Analytics"|"analytics"|"VIEW"|"__gp_fullname"',
                        name: "__gp_fullname",
                        objectName: "__gp_fullname",
                        objectType: "TABLE",
                        query: null,
                        type: "SANDBOX_TABLE",
                        workspaceId: workspace.id
                    },
                    timestamp: "2012-02-29 15:24:42",
                    workspace: workspace
                }, overrides);

                return new chorus.models.Activity(attrs);
            },

            "WORKSPACE_ADD_HDFS_AS_EXT_TABLE": function(overrides) {
                var attrs = _.extend({
                    type: "WORKSPACE_ADD_HDFS_AS_EXT_TABLE",
                    id: fixtures.nextId().toString(),
                    timestamp: "2012-03-07 14:42:23",
                    author: fixtures.authorJson(),
                    comments: [],
                    databaseObject: {
                        id: '"10000"|"dca_demo"|"ddemo"|"HDFS_EXTERNAL_TABLE"|"import_csv"',
                        name: 'import_csv'
                    },
                    hdfs: {
                        instance: {
                            id: '10010',
                            name: 'instanceName'
                        },
                        path: '/data',
                        name: "import.csv"
                    },
                    workspace: rspecFixtures.workspaceJson()
                }, overrides);

                return new chorus.models.Activity(attrs);
            },

            "WORKSPACE_CHANGE_NAME": function(overrides) {
                return new chorus.models.Activity(_.extend({
                    type: "WORKSPACE_CHANGE_NAME",
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        isDeleted: false,
                        lastName: "Admin"
                    },
                    comments: [],
                    id: fixtures.nextId().toString(),
                    isDeleted: false,
                    timestamp: "2012-03-15 17:27:52",
                    workspace: rspecFixtures.workspaceJson()
                }, overrides));
            },

            "WORKFILE_CREATED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKFILE_CREATED",
                    timestamp: "2011-12-12 12:12:12",
                    id: fixtures.nextId(),
                    isPromoted: false,
                    promoteCount: 0,
                    workfile: fixtures.nestedWorkfileJson(),
                    workspace: fixtures.nestedWorkspaceJson(),
                    comments: [
                        {
                            text: "OBAMA!!!!",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        }
                    ]
                });
            },

            "WORKFILE_UPGRADED_VERSION": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKFILE_UPGRADED_VERSION",
                    timestamp: "2011-12-12 12:12:12",
                    id: 10860,
                    isPromoted: false,
                    promoteCount: 0,
                    commitMessage: "make file better",
                    version: "3",
                    workfile: fixtures.nestedWorkfileJson(),
                    workspace: fixtures.nestedWorkspaceJson(),
                    comments: [
                        {
                            text: "OBAMA!!!!",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ]
                });
            },

            "NOTE_ON_INSTANCE": function(overrides) {
                return new chorus.models.Activity(_.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that.",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    instance: fixtures.instanceJson(),
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: "10102",
                            entityType: "file",
                            id: "10102",
                            name: "something.txt",
                            type: "TXT"
                        }
                    ]
                }, overrides));
            },

            "NOTE_ON_CHORUS_VIEW": function(overrides) {
                var instanceId = fixtures.nextId().toString();
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that view.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    chorusView: {
                        id: '"' + instanceId + '"|"dca_demo"|"public"|"__a_table_name"',
                        name: '__a_chorus_view_name',
                        objectName: "__a_chorus_view_name",
                        objectType: "QUERY",
                        type: "CHORUS_VIEW"
                    },
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: "10102",
                            entityType: "file",
                            id: "10102",
                            name: "something.txt",
                            type: "TXT"
                        }
                    ],
                    workspace: fixtures.nestedWorkspaceJson()
                }, overrides);
                return new chorus.models.Activity(attrs);
            },

            "NOTE_ON_DATASET_TABLE": function(overrides) {
                var instanceId = fixtures.nextId().toString();
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that view.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    databaseObject: {
                        id: '"' + instanceId + '"|"dca_demo"|"public"|"__a_table_name"',
                        name: '__a_table_name',
                        objectType: "TABLE",
                        type: "databaseObject"
                    },
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: "10102",
                            entityType: "file",
                            id: "10102",
                            name: "something.txt",
                            type: "TXT"
                        }
                    ],
                    workspace: fixtures.nestedWorkspaceJson()
                }, overrides);
                return new chorus.models.Activity(attrs);
            },

            "NOTE_ON_DATABASE_TABLE": function(overrides) {
                var instanceId = fixtures.nextId().toString();
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that view.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    databaseObject: {
                        id: '"' + instanceId + '"|"dca_demo"|"public"|"__a_table_name"',
                        name: '__a_table_name',
                        objectType: "TABLE",
                        type: "databaseObject",
                        databaseName: "dca_demo",
                        schemaName: "public",
                        instance: fixtures.instanceJson()
                    },
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: "10102",
                            entityType: "file",
                            id: "10102",
                            name: "something.txt",
                            type: "TXT"
                        }
                    ]
                }, overrides);
                return new chorus.models.Activity(attrs);
            },


            "COMMENT_ON_NOTE_ON_CHORUS_VIEW": function(overrides) {
                var instanceId = fixtures.nextId().toString();
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE_COMMENT",
                    text: "How about that note on that table.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    parentComment: {
                        author: fixtures.authorJson(),
                        type: "NOTE",
                        text: "How about that view.",
                        timestamp: "2011-12-01 00:00:00",
                        id: fixtures.nextId().toString(),
                        comments: [
                            {
                                text: "sub-comment 1",
                                author: fixtures.authorJson(),
                                timestamp: "2011-12-15 12:34:56"
                            }
                        ],
                        chorusView: {
                            id: '"' + instanceId + '"|"dca_demo"|"public"|"__a_table_name"',
                            name: '__a_chorus_view_name',
                            objectName: "__a_chorus_view_name",
                            objectType: "QUERY",
                            type: "CHORUS_VIEW"
                        },
                        artifacts: [],
                        workspace: fixtures.nestedWorkspaceJson()
                    }
                }, overrides);
                return new chorus.models.Activity(attrs);
            },

            "COMMENT_ON_NOTE_ON_DATABASE_TABLE": function(overrides) {
                var instanceId = fixtures.nextId().toString();
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE_COMMENT",
                    text: "How about that note on that table.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    parentComment: {
                        author: fixtures.authorJson(),
                        type: "NOTE",
                        text: "How about that view.",
                        timestamp: "2011-12-01 00:00:00",
                        id: fixtures.nextId().toString(),
                        comments: [
                            {
                                text: "sub-comment 1",
                                author: fixtures.authorJson(),
                                timestamp: "2011-12-15 12:34:56"
                            }
                        ],
                        databaseObject: {
                            id: '"' + instanceId + '"|"dca_demo"|"public"|"__a_table_name"',
                            name: '__a_table_name',
                            objectType: "TABLE",
                            type: "databaseObject",
                            databaseName: "dca_demo",
                            schemaName: "public",
                            instance: fixtures.instanceJson()
                        },
                        artifacts: [
                            {
                                entityId: "10101",
                                entityType: "file",
                                id: "10101",
                                name: "something.sql",
                                type: "SQL"
                            },
                            {
                                entityId: "10102",
                                entityType: "file",
                                id: "10102",
                                name: "something.txt",
                                type: "TXT"
                            }
                        ]
                    }
                }, overrides);
                return new chorus.models.Activity(attrs);
            },

            "NOTE_ON_DATASET_VIEW": function(overrides) {
                var instanceId = fixtures.nextId().toString();
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that view.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    databaseObject: {
                        id: '"' + instanceId + '"|"dca_demo"|"public"|"__a_view_name"',
                        name: '__a_view_name',
                        objectType: "BASE_VIEW",
                        type: "databaseObject"
                    },
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: "10102",
                            entityType: "file",
                            id: "10102",
                            name: "something.txt",
                            type: "TXT"
                        }
                    ],
                    workspace: fixtures.nestedWorkspaceJson()
                }, overrides);
                return new chorus.models.Activity(attrs);
            },

            "NOTE_ON_WORKSPACE": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that.",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson(),
                    artifacts: [
                        {
                            entityId: "10101",
                            entityType: "file",
                            id: "10101",
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: "10102",
                            entityType: "file",
                            id: "10102",
                            name: "something.txt",
                            type: "TXT"
                        }
                    ]
                });
            },

            "COMMENT_ON_NOTE_ON_WORKSPACE": function() {
                var attrs = _.extend({
                    author: fixtures.authorJson(),
                    type: "NOTE_COMMENT",
                    text: "How about that note on that table.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),

                    parentComment: {
                        author: fixtures.authorJson(),
                        type: "NOTE",
                        text: "How about that.",
                        timestamp: "2011-12-01 00:00:00",
                        id: "10101",
                        comments: [
                            {
                                text: "sub-comment 1",
                                author: fixtures.authorJson(),
                                timestamp: "2011-12-15 12:34:56"
                            }
                        ],
                        workspace: rspecFixtures.workspaceJson(),
                        artifacts: [
                            {
                                entityId: "10101",
                                entityType: "file",
                                id: "10101",
                                name: "something.sql",
                                type: "SQL"
                            },
                            {
                                entityId: "10102",
                                entityType: "file",
                                id: "10102",
                                name: "something.txt",
                                type: "TXT"
                            }
                        ]
                    }
                });
                return new chorus.models.Activity(attrs);
            },


            "NOTE_ON_WORKFILE_JSON": function() {
                return {
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workfile: fixtures.nestedWorkfileJson(),
                    workspace: rspecFixtures.workspaceJson(),
                    artifacts: [
                        {
                            entityId: fixtures.nextId().toString(),
                            entityType: "file",
                            id: fixtures.nextId().toString(),
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: fixtures.nextId().toString(),
                            entityType: "file",
                            id: fixtures.nextId().toString(),
                            name: "something.txt",
                            type: "TXT"
                        }
                    ]
                };
            },

            "NOTE_ON_DATASET_JSON": function() {
                return {
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    artifacts: [],
                    isPromoted: false,
                    promoteCount: 0,
                    table: {
                        id: '"10114"|"dca_demo"|"public"|"a"',
                        name: "a"
                    }
                };
            },

            "NOTE_ON_WORKFILE": function() {
                return new chorus.models.Activity(fixtures.activities.NOTE_ON_WORKFILE_JSON());
            },

            "NOTE_ON_DATASET": function() {
                return new chorus.models.Activity(fixtures.activities.NOTE_ON_DATASET_JSON());
            },

            "NOTE_ON_HDFS": function() {
                return new chorus.models.Activity({
                    artifacts: [
                        {
                            entityId: fixtures.nextId().toString(),
                            entityType: "file",
                            id: fixtures.nextId().toString(),
                            name: "something.sql",
                            type: "SQL"
                        }
                    ],
                    author: fixtures.authorJson(),
                    comments: [fixtures.commentJson()],
                    hdfs: {
                        instance: {
                            id: '10010',
                            name: 'instanceName'
                        },
                        path: '/webui',
                        name: "chart.html",
                        isDeleted: false
                    },
                    id: fixtures.nextId().toString(),
                    isDeleted: false,
                    isInsight: false,
                    isPublished: false,
                    promotionActioner: null,
                    promotionTime: null,
                    publishUnpublishActioner: null,
                    publishUnpublishTime: null,
                    text: "hdfs is fun",
                    timestamp: "2012-03-05 15:31:34",
                    type: "NOTE"
                });
            },

            "NOTE_ON_THING_WE_DONT_SUPPORT_YET": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "NOTE",
                    text: "How about that.",
                    timestamp: "2011-12-01 00:00:00",
                    id: fixtures.nextId().toString(),
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    artifacts: [
                        {
                            entityId: fixtures.nextId().toString(),
                            entityType: "file",
                            id: fixtures.nextId().toString(),
                            name: "something.sql",
                            type: "SQL"
                        },
                        {
                            entityId: fixtures.nextId().toString(),
                            entityType: "file",
                            id: fixtures.nextId().toString(),
                            name: "something.txt",
                            type: "TXT"
                        }
                    ]
                })
            },

            "RECEIVE_NOTE": function() {
                return new chorus.models.Activity(
                    _.extend(this.NOTE_ON_WORKSPACE(), {
                        type: "RECEIVE_NOTE",
                        isInsight: true,
                        isPublished: false,
                        promotionActioner: fixtures.authorJson(),
                        promotionTime: "2012-02-29 09:38:04"
                    }));
            },

            "INSIGHT_CREATED": function(overrides) {
                return new chorus.models.Activity(
                    _.extend(this.NOTE_ON_DATASET_JSON(), {
                        type: "INSIGHT_CREATED",
                        isInsight: true,
                        promotionActioner: {id: 10010, lastName: "1", firstName: "u"},
                        promotionTime: "2012-02-14 12:34:56"
                    }, overrides));
            },

            "IMPORT_UPDATED_TABLE": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"morley2"',
                        objectName: "morley2",
                        objectType: "TABLE",
                        type: "SOURCE_TABLE"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_UPDATED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_UPDATED_VIEW": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"morley2"',
                        objectName: "morley2",
                        objectType: "VIEW",
                        type: "SOURCE_VIEW"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_UPDATED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_SUCCESS_FILE": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"morley2"',
                        name: "morley2"
                    },
                    file: {
                        name: "some.csv"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_SUCCESS",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_SUCCESS_CHORUS_VIEW": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        isDeleted: false,
                        lastName: "Admin"
                    },
                    chorusView: {
                        id: '"10002"|"Analytics"|"analytics"|"QUERY"|"a_chorus_view"',
                        isDeleted: false,
                        name: "a_chorus_view",
                        objectName: "a_chorus_view",
                        objectType: "QUERY",
                        query: "SELECT a.tot_sales_act FROM ad_chorus_analytics_table67 AS a",
                        type: "CHORUS_VIEW",
                        workspaceId: "10006"
                    },
                    comments: [],
                    id: fixtures.nextId.toString(),
                    import: {
                        id: "10020",
                        isDeleted: false,
                        name: "a_chorus_view"
                    },
                    isDeleted: false,
                    table: {
                        id: '"10002"|"Analytics"|"analytics"|"TABLE"|"new_imported_table"',
                        isDeleted: false,
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-18 21:51:41",
                    type: "IMPORT_SUCCESS",
                    workspace: {
                        id: "10006",
                        isDeleted: false,
                        name: "workspace1"
                    }
                })
            },

            "IMPORT_SUCCESS_SOURCE_TABLE": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10010"|"Analytics"|"analytics"|"TABLE"|"clv_data"',
                        name: "clv_data",
                        objectName: "clv_data",
                        objectType: "TABLE",
                        query: null,
                        type: "SOURCE_TABLE",
                        workspaceId: "10000"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_SUCCESS",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_SUCCESS_VIEW": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"QUERY"|"song_view"',
                        name: "song_view",
                        objectName: "song_view",
                        objectType: "QUERY",
                        query: "SELECT a.spotify_url, a.year, a.artist, a.title, a.theme↵FROM top_1_000_songs_to_hear_before_you_die AS a↵",
                        type: "CHORUS_VIEW",
                        workspaceId: "10000"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_SUCCESS",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_FAILED_FILE": function(overrides) {
                return new chorus.models.Activity(_.extend({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    file: {
                        name: "some.csv"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    task: {
                        id: fixtures.nextId().toString(),
                        isDeleted: false
                    },

                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_FAILED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                }, overrides))
            },

            "IMPORT_FAILED_SOURCE_TABLE": function(overrides) {
                return new chorus.models.Activity(_.extend({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10010"|"Analytics"|"analytics"|"TABLE"|"clv_data"',
                        name: "clv_data",
                        objectName: "clv_data",
                        objectType: "TABLE",
                        query: null,
                        type: "SOURCE_TABLE",
                        workspaceId: "10000"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    task: {
                        id: fixtures.nextId().toString(),
                        isDeleted: false
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_FAILED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                }, overrides))
            },

            "IMPORT_FAILED_VIEW": function(overrides) {
                return new chorus.models.Activity(_.extend({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"QUERY"|"song_view"',
                        name: "song_view",
                        objectName: "song_view",
                        objectType: "QUERY",
                        query: "SELECT a.spotify_url, a.year, a.artist, a.title, a.theme↵FROM top_1_000_songs_to_hear_before_you_die AS a↵",
                        type: "CHORUS_VIEW",
                        workspaceId: "10000"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    task: {
                        id: fixtures.nextId().toString(),
                        isDeleted: false
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_FAILED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                }, overrides))
            },

            "IMPORT_CREATED_FILE": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"morley2"',
                        name: "morley2"
                    },
                    file: {
                        name: "some.csv"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_CREATED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_CREATED_SOURCE_TABLE": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10010"|"Analytics"|"analytics"|"TABLE"|"clv_data"',
                        name: "clv_data",
                        objectName: "clv_data",
                        objectType: "TABLE",
                        query: null,
                        type: "SOURCE_TABLE",
                        workspaceId: "10000"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_CREATED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "IMPORT_CREATED_VIEW": function() {
                return new chorus.models.Activity({
                    author: {
                        firstName: "EDC",
                        id: "InitialUser",
                        lastName: "Admin"
                    },
                    comments: [],
                    databaseObject: {
                        id: '"10002"|"bizarro_world"|"public"|"QUERY"|"song_view"',
                        name: "song_view",
                        objectName: "song_view",
                        objectType: "QUERY",
                        query: "SELECT a.spotify_url, a.year, a.artist, a.title, a.theme↵FROM top_1_000_songs_to_hear_before_you_die AS a↵",
                        type: "CHORUS_VIEW",
                        workspaceId: "10000"
                    },
                    id: fixtures.nextId().toString(),
                    import: {
                        id: fixtures.nextId().toString()
                    },
                    table: {
                        id: '"10002"|"bizarro_world"|"public"|"TABLE"|"new_imported_table"',
                        name: "new_imported_table"
                    },
                    timestamp: "2012-03-02 12:19:50",
                    type: "IMPORT_CREATED",
                    workspace: {
                        id: "10000",
                        name: "a"
                    }
                })
            },

            "USER_ADDED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "USER_ADDED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    user: {
                        id: "12345",
                        name: "Bill Smith",
                        image: { original: "/foo", icon: "/bar" }
                    }
                });
            },

            "USER_DELETED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "USER_DELETED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    user: {
                        id: "12345",
                        name: "Bill Smith"
                    }
                });
            },

            "INSTANCE_CREATED": function() {
                return new chorus.models.Activity({
                    "timestamp": "2011-12-22 12:09:59",
                    "id": 10910,
                    "author": fixtures.authorJson(),
                    "instance": fixtures.instanceJson(),
                    "type": "INSTANCE_CREATED",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ]
                });
            },

            "INSTANCE_DELETED": function(overrides) {
                var attrs = _.extend({
                    "author": {id: "InitialUser", lastName: "Admin", isDeleted: false, firstName: "EDC"},
                    "comments": [],
                    "id": "10380",
                    "instance": {id: "10033", name: "aurora_to_be_deleted_del_1334876442675", isDeleted: true},
                    "isDeleted": false,
                    "timestamp": "2012-04-19 16:00:42",
                    "type": "INSTANCE_DELETED"


                });

                return new chorus.models.Activity(attrs);
            },

            "START_PROVISIONING": function(overrides) {
                var attrs = _.extend({
                    "id": "10180",
                    "instance": {port: "5432", id: "10032", host: "10.32.88.200", name: "aurora_instance", isDeleted: false},
                    "timestamp": "2012-04-19 12:21:00.162",
                    "type": "START_PROVISIONING"
                }, overrides);

                return new chorus.models.Activity(attrs);
            },

            "PROVISIONING_SUCCESS": function() {
                return new chorus.models.Activity({
                    "timestamp": "2012-04-05 15:57:47",
                    "id": 10301,
                    "author": {
                        "id": "InitialUser",
                        "lastName": "Admin",
                        "isDeleted": false,
                        "firstName": "EDC"
                    },
                    "instance": {
                        "id": "10220",
                        "name": "aurora_test1",
                        "host": "http://localhost",
                        "port": "5432"
                    },
                    "isDeleted": false,
                    "type": "PROVISIONING_SUCCESS",
                    "comments": [ ]
                });
            },

            "PROVISIONING_FAIL": function() {
                return new chorus.models.Activity({
                    "errorMessage": {
                        "responseMessage": "fail",
                        "errorMessage": "Can not connect to Aurora server."
                    },
                    "timestamp": "2012-04-05 16:19:54",
                    "id": 10311,
                    "author": {
                        "id": "InitialUser",
                        "lastName": "Admin",
                        "isDeleted": false,
                        "firstName": "EDC"
                    },
                    "instance": {
                        "id": "10230",
                        "name": "aurora_wrong"
                    },
                    "isDeleted": false,
                    "type": "PROVISIONING_FAIL",
                    "comments": [ ]
                });
            },

            "WORKSPACE_ARCHIVED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_ARCHIVED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_UNARCHIVED": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_UNARCHIVED",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            "WORKSPACE_ADD_SANDBOX": function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    type: "WORKSPACE_ADD_SANDBOX",
                    timestamp: "2011-12-01 00:00:00",
                    id: "10101",
                    comments: [
                        {
                            text: "sub-comment 1",
                            author: fixtures.authorJson(),
                            timestamp: "2011-12-15 12:34:56"
                        }
                    ],
                    workspace: rspecFixtures.workspaceJson()
                });
            },

            SOURCE_TABLE_CREATED: function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    comments: [],
                    databaseObject: {
                        id: '"10000"|"Analytics"|"analytics"|"VIEW"|"__gp_fullname"',
                        name: "__gp_fullname",
                        objectName: "__gp_fullname",
                        objectType: "VIEW",
                        type: "SOURCE_TABLE",
                        workspaceId: "10000"
                    },
                    id: 10070,
                    timestamp: "2012-02-21 12:29:39",
                    type: "SOURCE_TABLE_CREATED",
                    workspace: {
                        id: "10000",
                        name: "!!!!"
                    }
                });
            },

            CHORUS_VIEW_CREATED: function() {
                return new chorus.models.Activity({
                    author: fixtures.authorJson(),
                    chorusView: {
                        id: '"10000"|"Analytics"|"analytics"|"QUERY"|"mythingy"',
                        name: "mythingy",
                        objectName: "mythingy",
                        objectType: "QUERY",
                        type: "CHORUS_VIEW",
                        workspaceId: "10000"
                    },
                    comments: [],
                    id: 10072,
                    timestamp: "2012-02-21 14:44:59",
                    type: "CHORUS_VIEW_CREATED",
                    workspace: {
                        id: "10000",
                        name: "!!!!"
                    },
                    sourceObject: {
                        id: '"10000"|"Something"|"SomethingElse"|"QUERY"|"firstTHing"',
                        name: 'my_source_object'
                    }
                })
            },

            DATASET_CHANGED_QUERY: function() {
                return new chorus.models.Activity({
                    "timestamp": "2012-02-22 10:19:24",
                    "id": 10150,
                    "author": fixtures.authorJson(),
                    "workspace": {
                        "id": "10000",
                        "name": "!!!"
                    },
                    "chorusView": {
                        "workspaceId": "10000",
                        "id": '"10000"|"Analytics"|"analytics"|"QUERY"|"chorus_view_277"',
                        "objectName": "chorus_view_277",
                        "query": "SELECT name FROM people",
                        "name": "chorus_view_277",
                        "type": "CHORUS_VIEW",
                        "objectType": "QUERY"
                    },
                    "type": "DATASET_CHANGED_QUERY",
                    "comments": []
                });
            },

            VIEW_CREATED: function() {
                return new chorus.models.Activity({
                    "timestamp": "2012-02-22 10:19:24",
                    "id": 10150,
                    "author": fixtures.authorJson(),
                    "workspace": {
                        "id": "10000",
                        "name": "!!!"
                    },
                    "chorusView": {
                        "workspaceId": "10000",
                        "id": '"10000"|"Analytics"|"analytics"|"QUERY"|"chorus_view_277"',
                        "objectName": "chorus_view_277",
                        "query": "SELECT name FROM people",
                        "name": "chorus_view_277",
                        "type": "CHORUS_VIEW",
                        "objectType": "QUERY"
                    },
                    "view": {
                        "id": '"10000"|"Analytics"|"analytics"|"VIEW"|"my_view"',
                        "name": "my_view"
                    },
                    "type": "VIEW_CREATED",
                    "comments": []
                });
            }
        },

        activityJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                author: fixtures.authorJson(),
                type: "NOTE",
                text: "How about that.",
                timestamp: "2011-12-01 00:00:00",
                id: id,
                comments: [
                    fixtures.commentJson()
                ],
                artifacts: [
                    fixtures.artifactJson()
                ]
            }, overrides);
        },

        artifactJson: function() {
            var id = fixtures.nextId().toString();
            return {
                entityId: fixtures.nextId().toString(),
                entityType: "file",
                id: id,
                name: "something" + id + ".sql",
                type: "SQL"
            }
        },

        authorJson: function() {
            return {
                image: { original: "/foo", icon: "/bar" },
                id: "1234",
                lastName: "Smith",
                firstName: "Bob"
            }
        },

        commentJson: function(overrides) {
            return _.extend({
                text: "sub-comment 1",
                author: fixtures.authorJson(),
                timestamp: "2011-12-15 12:34:56"
            }, overrides);
        },

        configJson: function(overrides) {
            return _.extend({
                provisionMaxSizeInGB: 2000,
                logLevel: "INFO",
                provisionMaxSize: "2000 GB",
                sandboxRecommendSizeInBytes: 5368709120,
                sandboxRecommendSize: "5 GB"
            }, overrides);
        },

        databaseJson: function(overrides) {
            var id = this.nextId().toString();

            return _.extend({
                id: id,
                connectable: true,
                name: "Database_" + id,
                creatable: true
            }, overrides);
        },

        instanceJson: function(overrides) {
            var id = this.nextId();
            return _.extend({
                id: id.toString(),
                name: 'Instance_' + id
            }, overrides);
        },

        hadoopInstance: function(overrides) {
            return new chorus.models.HadoopInstance(this.hadoopInstanceJson(overrides));
        },

        hadoopInstanceJson: function(overrides) {
            return _.extend({
                id: "1234",
                name: "hadoop_1"
            }, overrides);
        },

        instanceWorkspaceUsageJson: function(overrides) {
            var workspaceId = this.nextId().toString();
            return _.extend({
                workspaceId: workspaceId,
                workspaceName: "workspace" + workspaceId,
                image: { original: "/foo", icon: "/bar" },
                workspaceOwnerFullName: "EDC Admin",
                sandboxId: this.nextId().toString(),
                databaseName: "Analytics",
                schemaName: "analytics",
                ownerFullName: "EDC Admin",
                sizeInBytes: "1648427008",
                size: "1.5GB"
            }, overrides);
        },

        nestedWorkfileJson: function() {
            var id = this.nextId().toString();
            return {
                canEdit: true,
                id: id,
                name: "file" + id + ".sql",
                mimeType: 'text/something',
                type: 'SQL'
            }
        },

        nestedWorkspaceJson: function() {
            var id = this.nextId().toString();
            return {
                id: id,
                name: "workspace" + id
            };
        },

        versionInfoJson: function(overrides, modifiedByUser) {
            var id = this.nextId().toString();
            return _.extend({
                versionNum: 1,
                lastUpdatedStamp: "2011-11-29 10:46:03.255",
                versionFileId: this.nextId().toString(),
                content: "Workfile Content!" + id,
                modifier: {
                    firstName : modifiedByUser.firstName,
                    lastName : modifiedByUser.lastName,
                    id : modifiedByUser.id
                },
                owner: { username: "edcadmin" },
                "versionFilePath": "/Users/pivotal/workspace/chorus/ofbiz/runtime/data/workfile/10003/1332867012541_2971",
                commitMessage: null,
                isEditable: true
            }, overrides);
        },

        executionInfoJson: function(overrides) {
            return _.extend({
                databaseId: null,
                databaseName: null,
                instanceId: null,
                instanceName: null,
                schemaId: null,
                schemaName: null
            }, overrides);
        },

        workfileDraft: function() {
            return {
                content: 'draft!',
                baseVersionNum: 1,
                draftOwner: 'edcadmin',
                draftFileId: this.nextId().toString(),
                isDeleted: false
            }
        },

        workfileJson: function(overrides) {
            var id = this.nextId().toString();
            var name = 'Workfile ' + id;
            // WTF: old fixtures reference new fixtures ???
            var modifiedByUser = rspecFixtures.userJson();
            var ownerUser = rspecFixtures.userJson();
            return _.extend({
                id: id,
                fileName: name,
                fileType: "txt",
                mimeType: "text/plain",
                versionInfo: this.versionInfoJson(overrides && overrides.versionInfo, modifiedByUser),
                executionInfo: this.executionInfoJson(overrides && overrides.executionInfo),
                latestVersionNum: 1,
                recentComments: [
                    fixtures.activities.NOTE_ON_WORKFILE_JSON(),
                    fixtures.activities.NOTE_ON_WORKFILE_JSON()
                ],
                canEdit: true,
                commentCount: 2,
                draftInfo: {
                    content: null,
                    baseVersionNum: null,
                    draftOwner: null,
                    draftFileId: null,
                    isDeleted: null
                },
                hasDraft: false,
                isDeleted: false,
                owner: ownerUser.username,
                ownerId: ownerUser.id,
                workspace: {
                    id: this.nextId().toString()
                },
                imageId: null,
                source: "empty",
                lastUpdatedStamp: "2011-11-29 10:46:03.152",
                createdStamp: "2011-11-29 10:46:03.152"
            }, overrides);
        },

        comment: function(overrides) {
            var id = this.nextId().toString();
            var attributes = _.extend({
                id: id,
                text: "this is comment text" + id,
                artifacts: [],
                timestamp: '2011-01-01 12:00:00'
            }, overrides);
            // WTF: old fixtures reference new fixtures ???
            attributes.author = _.extend(rspecFixtures.user().attributes, overrides && overrides.author);
            return new chorus.models.Comment(attributes);
        },

        database: function(overrides) {
            return new chorus.models.Database(this.databaseJson(overrides));
        },

        activity: function(overrides) {
            return new chorus.models.Activity(this.activityJson(overrides));
        },

        noteComment: function(overrides) {
            commentOverrides = _.extend({
                comments: [],
                attachments: [],
                entityType: 'instance',
                entityId: this.nextId().toString(),
                type: "NOTE",
                workspace: rspecFixtures.workspace()
            }, overrides)
            return fixtures.comment(commentOverrides);
        },

        schemaSet: function(overrides) {
            var attributes = _.extend({
                databaseId: this.nextId().toString()
            }, overrides);
            return new chorus.collections.SchemaSet([], attributes);
        },

        schema: function(overrides) {
            var id = this.nextId().toString();

            var attributes = _.extend({
                id: id,
                name: "Schema_" + id,
                lastUpdatedStamp: "2012-01-04 14:42:15.318",
                lastUpdatedTxStamp: "2012-01-04 14:42:15.309",
                createdStamp: "2012-01-04 14:42:15.318",
                createdTxStamp: "2012-01-04 14:42:15.309",
                database: {
                    id: this.nextId().toString(),
                    name: "My fixture database",
                    instance: {
                        id: this.nextId().toString(),
                        name: "My fixture instance"
                    }
                },
                datasetCount: 4
            }, overrides);
            return new chorus.models.Schema(attributes);
        },

        databaseTable: function(overrides) {
            var attributes = _.extend(newFixtures.databaseObjectJson(), {
                objectType: "TABLE",
                type: "SOURCE_TABLE"
            }, overrides);
            return new chorus.models.DatabaseObject(attributes);
        },

        databaseView: function(overrides) {
            var attributes = _.extend(newFixtures.databaseObjectJson(), {
                objectType: "VIEW",
                type: "SOURCE_TABLE",
                definition: "SELECT chorus_test_table.customer_id FROM ddemo.chorus_test_table;"
            }, overrides);
            return new chorus.models.DatabaseObject(attributes);
        },

        databaseColumn: function(overrides) {
            var id = this.nextId().toString();
            var attributes = _.extend({
                name: "column_name_" + id,
                typeCategory: "WHOLE_NUMBER",
                ordinalPosition: this.nextId()
            }, overrides);
            return new chorus.models.DatabaseColumn(attributes);
        },

        databaseColumnSet: function(models, overrides) {
            var id = this.nextId().toString()
            models = (models && (models.length > 0)) ? models : [this.databaseColumn(overrides), this.databaseColumn(overrides)];
            var attributes = _.extend({
                tableName: "Table" + id
            }, overrides);
            var collection = new chorus.collections.DatabaseColumnSet([], attributes);
            collection.reset(models)
            return collection;
        },

        draft: function(overrides) {
            var attributes = _.extend({draftInfo: this.workfileDraft(), hasDraft: true}, overrides);
            // TODO: REMOVEME
            var workfileJson = this.workfileJson(attributes)
            workfileJson.workspaceId = overrides.workspaceId || workfileJson.workspace.id;
            return new chorus.models.Draft(workfileJson);
        },

        workfileSet: function(models) {
            models = models || [rspecFixtures.workfile.sql(), rspecFixtures.workfile.sql()];
            return new chorus.collections.WorkfileSet(models);
        },

        artifact: function(overrides) {
            var attributes = _.extend({
                id: this.nextId().toString(),
                entityType: "file"
            }, overrides);
            return new chorus.models.Artifact(attributes);
        },

        chorusViewArtifactJson: function(overrides) {
            return _.extend({
                id: this.nextId().toString(),
                entityType: "chorusView",
                objectType: "QUERY",
                type: "CHORUS_VIEW",
                workspaceId: this.nextId().toString()
            }, overrides);
        },

        datasetArtifactJson: function(overrides) {
            return _.extend({
                id: this.nextId().toString(),
                entityType: "databaseObject",
                objectType: "TABLE",
                type: "SANDBOX_TABLE",
                workspaceId: this.nextId().toString()
            }, overrides);
        },

        emptyInstanceAccount: function(overrides) {
            var attributes = _.extend({
                instanceId: "10020",
                userName: "u1"
            }, overrides);
            return new chorus.models.InstanceAccount(attributes);
        },

        instanceAccount: function(overridesOrInstance) {
            var overrides;
            if (overridesOrInstance instanceof chorus.models.GreenplumInstance) {
                overrides = {
                    instanceId: overridesOrInstance.get("id")
                };
            } else {
                overrides = overridesOrInstance || {};
            }
            var attributes = _.extend({
                id: this.nextId().toString(),
                shared: "true",
                expiration: null,
                instanceId: this.nextId().toString(),
                // WTF: old fixtures reference new fixtures ???
                owner: _.extend(rspecFixtures.userJson(), overrides.owner),
                dbUsername: "gpadmin"
            }, overrides);
            return new chorus.models.InstanceAccount(attributes);
        },

        instanceAccountSet: function(models) {
            models = models || [this.instanceAccount(), this.instanceAccount()];
            return new chorus.collections.InstanceAccountSet(models);
        },

        instanceUsage: function() {
            return new chorus.models.InstanceUsage({
                "sandboxesSize": "2.9GB",
                "sandboxesSizeInBytes": 3157917696,
                "workspaces": [
                    this.instanceWorkspaceUsageJson({
                        sizeInBytes: "1648427008"
                    }),
                    this.instanceWorkspaceUsageJson({
                        sizeInBytes: "1509490688"
                    })
                ]
            });
        },

        tabularDataJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                objectName: "Dataset" + id,
                schema: {
                    id: fixtures.nextId(),
                    name: "some_schema",
                    database: {
                        id: fixtures.nextId(),
                        name: "dca_demo",
                        instance: {
                            id: fixtures.nextId(),
                            name: "some_instance"
                        }
                    }
                },
                recentComment: fixtures.activities.NOTE_ON_DATASET_JSON(),
                commentCount: 1
            }, overrides);
        },

        datasetCommonJson: function(overrides) {
            var id = fixtures.nextId();
            var attributes = _.extend(this.tabularDataJson(), {
                isDeleted: false,
                importInfo: {},
                hasCredentials: true,
                importFrequency: null,
                owner: {id: "InitialUser", username: "edcadmin"},
                modifiedBy: {id: "InitialUser", username: "edcadmin"},
                workspace: {id: fixtures.nextId(), name: "some_workspace"},
                workspaceUsed: {
                    workspaceCount: 1,
                    workspaceList: [rspecFixtures.workspaceJson()]
                }
            }, overrides);
            attributes.instance = attributes.instance || {};
            attributes.instance.id = attributes.schema.database.instance.id;
            attributes.id = _.map([
                attributes.schema.database.instance.id,
                attributes.schema.database.name,
                attributes.schema.name,
                attributes.objectType,
                attributes.objectName
            ],
                function(piece) {return '"' + piece + '"'}).join("|");
            return attributes;
        },

        chorusView: function(overrides) {
            var attributes = _.extend(fixtures.datasetCommonJson(overrides), {
            }, overrides);
            return new chorus.models.ChorusView(attributes);
        },

        datasetStatisticsView: function(overrides) {
            var attributes = _.extend(fixtures.datasetCommonJson(overrides), {
                createdStamp: "2012-01-24 12:25:11.077",
                createdTxStamp: "2012-01-24 12:25:10.701",
                id: fixtures.nextId().toString(),
                lastUpdatedStamp: "2012-01-24 12:25:11.077",
                lastUpdatedTxStamp: "2012-01-24 12:25:10.701",
                objectType: "VIEW",
                type: "SOURCE_TABLE",
                definition: "DROP TABLE users"
            }, overrides);
            return new chorus.models.DatabaseObjectStatistics(attributes);
        },

        datasetStatisticsTable: function(overrides) {
            var attributes = _.extend(fixtures.datasetCommonJson(overrides), {
                createdStamp: "2012-01-24 12:25:11.077",
                createdTxStamp: "2012-01-24 12:25:10.701",
                id: fixtures.nextId().toString(),
                lastUpdatedStamp: "2012-01-24 12:25:11.077",
                lastUpdatedTxStamp: "2012-01-24 12:25:10.701",
                objectType: "TABLE",
                type: "SOURCE_TABLE"
            }, overrides);
            return new chorus.models.DatabaseObjectStatistics(attributes);
        },

        datasetExternalTable: function(overrides) {
            var datasetCommonAttributes = _.extend({
                modifiedBy: {},
                objectType: "EXTERNAL_TABLE",
                owner: {},
                type: "SANDBOX_TABLE"
            }, overrides)
            var attributes = _.extend(fixtures.datasetCommonJson(datasetCommonAttributes), overrides);
            return new chorus.models.Dataset(attributes);
        },

        datasetImportSuccessful: function(overrides) {
            return this.datasetImport(_.extend({executionInfo: {
                startedStamp: "2012-02-29 14:23:58.169",
                completedStamp: "2012-02-29 14:23:59.027",
                result: {executeResult: "success"},
                state: "success",
                creator: "InitialUser"
            }}, overrides));
        },

        datasetImportFailed: function(overrides) {
            return this.datasetImport(_.extend({executionInfo: {
                startedStamp: "2012-02-29 14:23:58.169",
                completedStamp: "2012-02-29 14:23:59.027",
                result: "That import was totally bogus",
                state: "failed",
                creator: "InitialUser"
            }}, overrides));
        },

        datasetImport: function(overrides) {
            var in1year = new Date();
            in1year.setFullYear(in1year.getFullYear() + 1);
            var in1yearStr = Date.formatForApi(in1year);

            var attributes = _.extend({
                destinationTable: '"10000"|"Analytics"|"analytics"|"TABLE"|"asdfsfsdf"',
                id: this.nextId().toString(),
                nextImportTime: in1yearStr,
                sampleCount: 500,
                sampleMethod: "RANDOM_COUNT",
                executionInfo: {
                    startedStamp: "2012-02-29T14:23:58Z",
                    completedStamp: "2012-02-29T14:23:59Z",
                    result: {
                        executeResult: "success"
                    },
                    state: "success",
                    toTable: 'someTable',
                    creator: "InitialUser"
                },
                scheduleInfo: {
                    endTime: "2013-06-02",
                    frequency: "WEEKLY",
                    jobName: "ScheduleJob_1330719934443",
                    startTime: "2012-02-29T14:23:58Z"
                },
                sourceId: '"10000"|"dca_demo"|"ddemo"|"TABLE"|"_uspresident"',
                sourceTable: null,
                sourceType: "dataset",
                toTable: "asdfsfsdf",
                truncate: false,
                workspaceId: this.nextId().toString()
            }, overrides);
            return new chorus.models.DatasetImport(attributes);
        },

        chartTask: function(overrides) {
            return new chorus.models.ChartTask(_.extend({
                columns: [],
                rows: []
            }, overrides));
        },

        csvImport: function(overrides) {
            var attributes = _.extend({
                lines: [
                    "col1,col2,col3",
                    "val1,val2,val3"
                ],
                fileName: "/file.csv",
                workspaceId: this.nextId().toString(),
                hasHeader: true
            }, overrides)
            return new chorus.models.CSVImport(attributes);
        },

        datasetHadoopExternalTable: function(overrides) {
            var attributes = _.extend(fixtures.datasetCommonJson(overrides), {
                modifiedBy: {},
                objectType: "HDFS_EXTERNAL_TABLE",
                owner: {},
                type: "SANDBOX_TABLE"
            }, overrides);
            return new chorus.models.Dataset(attributes);
        },

        schemaFunction: function(overrides) {
            var attributes = _.extend({
                argTypes: ['text', 'text', 'text'],
                argNames: ['firstName', 'lastName', ''],
                language: "plpgsql",
                functionName: "function" + this.nextId().toString(),
                schemaName: 'mmmmySchema',
                returnType: "void"
            }, overrides);
            return new chorus.models.SchemaFunction(attributes);
        },

        tabularData: function(overrides) {
            return new chorus.models.TabularData(this.tabularDataJson(_.extend({
                objectType: "TABLE",
                type: "SANDBOX_TABLE"
            }, overrides)));
        },

        task: function(overrides) {
            var id = this.nextId().toString();
            return new chorus.models.SqlExecutionTask(_.extend({
                id: this.nextId().toString()
            }, overrides));
        },

        taskWithResult: function(overrides) {
            overrides = _.extend({ result: {
                columns: [
                    { name: "id" },
                    { name: "city" },
                    { name: "state" },
                    { name: "zip" }
                ],
                rows: [
                    { id: 1, city: "Oakland", state: "CA", zip: "94612" } ,
                    { id: 2, city: "Arcata", state: "CA", zip: "95521" } ,
                    { id: 3, city: "Lafayette", state: "IN", zip: "47909" }
                ],
                executeResult: "success",
                hasResult: "true",
                message: ""
            }}, overrides);
            return this.task(overrides);
        },

        taskWithoutResults: function(overrides) {
            overrides = _.extend({ result: {
                columns: [
                    { name: "id" },
                    { name: "city" },
                    { name: "state" },
                    { name: "zip" }
                ],
                rows: [
                    { id: 1, city: "Oakland", state: "CA", zip: "94612" } ,
                    { id: 2, city: "Arcata", state: "CA", zip: "95521" } ,
                    { id: 3, city: "Lafayette", state: "IN", zip: "47909" }
                ],
                executeResult: "success",
                hasResult: "false",
                message: ""
            }}, overrides);
            return this.task(overrides);
        },

        timeseriesTaskWithResult: function(overrides) {
            var attributes = _.extend({
                tabularData: newFixtures.dataset.sandboxTable({objectName: 'pirates'}),
                yAxis: "num_hands",
                xAxis: "per_year",

                columns: [
                    { name: "time", typeCategory: "DATE" },
                    { name: "value", typeCategory: "WHOLE_NUMBER" }
                ],
                rows: [
                    { time: 1, value: '321' },
                    { time: 2, value: '1024' }
                ]
            }, overrides);
            return new chorus.models.TimeseriesTask(attributes);
        },

        frequencyTaskWithResult: function(overrides) {
            var attributes = _.extend({
                tabularData: newFixtures.dataset.sandboxTable({objectName: 'pirates'}),
                yAxis: "num_hands",

                columns: [
                    { name: "bucket", typeCategory: "STRING" },
                    { name: "count", typeCategory: "WHOLE_NUMBER" }
                ],
                rows: [
                    { bucket: 1, count: '321' },
                    { bucket: 2, count: '1024' }
                ]
            }, overrides);
            return new chorus.models.FrequencyTask(attributes);
        },

        boxplotTaskWithResult: function(overrides) {
            var attributes = _.extend({
                tabularData: newFixtures.dataset.sandboxTable({objectName: 'pirates'}),
                xAxis: "gender",
                yAxis: "age",
                columns: [
                    { name: "bucket", typeCategory: "STRING" },
                    { name: "min", typeCategory: "REAL_NUMBER" },
                    { name: "median", typeCategory: "REAL_NUMBER" },
                    { name: "max", typeCategory: "REAL_NUMBER" },
                    { name: "firstQuartile", typeCategory: "REAL_NUMBER" },
                    { name: "thirdQuartile", typeCategory: "REAL_NUMBER" },
                    { name: "percentage", typeCategory: "STRING" }
                ],
                rows: [
                    { min: 0, median: 2, max: 4, count: 279089, percentage: '27.9%', bucket: 'FEMALE', firstQuartile: 1, thirdQuartile: 3 },
                    { min: 0, median: 2, max: 4, count: 720911, percentage: '72.1%', bucket: 'MALE', firstQuartile: 1, thirdQuartile: 3 }
                ]
            }, overrides);
            return new chorus.models.BoxplotTask(attributes);
        },

        heatmapTaskWithResult: function(overrides) {
            var attributes = _.extend({
                tabularData: newFixtures.dataset.sandboxTable({objectName: 'pirates'}),
                xAxis: "hair_length",
                yAxis: "kill_count",
                xBins: "4",
                yBins: "3",

                columns: [
                    { "name": "x", "typeCategory": "WHOLE_NUMBER" },
                    { "name": "y", "typeCategory": "WHOLE_NUMBER" },
                    { "name": "value", "typeCategory": "REAL_NUMBER" },
                    { "name": "xLabel", "typeCategory": "STRING" },
                    { "name": "yLabel", "typeCategory": "STRING" }
                ],

                rows: [
                    { yLabel: "[30-71.8]", xLabel: "[0-1.8]", value: 39541, y: 1, x: 1 },
                    { yLabel: "[71.8-113.6]", xLabel: "[0-1.8]", value: 39873, y: 2, x: 1 },
                    { yLabel: "[113.6-155.4]", xLabel: "[0-1.8]", value: 39993, y: 3, x: 1 },
                    { yLabel: "[30-71.8]", xLabel: "[1.8-3.6]", value: 39818, y: 1, x: 2 },
                    { yLabel: "[71.8-113.6]", xLabel: "[1.8-3.6]", value: 39838, y: 2, x: 2 },
                    { yLabel: "[113.6-155.4]", xLabel: "[1.8-3.6]", value: 39911, y: 3, x: 2 },
                    { yLabel: "[30-71.8]", xLabel: "[3.6-5.4]", value: 39631, y: 1, x: 3 },
                    { yLabel: "[71.8-113.6]", xLabel: "[3.6-5.4]", value: 40174, y: 2, x: 3 },
                    { yLabel: "[113.6-155.4]", xLabel: "[3.6-5.4]", value: 39700, y: 3, x: 3 },
                    { yLabel: "[30-71.8]", xLabel: "[5.4-7.2]", value: 40551, y: 1, x: 4 },
                    { yLabel: "[71.8-113.6]", xLabel: "[5.4-7.2]", value: 40411, y: 2, x: 4 },
                    { yLabel: "[113.6-155.4]", xLabel: "[5.4-7.2]", value: 39841, y: 3, x: 4 }
                ]
            }, overrides);
            return new chorus.models.HeatmapTask(attributes);
        },

        taskWithErrors: function(overrides) {
            var attributes = _.extend({ result: {
                executeResult: "failed",
                hasResult: "false",
                message: 'ERROR: syntax error at or near "where 1=1; drop table users;"  Position: line 1 column 1'
            }}, overrides);
            var task = this.task(attributes);
            task.serverErrors = task.result;
            return task;
        },

        notificationJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                id: id,
                content: "what an alert!",
                operatorFullName: "Joe Bloggs",
                operator: "joebloggs",
                recipientFullName: "Nancy Schmeigel",
                recipient: "nancy",
                isDeleted: false
            }, overrides);
        },

        notification: function(overrides) {
            return new chorus.models.Notification(this.notificationJson(overrides));
        },

        notificationSet: function(models, overrides) {
            models = models || [this.notification(overrides), this.notification(overrides)];
            return new chorus.collections.NotificationSet(models, overrides);
        },

        hdfsEntrySet: function(models, overrides) {
            models = models || [
                fixtures.hdfsEntryDirJson(),
                fixtures.hdfsEntryFileJson(),
                fixtures.hdfsEntryBinaryFileJson(),
                fixtures.hdfsEntryUnknownIfBinaryFileJson()
            ];
            var attributes = _.extend({
                path: '/data',
                hadoopInstance: {
                    id: this.nextId().toString(),
                    name: 'instanceName'
                }
            }, overrides);
            var result = new chorus.collections.HdfsEntrySet(null, attributes);
            result.reset(models);
            return result;
        },

        csvHdfsFileSet: function(models, overrides) {
            models = models || [
                fixtures.hdfsEntryDirJson(),
                fixtures.hdfsEntryFileJson(),
                fixtures.hdfsEntryBinaryFileJson(),
                fixtures.hdfsEntryUnknownIfBinaryFileJson()
            ];
            var attributes = _.extend({
                path: '/data',
                hadoopInstance: {
                    id: this.nextId().toString(),
                    name: 'hadoopInstanceName'
                }
            }, overrides);
            var result = new chorus.collections.CsvHdfsFileSet(null, attributes);
            result.reset(models);
            return result;
        },

        hdfsEntryDir: function(overrides) {
            return new chorus.models.HdfsEntry(this.hdfsEntryDirJson(overrides));
        },

        hdfsEntryFile: function(overrides) {
            return new chorus.models.HdfsEntry(this.hdfsEntryFileJson(overrides));
        },

        hdfsEntryDirJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                "name": "folder" + id,
                "isDir": true,
                "lastUpdatedStamp": "2012-02-24T10:28:42Z",
                "size": 0,
                "count": 6,
                "owner": "hadoop",
                "group": "supergroup",
                "permission": "rwxr-xr-x"
            }, overrides);
        },

        hdfsEntryFileJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                "name": "file" + id + ".sql",
                "isDir": false,
                "isBinary": false,
                "lastUpdatedStamp": "2012-02-24T10:28:42Z",
                "size": 23,
                "count": 0,
                "owner": "hadoop",
                "group": "supergroup",
                "permission": "rw-r--r--"
            }, overrides);
        },

        hdfsEntryBinaryFileJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                "name": "file" + id + ".bin",
                "isDir": false,
                "isBinary": true,
                "lastUpdatedStamp": "2012-02-24T10:28:42Z",
                "size": 1337,
                "count": 0,
                "owner": "hadoop",
                "group": "supergroup",
                "permission": "rw-r--r--"
            }, overrides);
        },

        hdfsEntryUnknownIfBinaryFileJson: function(overrides) {
            var id = fixtures.nextId();
            return _.extend({
                "name": "file" + id + ".???",
                "isDir": false,
                "isBinary": null,
                "lastUpdatedStamp": "2012-02-24T10:28:42Z",
                "size": 1337,
                "count": 0,
                "owner": "hadoop",
                "group": "supergroup",
                "permission": "rw-r--r--"
            }, overrides);
        },

        hdfsFile: function(overrides) {
            var json = fixtures.hdfsFileJson(overrides);
            return new chorus.models.HdfsFile(json);
        },

        hdfsFileJson: function(overrides) {
            return _.extend({
                lastUpdatedStamp: "2012-03-05T15:23:44Z",
                lines: [
                    "some content;",
                    "second line"
                ],
                path: "%2Fdata%2FfixtureFile.sql"
            }, overrides)
        },

        attachmentOnWorkfileInWorkspaceSearchResult: function(overrides) {
            var attributes = _.extend({
                "entityType": "attachment",
                "type": "attachment",
                "id": "10011",
                "isDeleted": false,
                "lastUpdatedStamp": "2012-03-20 15:08:16",
                "fileId": "10011",
                "fileType": "IMAGE",
                "isBinary": true,
                "name": "Titanic2.jpg",
                "highlightedAttributes": {
                    "name": ["<em>Titanic<\/em><em>2<\/em>.jpg"]
                },
                "owner": {
                    "id": "InitialUser",
                    "lastName": "Admin",
                    "firstName": "EDC"
                },
                "workspace": {
                    "id": "10000",
                    "name": "ws"
                },
                "workfile": {
                    "id": "10030",
                    "lastUpdatedStamp": "2012-03-14 17:15:21",
                    "fileType": "TXT",
                    "versionInfo": {
                        "lastUpdatedStamp": "2012-03-14T17:15:21Z",
                        "versionFileId": "1331770521971_1380",
                        "modifier": {
                            "id": "InitialUser",
                            "lastName": "Admin",
                            "firstName": "EDC"
                        },
                        "versionFilePath": "/Users/pivotal/workspace/chorus/ofbiz/runtime/data/workfile/10003/1332867012541_2971",
                        "versionOwner": "edcadmin",
                        "versionNum": 1
                    },
                    "latestVersionNum": 1,
                    "workspace": {
                        "id": "10000",
                        "name": "ws"
                    },
                    "fileName": "buildout.txt",
                    "owner": {
                        "id": "InitialUser",
                        "lastName": "Admin",
                        "firstName": "EDC"
                    },
                    "isDeleted": false,
                    "entityType": "workfile",
                    "mimeType": "text/plain"
                },
                "comments": []
            });
            return new chorus.models.Artifact(attributes);
        },

        attachmentOnFileInHdfsSearchResult: function(overrides) {
            var attributes = _.extend(
                {
                    "entityType": "attachment",
                    "type": "attachment",
                    "id": "10012",
                    "isDeleted": false,
                    "lastUpdatedStamp": "2012-03-20 15:46:12",
                    "fileId": "10012",
                    "fileType": "IMAGE",
                    "isBinary": true,
                    "name": "pivotal (1).jpg",
                    "highlightedAttributes": {
                        "name": ["<em>pivotal<\/em> (1).jpg"]
                    },
                    "owner": {
                        "id": "InitialUser",
                        "lastName": "Admin",
                        "firstName": "EDC"
                    },
                    "workspace": {},
                    "hdfs": {
                        "id": "10020|/data/cleardb.sql",
                        "path": "/data/cleardb.sql",
                        "hadoopInstance": {
                            "id": "10020",
                            "name": "hadoooooooooop"
                        },
                        "entityType": "hdfs"
                    },
                    "comments": []
                }
            );
            return new chorus.models.Artifact(attributes);
        },

        attachmentOnDatasetInWorkspaceSearchResult: function(overrides) {
            var model = this.attachmentOnDatasetNotInWorkspaceSearchResult(overrides);
            model.set({workspace: {
                id: "33333",
                name: "ws"
            }});
            model.get('databaseObject').workspaces = [
                {
                    id: "15555",
                    datasetType: "SANDBOX_TABLE",
                    name: "wswsws"
                },
                {
                    id: "10030",
                    datasetType: "SANDBOX_TABLE",
                    name: "has_sandbox"
                }
            ];
            return model;
        },


        attachmentOnDatasetNotInWorkspaceSearchResult: function(overrides) {
            var attributes = _.extend({
                entityType: "attachment",
                id: "10005",
                isDeleted: false,
                lastUpdatedStamp: "2012-03-16 17:06:08",
                fileId: "10005",
                fileType: "IMAGE",
                isBinary: true,
                name: "Titanic2.jpg",
                highlightedAttributes: {
                    name: ["<em>Titanic</em><em>2</em>.jpg"]
                },
                owner: {
                    id: "InitialUser",
                    lastName: "Admin",
                    firstName: "EDC"
                },
                workspace: {
                },
                databaseObject: {
                    id: '100',
                    schema: {
                        name: "ddemo",
                        database: {
                            name: "dca_demo",
                            instance: {
                                id: "22222",
                                name: "gillette"
                            }
                        }
                    },
                    objectName: "2010_report_on_white_house",
                    workspaces: [],
                    entityType: "databaseObject",
                    objectType: "TABLE"
                },
                comments: []
            });
            return new chorus.models.Artifact(attributes);
        },

        attachmentOnInstanceSearchResult: function(overrides) {
            var attributes = _.extend({
                "entityType": "attachment",
                "type": "attachment",
                "id": "10014",
                "isDeleted": false,
                "lastUpdatedStamp": "2012-03-20 16:43:21",
                "fileId": "10014",
                "fileType": "IMAGE",
                "isBinary": true,
                "name": "chuck.jpg",
                "highlightedAttributes": {
                    "name": ["<em>chuck<\/em>.jpg"]
                },
                "owner": {
                    "id": "InitialUser",
                    "lastName": "Admin",
                    "firstName": "EDC"
                },
                "workspace": {},
                "instance": {
                    "port": 5432,
                    "id": "10000",
                    "host": "gillette.sf.pivotallabs.com",
                    "provision_type": "register",
                    "name": "gillette",
                    "owner": {
                        "id": "InitialUser",
                        "lastName": "Admin",
                        "firstName": "EDC"
                    },
                    "state": "online",
                    "instanceProvider": "Greenplum Database",
                    "isDeleted": false,
                    "entityType": "instance",
                    "database": "postgres"
                },
                "comments": []
            });
            return new chorus.models.Artifact(attributes);
        },

        attachmentOnWorkspaceSearchResult: function(overrides) {
            var attributes = _.extend({

                "entityType": "attachment",
                "type": "attachment",
                "id": "10013",
                "isDeleted": false,
                "lastUpdatedStamp": "2012-03-20 16:31:17",
                "fileId": "10013",
                "fileType": "IMAGE",
                "isBinary": true,
                "name": "chuck.jpg",
                "highlightedAttributes": {
                    "name": ["<em>chuck<\/em>.jpg"]
                },
                "owner": {
                    "id": "InitialUser",
                    "lastName": "Admin",
                    "firstName": "EDC"
                },
                "workspace": {
                    "id": "10000",
                    "name": "ws"
                },
                "comments": []
            });
            return new chorus.models.Artifact(attributes);
        },

        searchResultJson: function(overrides) {
            // WTF: old fixtures reference new fixtures ???
            var modifiedByUser = rspecFixtures.userJson();
            return _.extend({
                "workfile": {
                    "docs": [
                        {
                            "id": "10020",
                            "isDeleted": false,
                            "lastUpdate": "Tue Feb 21 10:53:48 PST 2012",
                            "fileType": "SQL",
                            "fileName": "test.sql",
                            "entityType": "workfile",
                            "versionInfo": this.versionInfoJson(overrides && overrides.versionInfo, modifiedByUser),
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "workspace": {
                                "id": "10050",
                                "name": "Lenny & Corina"
                            },
                            "comments": [],
                            highlightedAttributes: {
                                "fileName": ["<em>test<\/em>.sql"]
                            }
                        },
                        {
                            "id": "10040",
                            "isDeleted": false,
                            "lastUpdate": "Thu Feb 23 12:28:56 PST 2012",
                            "fileType": "SQL",
                            "fileName": "test.sql",
                            "entityType": "workfile",
                            "versionInfo": this.versionInfoJson(overrides && overrides.versionInfo, modifiedByUser),
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "workspace": {
                                "id": "10039",
                                "name": "mine"
                            },
                            "comments": [],
                            highlightedAttributes: {
                                "fileName": ["<em>test<\/em>.sql"]
                            }
                        }
                    ],
                    "numFound": 2
                },
                "workspace": {
                    "docs": [
                        {
                            comments: [],
                            entityType: "workspace",
                            id: "10000",
                            isDeleted: false,
                            public: false,
                            lastUpdatedStamp: "2012-02-24 16:08:32",
                            name: "ws",
                            owner: {
                                firstName: "EDC",
                                id: "InitialUser",
                                lastName: "Admin"
                            },
                            highlightedAttributes: {
                                name: ["<em>ws</em>"]
                            }
                        },
                        {
                            comments: [],
                            entityType: "workspace",
                            id: "10001",
                            isDeleted: false,
                            public: false,
                            lastUpdatedStamp: "2012-02-24 16:08:32",
                            name: "other_ws",
                            owner: {
                                firstName: "EDC",
                                id: "InitialUser",
                                lastName: "Admin"
                            },
                            highlightedAttributes: {
                                name: ["other_<em>ws</em>"]
                            }
                        }
                    ],
                    "numFound": 3
                },
                "dataset": {
                    "docs": [
                        {
                            schemaName: "public",
                            parentType: "gpdb_10000_data_types",
                            objectType: "TABLE",
                            id: '"10000"|"data_types"|"public"|"TABLE"|"a"',
                            databaseName: "data_types",
                            objectName: "a",
                            isDeleted: false,
                            description: "This is a test of table description.",
                            entityType: "databaseObject",
                            instance: {
                                id: "10000",
                                name: "gillette"
                            },
                            workspaces: [],
                            comments: [],
                            highlightedAttributes: {
                                description: ["This is a <em>test<\/em> of table description."]
                            }
                        },
                        {
                            compositeId: '"10000"|"dca_demo"|"ddemo"|"QUERY"|"cv_us_president"',
                            content: "SELECT * FROM test AS a",
                            databaseName: "dca_demo",
                            datasetType: "CHORUS_VIEW",
                            entityType: "chorusView",
                            id: "10010",
                            instance: {
                                id: '10000',
                                name: 'gillette'
                            },
                            isDeleted: false,
                            objectName: "cv_us_president",
                            objectType: "QUERY",
                            schemaName: "ddemo",
                            workspace: {
                                id: '10000',
                                name: 'New Workspace'
                            },
                            comments: [],
                            highlightedAttributes: {
                                content: ["SELECT * FROM <em>test</em> AS a"]
                            }
                        },
                        {
                            schemaName: "analytics",
                            parentType: "gpdb_10000_Analytics",
                            objectType: "TABLE",
                            id: '"10000"|"Analytics"|"analytics"|"TABLE"|"test1"',
                            databaseName: "Analytics",
                            objectName: "test1",
                            isDeleted: false,
                            entityType: "databaseObject",
                            instance: {
                                id: "10000",
                                name: "gillette"
                            },
                            workspaces: [
                                {
                                    id: "10000",
                                    name: "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test2"',
                            "databaseName": "Analytics",
                            "objectName": "test2",
                            "isDeleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test3"',
                            "databaseName": "Analytics",
                            "objectName": "test3",
                            "isDeleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test4"',
                            "databaseName": "Analytics",
                            "objectName": "test4",
                            "isDeleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test5"',
                            "databaseName": "Analytics",
                            "objectName": "test5",
                            "isDeleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test6"',
                            "databaseName": "Analytics",
                            "objectName": "test6",
                            "issearch_result_list.js:65Deleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test"',
                            "databaseName": "Analytics",
                            "objectName": "test",
                            "isDeleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        },
                        {
                            "schemaName": "analytics",
                            "parentType": "gpdb_10000_Analytics",
                            "objectType": "TABLE",
                            "id": '"10000"|"Analytics"|"analytics"|"TABLE"|"test7"',
                            "databaseName": "Analytics",
                            "objectName": "test7",
                            "isDeleted": false,
                            "entityType": "databaseObject",
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "name": "danny"
                                }
                            ],
                            "comments": [],
                            highlightedAttributes: {}
                        }
                    ],
                    "numFound": 39
                },
                "instance": {
                    "docs": [
                        {
                            "port": 8020,
                            "id": "10040",
                            "isDeleted": false,
                            "lastUpdatedStamp": "2012-03-07 12:59:45",
                            "host": "gillette",
                            "instanceProvider": "Hadoop",
                            "name": "my_hadoop",
                            "state": "online",
                            "highlightedAttributes": {
                                "name": ["<em>my<\/em>_hadoop"]
                            },
                            "entityType": "instance",
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "comments": []
                        },
                        {
                            "port": 5432,
                            "id": "10043",
                            "isDeleted": false,
                            "lastUpdatedStamp": "2012-03-07 12:59:45",
                            "host": "gillette",
                            "instanceProvider": "Greenplum Database",
                            "name": "my_instance",
                            "state": "fault",
                            "highlightedAttributes": {
                                "name": ["<em>my<\/em>_instance"]
                            },
                            "entityType": "instance",
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "comments": []
                        }
                    ],
                    "numFound": 2
                },
                "user": {
                    "docs": [
                        {
                            "admin": "false",
                            "comments": [],
                            "email": null,
                            "entityType": "user",
                            "firstName": "John",
                            "id": "10023",
                            "isDeleted": "false",
                            "lastName": "Doe",
                            "lastUpdatedStamp": "2012-03-01 11:07:13",
                            "name": "test",
                            "title": "",
                            "ou": "Test",
                            "content": "Hello",
                            "owner": {},
                            highlightedAttributes: {
                                "name": ["<em>test</em>"],
                                "ou": ["<em>Test</em>"]
                            }
                        },
                        {
                            admin: "false",
                            comments: [],
                            email: "test1@emc.com",
                            entityType: "user",
                            firstName: "Test",
                            id: "10020",
                            isDeleted: "false",
                            lastName: "McTest",
                            lastUpdatedStamp: "2012-03-01 11:06:05",
                            name: null,
                            title: "nobody",
                            ou: "",
                            content: "Test",
                            owner: {},
                            highlightedAttributes: {
                                firstName: ["<em>Test</em>"],
                                content: ["<em>Test</em>"]
                            }
                        },
                        {
                            admin: "false",
                            comments: [],
                            email: "test2@emc.com",
                            entityType: "user",
                            firstName: "Jack",
                            id: "10021",
                            isDeleted: "false",
                            lastName: "Test",
                            lastUpdatedStamp: "2012-03-01 11:06:32",
                            name: "",
                            "title": "tester",
                            owner: {},
                            highlightedAttributes: {
                                lastName: ["<em>Test</em>"],
                                "title": ["<em>test</em>er"]
                            }
                        }
                    ],
                    "numFound": 4
                },
                hdfs: {
                    docs: [
                        {
                            comments: [],
                            entityType: "hdfs",
                            highlightedAttributes: {
                                name: ["Thumbs.<em>db</em>"]
                            },
                            hadoopInstance: {
                                id: "10001",
                                name: "hadoop"
                            },
                            lastUpdatedStamp: "2012-03-05 15:23:55",
                            name: "Thumbs.db",
                            path: "/webui/images/thirdparty/jquerybubblepopup-theme/green"

                        }
                    ],
                    numFound: 1
                },
                attachment: {
                    docs: [
                        {
                            entityType: "hdfs",
                            id: "10000",
                            isDeleted: false,
                            lastUpdatedStamp: "2012-03-16 11:17:09",
                            fileId: "10000",
                            fileType: "CSV",
                            isBinary: true,
                            name: "titanic.csv",
                            highlightedAttributes: {
                                name: ["<em>titanic<\/em>.csv"]
                            },
                            owner: {
                                id: "InitialUser",
                                lastName: "Admin",
                                firstName: "EDC"
                            },
                            workspace: {
                                id: "10000",
                                name: "ws"
                            },
                            hdfs: {
                                id: "10020|/webui/help/publish/Data/Index.js",
                                name: "Index.js",
                                path: "/webui/help/publish/Data",
                                hadoopInstance: {
                                    id: "10020",
                                    name: "hadoooooooooop"
                                },
                                entityType: "hdfs"
                            },
                            comments: []
                        },
                        {
                            entityType: "workspace",
                            id: "10001",
                            isDeleted: false,
                            lastUpdatedStamp: "2012-03-16 11:18:32",
                            fileId: "10001",
                            fileType: "IMAGE",
                            isBinary: true,
                            name: "Titanic2.jpg",
                            highlightedAttributes: {
                                name: ["<em>Titanic<\/em>2.jpg"]
                            },
                            owner: {
                                id: "InitialUser",
                                lastName: "Admin",
                                firstName: "EDC"
                            },
                            workspace: {
                                id: "10000",
                                name: "ws"
                            },
                            comments: []
                        }
                    ],
                    numFound: 2
                }
            }, overrides)
        },

        searchResultDatabaseObjectJson: function(overrides) {
            return _.extend({
                schemaName: "public",
                parentType: "gpdb_10000_data_types",
                objectType: "TABLE",
                id: '"10000"|"data_types"|"public"|"TABLE"|"a"',
                databaseName: "data_types",
                objectName: "a",
                isDeleted: false,
                description: "This is a test of table description.",
                entityType: "databaseObject",
                instance: {
                    id: "10000",
                    name: "gillette"
                },
                workspaces: [],
                comments: [],
                highlightedAttributes: {
                    description: ["This is a <em>test<\/em> of table description."]
                }
            }, overrides);
        },

        searchResultAttachmentJson: function(overrides) {
            return _.extend({
                comments: [],
                entityType: "attachment",
                fileId: "10020",
                fileType: "IMAGE",
                highlightedAttributes: {name: ['<em>tracker</em>_dot.jpeg']},
                id: "10020",
                isBinary: true,
                isDeleted: false,
                lastUpdatedStamp: "2012-03-19 16:17:04",
                name: "tracker_dot.jpeg",
                owner: {id: 'InitialUser', lastName: 'Admin', firstName: 'EDC'},
                type: "attachment",
                workspace: {id: 10000, name: 'danny'}
            }, overrides);
        },

        searchResultChorusViewJson: function(overrides) {
            return _.extend({
                compositeId: '"10000"|"dca_demo"|"ddemo"|"QUERY"|"cv_us_president"',
                content: "SELECT * FROM test AS a",
                databaseName: "dca_demo",
                datasetType: "CHORUS_VIEW",
                entityType: "chorusView",
                id: "10010",
                instance: {
                    id: '10000',
                    name: 'gillette'
                },
                isDeleted: false,
                objectName: "cv_us_president",
                objectType: "QUERY",
                schemaName: "ddemo",
                workspace: {
                    id: '10000',
                    name: 'New Workspace'
                },
                comments: [],
                highlightedAttributes: {
                    content: ["SELECT * FROM <em>test</em> AS a"]
                }
            }, overrides);
        },

        searchResultChorusView: function(overrides) {
            var attributes = this.searchResultChorusViewJson(overrides);
            return new chorus.models.Dataset(attributes);
        },

        searchResultWorkfileJson: function(overrides) {
            return _.extend({
                    "lastUpdatedStamp": "2012-03-08 09:40:26",
                    "name": "foo.sql",
                    "fileType": "SQL",
                    "id": "10001",
                    "isDeleted": false,
                    "mimeType": "text/x-sql",
                    "highlightedAttributes": {
                        "name": [
                            "<em>foo<\/em>.sql"
                        ],
                        "commitMessage": [
                            "comment with <em>foo<\/em>"
                        ]
                    },
                    "entityType": "workfile",
                    "owner": {
                        "id": "InitialUser",
                        "lastName": "Admin",
                        "firstName": "EDC"
                    },
                    "workspace": {
                        "id": "10000",
                        "name": "a"
                    },
                    "versionInfo": {
                        "lastUpdatedStamp": "2012-03-08T09:40:26Z",
                        "versionFileId": "1331228426846_64",
                        "modifier": {
                            "id": "InitialUser",
                            "lastName": "Admin",
                            "firstName": "EDC"
                        },
                        "versionFilePath": "/Users/pivotal/workspace/chorus/ofbiz/runtime/data/workfile/10003/1332867012541_2971",
                        "versionOwner": "edcadmin",
                        "versionNum": 2
                    },
                    "comments": []
                },
                overrides);
        },

        searchResultHdfsJson: function(overrides) {
            return _.extend({
                comments: [
                    fixtures.searchResultCommentJson(),
                    fixtures.searchResultCommentJson()
                ],
                entityType: "hdfs",
                highlightedAttributes: {
                    name: ["Thumbs.<em>db</em>"]
                },
                hadoopInstance: {
                    id: "10001",
                    name: "hadoop"
                },
                isBinary: false,
                isDir: false,
                lastUpdatedStamp: "2012-03-05 15:23:55",
                name: "Thumbs.db",
                path: "/webui/images/thirdparty/jquerybubblepopup-theme/green"
            }, overrides);
        },

        searchResultCommentJson: function(overrides) {
            return _.extend({
                content: "nice data!",
                highlightedAttributes: {
                    content: ["nice <em>data</em>!"]
                },
                id: "10001",
                isComment: false,
                isInsight: false,
                isPublished: false,
                isColumn: false,
                lastUpdatedStamp: "2012-03-07 15:03:43"
            }, overrides);
        },

        searchResultWorkspaceJson: function(overrides) {
            return _.extend({
                comments: [],
                entityType: "workspace",
                highlightedAttributes: {
                    name: ["<em>three</em>"]
                },
                id: "10011",
                isDeleted: false,
                public: true,
                lastUpdatedStamp: "2012-03-12 10:11:47",
                name: "three",
                owner: {
                    firstName: "EDC",
                    id: "InitialUser",
                    lastName: "Admin"
                },
                state: 0
            }, overrides);
        },

        searchResult: function(overrides) {
            return new chorus.models.SearchResult(this.searchResultJson(overrides))
        },

        emptySearchResult: function(overrides) {
            var model = new chorus.models.SearchResult(this.searchResultJson(overrides));
            _.each(_.keys(model.attributes), function(key) {
                var results = model.get(key);
                if (results.docs) {
                    results.docs = [];
                    results.numFound = 0;
                }
            });

            return model;
        },

        typeAheadSearchResultJson: function(overrides) {
            return _.extend({
                "typeAhead": {
                    "docs": [
                        {
                            "lastUpdatedStamp": "2012-03-16 12:33:15",
                            "type": "attachment",
                            "name": "Titanic2 (1).jpg",
                            "fileType": "IMAGE",
                            "id": "10002",
                            "isDeleted": false,
                            "fileId": "10002",
                            "entityType": "attachment",
                            "highlightedAttributes": {
                                "name": ["<em>Titanic<\/em>2 (1).jpg"]
                            },
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "workspace": {},
                            "instance": {
                                "port": 5432,
                                "id": "10000",
                                "host": "gillette.sf.pivotallabs.com",
                                "provision_type": "register",
                                "name": "gillette",
                                "owner": {
                                    "id": "InitialUser",
                                    "lastName": "Admin",
                                    "firstName": "EDC"
                                },
                                "state": "online",
                                "instanceProvider": "Greenplum Database",
                                "isDeleted": false,
                                "entityType": "instance",
                                "database": "postgres"
                            },
                            "comments": []
                        },

                        {
                            "entityType": "hdfs",
                            "id": "10020|/webui/js/chorus/app/viewsViews.js",
                            "name": "EdcViews.js",
                            "path": "/webui/js/chorus/app/views",
                            isBinary: false,
                            isDir: false,
                            "lastUpdatedStamp": "2012-03-14 16:46:40",
                            "highlightedAttributes": {
                                "name": ["<em>Edc<\/em>Views.js"]
                            },
                            "hadoopInstance": {
                                "id": "10020",
                                "name": "hadoooooooooop"
                            },
                            "comments": []
                        },

                        {
                            "lastUpdatedStamp": "2012-03-09 17:50:58",
                            "state": 1,
                            "entityType": "workspace",
                            "id": "10000",
                            "isDeleted": false,
                            "public": true,
                            "name": "ws",
                            "highlightedAttributes": {
                                "name": ["<em>ws<\/em>"]
                            },
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "active": true,
                            "comments": []
                        },

                        {
                            "port": 5432,
                            "host": "gillette.sf.pivotallabs.com",
                            "lastUpdatedStamp": "2012-03-16 16:39:14",
                            "state": "online",
                            "provision_type": "register",
                            "entityType": "instance",
                            "instanceProvider": "Greenplum Database",
                            "id": "10000",
                            "isDeleted": false,
                            "name": "gillette",
                            "highlightedAttributes": {
                                "name": ["<em>gillette<\/em>"]
                            },
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "comments": []
                        },

                        {
                            "lastUpdatedStamp": "2012-03-16 10:40:36",
                            "entityType": "user",
                            "id": "10010",
                            "name": "user1",
                            "firstName": "user1",
                            "isDeleted": false,
                            "admin": false,
                            "lastName": "user1",
                            "email": "user1@user.com",
                            "highlightedAttributes": {
                                "lastName": ["<em>user<\/em>1"],
                                "name": ["<em>user<\/em>1"],
                                "firstName": ["<em>user<\/em>1"]
                            },
                            "owner": {},
                            "comments": []

                        },

                        {
                            "lastUpdatedStamp": "2012-03-14 17:15:21",
                            "entityType": "workfile",
                            "fileType": "TXT",
                            "id": "10030",
                            "isDeleted": false,
                            "mimeType": "text/plain",
                            "fileName": "buildout.txt",
                            "highlightedAttributes": {
                                "fileName": ["<em>buildout</em>.txt"]
                            },
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "workspace": {
                                "id": "10000",
                                "name": "ws"
                            },
                            "versionInfo": {
                                "lastUpdatedStamp": "2012-03-14T17:15:21Z",
                                "versionFileId": "1331770521971_1380",
                                "modifier": {
                                    "id": "InitialUser",
                                    "lastName": "Admin",
                                    "firstName": "EDC"
                                },
                                "versionFilePath": "/Users/pivotal/workspace/chorus/ofbiz/runtime/data/workfile/10003/1332867012541_2971",
                                "versionOwner": "edcadmin",
                                "versionNum": 1
                            },
                            "comments": []
                        },

                        {
                            "schemaName": "ddemo",
                            "entityType": "databaseObject",
                            "id": '10000\"|"dca_demo"|"ddemo"|"TABLE"|"_uspresident"',
                            "objectType": "TABLE",
                            "databaseName": "dca_demo",
                            "workspaceIds": ["10000", "10030"],
                            "objectName": "_uspresident",
                            "highlightedAttributes": {
                                "objectName": ["_<em>uspresident</em>"]
                            },
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "workspaces": [
                                {
                                    "id": "10000",
                                    "datasetType": "SANDBOX_TABLE",
                                    "name": "ws"
                                },
                                {
                                    "id": "10030",
                                    "datasetType": "SANDBOX_TABLE",
                                    "name": "has_sandbox"
                                }
                            ],
                            "comments": []
                        },

                        {
                            "entityType": "chorusView",
                            "id": '10000"|"dca_demo"|"ddemo"|"QUERY"|"chorus_view"',
                            "isDeleted": false,
                            "lastUpdatedStamp": "2012-03-21 10:15:11",
                            "datasetType": "CHORUS_VIEW",
                            "databaseName": "dca_demo",
                            "schemaName": "ddemo",
                            "objectType": "QUERY",
                            "content": 'SELECT a.position_title FROM "2010_report_on_white_house" AS a',
                            "objectName": "chorus_view",
                            "highlightedAttributes": {
                                "objectName": ["<em>chorus_view</em>"]
                            },
                            "owner": {
                                "id": "InitialUser",
                                "lastName": "Admin",
                                "firstName": "EDC"
                            },
                            "workspace": {
                                "id": "10000",
                                "name": "ws"
                            },
                            "instance": {
                                "id": "10000",
                                "name": "gillette"
                            },
                            "comments": []
                        }
                    ],
                    "numFound": 3
                }
            }, overrides)
        },

        typeAheadSearchResult: function(overrides) {
            return new chorus.models.TypeAheadSearchResult(fixtures.typeAheadSearchResultJson(overrides));
        }
    });
});
