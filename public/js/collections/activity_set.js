chorus.collections.ActivitySet = chorus.collections.Base.extend({
    model:chorus.models.Activity,

    urlTemplate: function() {
        if (this.attributes.insights) {
            return "commentinsight/"
        } else {
            return "activitystream/{{entityType}}/{{entityId}}"
        }
    }
});
