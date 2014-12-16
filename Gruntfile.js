module.exports = function(grunt) {
	var buildDir = '_build';
	var srcDir = 'src';
	var lintDir = '_buildResults';
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		typescript: {
			base: {
				src: [srcDir + '/**/*.ts'],
				dest: buildDir,
				options: {
					removeComments: false,
					basePath: srcDir,
					module: 'amd', //or commonjs
					target: 'es5' //or es3
				}
			}
		},
		jshint: {
			options: {
				asi: true,
				browser: true,
				curly: false,
				devel: true,
				force: true,
				globals: {
					define: true
				},
				shadow: true,
				reporter: 'checkstyle',reporterOutput: lintDir + '/jshint.xml'
			},
			files: {
				src: [buildDir + '/**/*.js']
			}
		},
		jade: {
			compile: {
				files: [{
						expand: true,
						flatten: false,
						ext: '.html',
						cwd: srcDir,
						src: ['./**/*.jade'],
						dest: buildDir
					}]
			}
		},
		stylus: {
			compile: {
				files: [{
						expand: true,
						flatten: false,
						ext: '.css',
						cwd: srcDir,
						src: ['./**/*.styl'],
						dest: buildDir
					}
				]
			}
		},
		csslint: {
			strict: {
				options: {
					'import': false,
					'adjoining-classes': false,
					'fallback-colors': false,
					formatters: [{
						id: 'checkstyle-xml',
						dest: '_buildResults/csslint.xml'
					}]
				},
				src: [buildDir + '/**/*.css']
			}
		},
		uglify: {
			options: {
				mangle: {
					except: ['jQuery']
				}
			},
			files: {
				expand: true,
				flatten: false,
				ext: '.js',
				cwd: buildDir,
				src: ['./**/*.js'],
				dest: buildDir
			}
		},
		groundskeeper: {
			compile: {
				files: [{
					expand: true,
					flatten: false,
					ext: '.js',
					cwd: buildDir,
					src: ['./**/*.js'],
					dest: buildDir
				}]
			}
		},
		'json-minify': {
			build: {
				files: buildDir + '/**/*.json'
			}
		},
		jsonlint: {
			build: {
				src: [buildDir + '/**/*.json']
			}
		},
		copy: {
			libs: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'libs',
					src: ['./**/*.js'],
					dest: buildDir + '/libs'
				}]
			},
			libsProd: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'libs',
					src: ['./**/*.min.js'],
					dest: buildDir + '/libs'
				}]
			},
			css: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'css',
					src: ['./**/*'],
					dest: buildDir + '/css'
				}]
			},
			img: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'img',
					src: ['./**/*'],
					dest: buildDir + '/img'
				}]
			}
		},
		clean: {
			build: [buildDir]
		}
	});

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-groundskeeper');

	grunt.registerTask('base', [
		'clean',
		'typescript',
		'jade',
		'stylus',
		'jshint',
		'csslint'
	]);
	grunt.registerTask('externals', [
		'copy:libs',
		'copy:css',
		'copy:img'/*,
		'json-minify:build',
		'jsonlint'*/
	]);
	grunt.registerTask('externalsProduction', [
		'copy:libsProd',
		'copy:css',
		'copy:img',
		'json-minify:build',
		'jsonlint'
	]);
	grunt.registerTask('default', [
		'base',
		'externals'
	]);
	grunt.registerTask('production', [
		'base',
		'groundskeeper',
		'uglify',
		'externalsProduction'
	]);
};