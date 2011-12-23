;(function($, ns){
    ns.urlHelpers = ns.urlHelpers || {};

    // This mapping actually maps file extensions AND workfile 'fileType' attributes to filename values.
    var map = {
        "c" : "c",
        "c++" : "cpp",
        "cc" : "cpp",
        "cxx" : "cpp",
        "cpp" : "cpp",
        "csv" : "csv",
        "doc" : "doc",
        "excel" : "xls",
        "h" : "c",
        "hpp" : "cpp",
        "hxx" : "cpp",
        "jar" : "jar",
        "java" : "java",
        "pdf" : "pdf",
        "ppt" : "ppt",
        "r" : "r",
        "rtf" : "rtf",
        "txt" : "txt",
        "sql" : "sql",
        "image" : "plain"
    }

    ns.urlHelpers.fileIconUrl = function fileIconUrl(key, size) {
        var fileType = key && key.toLowerCase();
        var imageName = (map[fileType] || "plain") + ".png";
        return "/images/workfiles/" + (size || "large") + "/" + imageName;
    }
})(jQuery, chorus);
