chorus.dialogs.SqlPreview = chorus.dialogs.Base.extend({
    className: "sql_preview",
    title: t("sql_preview.dialog.title"),

    events: {
        "click .preview" : "previewData"
    },

    subviews: {
        ".results_console": "resultsConsole"
    },

    setup: function() {
        this.resultsConsole = new chorus.views.ResultsConsole({titleKey: "dataset.data_preview", enableClose: true});
        this.resultsConsole.clickClose = function(e) {
            e && e.preventDefault();

            this.$(".result_content").addClass("hidden");
        };
    },

    additionalContext : function() {
        return { sql: this.sql()}
    },

    makeCodeMirrorOptions: function() {
        return opts = {
            readOnly: "nocursor",
            lineNumbers: true,
            mode: "text/x-sql",
            fixedGutter: true,
            theme: "default",
            lineWrapping: true
        };
    },

    postRender: function() {
        _.defer(_.bind(function() {
            var textArea = this.$(".text_editor")[0];
            if (textArea !== this.textArea) {
                this.textArea = textArea;
                this.editor = CodeMirror.fromTextArea(this.textArea, this.makeCodeMirrorOptions());

                var ed = this.editor;
                _.defer(function() {
                    ed.refresh();
                    ed.refresh();
                    ed.refresh();
                });

                this.setupScrolling(this.$(".container"));
            }
        }, this));
    },

    previewData: function(e) {
        e && e.preventDefault();
        var preview = this.model.preview(true).set({query: this.sql()}, {silent: true})
        this.resultsConsole.execute(preview, true);
    },

    sql: function() {
        var parent = this.options.launchElement.data("parent");
        var sql = parent && parent.sql()
        return sql;
    }
});
