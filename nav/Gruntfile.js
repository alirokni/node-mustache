module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

	    // Validate files with JSHint
	    jshint: {
 			files: 	['development/js/site-script.js','development/js/delicious.js'],

		    options: {
				"curly": true,
				"eqnull": false,
				"eqeqeq": false,
				"undef": true,
				"-W117": true, // $, document is not defined
				"-W030": true, // assignemet or function
		      	"-W032": true, // Unnecessary semicolon
		        "-W033": true, // missing semicolon
				"-W041": true, // strict comparison operators
				"-W065": true, // radix param for parsInt
		        "globals": {
		        	"jQuery": true,
		        	"Modernizr": true,
		        	"console": true,
		        	"module": true
		        }
	      }
	    },
		// Concatenate js files.
		concat: {
			options: {
		    	// define a string to put between each file in the concatenated output
		    	//separator: ';'
		  	},
		  	dist: {
		    	// the files to concatenate
		    	src: ['development/js/*.js', 'development/js/**/*.js', '!development/js/highchartjs/**/*', '!development/js/jquery*', '!development/js/modernizr*', '!development/js/site-dataModel*'],
		    	// the location of the resulting JS file
		    	dest: 'production/js/script.concat.js'
		  	}
		},
		// Compile LESS files to CSS with minfing
		less: {
			development: {
		    	options: {
		    		paths: ["css"]
		    	},
		    	files: {
		    		'development/css/style.css': ['development/css/*.less', 'development/css/**/*.less']
		    	}
		  	},
		  	production: {
		    	options: {
		    		paths: ["css"],
		    		yuicompress: true
		    	},
		    	files: {
		    		'production/css/style.min.css': ['development/css/*.less', 'development/css/**/*.less']
		    	}
		  }
		},
		//Minify files with UglifyJS.
	    uglify: { 
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: { 
					'production/js/script.min.js': '<%= concat.dist.dest %>'
				}
			}
	    },
		imagemin: {                            // Task
		    static: {                          // Target
		    	options: {                       // Target options
		    		optimizationLevel: 3
		      	},
		      	files: {                         // Dictionary of files
		        	'production/images/sunflower-header-200.png': 'development/**/*.png', // 'destination': 'source'
		      	}
		    }
		},
	    watch: {
	      files: ['<%= jshint.files %>', '<%= concat.dist.dest %>', '<%= less.production.files %>', '<%= uglify.dist.files %>', '<%= htmlmin.dist.files %>', '<%= imagemin.static.files %>'],
	      tasks: ['jshint', 'concat', 'less', 'uglify', 'imagemin']

	    }

    });

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['jshint', 'concat', 'less', 'uglify', 'imagemin']);
}
