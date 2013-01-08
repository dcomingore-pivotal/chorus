describe("chorus.views.TagBoxCollection", function() {
    var view;

    beforeEach(function() {
        this.model1 = rspecFixtures.workfile.sql({
            tags: [
                {name: "tag1"},
                {name: "tag2"}
            ]
        });
        this.model2 = rspecFixtures.workfile.sql({
            tags: [
                {name: "tag1"},
                {name: "tag3"}
            ]
        });
        this.collection = rspecFixtures.workfileSet([
            this.model1.attributes,
            this.model2.attributes]);
        view = new chorus.views.TagBoxCollection({collection: this.collection});
        view.render();
    });

    function enterTag(tagName) {
        var enter = $.Event('enterKeyPress');
        var input = view.$("input");
        input.val(tagName);
        input.focus();
        input.trigger(enter);
    }

    it("displays all the relevant tags", function() {
        expect(view.$(".text-tags")).toContainText("tag1");
        expect(view.$(".text-tags")).toContainText("tag2");
        expect(view.$(".text-tags")).toContainText("tag3");
        expect(view.$(".text-button").length).toBe(3);
    });

    it("adds a tag to all models when you add a tag", function() {
        enterTag("foo");
        expect(this.collection.at(0).tags().pluck("name")).toEqual(["tag1", "tag2", "foo"]);
        expect(this.collection.at(1).tags().pluck("name")).toEqual(["tag1", "tag3", "foo"]);
    });

    it("removes a tag from all models when you remove a tag", function() {
        view.$(".text-remove:eq(0)").click();
        expect(this.collection.at(0).tags().pluck("name")).toEqual(["tag2"]);
        expect(this.collection.at(1).tags().pluck("name")).toEqual(["tag3"]);
    });


});
