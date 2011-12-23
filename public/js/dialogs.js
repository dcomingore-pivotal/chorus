;
(function(ns) {
    ns.dialogs.Base = ns.Modal.extend({
        render: function render() {
            var header = $("<div class='dialog_header'/>");
            var content = $("<div class='dialog_content'/>");
            var errors = $("<div class='errors'/>")

            this.events = this.events || {};
            this.events["click button.cancel"] = this.events["click button.cancel"] || "closeModal";

            header.html($("<h1/>").text(this.title))
            content.html(this.template(this.context()));

            $(this.el).
                empty().
                append(header).
                append(errors).
                append(content).
                addClass(this.className).
                addClass("dialog").
                attr("title", this.options.title || this.title);
            this.delegateEvents()
            this.renderSubviews();
            this.postRender($(this.el));

            return this;
        },

        revealed : function () {
            $("#facebox").removeClass().addClass("dialog_facebox");
        }
    })
})(chorus)
