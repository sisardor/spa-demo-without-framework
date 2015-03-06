module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        my_target: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
                'build/<%= pkg.name %>.min.js' : [
                    "src/js/libs/handlebars-v3.0.0.js",
                    "src/js/utils/custom-dome-library.js",
                    "src/js/utils/bb.api.js",
                    "src/js/BBProductDetail.js",
                    "src/js/BBSidebarMenu.js",
                    "src/js/BBProducts.js",
                    "src/js/route.js"
                ]
            }

        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};

