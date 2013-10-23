module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

	    // Validate files with JSHint
	    jshint: {
 			files: 	[ 'build/js/site-script.js','build/js/delicious.js' ],
		    options: {
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
            	separator: '\n'
        	},
			js: {
		    	// the files to concatenate
		    	src: [ 'build/js/*.js', 'build/js/**/*.js', '!build/js/highchartjs/**/*', '!build/js/jquery*', '!build/js/modernizr*', '!build/js/site-dataModel*' ],
				// the location of the resulting JS file
				dest: 'build/js/script.concat.js'
			}
		},
		// Compile LESS files to CSS with minfing
		less: {
			build: {
		    	options: {
		    		paths: ["css"]
		    	},
		    	files: {
		    		'build/css/style.css': [ 'build/css/*.less', 'build/css/**/*.less' ]
		    	}
		  	},
		  	release: {
		    	options: {
		    		paths: ["css"],
		    		yuicompress: true
		    	},
		    	files: {
		    		'release/css/style.min.css': [ 'build/css/*.less', 'build/css/**/*.less' ]
		    	}
		  }
		},
		//Minify files with UglifyJS.
	    uglify: { 
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			js: {
				files: { 
					'release/js/script.min.js': '<%= concat.js.dest %>'
				}
			}
	    },
	    //Optimize png and jpg or gif
		imagemin: {
	    	options: { 
	    		optimizationLevel: 0
	      	},
			dynamic: {
		      files: [{
		        expand: true,                  // Enable dynamic expansion
		        cwd: 'build/',                 // Src matches are relative to this path
		        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
		        dest: 'release'                // Destination path prefix
		      }]
		    }
		},
		clean: {
			build: [ 'build/js/script.concat.js' ],
		  	release: [ 'release/css/style.min.css','release/js/script.min.js' ]
		},
		copy: {
		  main: {
			options:{
				processContent: function(content, srcpath) {  
			    	content = content.replace(/\/\/@ sourceMappingURL=jquery.min.ma/, '//-@-sourceMappingURL=jquery.min.ma');   
			    	return content;  
				}
			},
		    files: [
		      {
		      	expand: true,
		      	cwd: 'build/',
		      	src: [ 'view/*', 'js/jquery.min.js', 'js/modernizr.min.js', 'js/high*/**/*.js','!js/**/*.src.js', 'js/site-dataModel.json', 'images/*.svg' ],
		      	dest: 'release'
		      }    
		    ]
		  }
		},
	    watch: {
	    	options: {
    			livereload: true
  			},
	    	js: {
		      	files: [ 'build/js/**/*.js', 'Gruntfile.js', 'app.js' ],
		      	tasks: [ 'default' ]
	    	},
	    	css: {
	    		files: [ 'build/css/*.less' ],
	      		tasks: [ 'default' ]
	    	},
 			html: {
            	files: [ 'build/view/index.html', 'release/view/index.html' ]
        	}
	    }
    });

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [ 'clean', 'jshint', 'concat', 'less', 'uglify', 'imagemin', 'copy','watch' ]);
}

